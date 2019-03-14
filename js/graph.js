/**
 * Created by Zeynal on 3/10/2019.
 */


let vertLine = null;
let graphVertexs = [];
let graphData = null;

/*!
 *  Drawing graph
 */
function drawGraphVertex(vertex){
    if(!vertex)return;

    let valuePos = editorToWorld(vertex.x, vertex.y);

    drawFillCircle(1, valuePos, '#3DC23F');
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

            let xRatioStep = xRatio;

            for (let i = 0; i  < data.columns[0].length; i++) {

                let yData = data.columns[a][i];

                vertex.x = xRatioStep;
                xRatioStep += xRatio;


                if(!Number.isSafeInteger(yData))yData = 0;

                vertex.y = yData*currentTransform.yRatio

                vertexObj.name = data['names'][data.columns[a][0]];
                vertexObj.color = data['colors'][data.columns[a][0]];
                vertexObj['object'].push(new Coord(vertex.x, vertex.y));

            }

            graphVertexs.push(vertexObj);
        }
    }
}

function drawAllGraphVertex() {
    if(graphVertexs.length < 1) return;

    for (let graph of graphVertexs) {

        let i_cnt = 0;
        let i_max = graph.object.length;

        while (i_cnt < i_max) {
            drawGraphVertex(graph.object[i_cnt]);
            i_cnt++;
        }

    }
}

function drawAllGraphLine() {
    if(graphVertexs.length < 1) return;

    for (let graph of graphVertexs) {

        let i_cnt = 0;
        let i_max = graph.object.length;

        while (i_cnt < i_max - 1) {
            let begin = editorToWorld(graph.object[i_cnt].x,  _Y_ReverseMainGraph(graph.object[i_cnt].y) - 40);
            let end = editorToWorld(graph.object[i_cnt+1].x,  _Y_ReverseMainGraph(graph.object[i_cnt+1].y) - 40);
            let line = new Line(begin, end);
            drawLine(line, 3, graph.color);
            i_cnt++;
        }

    }
}

function addVertLine() {
    vertLine = Line.createDefault();
    vertLine.begin.y = _Y_ReverseMainGraph(0);
    vertLine.end.y = _Y_ReverseMainGraph(getCanvasMaxHeight()  - previewFieldHeight - 40);

    let mesh = new Mesh(vertLine, 'line');
    mesh.update = true;
    mesh.draw = true;

    mesh.setUpdate(function () {
        this.object.begin.x = mousePos.x;
        this.object.end.x = mousePos.x;
    });

    mesh.material.color = telegramFieldsGrey;
    mesh.material.w = 3;
    scene.add(mesh, 'vertLine');
}

function setGraphData(data){
    graphData = data;
    // getAllVertex();
}