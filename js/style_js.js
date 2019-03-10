/**
 * Created by Zeynal on 3/10/2019.
 */



function changeCursor(){

    var fcsdLenght = focusedObjects.length;
    if(fcsdLenght>0 && focusedObjects[0]){
        if(focusedObjects[0].border){
            $('body').css('cursor', 'e-resize')
        } else if (focusedObjects[0].side == 'center') {
            $('body').css('cursor', 'grab');
        }
    } else {
        $('body').css('cursor', 'default');
    }
}