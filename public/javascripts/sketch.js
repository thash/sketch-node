window.addEventListener('load', function(){
    //    alert('loaded');

    var canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth -30;
    canvas.height = window.innerHeight -30;

    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#9eala3';

    var down = false;
    canvas.addEventListener('mousedown', function (e) {
        down = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }, false);
    window.addEventListener('mousemove', function (e) {
        if (!down) return;
        console.log(e.clientX, e.clientY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }, false);
    window.addEventListener('mouseup', function (e) {
        if (!down) return;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.closePath();
        down = false;
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

