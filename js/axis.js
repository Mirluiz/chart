/**
 * Created by Zeynal on 3/10/2019.
 */

let axis_Y_step = 100;
let axis_X_step = 100;
let maxStepValue = 500;

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

    let line = new Line(new Coord(0, _Y_ReverseMainGraph(40)), new Coord(canvasWidth, _Y_ReverseMainGraph(40)));

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
function drawFieldsValuesY(){
    getDivisionYAxis(maxStepValue);

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
    getDivisionXAxis(3,15);

    let canv = document.getElementById(drawArea);
    let pos = new Coord(axis_X_step/2, 0);

    let canvasHeight = canv.height;

    let line = new Line(new Coord(10, 0), new Coord(10, canvasHeight));

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
    let value = to - from;

    let fieldDiff = Math.floor(value/5);

    let stepValue = 0;

    let i_cnt = 0;
    let i_max = 6;

    while (i_cnt < i_max) {

        let day = from + stepValue;

        let neededTime = getTime(day);
        let month = monthEngNames[neededTime.getMonth()];
        let monthDay = neededTime.getDate();
        xAxisSteps.push(month + " " + monthDay);
        stepValue += fieldDiff;
        i_cnt++;
    }
}