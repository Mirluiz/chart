$(function () {


    // $(drawAreaSelector).mousedown(function() {
    //     alert( "Handler for .mousedown() called." );
    // });

    $(drawAreaSelector).mousemove(mouseMoveHandler);
    $(drawAreaSelector).mousedown(mouseMouseDown);
    $(drawAreaSelector).mouseup(mouseMouseUp);



    getPreviewFieldHeight();
    setAxisSteps();
    addVertLine();
    initPreview();
    getData();

    var animation = requestAnimationFrame(step);


});