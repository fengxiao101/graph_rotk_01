class Class_Sprite{
    constructor(canvas, context, x=0, y=0, width=30, height=30, color="Black"){
        this.canvas = canvas;
        this.context = context;

        this.position = new Class_Vector(x, y);
        this.velocity = new Class_Vector();

        this.angle = 0;
        this.angular_velocity = 0;     // Should be around 0.001 for smooth spinning

        this.width = width;
        this.height = height;

        this.color = color;
        this.strokeStyle = "Black";

        this.array_updater = [];

    }

    get x(){
        return this.position.x;
    }

    set x(a_x){
        this.position.x = a_x;
    }

    get y(){
        return this.position.y;
    }

    set y(a_y){
        this.position.y = a_y;
    }

    get v_x(){
        return this.velocity.x;
    }

    set v_x(a_v_x){
        this.velocity.x = a_v_x;
    }

    get v_y(){
        return this.velocity.y;
    }

    set v_y(a_v_y){
        this.velocity.y = a_v_y;
    }

    update(time_delta){
        // this.x = this.x + this.v_x * time_delta;
        // this.y = this.y + this.v_y * time_delta;


        this.array_updater.forEach(a_updater => {
            a_updater.update(this, time_delta);
        });

    }

    draw(){
        var context = this.context;
        
        context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);

            context.fillStyle = this.color;
            context.strokeStyle = this.strokeStyle;
            context.lineWidth = 2;
            context.fillRect(-this.width/2, -this.height/2, this.width, this.height);
            context.strokeRect(-this.width/2, -this.height/2, this.width, this.height);

            // context.beginPath();
            // context.arc(0, 0, this.width/2, 0, 2 * Math.PI);
            // context.fill();
        context.restore();

        // console.log("drawing");
    }

    add_updater(a_updater){
        this.array_updater.push(a_updater);
    }


}