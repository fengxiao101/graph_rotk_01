var canvas;
var context;

var w = 1000;
var h = 1000;

var array_sprite = [];

let array_stats_type = ["name", "gender", "cost", "str", "int", "cmd", "dex", "lck"];
var dictionary_of_array_stats = {};

var grid;

// var origin = new Class_Vector(100, 50);
// var tick_separation_math = new Class_Vector(2, 2); 
// var tick_separation_grid = new Class_Vector(50, 50);

// var factor_grid_from_math = new Class_Vector(tick_separation_grid.x/tick_separation_math.x, tick_separation_grid.y/tick_separation_math.y);

// var factor_math_from_grid = new Class_Vector(tick_separation_math.x/tick_separation_grid.x, tick_separation_math.y/tick_separation_grid.y);

setup_canvas();
setup_sprite();
setup_data();
draw();

function setup_canvas(){
    canvas = document.getElementById("id_canvas_01");
    canvas.width = w;
    canvas.height = h;

    context = canvas.getContext("2d");
}

function setup_sprite(){
    grid = new Class_Grid(canvas, context, 25, 25);
    grid.tick_separation_grid = new Class_Vector(90, 90);
    grid.tick_separation_math = new Class_Vector(10, 10);
    grid.precision.x = 0;
    grid.precision.y = 0;


    array_sprite.push(grid);

}

function setup_data(){

    // // Translate into English
    // array_data_general.forEach(object_general => {
    //     var name_in_korean = object_general.name;
    //     var array_translate = dictionary_translate[name_in_korean];
    
    //     object_general.name = array_translate[4];
    //     object_general.name_in_chinese = array_translate[2];
    // });

    
    // array_data_general.forEach(object_general=>{
    //     if (object_general.gender === "F"){
    //         object_general.gender_as_number = 20;
    //     } else {
    //         object_general.gender_as_number = 80;
    //     }
    // });

    // console.log(array_data_general);

    // Put empty arrays into the dictionary
    array_stats_type.forEach(stats_type => {
        dictionary_of_array_stats[stats_type] = [];
    });

    // Fill the arrays of the dictionary
    array_data_general.forEach(object_general => {
        array_stats_type.forEach(stats_type => {
            dictionary_of_array_stats[stats_type].push(object_general[stats_type]);
        });
    });

    let array_gender_as_number = []; // 50 for female & 100 for male
    dictionary_of_array_stats["gender"].forEach(string_gender => {
        if (string_gender === "F"){
            array_gender_as_number.push(50);
        } else {
            array_gender_as_number.push(100);
        }
    });
    dictionary_of_array_stats["gender"] = array_gender_as_number;

}

function draw(){
    draw_background();

    context.save();
        //change to the bottom left coordinate system
        context.translate(0, h);
        context.scale(1, -1);

        //change to the grid coordinate system
        context.translate(grid.x, grid.y);

        array_sprite.forEach(a_sprite => {
            a_sprite.draw();
        });

        var x_axis = "int";
        var y_axis = "str";

        // // plot_histogram(array_war, 0, 100, 5);

        plot_scatter(dictionary_of_array_stats[x_axis], dictionary_of_array_stats[y_axis], "RGBA(0, 0, 0, 0.5)");
        // var function_of_best_fit = make_function_of_best_fit(dictionary_of_array_stats[x_axis], dictionary_of_array_stats[y_axis]);
        // plot_function(function_of_best_fit, "Grey", 3);

        draw_array_general(["Liu Bei", "Cao Cao", "Sun Quan", "Liu Biao", "Yuan Shao", "Yuan Shu", "Dong Zhuo", "Lu Bu", "Gongsun Zan", "Tao Qian", "Zhang Xiu", "Zhuge Liang", "Ma Teng", "Zhang Lu", "Liu Zhang", "Sima Yi", "Kong Rong", "Guo Jia"], x_axis, y_axis);

        draw_array_general(["Ying Zheng", "Liu Bang", "Xiang Yu", "Zhang Liang", "Han Xin", "Fan Zeng"], x_axis, y_axis);


    context.restore();

    draw_border();
}

function draw_array_general(a_array_name, stats_x="int", stats_y="str"){
    a_array_name.forEach(name => {
        var color = `RGB(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;

        var object_general = object_info_by_name(name);
        var x = object_general[stats_x];
        var y = object_general[stats_y];

        if (x === "F"){
            x = 50;
        } else if (x === "M"){
            x = 100;
        }
        
        if (y === "F"){
            y = 50;
        } else if (y === "M"){
            y = 100;
        }

        draw_point_at(x, y, color, 5);

        var xy_math = new Class_Vector(x, y);
        var xy_grid = xy_grid_from_math(xy_math);

        // context.save();
        //     context.beginPath();
        //     context.arc(xy_grid.x, xy_grid.y, a_radius, 0, 2 * Math.PI);
        //     context.fillStyle = a_color;
        //     context.fill();
        // context.restore();

        context.save();
            context.translate(xy_grid.x, xy_grid.y);
            context.scale(1, -1);
            context.textBaseline = "middle";
            context.textAlign = "start";
            context.translate(6, -1);
            context.fillStyle = color;
            context.fillText(name, 0, 0);
        context.restore();

    });
}

function object_info_by_name(name){
    // var index = array_name.indexOf(name);
    // var object_general = {};
    // object_general.Int = array_int[index];
    // object_general.War = array_war[index];
    // object_general.Charm = array_charm[index];

    // return object_general;

    var array_object_general_filtered = array_data_general.filter((object_general)=>{return object_general.name.toLowerCase()===name.toLowerCase()});
    
    if (array_object_general_filtered.length === 0){
        console.log(`Error: ${name} not found`);
        return {};
    } else {
        return array_object_general_filtered[0];
    }

}

function average_of_random(n){
    var sum = 0; 

    for (var i=0; i<n; i++){
        sum += Math.random();
    }

    return sum / n;
}

function random_integer(n){
    // Gives a random integer from 0 to n-1

    return Math.floor(Math.random() * n);
}

// function draw_axis(){
//     context.save();
//         context.beginPath();
//         context.moveTo(-origin.x, 0);
//         context.lineTo(w - origin.x, 0);

//         context.moveTo(0, -origin.y);
//         context.lineTo(0, h - origin.y);
//         context.strokeStyle = "Black";
//         context.lineWidth = 2;
//         context.stroke();
//     context.restore();
// }

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

function plot_function(a_function, a_color="Black", a_lineWidth=1, count_point=100){
    // console.log("Calling plot()");
    // console.log(a_function(2));

    var delta_x = (grid.x_math_max - grid.x_math_min)/count_point;
    var x_math = grid.x_math_min;
    var y_math;


    y_math = a_function(x_math);
    var xy_math = new Class_Vector(x_math, y_math);
    var xy_grid = xy_grid_from_math(xy_math);

    context.save();
        context.beginPath();
        context.moveTo(xy_grid.x, xy_grid.y);
        while (x_math <= grid.x_math_max){
            x_math += delta_x;

            // console.log(x_math);

            y_math = a_function(x_math);
            xy_math = new Class_Vector(x_math, y_math);
            xy_grid = xy_grid_from_math(xy_math);

            context.lineTo(xy_grid.x, xy_grid.y);
        }
        context.strokeStyle = a_color;
        context.lineWidth = a_lineWidth;
        context.lineJoin = "round";
        context.stroke();
    context.restore();
}

function plot_scatter(array_x_math, array_y_math, a_color="Black", a_radius=3){
    array_x_math.forEach((x_math, index)=>{
        var y_math = array_y_math[index];
        
        draw_point_at(x_math, y_math, a_color, a_radius);
    });
}

function plot_bar(array_y_math, x_math_first, bar_separation_math=1, fraction_bar_width=1, a_color="Blue"){
    // x_first is the x of the middle of the first (leftmost) bar.
    // fraction_bar_width is any number between 0 and 1.

    var bar_separation_grid = bar_separation_math * grid.factor_grid_from_math.x
    var bar_width_grid = bar_separation_grid * Math.min(fraction_bar_width, 1);

    var x_grid_first = x_math_first * grid.factor_grid_from_math.x;

    context.save();
        context.translate(x_grid_first, 0);
        context.fillStyle = a_color;
            array_y_math.forEach(y_math => {
                var y_grid = y_math * grid.factor_grid_from_math.y;
                context.fillRect(-bar_width_grid/2, 0, bar_width_grid, y_grid);

                context.translate(bar_separation_grid, 0);
            });
    context.restore();
}

function plot_histogram_original(array_data, bar_width_grid=50, a_color="Red"){
    // This is different from plot_bar in that it counts how many are the same in array_data.

    var dictionary_count = {};
    
    array_data.forEach(data => {
        if (data in dictionary_count){
            dictionary_count[data]++;
        } else {
            dictionary_count[data] = 1;
        }
    });

    // console.log(dictionary_count);

    context.save();
        context.fillStyle = a_color;

        for (var x_math in dictionary_count){
            var y_grid = dictionary_count[x_math] * grid.factor_grid_from_math.y;
            var x_grid = x_math * grid.factor_grid_from_math.x;
            // console.log(x_math);

            context.fillRect(x_grid - bar_width_grid/2, 0, bar_width_grid, y_grid);
        }
    context.restore();

} 

function plot_histogram(array_data, x_min_math, x_max_math, bin_width_math, fraction_bar_width=0.8, a_color="Blue"){
    var array_count = [];
    var count_bin = Math.ceil((x_max_math - x_min_math) / bin_width_math);

    for (let index_bin=0; index_bin<=count_bin; index_bin++){
        array_count.push(0);
    }

    array_data.forEach(data => {
        let index_bin = Math.floor((data - x_min_math) / bin_width_math);
        array_count[index_bin]++;
    });

    console.log(array_count);

    context.save();
        context.fillStyle = a_color;
        array_count.forEach((count, index_bin)=>{
            let x_left_grid = (x_min_math + bin_width_math * index_bin + (1 - fraction_bar_width) * bin_width_math / 2) * grid.factor_grid_from_math.x;
            let bar_width_grid = fraction_bar_width * bin_width_math * grid.factor_grid_from_math.x;
            let y_grid = count * grid.factor_grid_from_math.y;
            context.fillRect(x_left_grid, 0, bar_width_grid, y_grid);
        });
    
    context.restore();


}

function make_array_evenly_spaced(x_min, x_max, count_element){
    // Put count_element numbers in an array from x_min to x_max (inclusive)
    var array_evenly_spaced = [];
    var x_delta = (x_max - x_min) / (count_element - 1);
    // var x = x_min;
    for (let i=0; i<count_element; i++){
        array_evenly_spaced.push(x_delta*i+x_min);
        // x += space_between_each_element;
    }

    return array_evenly_spaced;
}

function make_array_y_with_function(array_x, function_y_from_x){
    // function_y_from_x is a function that computes a single y from each x
    var array_y = [];
    array_x.forEach(x => {
        let y = function_y_from_x(x);
        array_y.push(y);
    });
    return array_y;
}


function average_of_array(a_array){
    // var sum = 0;
    // a_array.forEach(element => {
    //     sum += element;
    // });
    // return sum / a_array.length;

    return a_array.reduce((sum, x)=>{return sum + x}, 0) / a_array.length;


}

function variance_of_array(a_array){
    var x_mean = average_of_array(a_array);

    // var sum = 0;
    // a_array.forEach(x => {
    //     let x_delta = x - x_mean;
    //     sum += x_delta * x_delta;
    // });

    // return sum / a_array.length;

    return a_array.reduce((sum, x)=>{return sum + (x - x_mean)*(x - x_mean)}, 0) / a_array.length;
}

function variance_of_array_2(a_array){
    var x_mean = average_of_array(a_array);

    // var a_array_squared = [];
    // a_array.forEach(x => {
    //     a_array_squared.push(x*x);
    // });

    var a_array_squared = a_array.map((x)=>{return x*x});

    return average_of_array(a_array_squared) - x_mean * x_mean;
}

function variance_of_array_3(a_array){
    var x_mean = average_of_array(a_array);

    var a_array_difference_squared = a_array.map((x)=>{return (x-x_mean)*(x-x_mean)});

    return average_of_array(a_array_difference_squared);



}

function variance_of_array_4(a_array){
    var x_mean = average_of_array(a_array);

    var a_array_difference = a_array.map((x)=>{return x-x_mean});

    return average_of_array_xy(a_array_difference, a_array_difference);
}

function average_of_array_xy(a_array_x, a_array_y){
    var array_xy = [];

    for(let i = 0; i<a_array_x.length; i++){
        array_xy.push(a_array_x[i]*a_array_y[i]);
    }

    // a_array_x.forEach((x, index)=>{
    //     array_xy.push(x*a_array_y[index]);
    // });

    return average_of_array(array_xy);
}

function correlation_of_array_xy(a_array_x, a_array_y){
    var x_mean = average_of_array(a_array_x);
    var y_mean = average_of_array(a_array_y);
    var array_xy = [];

    for(let i = 0; i<a_array_x.length; i++){
        let x_delta = a_array_x[i] - x_mean;
        let y_delta = a_array_y[i] - y_mean;

        array_xy.push(x_delta*y_delta);
    }
    
    var numerator = average_of_array(array_xy);
    var denominator = Math.sqrt(variance_of_array(a_array_x) * variance_of_array(a_array_y));

    return numerator / denominator;
}

function slope_of_best_fit(a_array_x, a_array_y){
    return (average_of_array_xy(a_array_x, a_array_y) - average_of_array(a_array_x) * average_of_array(a_array_y)) / variance_of_array(a_array_x);
}

function y_intercept_of_best_fit(a_array_x, a_array_y){
    return average_of_array(a_array_y) - slope_of_best_fit(a_array_x, a_array_y) * average_of_array(a_array_x);
}

function error_of_best_fit(a_array_x, a_array_y){
    var function_of_best_fit = make_function_of_best_fit(a_array_x, a_array_y);
    var array_y_difference = [];
    a_array_x.forEach((x, index) => {
        let y = a_array_y[index];
        let y_predict = function_of_best_fit(x);
        array_y_difference.push(y - y_predict);
    });

    var error = average_of_array_xy(array_y_difference, array_y_difference);

    console.log(`error of best fit = ${error}`);
    return error;
}

function error_of_y_mean(a_array_x, a_array_y){
    var array_y_difference = [];
    var y_mean = average_of_array(a_array_y);

    a_array_y.forEach(y => {
        array_y_difference.push(y - y_mean);
    });

    var error = average_of_array_xy(array_y_difference, array_y_difference);

    console.log(`error of the "epitome of stupidity" fit = ${error}`);
    return error;
}

function caluculate_r_squared(a_array_x, a_array_y){
    var r_squared = 1 - error_of_best_fit(a_array_x, a_array_y) / error_of_y_mean(a_array_x, a_array_y);

    console.log(`R^2 = ${r_squared}`);
    return r_squared;
}


//**********************************************************************************************//
// COORDINATE TRANSFORMATION                                                                    //
// xy_canvas is measured from the top left corner (x points right, y points down)               //
// xy_bottom_left is measured from the bottom left corner (x points right, y points up)         //
// xy_grid is measured from the grid origin (x points right, y points up)                       //
// xy_math is the actual values being plotted                                                   //
//                                                                                              //
//**********************************************************************************************//

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

function xy_math_from_grid(a_xy_grid){
    return new Class_Vector(a_xy_grid.x*grid.factor_math_from_grid.x, a_xy_grid.y*grid.factor_math_from_grid.y);
}

function xy_math_from_canvas(a_xy_canvas){
    return xy_math_from_grid(xy_grid_from_bottom_left(xy_bottom_left_from_canvas(a_xy_canvas)));
}





function make_function_of_best_fit(a_array_x, a_array_y){
    var m = slope_of_best_fit(a_array_x, a_array_y);
    var c = y_intercept_of_best_fit(a_array_x, a_array_y);

    console.log(`m = ${m}`);
    console.log(`c = ${c}`);

    return (x)=>{return m*x+c};
}