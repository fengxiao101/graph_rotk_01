let canvas;
let context;

const w = 600;
const h = 600;

let grid;

const array_stats_type = ["name", "gender_as_number", "cost", "str", "int", "cmd", "dex", "lck"];
const array_stats_full_name = ["Name", "Gender", "Cost", "Strength", "Intelligence", "Command", "Dexterity", "Luck"];

setup_canvas();
setup_sprite();
setup_button();
draw();

function setup_canvas(){
    canvas = document.getElementById("id_canvas_01");
    canvas.width = w;
    canvas.height = h;

    context = canvas.getContext("2d");

    setup_event_listener(canvas);
}

function setup_sprite(){
    grid = new Class_Grid(canvas, context, "int", "str");
    grid.tick_separation_grid = new Class_Vector(55, 55);
    grid.tick_separation_math = new Class_Vector(10, 10);
    grid.precision.x = 0;
    grid.precision.y = 0;
}

function setup_button(){
    const element_div_x_axis_button = document.getElementById("id_div_x_axis_button");
    const element_div_y_axis_button = document.getElementById("id_div_y_axis_button");

    for (let i=1; i<array_stats_type.length; i++){
        let button_x = document.createElement("button");
        button_x.innerHTML = array_stats_full_name[i];
        button_x.onclick = ()=>set_stats_x(array_stats_type[i]);

        let button_y = document.createElement("button");
        button_y.innerHTML = array_stats_full_name[i];
        button_y.onclick = ()=>set_stats_y(array_stats_type[i]);
    
        element_div_x_axis_button.appendChild(button_x);
        element_div_y_axis_button.appendChild(button_y)
    }
}

function draw(){
    draw_background();

    context.save();
        //change to the bottom left coordinate system
        context.translate(0, h);
        context.scale(1, -1);

        grid.draw();

        //change to the grid coordinate system
        context.translate(grid.x, grid.y);

        plot_general(grid.stats_x, grid.stats_y);

    context.restore();

    draw_border();
}


function plot_general(stats_x, stats_y){

    array_data_general.forEach(object_general=>{
        let x_math = object_general[stats_x];
        let y_math = object_general[stats_y];
        draw_point_at(x_math, y_math);
    });
}

function draw_point_at(x_math, y_math, a_color="Black", a_radius=3){
    var xy_math = new Class_Vector(x_math, y_math);
    var xy_grid = xy_grid_from_math(xy_math);

    context.save();
        context.beginPath();
        context.arc(xy_grid.x, xy_grid.y, a_radius, 0, 2 * Math.PI);
        context.fillStyle = a_color;
        context.fill();
    context.restore();
}

function draw_background(){
    context.save();
        context.fillStyle = "LavenderBlush";
        context.fillRect(0, 0, w, h);
    context.restore();
}

function draw_border(){
    context.save();
        context.strokeStyle = "Black";
        context.lineWidth = 3;
        context.strokeRect(0, 0, w, h);
    context.restore();
}

//*******************************************************************************************//
//   COORDINATE TRANSFORMATION                                                               //
//   xy_canvas is measured from the top left corner (x points right, y points down)          //
//   xy_bottom_left is measured from the bottom left corner (x points right, y points up)    //
//   xy_grid is measured from the grid origin (x points right, y points up)                  //
//   xy_math is the actual values being plotted                                              //
//                                                                                           //
//*******************************************************************************************//

function xy_bottom_left_from_canvas(a_xy_canvas){
    return new Class_Vector(a_xy_canvas.x, canvas.height - a_xy_canvas.y);
}

function xy_canvas_from_bottom_left(a_xy_bottom_left){
    return new Class_Vector(a_xy_bottom_left.x, canvas.height - a_xy_bottom_left.y);
}

function xy_bottom_left_from_grid(a_xy_grid){
    return a_xy_grid.plus(grid.origin);
}

function xy_grid_from_bottom_left(a_xy_bottom_left){
    return a_xy_bottom_left.minus(grid.origin);
}

function xy_grid_from_math(a_xy_math){
    return new Class_Vector(a_xy_math.x*grid.factor_grid_from_math.x, a_xy_math.y*grid.factor_grid_from_math.y);
}

function xy_math_from_grid(a_xy_grid){
    return new Class_Vector(a_xy_grid.x*grid.factor_math_from_grid.x, a_xy_grid.y*grid.factor_math_from_grid.y);
}

function xy_math_from_canvas(a_xy_canvas){
    return xy_math_from_grid(xy_grid_from_bottom_left(xy_bottom_left_from_canvas(a_xy_canvas)));
}


function set_stats_x(a_stats_x){
    grid.stats_x = a_stats_x;
    draw();
}

function set_stats_y(a_stats_y){
    grid.stats_y = a_stats_y;
    draw();
}