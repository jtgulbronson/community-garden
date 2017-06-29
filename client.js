window.onload = function () {

    var host = location.origin.replace(/^http/, 'ws');
    var ws = new WebSocket(host);

    ws.onopen = function () {
        var register = {
            type: 'register'
        };
        ws.send(JSON.stringify(register));
    }

    ws.onmessage = function (e) {
        console.log(e);
        $('body').append(`<p> ${e.data} </p>`);
    }
}