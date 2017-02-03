(function($) { $(document).ready(function() {

var ratio = Math.sqrt(2);
var vw = document.body.clientWidth;
var pxWidth = 595;
var width = vw-20;
var edge = ((18*width)/pxWidth),

$(".container").css({
    "width": width,
    "height": (width*ratio),
    "padding": edge,
});
$(".page").css({
    "width": (width-(edge*2)),
    "height": ((width*ratio)-(edge*2)),
});

$(".attrBlock").css({
    "width": ((54*width)/pxWidth),
    "height": ((64*width)/pxWidth),
    "left": ((22*width)/pxWidth),
});
$(".attrBg").css({
    "width": $(".attrBlock").width(),
    "height": $(".attrBlock").height(),
});
$(".attrTxt").css({
    "width": $(".attrBlock").width(),
});

$(".attrBlock.cha").css({
    "top": ((484*width)/pxWidth),
});
$(".attrTxt").css({
    "top": ((6*width)/pxWidth),
    "font-size": ((10*width)/pxWidth),
});


interact('.draggable').draggable();

});
})(jQuery);
