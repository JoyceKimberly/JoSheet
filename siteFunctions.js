var cWidth = 745;
var moveEnabled = true;
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

(function($) { $(document).ready(function() { // ----------------------------------------

var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth,
    document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var zoomScale = ((vw-30)/cWidth);

if ( isAuthenticated() ) {
    $('#authLink').hide();
    listCharacters();
} else {
	setAuthLink();
};

loadCookies();
setObjects();

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

    objects[target.id] = {
        width: target.style.width,
        height: target.style.height,
        x: x,
        y: y,
    };
    saveCookies();
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
$('#resetBtn').click(function() {
    document.cookie = "objects=" + JSON.stringify(objects) + "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    var obj = $('.draggable, .resizable');
    obj.removeAttr("data-x");
    obj.removeAttr("data-y");
    obj.removeAttr("style");
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

}); // ----------------------------------------------------------------------------------

function saveCookies() {
    document.cookie = "objects=" + JSON.stringify(objects) + "; path=/";
    console.log(document.cookie);
};
function loadCookies() {
    if ( getCookie("objects") ) {
        objects = JSON.parse(getCookie("objects"));
    };
};
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        };
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        };
    };
    return "";
};

function setObjects() {
    for (var i = 0; i < Object.keys(objects).length; i++) {
        var naam = Object.keys(objects)[i];
        var obj = $("#" + naam);

        var x = objects[naam].x;
        var y = objects[naam].y;

        if ( objects[naam].x ) {
            obj.css("transform", "translate(" + x + "px, " + y + "px)");
            obj.attr("data-x", x);
        };
        if ( objects[naam].y ) {
            obj.css("transform", "translate(" + x + "px, " + y + "px)");
            obj.attr("data-y", y);
        };
        if ( objects[naam].width ) {
            obj.width(objects[naam].width);
        };
        if ( objects[naam].height ) {
            obj.height(objects[naam].height);
        };
    };
};

function listCharacters() {
    var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
    dbx.filesListFolder({path: ''})
        .then(function(response) {
            console.log(response.entries); // debug
            $('#saveLink').show();
            $('.loadCharacter').remove();
            for (i = 0; i < response.entries.length; i++) {
                $('#authLink').before('<a id="load' + i + '" class="loadCharacter dropdown-item"><i class="fa fa-user fa-fw" aria-hidden="true"></i>' + response.entries[i].name.slice(0, -4) + '</a>');
            };
        })
        .catch(function(error) {
            console.log(error);
            setAuthLink();
        });
};

function setAuthLink() {
    var dbx = new Dropbox({ clientId: CLIENT_ID });
    //var authUrl = dbx.getAuthenticationUrl('http://localhost/~Joyce/JoSheet/');
    var authUrl = dbx.getAuthenticationUrl('https://joycekimberly.github.io/JoSheet/');
    document.getElementById('authLink').href = authUrl;
    $('#saveLink').hide();
    $('#authLink').show();
};

function saveFile() {
    var url = "data:text/plain," + encodeURIComponent(JSON.stringify(objects));
    var filename = characterName + ".txt";
    var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
    dbx.filesSaveUrl({path: '/Apps/JoSheet/' + filename, url: url})
        .then(function(response) {
            console.log("Success! Files saved to your Dropbox.");
            listCharacters();
        })
        .catch(function(error) {
            console.error(error);
        });
};

function loadFile() {
    JSON.parse();
};

})(jQuery); // --------------------------------------------------------------------------

var CLIENT_ID = 'ztucdd8z8fjuh08';

// Parses the url and gets the access token if it is in the urls hash
function getAccessTokenFromUrl() {
    return utils.parseQueryString(window.location.hash).access_token;
}
// If the user was just redirected from authenticating, the urls hash will
// contain the access token.
function isAuthenticated() {
    return !!getAccessTokenFromUrl();
}

(function(window) {
	window.utils = {
		parseQueryString: function(str) {
			var ret = Object.create(null);

			if (typeof str !== 'string') {
				return ret;
			}

			str = str.trim().replace(/^(\?|#|&)/, '');

			if (!str) {
				return ret;
			}

			str.split('&').forEach(function (param) {
				var parts = param.replace(/\+/g, ' ').split('=');
				// Firefox (pre 40) decodes `%3D` to `=`
				// https://github.com/sindresorhus/query-string/pull/37
				var key = parts.shift();
				var val = parts.length > 0 ? parts.join('=') : undefined;

				key = decodeURIComponent(key);

				// missing `=` should be `null`:
				// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
				val = val === undefined ? null : decodeURIComponent(val);

				if (ret[key] === undefined) {
				    ret[key] = val;
				} else if (Array.isArray(ret[key])) {
				    ret[key].push(val);
				} else {
				    ret[key] = [ret[key], val];
				}
			});
			return ret;
		}
	};
})(window);
