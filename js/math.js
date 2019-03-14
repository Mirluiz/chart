/**
 * Created by Zeynal on 3/10/2019.
 */

let currentTransform = null;

function getYRatio(maxY) {
    // let yRatio = (getCanvasMaxHeight()-previewFieldHeight)/maxVal([maxVal(y0Arr), maxVal(y1Arr)]);
    let yRatio = (getCanvasMaxHeight()-previewFieldHeight - 40)/maxY;

    return yRatio;
}

function getPreviewYRatio(maxY) {
    // let yRatio = (getCanvasMaxHeight()-previewFieldHeight)/maxVal([maxVal(y0Arr), maxVal(y1Arr)]);
    let yRatio = (selection.object.end.y - selection.object.begin.y)/maxY;

    return yRatio;
}

function getXRatio(length, from, to) {

    let xRatio = (to - from)/length;

    return xRatio;
}

function editorToWorld(x, y) {
    var ret = new Coord(x, y);

    // ret.x = (x -  currentTransform.xOffset) * currentTransform.xRatio;
    // ret.x = (x/currentTransform.xRatio) + currentTransform.xOffset;

    return ret;
};

function editorToPreview(x, y) {
    let ret = new Coord(x, y);

    ret.y = (y/currentTransform.yRatio)*currentTransform.prevYRatio + previewOffset;

    // ret.x = (x -  currentTransform.xOffset) * currentTransform.xRatio;
    // ret.x = (x/currentTransform.xRatio) + currentTransform.xOffset;

    return ret;
}

function getMaxValueY(data) {
    let ret = 0;

    for (let val of data) {
        let maxValue = maxVal([maxVal(val.columns[1]), maxVal(val.columns[2])]);
        if (ret < maxValue) ret = maxValue;
    }

    return ret;

}

function setTransform(data) {

    let graphLength, graphWidth;

    graphLength = getMaxValueY(data);
    graphWidth = data[0].columns[0].length;

    let xRatio = getXRatio(graphWidth, selection.object.begin.x, selection.object.end.x);
    let yRatio = getYRatio(graphLength);
    let prevYRatio = getPreviewYRatio(graphLength);

    if (!currentTransform){
        updateTransform();
    }
    currentTransform.xOffset = -selection.object.begin.x;
    currentTransform.xRatio = xRatio;
    currentTransform.yRatio = yRatio;
    currentTransform.prevYRatio = prevYRatio;

}

function worldToEditor() {
}


function updateTransform(transform = null) {
    if (transform) {
        currentTransform = Object.assign({}, transform);
    }
    if (!currentTransform) {
        currentTransform = Object.assign({}, defaultTransform);
    }
}