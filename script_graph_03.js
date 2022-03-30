let canvas;
let context;

const w = 600;
const h = 600;

let grid;

setup_data();
setup_canvas();
setup_sprite();
draw();

function setup_canvas(){
    canvas = document.getElementById("id_canvas_01");
    canvas.width = w;
    canvas.height = h;

    context = canvas.getContext("2d");
}

function setup_sprite(){
    grid = new Class_Grid(canvas, context);
    grid.tick_separation_grid = new Class_Vector(55, 55);
    grid.tick_separation_math = new Class_Vector(10, 10);
    grid.precision.x = 0;
    grid.precision.y = 0;
}

function setup_data(){
    // // Put empty arrays into the dictionary
    // array_stats_type.forEach(stats_type => {
    //     dictionary_of_array_stats[stats_type] = [];
    // });

    // // Fill the arrays of the dictionary
    // array_data_general.forEach(object_general => {
    //     array_stats_type.forEach(stats_type => {
    //         dictionary_of_array_stats[stats_type].push(object_general[stats_type]);
    //     });
    // });

    // let array_gender_as_number = []; // 50 for female & 100 for male
    // dictionary_of_array_stats["gender"].forEach(string_gender => {
    //     if (string_gender === "F"){
    //         array_gender_as_number.push(50);
    //     } else {
    //         array_gender_as_number.push(100);
    //     }
    // });
    // dictionary_of_array_stats["gender"] = array_gender_as_number;



}




function draw(){
    draw_background();

    context.save();
        //change to the bottom left coordinate system
        context.translate(0, h);
        context.scale(1, -1);

        //change to the grid coordinate system
        context.translate(grid.x, grid.y);

        grid.draw();

        // var x_axis = "int";
        // var y_axis = "str";

        // plot_scatter(dictionary_of_array_stats[x_axis], dictionary_of_array_stats[y_axis], "RGBA(0, 0, 0, 0.5)");

    context.restore();

    draw_border();
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