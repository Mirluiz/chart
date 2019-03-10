/**
 * Created by Zeynal on 3/10/2019.
 */


var focusedObjects = [];

function clearCanvas(){
    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');

    let canvasWidth = canv.width;
    let canvasHeight = canv.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function redrawAll(){

    clearCanvas();
    drawFields();
    drawFieldsValuesY();
    drawFieldsValuesX();
    drawPreviewGraph();

}


function updateFocusedObjects( x, y) {

    _tc({Number: x});
    _tc({Number: y});

    redrawAll();

    let objs = [];
    objs = objs.concat(getSelectionInFocus(x, y));

    focusedObjects = objs;

    changeCursor();
}

function getSelectionInFocus(x, y){

    _tc({Number: x});
    _tc({Number: y});
    let ret = [];

    if ( y > selection.begin.y && y < selection.end.y && ( x > selection.begin.x - 10 && x < selection.end.x + 10)) {
        let o = Object.assign({}, defaultFocusedObject);

        o.type = 'selection';
        if (Math.abs(selection.begin.x - x) < 10) {
            o.border = true;
            o.side = 'left';
        } else if (Math.abs(selection.end.x - x) < 10) {
            o.border = true;
            o.side = 'right';
        } else if (x > selection.begin.x && x < selection.end.x ) {
            o.border = false;
            o.side = 'center';
        }

        ret.push(o);
    }

    return ret;
}

