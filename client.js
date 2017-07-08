window.onload = function () {

    var host = location.origin.replace(/^http/, 'ws');
    var ws = new WebSocket(host);
    var id;

    ws.onopen = function () {

        id = Math.round(Math.random() * 10000);
        $(".id").html(id);

        var register = {
            type: 'register'
        };
        ws.send(JSON.stringify(register));
    }

    ws.onmessage = function (e) {
        console.log(e);

        var data = JSON.parse(e.data);

        if (data.type == "clicked") {
            $('body').append("<p>ID #" + data.id + " clicked </p>");
        } else {
            $('body').append("<p>" + data.msg + "</p>");
        }
    }

    $(document).mouseup(function () {
        console.log("clicked");

        var msg = {
            type: 'clicked',
            id: id
        };

        ws.send(JSON.stringify(msg));
    });
}