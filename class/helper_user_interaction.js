function setup_event_listener(canvas){
    //This function must be called after the canvas is set up.
    canvas.tabIndex = 0;     // Needed to recieve events
    // document.addEventListener("keydown", handle_keydown);
    document.addEventListener("keyup", handle_keyup);
    canvas.addEventListener("mouseup", handle_mouse_up);
}

function handle_keyup(event_keyup){
    event_keyup.preventDefault();

    if (event_keyup.code == "ArrowLeft"){
        console.log("All my arrows left me!");

    } else if (event_keyup.code == "ArrowRight"){
        console.log("An arrow went right into your heart!");
    }
}

function handle_mouse_up(event_mouse_up){
    // console.log("Mouse uuouououououou....p");
    // let position_in_canvas = position_in_canvas_from_position_in_window(event_mouse_up.clientX, event_mouse_up.clientY);
    // console.log(position_in_canvas);

    let [x_canvas, y_canvas] = position_in_canvas_from_position_in_window(event_mouse_up.clientX, event_mouse_up.clientY);
    // console.log(`x_canvas: ${x_canvas}, y_canvas: ${y_canvas}`);

    let xy_canvas = new Class_Vector(x_canvas, y_canvas);
    let xy_math = xy_math_from_canvas(xy_canvas);

    console.log(`x_math: ${xy_math.x}, y_math: ${xy_math.y}`);
}

function position_in_canvas_from_position_in_window(a_position_in_window_x, a_position_in_window_y){
    let bound_rectangle = canvas.getBoundingClientRect();

    let position_in_canvas_x = a_position_in_window_x - bound_rectangle.left * (canvas.width / bound_rectangle.width);
    let position_in_canvas_y = a_position_in_window_y - bound_rectangle.top * (canvas.height / bound_rectangle.height);

    return [Math.round(position_in_canvas_x), Math.round(position_in_canvas_y)];
}
