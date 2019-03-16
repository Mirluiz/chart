/**
 * Created by Zeynal on 3/10/2019.
 */


let vertLine = null;
let graphVertexs = [];
let graphData = null;

const customOffset = 40;

/*!
 *  Drawing graph
 */
function drawGraphVertex(vertex, color){
    if(!vertex)return;

    let valuePos = editorToWorld(vertex.x, vertex.y);
    valuePos.y = _Y_ReverseMainGraph(valuePos.y)  - customOffset;
    drawFillCircle(8, valuePos, 3, 'white' ,color);
}

function drawGraphLine(line){
    if(!vertex)return;

    let valuePos = new Coord(vertex.x, vertex.y);

    drawLine();
}




function getAllVertex(graphData) {

    if(!graphData){
        return;
    }

    //graphData[0].names[graphData[0].columns[a][0]]
    //graphData[0].colors[graphData[0].columns[a][0]]
    for(let data of  graphData){
        for (let a = 1; a  < data.columns.length; a++) {

            let vertex = new Coord(0, 0);
            let vertexObj = jQuery.extend(true, {}, graphContainer);

            let xRatio = getXRatio(data.columns[0].length, 0, getCanvasMaxWidth());

            let xRatioStep = 0;

            for (let i = 0; i  < data.columns[0].length; i++) {

                let yData = data.columns[a][i];

                vertex.x = xRatioStep;
                xRatioStep += xRatio;


                if(!Number.isSafeInteger(yData))yData = 0;

                vertex.y = yData;

                vertexObj.name = data['names'][data.columns[a][0]];
                vertexObj.color = data['colors'][data.columns[a][0]];
                vertexObj.draw = true;

                let infoPoint = { };
                    infoPoint[data.columns[a][0]] = data.columns[a][i];
                    infoPoint['x'] = data.columns[0][i];
                let infoArr = jQuery.extend(true, {}, infoPoint);

                vertexObj['object'].push({point: new Coord(vertex.x, vertex.y), info: infoArr});

            }

            graphVertexs.push(vertexObj);
        }
    }
}

function drawAllGraphVertex() {
    if(graphVertexs.length < 1) return;

    for (let graph of graphVertexs) {

        if(!graph.draw)continue;

        let i_cnt = 0;
        let i_max = graph.object.length;

        while (i_cnt < i_max) {
            // drawGraphVertex(graph.object[i_cnt].point, graph.color);
            i_cnt++;
        }

    }
}

function drawAllGraphLine() {
    if(graphVertexs.length < 1) return;

    for (let graph of graphVertexs) {

        if(!graph.draw)continue;

        let i_cnt = 0;
        let i_max = graph.object.length;

        while (i_cnt < i_max - 1) {
            let begin = editorToWorld(graph.object[i_cnt].point.x,  (graph.object[i_cnt].point.y));
            let end = editorToWorld(graph.object[i_cnt+1].point.x,  (graph.object[i_cnt+1].point.y));
            begin.y =  _Y_ReverseMainGraph(begin.y) - customOffset;
            end.y =  _Y_ReverseMainGraph(end.y) - customOffset;
            let line = new Line(begin, end);
            drawLine(line, 3, graph.color);
            i_cnt++;
        }

    }
}

function addVertLine() {
    vertLine = Line.createDefault();
    vertLine.begin.y = _Y_ReverseMainGraph(customOffset);
    vertLine.end.y = _Y_ReverseMainGraph(getCanvasMaxHeight()  - previewFieldHeight - customOffset);

    let mesh = new Mesh(vertLine, 'line');
    mesh.update = true;
    mesh.draw = true;

    mesh.setUpdate(function () {
        if (true){
            this.object.begin.x = mousePos.x;
            this.object.end.x = mousePos.x;
        }
    });

    mesh.material.color = telegramFieldsGrey;
    mesh.material.w = 3;
    scene.add(mesh, 'vertLine');
}

function showStaticInfo(focus, mousePos) {


    if(focus[0]){
        if(focus[0].type !== 'infoBar'|| focus[1].type !== 'infoBar'){
            return;
        }
    } else {
        return;
    }

    let h = 150;
    let w = 220;

    let rect = Rectangular.createDefault();
        rect.begin.x = mousePos.x - w/2;
        rect.begin.y = mousePos.y - h/2 - h;
        rect.end.x = mousePos.x + w/2;
        rect.end.y = mousePos.y + h/2 - h;

    let infoArr = [];

    let xOffset = 20*(w/h);
    let yOffset = 30*(w/h);



    let newText = Object.assign({}, defaultTextInfo);
        newText.pos = new Coord(rect.begin.x + xOffset, rect.begin.y + yOffset);
    let date = Number.isInteger(focus[0].info.x) ? new Date() : false;
        date.setTime(focus[0].info.x);
    let weekName = weekEngNames[date.getDay()];
    let moontName = monthEngNames[date.getMonth()];
    let dayInMont = date.getDate();
        newText.text = weekName + ", " + moontName + " " + dayInMont;
        newText.color = 'black';
        infoArr.push(newText);


    yOffset += h/3;
    for(let i = 0; i < focus.length; i++){

        if(!graphVertexs[i].draw)continue;

        let newText = Object.assign({}, defaultTextInfo);
        newText.pos = new Coord(rect.begin.x + xOffset, rect.begin.y + yOffset);
        newText.text = focus[i].info[Object.keys(focus[i].info)[0]].toString();
        newText.color = Object.keys(focus[i].info)[0] == 'y0' ? 'green' : 'red';

        xOffset += w/2;
        infoArr.push(newText);
    }
    xOffset = 20*(w/h);


    yOffset += h/4;
    for(let i = 0; i < focus.length; i++){
        if(!graphVertexs[i].draw)continue;
        let newText = Object.assign({}, defaultTextInfo);
        newText.pos = new Coord(rect.begin.x + xOffset, rect.begin.y + yOffset);
        newText.text = Object.keys(focus[i].info)[0] == 'y0' ? 'Joined' : 'Left';
        newText.color = Object.keys(focus[i].info)[0] == 'y0' ? 'green' : 'red';


        drawGraphVertex(focus[i].object, newText.color);


        infoArr.push(newText);
        xOffset += w/2;
    }







    drawInfo(rect, infoArr);
}


function drawInfo(rect, texts) {


    drawFillRounRect(rect, 1 , 15, telegramInfoBarBorder, telegramInfoBarColor, 4);

    for(let text of texts){
        text.pos.y = _Y_ReverseMainGraph(text.pos.y);
        drawText(text.text, text.pos, false, 30, 'Arial', 1, text.color);
    }
}


function setGraphData(data){
    graphData = data;
    // getAllVertex();
}