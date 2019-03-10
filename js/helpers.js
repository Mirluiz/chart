/**
 * Created by Zeynal on 3/10/2019.
 */





function getTime(day) {
    _tc({Number: day});

    let oneDay = 1000 * 60 * 60 * 24;
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let neededDate = new Date();
        neededDate.setTime(start.getTime() + oneDay*day);

    return neededDate;
}


function _Y_ReverseMainGraph(y) {
    return _Y_Reverse(y) - previewFieldHeight;
}

function _Y_Reverse(y) {

    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');

    let canvasHeight = canv.height;

    return canvasHeight - y;
}








/**
 *
 *  Type checking
 *
 * @param {object} object
 */
function _tc(object){

    let type = Object.keys(object)[0];
    let paramsType = Object.prototype.toString.call(object[type]);

    if(!type||!paramsType)return;

    paramsType = paramsType.slice(0, -1);
    paramsType = paramsType.split(" ");

    try {
        if(paramsType[1] !== type){
            throw new TypeError("@Type problem // Parameter should be " + type + " --->  but this is " + object[type]);
        } else {
            if (type=='Number'&&isNaN(object[type])) {
                throw new TypeError("@Type problem // NaN error");
            }
        }
    } catch (error) {
        console.error(error);
        animationStop = true;
    }
}