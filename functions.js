(function($) { $(document).ready(function() {

	var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
	var scale = 1;

	$("head").append('<meta name="viewport" content="width=device-width, initial-scale=' + scale + '">');

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
