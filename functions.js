(function($) { $(document).ready(function() {

    $("head").append('<meta name="viewport" content="width=' + $(".container").outerWidth(true) + '">');

    interact(".draggable").draggable({
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, right: 1, bottom: 1, left: 0 },
        },
        /*snap: {
            targets: [
                interact.createSnapGrid( { x: 5, y: 5 } )
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ],
        },*/
        onmove: dragMoveListener,
    });
    interact(".resizable").resizable({
        edges: { top: true, right: true, bottom: true, left: true }
    });
    

}); // ----------------------------------------------------------------------------------

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}


})(jQuery);
