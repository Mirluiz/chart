/**
 * Created by Zeynal on 3/10/2019.
 */

let previewFieldHeight = null;

let leftBlur = Rectangular.createDefault();
let rightBlur = Rectangular.createDefault();
let selection = Rectangular.createDefault();
let selectionBorder = 4;

let borderOffset = 10;

function drawPreviewFieldLeftToSelection() {
    leftBlur.end.x = selection.begin.x - borderOffset/2;
    drawFilledRect(leftBlur, telegramPreviewFieldBlue);
}
function drawPreviewFieldRightToSelection() {
    rightBlur.begin.x = selection.end.x + borderOffset/2;
    drawFilledRect(rightBlur, telegramPreviewFieldBlue);
}
function drawPreviewSelection() {

    let selectionArea = Rectangular.copy(selection);

        selectionArea.begin.y += selectionBorder/2
        selectionArea.end.y -= selectionBorder/2

    drawStrokedRect(selectionArea, selectionBorder,  telegramPreviewFieldBlueDarker);

    let leftBorderVerticalRect = Rectangular.createDefault();
        leftBorderVerticalRect.begin.x  = selection.begin.x - borderOffset/2;
        leftBorderVerticalRect.begin.y  = selection.begin.y;
        leftBorderVerticalRect.end.x  = selection.begin.x + borderOffset/2;
        leftBorderVerticalRect.end.y  = selection.end.y;

    drawFilledRect(leftBorderVerticalRect,  telegramPreviewFieldBlueDarker);

    let rightBorderVerticalRect = Rectangular.createDefault();
        rightBorderVerticalRect.begin.x  = selection.end.x - borderOffset/2;
        rightBorderVerticalRect.begin.y  = selection.begin.y;
        rightBorderVerticalRect.end.x  = selection.end.x + borderOffset/2;
        rightBorderVerticalRect.end.y  = selection.end.y;

    drawFilledRect(rightBorderVerticalRect,  telegramPreviewFieldBlueDarker);

}


function drawPreviewGraph() {
    drawPreviewFieldLeftToSelection();
    drawPreviewFieldRightToSelection();
    drawPreviewSelection();
}







function getPrewRects() {

    let canv = document.getElementById(drawArea);


    leftBlur.begin.y = _Y_Reverse(previewFieldHeight - 10);
    leftBlur.end.y = _Y_Reverse(10);

    rightBlur.begin.y = _Y_Reverse(previewFieldHeight - 10);
    rightBlur.end.y = _Y_Reverse(10);
    rightBlur.end.x = canv.width;

    selection.begin.y = _Y_Reverse(previewFieldHeight - 10);
    selection.end.y = _Y_Reverse(10);

    selection.begin.x = 200;
    selection.end.x = 400;
}


function getPreviewFieldHeight() {
    let canv = document.getElementById(drawArea);

    let width = canv.width;
    let height = canv.height;

    previewFieldHeight = height*.15;

    getPrewRects();
}