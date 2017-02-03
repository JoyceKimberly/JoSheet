(function($) { $(document).ready( function() {

var ratio = Math.sqrt(2);
var vw = $(window).width();
var pxWidth = 595;
var width = /*vw-40;*/ pxWidth;

$("#page").width(width).height(width*ratio);

$(".attrBlock").width(54).height(64);
$(".attrBg").width($(".attrBlock").width()).height($(".attrBlock").height());
$(".attrTxt").width($(".attrBlock").width());

} );

})(jQuery);
