class Class_Grid extends Class_Sprite{
    constructor(canvas, context, a_axis_title_x="title_x", a_axis_title_y="title_y", origin_x=40, origin_y=40, color="Black"){
        // x and y are measured with respect to the bottom left corner of the canvas in pixels
        super(canvas, context, origin_x, origin_y, canvas.width, canvas.height, color);

        this.axis_title_x = a_axis_title_x;
        this.axis_title_y = a_axis_title_y;

        this.tick_separation_math = new Class_Vector(1, 1); 
        this.tick_separation_grid = new Class_Vector(50, 50);

        this.precision = new Class_Vector(1, 1);
    }

    get origin(){
        return new Class_Vector(this.x, this.y);
    }

    set origin(a_origin){
        this.x = a_origin.x;
        this.y = a_origin.y;
    }

    get origin_x(){
        return this.x;
    }

    set origin_x(a_origin_x){
        this.x = a_origin_x;
    }

    get origin_y(){
        return this.y;
    }

    set origin_y(a_origin_y){
        this.y = a_origin_y;
    }


    get x_grid_min(){
        return -this.x;
    }
    get x_grid_max(){
        return this.canvas.width - this.x;
    }
    get y_grid_min(){
        return -this.y;
    }
    get y_grid_max(){
        return this.canvas.height - this.y;
    }

    get x_math_min(){
        return this.x_grid_min * this.factor_math_from_grid.x;
    }
    get x_math_max(){
        return this.x_grid_max * this.factor_math_from_grid.x;
    }
    get y_math_min(){
        return this.y_grid_min * this.factor_math_from_grid.y;
    }
    get y_math_max(){
        return this.y_grid_max * this.factor_math_from_grid.y;
    }

    get corner_bottom_left_in_grid_coordinate(){
        return new Class_Vector(this.x_grid_min, this.y_grid_min);
    }

    get corner_top_right_in_grid_coordinate(){
        return new Class_Vector(this.x_grid_max, this.y_grid_max);
    }

    get factor_grid_from_math(){
        return new Class_Vector(this.tick_separation_grid.x/this.tick_separation_math.x, this.tick_separation_grid.y/this.tick_separation_math.y);
    }

    get factor_math_from_grid(){
        return new Class_Vector(this.tick_separation_math.x/this.tick_separation_grid.x, this.tick_separation_math.y/this.tick_separation_grid.y);
    }

    draw(){
        this.draw_grid();
        this.draw_axis();
        this.draw_axis_title();
    }

    draw_axis(){
        context.save();
            context.beginPath();
            context.moveTo(this.x_grid_min, 0);
            context.lineTo(this.x_grid_max, 0);

            context.moveTo(0, this.y_grid_min);
            context.lineTo(0, this.y_grid_max);
            context.lineWidth = 3;
            context.strokeStyle = this.color;
            context.stroke();
        context.restore();
    }

    draw_axis_title(){
        // x-axis title
        context.save();
            context.translate(this.x_grid_max/2, -23);
            context.scale(1, -1);
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = "15px Arial";
            context.fillText(this.axis_title_x, 0, 0);
        context.restore();

        // y-axis title
        context.save();
            context.translate(-23, this.y_grid_max/2);
            context.rotate(Math.PI / 2);
            context.scale(1, -1);
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = "15px Arial";
            context.fillText(this.axis_title_y, 0, 0);
        context.restore();
    }

    draw_grid(){
        // Vertical Grid <--


        // var x_grid = 0;

        // while(x_grid < this.x_grid_max){
        //     this.draw_one_vertical_grid_line(x_grid);
        //     x_grid += this.tick_separation_grid.x;
        // }

        // while(x_grid > this.x_grid_min){
        //     this.draw_one_vertical_grid_line(x_grid);
        //     x_grid -= this.tick_separation_grid.x;
        // }

        var n = Math.floor(this.x_grid_min / this.tick_separation_grid.x);
        var x_grid = n * this.tick_separation_grid.x;
        while(x_grid <= this.x_grid_max){
            this.draw_one_vertical_grid_line(x_grid);

            if (n != 0){
                context.save();
                    context.translate(x_grid, 0);
                    context.scale(1, -1);
                    context.textBaseline = "top";
                    context.textAlign = "center";
                    context.translate(0, 2);
                    context.fillText((n*this.tick_separation_math.x).toFixed(this.precision.x), 0, 0);
                context.restore();
            }

            n++;
            x_grid = n * this.tick_separation_grid.x;
        }

        // Horizontal Grid <--

        n = Math.floor(this.y_grid_min / this.tick_separation_grid.y);
        var y_grid = n * this.tick_separation_grid.y;
        while(y_grid <= this.y_grid_max){
            this.draw_one_horizontal_grid_line(y_grid);
            
            if(n != 0){
                context.save();
                    context.translate(0, y_grid);
                    context.scale(1, -1);
                    context.textBaseline = "middle";
                    context.textAlign = "right";
                    context.translate(-3, 0);
                    context.fillText((n*this.tick_separation_math.y).toFixed(this.precision.y), 0, 0);
                context.restore();
            }

            n++;
            y_grid = n * this.tick_separation_grid.y;
        }
    }

    draw_one_vertical_grid_line(a_x_grid){
        context.save();
            context.beginPath();
            context.moveTo(a_x_grid, this.y_grid_min);
            context.lineTo(a_x_grid, this.y_grid_max);
            context.strokeStyle = "White";
            context.lineWidth = 2;
            context.stroke();
        context.restore();
    }

    draw_one_horizontal_grid_line(a_y_grid){
        context.save();
            context.beginPath();
            context.moveTo(this.x_grid_min, a_y_grid);
            context.lineTo(this.x_grid_max, a_y_grid);
            context.strokeStyle = "White";
            context.lineWidth = 2;
            context.stroke();
        context.restore();
    }
}

