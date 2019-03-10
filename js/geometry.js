/**
 * Created by Zeynal on 3/10/2019.
 */


let currentTransform = null;


class Coord {
    constructor(x, y) {

        _tc({Number: x});
        _tc({Number: y});

        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(begin, end) {

        _tc({Object: begin});
        _tc({Object: end});

        this.begin = begin;
        this.end = end;
    }

    copy(){
        return new Line(new Coord(this.begin.x, this.begin.y), new Coord(this.end.x, this.end.y))
    }
}

class Rectangular {
    constructor(begin, end) {

        _tc({Object: begin});
        _tc({Object: end});

        this.begin = begin;
        this.end = end;
    }

    static copy(rect){
        return new Rectangular(new Coord(rect.begin.x, rect.begin.y), new Coord(rect.end.x, rect.end.y))
    };

    static createDefault(){
        return new Rectangular(new Coord(0,  0), new Coord(0, 0))
    }
}


function dataToGraph(){

}




function updateTransform(transform = null) {
    if (transform) {
        currentTransform = Object.assign({}, transform);
    }
    if (!currentTransform) {
        currentTransform = Object.assign({}, defaultTransform);
    }

}
