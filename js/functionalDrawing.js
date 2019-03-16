/**
 * Created by Zeynal on 3/10/2019.
 */





/**
 *
 * @param line {object}
 * @param w {number}
 * @param color {string}
 */
function drawLine(line, w = 2, color = 'black') {

    _tc({Object: line});
    _tc({Number: w});
    _tc({String: color});



    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.moveTo(line.begin.x, line.begin.y);
    ctx.lineTo(line.end.x, line.end.y);
    ctx.stroke();

    ctx.restore();
}


/**
 *
 * @param text {string}
 * @param pos {object}
 * @param centerAlign {boolean}
 * @param fontSize {number}
 * @param fontName {string}
 * @param w {number}
 * @param color {string}
 */
function drawText(text, pos, centerAlign = false, fontSize = 10, fontName = 'Arial',  w = 1, color = 'black', bold='') {

    _tc({String: text});
    _tc({Object: pos});
    _tc({Boolean: centerAlign});
    _tc({Number: fontSize});
    _tc({String: fontName});
    _tc({Number: w});
    _tc({String: color});


    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    let txt = bold + " "  + fontSize + "px " + fontName;
    let txtW =  ctx.measureText(txt).width;
    ctx.font = txt;
    ctx.fillStyle = color;
    if(centerAlign){
        ctx.fillText(text, pos.x - txtW/2, _Y_ReverseMainGraph(pos.y));
    } else {
        ctx.fillText(text, pos.x, _Y_ReverseMainGraph(pos.y));
    }
    ctx.restore();
}

function drawStrokeRect(rect, w = 1, color = 'black') {

    _tc({Object: rect});
    _tc({String: color});
    _tc({Number: w});

    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.strokeRect(rect.begin.x, rect.begin.y, rect.end.x - rect.begin.x, rect.end.y - rect.begin.y);

    ctx.restore();

}

function drawStrokeRounRect(rect, w = 1, r = 1, color = 'black') {
    _tc({Object: rect});
    _tc({String: color});
    _tc({Number: w});

    let radius = 20;
    let a, b, c, d; //rect vertexs
    a = new Coord(rect.begin.x, rect.begin.y);
    b = new Coord(rect.end.x, rect.begin.y);
    c = new Coord(rect.end.x, rect.end.y);
    d = new Coord(rect.begin.x, rect.end.y);


    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    ctx.strokeStyle = color;
    ctx.lineWidth = w;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y + radius);
    ctx.quadraticCurveTo(a.x, a.y, a.x + radius, a.y);
    ctx.lineTo(b.x - radius, b.y);
    ctx.quadraticCurveTo(b.x, b.y, b.x, b.y + radius);
    ctx.lineTo(c.x , c.y - radius);
    ctx.quadraticCurveTo(c.x, c.y, c.x - radius, c.y);
    ctx.lineTo(d.x + radius, d.y);
    ctx.quadraticCurveTo(d.x, d.y, d.x, d.y - radius);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
}

function drawFillRounRect(rect, w = 1, r = 1, color = 'black', fillColor = 'black', blur = false) {
    _tc({Object: rect});
    _tc({String: color});
    _tc({Number: w});

    let radius = r;
    let a, b, c, d; //rect vertexs
    a = new Coord(rect.begin.x, rect.begin.y);
    b = new Coord(rect.end.x, rect.begin.y);
    c = new Coord(rect.end.x, rect.end.y);
    d = new Coord(rect.begin.x, rect.end.y);


    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.fillStyle = fillColor;
    ctx.lineWidth = w;
    ctx.shadowBlur = blur;
    ctx.shadowColor = "rgba(0,	0,	0, .2)";

    ctx.beginPath();
    ctx.moveTo(a.x, a.y + radius);
    ctx.quadraticCurveTo(a.x, a.y, a.x + radius, a.y);
    ctx.lineTo(b.x - radius, b.y);
    ctx.quadraticCurveTo(b.x, b.y, b.x, b.y + radius);
    ctx.lineTo(c.x , c.y - radius);
    ctx.quadraticCurveTo(c.x, c.y, c.x - radius, c.y);
    ctx.lineTo(d.x + radius, d.y);
    ctx.quadraticCurveTo(d.x, d.y, d.x, d.y - radius);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.restore();
}

function drawFillRect(rect, color = 'black') {

    _tc({Object: rect});
    _tc({String: color});

    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    ctx.fillStyle = color;
    ctx.fillRect(rect.begin.x, rect.begin.y, rect.end.x - rect.begin.x, rect.end.y - rect.begin.y);

    ctx.restore();

}

/**
 *
 * @param rad {number}
 * @param pos {object}
 * @param color {string}
 */
function drawFillCircle(rad, pos, w = 1, color = 'white', borderColor= 'black'){

    _tc({Number: rad});
    _tc({Object: pos});
    _tc({String: color});

    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    ctx.fillStyle = color;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, rad, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}


/**
 *
 * @param rad {number}
 * @param pos {object}
 * @param color {string}
 */
function drawStrokeCircle(rad, pos, color = 'black'){

    _tc({Number: rad});
    _tc({Object: pos});
    _tc({String: color});

    let canv = document.getElementById(drawArea);
    let ctx = canv.getContext('2d');
    ctx.save();

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, rad, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.restore();
}