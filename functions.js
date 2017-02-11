var cWidth = 745;
var moveEnabled = true;
var objects = {};
var character = {};
var characterFiles = [];

(function($) { $(document).ready(function() { // ----------------------------------------

var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth,
    document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var zoomScale = ((vw-30)/cWidth);

if ( isAuthenticated() ) {
    $('#authLink').hide();
    listCharacters();
    setAlert('success', 'Success! You have connected to Dropbox.');
} else {
    setAuthLink();
};

resetObjects();
resetCharacter();
loadCookies();
setObjects();

$('[data-toggle="tooltip"]').tooltip();

function setBodyTag() {
    var body = $('body');
    if ( moveEnabled === true ) {
        body.removeClass('inputMode');
        body.addClass('moveMode');
        setAlert('info', 'Move all... the... things!');
    } else {
        body.removeClass('moveMode');
        body.addClass('inputMode');
        setAlert('info', 'Input your character');
    };
    $('#desc').show();
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
$('#navbar + .container').css("margin-top", ($('#navbar').outerHeight()));
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
    setCharacter();
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
    if ( moveEnabled === true ) {
        resetObjects();
        document.cookie = "objects=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    } else {
        resetCharacter();
        document.cookie = "character=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    };
});
$('#printBtn').click(function() {
    window.print();
});
$('#saveLink').click(function() {
    saveFile();
});

$('#basicBar').click(function() {
    if ( moveEnabled === false ) {
        $('#basicBarModal').modal('show');
    };
});
$('#basicBarSave').click(function() {
    if ( $('#characterNameInput').val() !== "" ) {
        character.name = $('#characterNameInput').val();
    } else {
        character.name = "JoSheet";        
    };
    setCharacter();
    saveCookies();
    var dit = $(this);
    dit.removeClass('btn-primary');
    dit.addClass('btn-success');
});
$('.modal').on('hidden.bs.modal', function() {
    var btn = $('.modal .btnSave');
    btn.removeClass('btn-success');
    btn.addClass('btn-primary');    
})
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
    document.cookie = "character=" + JSON.stringify(character) + "; path=/";
};
function loadCookies() {
    if ( getCookie("objects") ) {
        objects = JSON.parse(getCookie("objects"));
    };
    if ( getCookie("character") ) {
        character = JSON.parse(getCookie("character"));
    };
};

function setObjects() {
    for ( var i = 0; i < Object.keys(objects).length; i++ ) {
        var naam = Object.keys(objects)[i];
        var obj = $("#" + naam);
        obj.removeAttr("data-x");
        obj.removeAttr("data-y");
        obj.removeAttr("style");

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

function resetObjects() {
    objects = {
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
    var obj = $('.draggable, .resizable');
    obj.removeAttr("data-x");
    obj.removeAttr("data-y");
    obj.removeAttr("style");
};

function setCharacter() {
    $('#characterNameInput').val(character.name);
};

function resetCharacter() {
    character = {
        name : "JoSheet",
        player : "",
        race : "",
        subRace : "",
        level : 1,
        class : "",
        subClass : "",
        exp : 0,
        background : "",
        subBackground : "",
        attributes : {
            str : 8,
            dex : 8,
            con : 8,
            int : 8,
            wis : 8,
            cha : 8,
        },
    };
};

function listCharacters() {
    var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
    dbx.filesListFolder({path: ''})
        .then(function(response) {
            characterFiles = response.entries;
            $('#saveLink').show();
            $('.loadCharacter').remove();

            for ( var i = 0; i < characterFiles.length; i++ ) {
                $('#authLink').before('\
                <div class="loadCharacter dropdown-item">\
                    <a id="load' + i + '">\
                        <i class="fa fa-user fa-fw" aria-hidden="true"></i>\
                        ' + characterFiles[i].name.slice(0, -4) + '\
                    </a>\
                    <button type="button" id="delete' + i + '" class="deleteCharacter close" aria-label="Delete">\
                        <span aria-hidden="true">&times;</span>\
                    </button>\
                </div>\
                ');
            };

            $('.loadCharacter a').click(function() {
                loadFile(Number($(this).attr('id').substring(4)));
            });
            $('.deleteCharacter').click(function() {
                deleteFile(Number($(this).attr('id').substring(6)));
            });
        })
        .catch(function(error) {
            setAlert('danger', error);
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
            setAlert('success', 'Character saved to your Dropbox.');
            listCharacters();
        })
        .catch(function(error) {
            setAlert('danger', error);
        });
};

function loadFile(i) {
    var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
    dbx.filesDownload({path: characterFiles[i].path_lower})
        .then(function(response) {
            var blob = response.fileBlob;
            var reader = new FileReader();
            reader.onload = function() {
                objects = JSON.parse(reader.result);
                setObjects();
                saveCookies();
            }
            reader.readAsText(blob);
        })
        .catch(function(error) {
            setAlert('danger', error);
        });
};

function deleteFile(i) {
    var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
    dbx.filesDelete({path: characterFiles[i].path_lower})
        .then(function(response) {
            setAlert('success', 'Character deleted from your Dropbox.');
            listCharacters();
        })
        .catch(function(error) {
            setAlert('danger', error);
        });
};

function setAlert(type, msg) {
    $('#alerts').prepend('\
        <div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">\
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
            <div class="content">' + msg + '</div>\
        </div>\
    ');
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

// --------------------------------------------------------------------------------------
// -- Helpers --
// --------------------------------------------------------------------------------------
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for ( var i = 0; i < ca.length; i++ ) {
        var c = ca[i];
        while ( c.charAt(0) == ' ' ) {
            c = c.substring(1);
        };
        if ( c.indexOf(name) == 0 ) {
            return c.substring(name.length, c.length);
        };
    };
    return "";
};

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
