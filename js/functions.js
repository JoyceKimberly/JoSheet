(function($) { $(document).ready(function() {

var ratio = Math.sqrt(2);
var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var pxWidth = 595;
var width = vw-20;
var edge = (20*width)/pxWidth;

$(".container").css({
    "width": width,
    "height": width*ratio,
});
$(".page").css({
    "width": $(".container").width()-(edge*2),
    "height": $(".container").height()-(edge*2),
    "top": edge,
    "left": edge,
});

$(".attrBlock").css({
    "width": (54*width)/pxWidth,
    "height": (64*width)/pxWidth,
    "left": ((22*width)/pxWidth)-edge,
});
$(".attrBg").css({
    "width": $(".attrBlock").width(),
    "height": $(".attrBlock").height(),
});
$(".attrTxt").css({
    "width": $(".attrBlock").width(),
    "top": (6*width)/pxWidth,
    "font-size": (10*width)/pxWidth,
});

$(".attrBlock.cha").css({
    "top": ((484*width)/pxWidth)-edge,
});


interact('.draggable').draggable(true);

});
})(jQuery);
