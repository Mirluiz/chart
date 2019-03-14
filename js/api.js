/**
 * Created by Zeynal on 3/10/2019.
 */

function getData(){
    $.ajax({
        url: '/telegramChart/dummy/dummyGraph.json',
    }).done(function (data) {
        setGraphData(data);
        setTransform(data);
        getAllVertex(graphData);
    })
}

