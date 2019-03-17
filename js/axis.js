/**
 * Created by Zeynal on 3/10/2019.
 */

let axis_Y_step = 100;
let axis_X_step = 100;
let maxYValue = null;

let yAxisSteps = [];
let xAxisSteps = [];


function setAxisSteps() {
    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');

    let canvasWidth = canv.width - 20; // - 20 offsets on edges
    let canvasHeight = canv.height - previewFieldHeight;

    axis_Y_step = Math.floor(canvasHeight/6);
    axis_X_step = Math.floor(canvasWidth/6);

}

/**
 *
 */
function drawFields(){

    let canv = document.getElementById(drawArea);
    let canvasWidth = canv.width;

    let line = new Line(new Coord(0, _Y_ReverseMainGraph(customOffset)), new Coord(canvasWidth, _Y_ReverseMainGraph(customOffset)));

    let fieldsAmount = 6;
    let i_cnt = 0;

    while(i_cnt < fieldsAmount){
        drawLine(line, 2, telegramFieldsGrey);

        line.begin.y -= axis_Y_step;
        line.end.y -= axis_Y_step;

        i_cnt++;
    }
}


/**
 *
 */

// getDivisionYAxis(maxStepValue);
function drawFieldsValuesY(){
    let canv = document.getElementById(drawArea);
    let canvasWidth = canv.width;
    let pos = new Coord(10, 50);

    for(let step of yAxisSteps){
        step = step.toString();
        drawText(step, pos, false, 20, 'Arial', 1, telegramTextGrey);
        pos.y += axis_Y_step;
    }
}

/**
 *
 */
function drawFieldsValuesX() {

    if(!currentTransform){
        checkTransform()
    }

    let stepRat = (axis_X_step - 20*currentTransform.xRatio)*currentTransform.xRatio;

    let pos = editorToWorld(stepRat/2, 0);
    // let pos = new Coord(pos.x*stepRat, 0);
    // console.log(pos.x);
    for(let step of xAxisSteps){
        step = step.toString();

        drawText(step, pos, true, 20, 'Arial', 1, telegramTextGrey);
        pos.x += axis_X_step;
    }

}





/**
 *
 * @param value
 */
function getDivisionYAxis(value) {

    _tc({Number: value});
    yAxisSteps = [];
    let fieldDiff = Math.floor(value/5);

    let stepValue = 0;

    let i_cnt = 0;
    let i_max = 6;

    while (i_cnt < i_max) {
        yAxisSteps.push(stepValue);
        stepValue += fieldDiff;

        i_cnt++;
    }
}


/**
 *
 * @param from
 * @param to
 */
function getDivisionXAxis(from, to) {

    _tc({Number: from});
    _tc({Number: to});

    xAxisSteps = [];

    let value = (to - from);
    // let fieldDiff = Math.floor(value/5);
    //
    // let stepValue = 0;
    // let i_cnt = 0;
    // let i_max = 6;

    let canvasW = getCanvasMaxWidth() - 20;
    let fieldDiff = Math.floor((value )/6);
    let stepValue =  fieldDiff/2;
    let i_cnt = 0;
    let i_max = Math.floor(canvasW/(value/7));

    while (i_cnt < i_max) {
        let day = stepValue;
        let neededTime = new Date();
            neededTime.setTime(day*currentTransform.timeStapmRation + graphData[0].columns[0][2]);
        let month = monthEngNames[neededTime.getMonth()];
        let monthDay = neededTime.getDate();
        xAxisSteps.push(month + " " + monthDay);
        stepValue += fieldDiff;
        i_cnt++;
    }
}


function reDrawYAxisValue(maxY) {
    maxYValue = maxY;
    currentTransform.yRatio = getYRatio(maxY);
    getDivisionYAxis(maxY);
}