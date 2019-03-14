/**
 * Created by Zeynal on 3/10/2019.
 */



function changeCursor(){

    var fcsdLenght = focus.length;
    if(fcsdLenght>0 && focus[0] && focus[0].type=='selection'){
        if(focus[0].border){
            $('body').css('cursor', 'e-resize')
        } else if (focus[0].side == 'center') {
            $('body').css('cursor', 'grab');
        }
    } else {
        $('body').css('cursor', 'default');
    }
}