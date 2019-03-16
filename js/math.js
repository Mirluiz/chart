/**
 * Created by Zeynal on 3/10/2019.
 */

let currentTransform = null;

function getYRatio(maxY) {
    return (getCanvasMaxHeight()-previewFieldHeight - 40)/maxY;
}

function getPreviewYRatio(maxY) {
    return (selection.object.end.y - selection.object.begin.y)/maxY;
}

function getXRatio(length, from, to) {
    return (to - from)/length;
}

function editorToWorld(x, y) {

    let ret = new Coord(x, y);
    ret.x = (x -  currentTransform.xOffset) / currentTransform.xRatio;
    ret.y = y * currentTransform.yRatio;

    return ret;
}

function editorToPreview(x, y) {

    let ret = new Coord(x, y);
    ret.y = (y)*currentTransform.prevYRatio + previewOffset;

    return ret;
}

function getMaxValueY(data) {
    let ret = 0;

    for (let val of data) {
        let maxValue = 0;
        if(graphVertexs[1]){
            if(!graphVertexs[0].draw){
                maxValue = maxVal(val.columns[2]);
            } else if(!graphVertexs[1].draw){
                maxValue = maxVal(val.columns[1]);
            } else {
                maxValue = maxVal([maxVal(val.columns[1]), maxVal(val.columns[2])]);
            }
        } else {
            maxValue = maxVal([maxVal(val.columns[1]), maxVal(val.columns[2])]);
        }

        if (ret < maxValue) ret = maxValue;
    }

    return ret;
}



function getTimeStampRatio( data, graphWidth) {
    return (data[0].columns[0][data[0].columns[0].length - 1] - data[0].columns[0][1])/graphWidth;
}

function setTransform(data) {

    let graphLength, graphWidth;

    graphLength = getMaxValueY(data);
    graphWidth = data[0].columns[0].length;

    // let xRatio = getXRatio(graphWidth, selection.object.begin.x, selection.object.end.x);
    let xRatio = getXRatio(getCanvasMaxWidth(), selection.object.begin.x, selection.object.end.x);
    let yRatio = getYRatio(graphLength);

    let prevYRatio = getPreviewYRatio(graphLength);
    let timeStampRatio = getTimeStampRatio(data, getCanvasMaxWidth());

    if (!currentTransform){
        checkTransform();
    }

    currentTransform.xOffset = selection.object.begin.x;
    currentTransform.xRatio = xRatio;
    currentTransform.yRatio = yRatio;
    currentTransform.prevYRatio = prevYRatio;
    currentTransform.timeStapmRation = timeStampRatio;

    getDivisionXAxis(selection.object.begin.x, selection.object.end.x);


    reDrawYAxisValue(graphLength);
}

function checkTransform(transform = null) {
    if (transform) {
        currentTransform = Object.assign({}, transform);
    }
    if (!currentTransform) {
        currentTransform = Object.assign({}, defaultTransform);
    }
}