(function($) { $(document).ready(function() {

    interact(".draggable").draggable({
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, right: 1, bottom: 1, left: 0 },
        },
        snap: {
            targets: [
                interact.createSnapGrid( { x: 5, y: 5 } )
            ],
            range: Infinity,
            relativePoints: [ { x: 0.5, y: 0.5 } ],
        },
        onmove: dragMoveListener,
    });
    interact(".resizable").resizable({
        edges: { top: true, right: true, bottom: true, left: true },
        invert: 'reposition',
        max: Infinity,
        onstart: resizeMoveListener,
        onmove: resizeMoveListener,
        onend: resizeMoveListener,
    });


}); // ----------------------------------------------------------------------------------

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function resizeMoveListener (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}


})(jQuery);
