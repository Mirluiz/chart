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
    drawAllPreviewLine();
    drawAllGraphLine();
    drawPreviewSection();

    drawAllGraphVertex();
    // drawAllPreviewVertex();

    drawScene();


    showStaticInfo(focus, mousePos);


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


    for(let i = 0; i < graphVertexs[0].object.length; i++){
        let o = Object.assign({}, defaultFocus);
        if(Math.abs(x - editorToWorld(graphVertexs[0].object[i].point.x, graphVertexs[0].object[i].point.y).x) < 3){
            o.type = 'infoBar';
            o.info = graphVertexs[0].object[i].info;
            o.object = graphVertexs[0].object[i].point;
            ret.push(o);
            break;
        }
    }
    for(let i = 0; i < graphVertexs[1].object.length; i++){
        let o = Object.assign({}, defaultFocus);
        if(Math.abs(x - editorToWorld(graphVertexs[1].object[i].point.x, graphVertexs[1].object[i].point.y).x) < 3){
            o.type = 'infoBar';
            o.info = graphVertexs[1].object[i].info;
            o.object = graphVertexs[1].object[i].point;
            ret.push(o);
            break;
        }
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




function toggleGraph() {
    if($(this).prop('checked')) {
        if($(this).attr('id') == 'joined'){
            graphVertexs[0].draw = true
        } else {
            graphVertexs[1].draw = true
        }
    } else {
        if($(this).attr('id') == 'joined'){
            graphVertexs[0].draw = false;
            // reDrawYAxisValue(maxVal(graphData[0].columns[2]));
        } else {
            graphVertexs[1].draw = false;
            // reDrawYAxisValue(maxVal(graphData[0].columns[1]))
        }
    }

    setTransform(graphData)
    // if ($('#joined').prop('checked')) {
    //     reDrawYAxisValue(maxVal(graphData[0].columns[1]))
    // } else {
    //     reDrawYAxisValue(maxVal(graphData[0].columns[2]))
    // }

}