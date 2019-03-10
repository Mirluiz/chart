$(function () {


    // $(drawAreaSelector).mousedown(function() {
    //     alert( "Handler for .mousedown() called." );
    // });

    $(drawAreaSelector).mousemove(mouseMoveHandler);
    $(drawAreaSelector).mouseup(mouseClickHandler);



    getPreviewFieldHeight();
    setAxisSteps();

});