(function($) { $(document).ready(function() {

var ratio = Math.sqrt(2);
var vw = document.documentElement.clientWidth;
var pxWidth = 595;
var width = /*pxWidth*/ vw-20;

$("#page").css({
    width: width,
    height: width*ratio,
});

$(".attrBlock").css({
    width: (54*width)/pxWidth,
    height: (64*width)/pxWidth,
    /*left: (22*width)/pxWidth,*/
});
$(".attrBg").css({
    width: $(".attrBlock").width(),
    height: $(".attrBlock").height(),
});
$(".attrTxt").css({
    width: $(".attrBlock").width(),
});

$(".attrBlock.cha").css({
    /*top: (484*width)/pxWidth,*/
});
$(".attrTxt").css({
    top: (6*width)/pxWidth,
    fontSize: (10*width)/pxWidth,
});


interact(".attrBlock").draggable({
    restrict: {
        restriction: "#page",
    }
});

});
})(jQuery);
