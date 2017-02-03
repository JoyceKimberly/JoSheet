(function($) { $(document).ready(function() {

var ratio = Math.sqrt(2);
var vw = document.documentElement.clientWidth;
var pxWidth = 595;
var width = /*pxWidth*/ vw-20;
var edge = 0.25*72

$(".container").css({
    width: width,
    height: width*ratio,
    padding: edge,
});

$(".attrBlock").css({
    width: (54*width)/pxWidth,
    height: (64*width)/pxWidth,
    left: (22*width)/pxWidth,
});
$(".attrBg").css({
    width: $(".attrBlock").width(),
    height: $(".attrBlock").height(),
});
$(".attrTxt").css({
    width: $(".attrBlock").width(),
});

$(".attrBlock.cha").css({
    top: (484*width)/pxWidth,
});
$(".attrTxt").css({
    top: (6*width)/pxWidth,
    fontSize: (10*width)/pxWidth,
});


interact('.draggable').draggable();

});
})(jQuery);
