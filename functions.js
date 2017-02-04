(function($) { $(document).ready(function() {

	var pMargin = 10;
	var ratio = Math.sqrt(2);
	var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
	var pxWidth = 595;
	var vWidth = vw-(pMargin*2);
	var edge = ((0.25*72)*vWidth)/pxWidth;

	$(".container").css({
	    "width": vWidth,
	    "height": vWidth*ratio,
		"margin": pMargin,
	});
	$(".page").css({
	    "width": $(".container").width()-(edge*2),
	    "height": $(".container").height()-(edge*2),
	    "top": edge,
	    "left": edge,
	});

	$(".attrBlock").css({
	    "width": (54*vWidth)/pxWidth,
	    "height": (64*vWidth)/pxWidth,
	    "left": ((22*vWidth)/pxWidth)-edge,
	});
	$(".attrBg").css({
	    "width": $(".attrBlock").width(),
	    "height": $(".attrBlock").height(),
	});
	$(".attrTxt").css({
	    "width": $(".attrBlock").width(),
	    "top": (6*vWidth)/pxWidth,
	    "font-size": (10*vWidth)/pxWidth,
	});

	$(".attrBlock.cha").css({
	    "top": ((484*vWidth)/pxWidth)-edge,
	});

    // ----------------------------------------------------------------------------------
    // -- Drag and drop --
	// ----------------------------------------------------------------------------------
	interact(".draggable").draggable({
        restrict: {
            restriction: '.page',
			elementRect: { top: 0, right: 1, bottom: 1, left: 0 },
        },
		onmove: dragMoveListener,
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
