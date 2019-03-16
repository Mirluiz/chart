/**
 * Created by Zeynal on 3/10/2019.
 */

let previewFieldHeight = null;

let leftBlur, rightBlur, selection;

let selectionBorder = 4;
let previewOffset = 25;
let borderOffset = 10;


let centerBorderedRect, leftBorderVerticalRect, rightBorderVerticalRect;


function previewMoveHandler() {

    if(selection.update){
        selection.updateFunction();
        setTransform(graphData);
    }
}


function drawPreviewGraph(vertex) {
    if(!vertex)return;

    let valuePos = editorToPreview(vertex.x, vertex.y);

    // drawFillCircle(1, valuePos, 'black');


    drawStrokeCircle(3, valuePos, 'black');
}


function drawAllPreviewVertex() {
    if(graphVertexs.length < 1) return;

    for (let graph of graphVertexs) {

        if(!graph.draw)continue;

        let i_cnt = 0;
        let i_max = graph.object.length;

        while (i_cnt < i_max) {
            drawPreviewGraph(graph.object[i_cnt].point);
            i_cnt++;
        }

    }
}


function drawAllPreviewLine() {
    if(graphVertexs.length < 1) return;

    for (let graph of graphVertexs) {

        if(!graph.draw)continue;

        let i_cnt = 0;
        let i_max = graph.object.length;

        while (i_cnt < i_max - 1) {
            let begin = editorToPreview(graph.object[i_cnt].point.x, (graph.object[i_cnt].point.y));
            let end = editorToPreview(graph.object[i_cnt+1].point.x, (graph.object[i_cnt+1].point.y));
            begin.y = _Y_Reverse(begin.y);
            end.y = _Y_Reverse(end.y);
            let line = new Line(begin, end);
            drawLine(line, 3, graph.color);
            i_cnt++;
        }

    }
}

function previewClickHandler(x, y, isUp = false) {

    if(isUp){
        selection.update = false;
        return;
    }

    if(focus[0] && focus[0].type=='selection' && !focus[0].border){

        selection.update = true;

        let diffBegin = mousePos.x - selection.object.begin.x;
        let diffEnd = selection.object.end.x - mousePos.x;

        selection.setUpdate(function () {
            this.object.begin.x = mousePos.x - diffBegin;
            this.object.end.x = mousePos.x + diffEnd;

            centerBorderedRect.object.begin.x =  mousePos.x  - diffBegin;
            centerBorderedRect.object.end.x = mousePos.x + diffEnd;

            rightBlur.object.begin.x = selection.object.end.x - borderOffset/2;
            updateBlurs();

        });
    } else if(focus[0]&&focus[0].type == 'selection'&&focus[0].border) {

        selection.update = true;

        if (focus[0].side == 'left') {
            selection.setUpdate(function () {

                this.object.begin.x = mousePos.x;
                centerBorderedRect.object.begin.x = mousePos.x;
                // this.object.end.x = mousePos.x + (this.object.end.x - this.object.begin.x);

                leftBlur.object.end.x = selection.object.begin.x - borderOffset/2;


                updateBlurs();

            });

        } else {
            selection.setUpdate(function () {

                // this.object.begin.x = mousePos.x - (this.object.end.x - this.object.begin.x);
                this.object.end.x = mousePos.x ;
                centerBorderedRect.object.end.x = mousePos.x ;

                rightBlur.object.begin.x = selection.object.end.x - borderOffset/2;


                updateBlurs();

            });

        }
    }
}



function initPreview() {
    // getPrewRects();
    previewSelectionForms();
}





function previewSelectionForms() {

    centerBorderedRect = new Mesh(Rectangular.copy(selection.object), 'rect');
    leftBorderVerticalRect = new Mesh(Rectangular.createDefault(), 'rect');
    rightBorderVerticalRect = new Mesh(Rectangular.createDefault(), 'rect');

    centerBorderedRect.object.begin.y += selectionBorder/2;
    centerBorderedRect.object.end.y -= selectionBorder/2;

    updateBlurs();

}

function updateBlurs() {

    leftBorderVerticalRect.object.begin.x  = selection.object.begin.x - borderOffset/2;
    leftBorderVerticalRect.object.begin.y  = selection.object.begin.y;
    leftBorderVerticalRect.object.end.x  = selection.object.begin.x + borderOffset/2;
    leftBorderVerticalRect.object.end.y  = selection.object.end.y;

    rightBorderVerticalRect.object.begin.x  = selection.object.end.x - borderOffset/2;
    rightBorderVerticalRect.object.begin.y  = selection.object.begin.y;
    rightBorderVerticalRect.object.end.x  = selection.object.end.x + borderOffset/2;
    rightBorderVerticalRect.object.end.y  = selection.object.end.y;
}



function drawPreviewFieldLeftToSelection() {
    leftBlur.object.end.x = selection.object.begin.x - borderOffset/2;
    drawFillRect(leftBlur.object, telegramPreviewFieldBlue);
}
function drawPreviewFieldRightToSelection() {
    rightBlur.object.begin.x = selection.object.end.x + borderOffset/2;
    drawFillRect(rightBlur.object, telegramPreviewFieldBlue);
}
function drawPreviewSelection() {

    drawStrokeRect(centerBorderedRect.object, selectionBorder,  telegramPreviewFieldBlueDarker);
    drawFillRect(leftBorderVerticalRect.object,  telegramPreviewFieldBlueDarker);
    drawFillRect(rightBorderVerticalRect.object,  telegramPreviewFieldBlueDarker);

}

function drawPreviewSection() {
    drawPreviewFieldLeftToSelection();
    drawPreviewFieldRightToSelection();
    drawPreviewSelection();
}







function getPrewRects() {

    leftBlur = new Mesh(Rectangular.createDefault(), 'rect');
    selection = new Mesh(Rectangular.createDefault(), 'rect');
    rightBlur = new Mesh(Rectangular.createDefault(), 'rect');

    let canv = document.getElementById(drawArea);

    leftBlur.object.begin.y = _Y_Reverse(previewFieldHeight - previewOffset);
    leftBlur.object.end.y = _Y_Reverse(previewOffset);

    rightBlur.object.begin.y = _Y_Reverse(previewFieldHeight - previewOffset);
    rightBlur.object.end.y = _Y_Reverse(previewOffset);
    rightBlur.object.end.x = canv.width;

    selection.object.begin.y = _Y_Reverse(previewFieldHeight - previewOffset);
    selection.object.end.y = _Y_Reverse(previewOffset);

    selection.object.begin.x = 200;
    selection.object.end.x = 400;
}


function getPreviewFieldHeight() {
    let canv = document.getElementById(drawArea);
    let height = canv.height;
    previewFieldHeight = height*.17;
    getPrewRects();
}







