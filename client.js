window.onload = function () {

    var host = location.origin.replace(/^http/, 'ws');
    var ws = new WebSocket(host);
    // var id;

    var user = new User();
    $('.id').html(user.id);



    ws.onopen = function () {

        console.log(user);

        var msg = {
            type: 'loadAll',
            sendToAll: false,
            user: user
        }

        ws.send(JSON.stringify(msg));

        var msg = {
            type: 'register',
            sendToAll: true,
            user: user
        }

        ws.send(JSON.stringify(msg));
    }

    ws.onmessage = function (e) {

        var data = JSON.parse(e.data);
        console.log(data);

        user[data.type](data);

    }

    var toDrag = document.querySelector('.toDrag');
    var mc = new Hammer(toDrag);

    // listen to events...
    mc.on("swipe", function (ev) {
        alert("swipe detected");
    });
}