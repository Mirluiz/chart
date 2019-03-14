/**
 * Created by Zeynal on 3/10/2019.
 */


let focus = [];


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
    drawPreviewSection();

    // drawAllGraphVertex();
    // drawAllPreviewVertex();

    drawAllPreviewLine();
    drawAllGraphLine();

    drawScene();
}


function updateFocusedObjects( x, y) {

    _tc({Number: x});
    _tc({Number: y});

    redrawAll();

    let objs = [];
    objs = objs.concat(getPreviewSelectionInFocus(x, y));
    objs = objs.concat(getMainGraphInFocus(x, y));

    focus = objs;

    changeCursor();
}

function getMainGraphInFocus(x, y){

    _tc({Number: x});
    _tc({Number: y});
    let ret = [];
    let vL =  scene.objects['vertLine'];
    if ( y < getCanvasMaxHeight() - previewFieldHeight - 40) {
        vL.draw = true;
        let o = Object.assign({}, defaultFocus);

        o.type = 'mainGraph';
        if (Math.abs(selection.object.begin.x - x) < 10) {
            o.border = true;
            o.side = 'left';
        } else if (Math.abs(selection.object.end.x - x) < 10) {
            o.border = true;
            o.side = 'right';
        } else if (x > selection.object.begin.x && x < selection.object.end.x ) {
            o.border = false;
            o.side = 'center';
        }

        ret.push(o);
    } else {
        vL.draw = false;
    }
    return ret;
}

function getPreviewSelectionInFocus(x, y){

    _tc({Number: x});
    _tc({Number: y});
    let ret = [];

    if ( y > selection.object.begin.y && y < selection.object.end.y && ( x > selection.object.begin.x - 10 && x < selection.object.end.x + 10)) {
        let o = Object.assign({}, defaultFocus);
        o.type = 'selection';
        if (Math.abs(selection.object.begin.x - x) < 10) {
            o.border = true;
            o.side = 'left';
        } else if (Math.abs(selection.object.end.x - x) < 10) {
            o.border = true;
            o.side = 'right';
        } else if (x > selection.object.begin.x && x < selection.object.end.x ) {
            o.border = false;
            o.side = 'center';
        }

        ret.push(o);
    }

    return ret;
}

