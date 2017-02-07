(function($) { $(document).ready(function() {

    var moveEnabled = true;
    var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    var cWidth = 745;
    var zoomScale = ((vw-30)/cWidth);

    $('[data-toggle="tooltip"]').tooltip();

    $("#intro").css("margin-top", ($("#navbar").outerHeight()+15));
    /*$(".outerPage").css("transform", "scale(" + zoomScale + ")");*/

    $("#moveMode").click(function() {
        moveEnabled = true;
    });
    $("#inputMode").click(function() {
        moveEnabled = false;
    });
    $("#zoomIn").click(function() {
        zoomScale = zoomScale+0.10;
        $(".outerPage").css("transform", "scale(" + zoomScale + ")");
    });
    $("#zoomAct").click(function() {
        zoomScale = 1.00;
        $(".outerPage").css("transform", "scale(1)");
    });
    $("#zoomOut").click(function() {
        zoomScale = zoomScale-0.10;
        $(".outerPage").css("transform", "scale(" + zoomScale + ")");
    });
/*
    $("<style>\
    @media print {\
        .outerPage[style] {\
            transform: scale(1.5) !important;\
        }\
    }\
    </style>").appendTo("head");
*/

    $(".outerPage").on('touchstart mousedown', function() {
        if ( moveEnabled === true ) {
            $(".outerPage").addClass("grid");
        };
    });
    $(".outerPage").on('touchend mouseup', function() {
        $(".outerPage").removeClass("grid");
    });

    $(".editable").on('touchstart mousedown', function() {
        if ( moveEnabled === false ) {
            $(this).children(".hover").show();
        };
    });
    $(".editable").on('touchend mouseup', function() {
        $(this).children(".hover").hide();
    });
    
    interact(".draggable").draggable({
        restrict: {
            restriction: '.page',
            /*endOnly: true,*/
            elementRect: { top: 0, right: 1, bottom: 1, left: 0 },
        },
        snap: {
            targets: [
                interact.createSnapGrid( { x: 5, y: 5 } )
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ],
        },
        onmove: dragMoveListener,
    });
    interact(".resizable").draggable({
        restrict: {
            restriction: '.page',
            /*endOnly: true,*/
            elementRect: { top: 0, right: 1, bottom: 1, left: 0 },
        },
        snap: {
            targets: [
                interact.createSnapGrid( { x: 5, y: 5 } )
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ],
        },
        onmove: dragMoveListener,
    })
    .resizable({
        preserveAspectRatio: false,
        edges: { top: true, right: true, bottom: true, left: true },
        invert: 'reposition',
        max: Infinity,
        snap: {
            targets: [
                interact.createSnapGrid( { x: 5, y: 5 } )
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ],
        },
    })
    .on('resizemove', function (event) {
        if ( moveEnabled === true ) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            target.style.width  = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        };
    });


}); // ----------------------------------------------------------------------------------

function dragMoveListener (event) {
    if ( moveEnabled === true ) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    };
};


})(jQuery);
