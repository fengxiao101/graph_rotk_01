var canvas;
var context;

var w = 1000;
var h = 1000;

function setup_canvas(){
    canvas = document.getElementById("id_canvas_01");
    canvas.width = w;
    canvas.height = h;

    context = canvas.getContext("2d");
}