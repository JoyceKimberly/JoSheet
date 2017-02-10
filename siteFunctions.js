(function($) { $(document).ready(function() { // ----------------------------------------

var moveEnabled = true;
var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth,
    document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var cWidth = 745;
var zoomScale = ((vw-30)/cWidth);
var characterName = "JoSheet";
var objects = {
    "basicBar"    : { width: 0, height: 0, x: 0, y: 0 },
    "attrBox"     : { width: 0, height: 0, x: 0, y: 0 },
    "strBlock"    : { width: 0, height: 0, x: 0, y: 0 },
    "dexBlock"    : { width: 0, height: 0, x: 0, y: 0 },
    "conBlock"    : { width: 0, height: 0, x: 0, y: 0 },
    "intBlock"    : { width: 0, height: 0, x: 0, y: 0 },
    "wisBlock"    : { width: 0, height: 0, x: 0, y: 0 },
    "chaBlock"    : { width: 0, height: 0, x: 0, y: 0 },
    "savesBlock"  : { width: 0, height: 0, x: 0, y: 0 },
    "skillsBlock" : { width: 0, height: 0, x: 0, y: 0 },
    "inspBlock"   : { width: 0, height: 0, x: 0, y: 0 },
    "profBlock"   : { width: 0, height: 0, x: 0, y: 0 },
    "boxBg1"      : { width: 0, height: 0, x: 0, y: 0 },
    "boxBg2"      : { width: 0, height: 0, x: 0, y: 0 },
    "deathBlock"  : { width: 0, height: 0, x: 0, y: 0 },
};

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

    positions[target.id] = {
        width: target.style.width,
        height: target.style.height,
        x: x,
        y: y,
    };
    /*if ( positions["boxBg2"] ) {
        console.log(positions["boxBg2"]); // debug
    };*/
    loopTargets();
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
function loopTargets() {
    /*for (i = 0; i < targets.length; i++) {
        if ( $.inArray(targets[i], positions) >= 0 ) {
            console.log(positions[targets[i]]); // debug
        };
    };*/
};

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
$('#printBtn').click(function() {
    window.print();
});
$('#saveLink').click(function() {
    saveFile();
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

function saveFile() {
    var blob = new Blob([JSON.stringify(objects)], {type : 'application/json'});
    var url = URL.createObjectURL(blob);
    console.log(url); // debug
    var filename = characterName+".txt";
    var options = {
        // Success is called once all files have been successfully added to the user's
        // Dropbox, although they may not have synced to the user's devices yet.
        success: function () {
            console.log("Success! Files saved to your Dropbox.");
        },
        // Error is called in the event of an unexpected response from the server
        // hosting the files, such as not being able to find a file. This callback is
        // also called if there is an error on Dropbox or if the user is over quota.
        error: function (errorMessage) {
            console.log(errorMessage);
        },
    };
    Dropbox.save(url, filename, options);
};

function loadFile() {
    JSON.parse();
};

}); // ----------------------------------------------------------------------------------

})(jQuery); // --------------------------------------------------------------------------
