(function($) { $(document).ready(function() { // ----------------------------------------

var moveEnabled = true;
var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var cWidth = 745;
var zoomScale = ((vw-30)/cWidth);

$('[data-toggle="tooltip"]').tooltip();

function setBodyTag() {
    var body = $('body');
    if ( moveEnabled === true ) {
        body.removeClass('inputMode');
        body.addClass('moveMode');
    } else {
        body.removeClass('moveMode');
        body.addClass('inputMode');
    };
};
setBodyTag();

$('.outerPage').on('touchstart mousedown', function() {
    if ( moveEnabled === true ) {
        $('.outerPage').addClass("grid");
    };
});
$('.outerPage').on('touchend mouseup', function() {
    $('.outerPage').removeClass("grid");
});
/*
$('.editable').on('touchstart mousedown', function() {
    if ( moveEnabled === false ) {
        $(this).children('.hover').show();
    };
});
$('.editable').on('touchend mouseup', function() {
    $('.hover').hide();
});
*/

function moveListener(event) {
    //console.log(event); // debug
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    if ( event.type === "resizemove" ) {
        target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        x += event.deltaRect.left;
        y += event.deltaRect.top;
    };

    target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
};

var restrictObj = {
    restriction: '.page',
    endOnly: true,
    elementRect: { top: 0, right: 1, bottom: 1, left: 0 },
};

var snapObj = {
    targets: [ interact.createSnapGrid({ x: 5, y: 5 }) ],
    relativePoints: [ { x: 0, y: 0 } ],
};

interact('.moveMode .draggable')
    .origin('.page')
    .draggable({
        restrict: restrictObj,
        snap: snapObj,
        onmove: moveListener,
    });
interact('.moveMode .resizable')
    .origin('.page')
    .draggable({
        restrict: restrictObj,
        snap: snapObj,
        onmove: moveListener,

    })
    .resizable({
        preserveAspectRatio: false,
        restrict: restrictObj,
        edges: { top: true, right: true, bottom: true, left: true },
        invert: 'reposition',
        max: Infinity,
        snap: snapObj,

    })
    .on('resizemove', moveListener);

// --------------------------------------------------------------------------------------
// -- Specifics --
// --------------------------------------------------------------------------------------
$('#intro').css("margin-top", ($('#navbar').outerHeight()+15));
/*$('.outerPage').css("transform", "scale(" + zoomScale + ")");*/

$('#moveBtn').click(function() {
    moveEnabled = true;
    setBodyTag();
    $(this).addClass('active');
    $('#inputBtn').removeClass('active');
});
$('#inputBtn').click(function() {
    moveEnabled = false;
    setBodyTag();
    $(this).addClass('active');
    $('#moveBtn').removeClass('active');
    console.log(tDoc); // debug
});
$('#zoomIn').click(function() {
    zoomScale = zoomScale+0.10;
    $('.outerPage').css("transform", "scale(" + zoomScale + ")");
});
$('#zoomAct').click(function() {
    zoomScale = 1.00;
    $('.outerPage').css("transform", "scale(1)");
});
$('#zoomOut').click(function() {
    zoomScale = zoomScale-0.10;
    $('.outerPage').css("transform", "scale(" + zoomScale + ")");
});

$('.editable').on('touchstart mousedown', function() {
    if ( moveEnabled === false ) {
        $('#soonModal').modal('show');
    };
});
$('#basicBarSave').click(function() {
    var dit = $(this);
    dit.removeClass('btn-primary');
    dit.addClass('btn-success');
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

}); // ----------------------------------------------------------------------------------

})(jQuery); // --------------------------------------------------------------------------
