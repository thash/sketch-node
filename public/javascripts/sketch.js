window.addEventListener('load', function(){

    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth -30;
    canvas.height = window.innerHeight -30;

    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#9eala3';

    var remote_down = false;

    var socket = new io.Socket();
    socket.connect();
    socket.on('connect', function(data) {
        console.log("connect session: " + socket.transport.sessionid);
    });

    socket.on('message', function(data) {

        switch (data.act) {
            case "down":
                remote_down = true;
                ctx.strokeStyle = data.color;
                ctx.beginPath();
                ctx.moveTo(data.x, data.y);
            case "move":
                console.log("remote: " + data.x, data.y);
                ctx.lineTo(data.x, data.y);
                ctx.stroke();
            case "up":
                if (!remote_down) return;
                ctx.lineTo(data.x, data.y);
                ctx.stroke();
                ctx.closePath();
                remote_down = false;
        }
    });

    var down = false;
    canvas.addEventListener('mousedown', function (e) {
        down = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        socket.send({
            act: "down",
            x: e.clientX,
            y: e.clientY,
            color: ctx.strokeStyle
        });
    }, false);
    window.addEventListener('mousemove', function (e) {
        if (!down) return;
        console.log(e.clientX, e.clientY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        socket.send({
            act: "move",
            x: e.clientX,
            y: e.clientY,
        });
    }, false);
    window.addEventListener('mouseup', function (e) {
        if (!down) return;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.closePath();
        down = false;
        socket.send({
            act: "up",
            x: e.clientX,
            y: e.clientY,
        });
    }, false);

    var colors = document.getElementById('colors').childNodes;
    for (var i = 0, color; color = colors[i]; i++) {
        if (color.nodeName.toLowerCase() != 'div') continue;
        color.addEventListener('click', function (e) {
            var style = e.target.getAttribute('style');
            var color = style.match(/background:(#......)/)[1];
            ctx.strokeStyle = color;
        }, false);
    }
}, false);

