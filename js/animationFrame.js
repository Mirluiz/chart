/**
 * Created by Zeynal on 3/10/2019.
 */

let animationStop = false;

(function() {
    let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

let start = Date.now();

function step(timestamp) {

    if(animationStop){
        // window.webkitCancelAnimationFrame(animation);
        return;
    }
    let progress  = timestamp - start;

    if (progress < 2000) {
        redrawAll();
        requestAnimationFrame(step);
    }
}
// var animation = requestAnimationFrame(step);

