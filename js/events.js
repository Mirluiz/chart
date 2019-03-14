/**
 * Created by Zeynal on 3/10/2019.
 */


let mousePos = new Coord(0, 0);
let mouseClickPos = new Coord(0, 0);

function mouseMoveHandler(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    let coor = new Coord(x, y);
    updateFocusedObjects(coor.x, coor.y);

    mousePos.x = x;
    mousePos.y = y;

    previewMoveHandler(x, y);

    e.preventDefault();
}



function mouseMouseDown(e) {

    let x = e.offsetX;
    let y = e.offsetY;

    let coor = new Coord(x, y);
    updateFocusedObjects(coor.x, coor.y);

    mouseClickPos.x = x;
    mouseClickPos.y = y;

    previewClickHandler(x, y);
    // mainGraphClickHandler(x, y);
}

function mouseMouseUp(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    let coor = new Coord(x, y);



    previewClickHandler(x, y, true);
}