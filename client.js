window.onload = function () {

    var host = location.origin.replace(/^http/, 'ws');
    var ws = new WebSocket(host);

    var user = new User();
    var data;
    $('.id').html(user.id);
    var msg = {};

    //assigning cylinder a frame height to a variable
    var cylinderHeight;
    var cylinderHeightInt;

    ws.onopen = function () {
        console.log(user);

        //assigning cylinder a frame height to a variable
        // var cylinderHeight = $('.cyl').attr('height');
        // var cylinderHeightInt = parseInt(cylinderHeight);

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

        data = JSON.parse(e.data);
        console.log(data);

        if (data.type == "swipe") {
            console.log('swipe updated');
            var cylinderHeight = $('.cyl').attr('height');
            var cylinderHeightInt = parseInt(cylinderHeight);
            cylinderHeightInt += 1;
            //assigning increased height to a frame cylinder height
            $('.cyl').attr('height', cylinderHeightInt);
        }

    }

    //checking if user is on a mobile device
    if (user.mobile) {
        var toSwipe = document.body;
        //setting up hammer to detect swipe
        var mc = new Hammer(toSwipe);
        //changing swipe direction to vertical
        mc.get('swipe').set({
            direction: Hammer.DIRECTION_VERTICAL
        });

        // listen to swipe event
        mc.on("swipe", function (ev) {
            console.log("swipe detected");
            //changing type of msg to notify server
            msg = {
                type: 'swipe',
                sendToAll: true,
                swipe: true,
            }
            ws.send(JSON.stringify(msg));

        });
    }

}