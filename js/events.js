/**
 * Created by Zeynal on 3/10/2019.
 */


let mousePos = new Coord(0, 0);

function mouseMoveHandler(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    mousePos.x = x;
    mousePos.y = y;


    let coor = new Coord(x, y);


    updateFocusedObjects(coor.x, coor.y);


}



function mouseClickHandler(e) {
    let x = e.offsetX;
    let y = e.offsetY;
}