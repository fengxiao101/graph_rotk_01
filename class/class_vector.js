var Enum_Vector_Direction = {
    none: 0,
    e: 1,
    se: 2,
    s: 3,
    sw: 4,
    w: 5,
    nw: 6,
    n: 7,
    ne: 8
}


class Class_Vector{
    constructor(x=0, y=0){
        this.x = x;
        this.y = y;
    }

    get magnitude(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    clone(){
        return new Class_Vector(this.x, this.y);
    }

    plus(a_vector){
        return new Class_Vector(this.x + a_vector.x, this.y + a_vector.y);
    }

    minus(a_vector){
        return new Class_Vector(this.x - a_vector.x, this.y - a_vector.y);
    }

    times_scalar(a_scalar){
        return new Class_Vector(this.x * a_scalar, this.y * a_scalar);
    }

    divide_scalar(a_scalar){
        return this.times_scalar(1 / a_scalar);
    }

    dot(a_vector){
        return this.x * a_vector.x + this.y * a_vector.y;
    }

    unit_vector(){
        return this.divide_scalar(this.magnitude);
    }

    project_onto(a_vector){
        // a_vector may not be a unit vector
        var u_hat = a_vector.unit_vector();
        return u_hat.times_scalar(this.dot(u_hat));
    }

}