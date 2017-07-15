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

    $(document).touchwipe(function () {
        msg = {
            sendToAll: true,
            user: user
        };
    });

    $(document).touchwipe({
        wipeLeft: function () {
            //alert("left");
        },
        wipeRight: function () {
            //alert("right");
        },
        wipeUp: function () {
            $(document).css('background', '#444444');
        },
        wipeDown: function () {
            //alert("down");
        },
        min_move_x: 20,
        min_move_y: 20,
        // preventDefaultEvents: true,
    });
}