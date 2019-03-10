/**
 * Created by Zeynal on 3/10/2019.
 */


let graphVertexs = [];

/**
 *
 *  Drawing graph
 *
 * @param data {object}
 */
function drawGraph(vertex){
    if(!vertex)return;

    _tc({object: data});

    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    ctx.moveTo(0, 0);

    let i_cnt = 0;
    let i_max = data.length;

    ctx.restore();
}

function getAllVertex(data) {

    _tc({Object: data});


    // var data
    // for(let) {
    //
    // }
}