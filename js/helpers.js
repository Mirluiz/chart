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

    _tc({Number : y});

    let canv = document.getElementById(drawArea);
    let canvasHeight = canv.height;

    return canvasHeight - y;
}

function getCanvasMaxWidth() {
    let canv = document.getElementById(drawArea);
    return canv.width;
}

function getCanvasMaxHeight() {
    let canv = document.getElementById(drawArea);
    return  canv.height;
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

function maxVal(arr) {
    _tc({Array: arr});

    let maxNum = 0;

    let i_cnt = 0;
    let i_max = arr.length;

    while (i_cnt < i_max) {
        if(Number.isInteger(arr[i_cnt])){
            // console.log(arr[i_cnt]);
            if(arr[i_cnt] > maxNum) maxNum = arr[i_cnt];
        }
        i_cnt++;
    }
    return maxNum;
}

function minVal(arr) {
    _tc({Array: arr});

    let minNum = 0;

    let i_cnt = 0;
    let i_max = arr.length;

    while (i_cnt < i_max) {
        if(Number.isSafeInteger(arr[i_cnt])){
            if(arr[i_cnt] < minNum) minNum = arr[i_cnt];
        }
        i_cnt++;
    }

    return minNum;
}


let f = new FontFace('test', 'url(x)');
