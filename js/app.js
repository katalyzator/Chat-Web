/**
 * Created by root on 2/18/16.
 */

var BOSH_SERVICE = "http://localhost:5280/http-bind";
var connection = null;
var domain = 'localhost';

$(document).ready(function() {
    var chatBody = $('#chat-body');

    $('#hide-chat').on('click', function() {
        $(chatBody).slideToggle("slow");
    });

    $('#chat-head').on('click', function() {
        if ($(chatBody).is(":hidden")) {
            $(chatBody).slideToggle("slow");
        }
    });

    $('#msg-text').keypress(function(e) {
        if (e.keyCode == 13) {
            var msg = $msg({to: 'admin@localhost', from: connection.jid, type: 'chat'}).c('body').t($(this).val());
            connection.send(msg)
            $(this).val('')
        }
    });

    $(window).bind('unload', function() {
        connection.disconnect();
    });

    connect();
});

function connect() {
    connection = new Strophe.Connection(BOSH_SERVICE);
    connection.connect(domain, '', onConnect);
}

function onConnect(status) {
    if (status == Strophe.Status.CONNECTED) {
        alert(connection.jid);
    } else if (status == Strophe.Connection.DISCONNECTED) {
        alert('not connected');
    }
}