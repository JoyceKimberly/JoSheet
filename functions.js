var cWidth = 745;
var moveEnabled = true;
window.file = {
    objects   : {},
    character : {},
    notes     : {},
};
var characterFiles = [];

(function($) { $(document).ready(function() { // ----------------------------------------
resetObjects();
resetCharacter();
loadCookies();
setObjects();
setCharacter();

var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth,
    document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var zoomScale = ((vw-30)/cWidth);

window.addEventListener("resize", function() {
    $('#navbar + .container, #page1').css("margin-top", ($('#navbar').outerHeight()));
}, false);
$('#navbar + .container, #page1').css("margin-top", ($('#navbar').outerHeight()));

if ( isAuthenticated() ) {
    var d = new Date();
    d.setTime(d.getTime() + (14*24*60*60*1000));
    document.cookie = "token=" + JSON.stringify(file.objects) + "; expires=" + d.toUTCString() + "; path=/";
    $('#authLink').hide();
    listCharacters();
    setAlert('success', 'Success! You have connected to Dropbox.');
} else {
    setAuthLink();
    $('#authLink').click(function (event) {
        event.preventDefault();
        window.location = $(this).attr("href");
    });
};

setAlert('info', 'Move all... the... things!');

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

    file.objects[target.id] = {
        width: target.style.width,
        height: target.style.height,
        x: x,
        y: y,
    };
    saveCookies();
};

var restrictObj = {
    restriction: '.page',
    endOnly: false,
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
// -- Menu --
// --------------------------------------------------------------------------------------
$('#moveBtn').click(function() {
    moveEnabled = true;
    setBodyTag();
    $(this).addClass('active');
    $('#inputBtn').removeClass('active');
    $('.display').attr("contentEditable", false);
});
$('#inputBtn').click(function() {
    moveEnabled = false;
    setBodyTag();
    setCharacter();
    $(this).addClass('active');
    $('#moveBtn').removeClass('active');
    $('#showBtn').trigger('click');
    $('.display').attr("contentEditable", true);
});

$('#hideBtn').click(function() {
    $('#hideBtn, .display').hide();
    $('#showBtn').show();
});
$('#showBtn').click(function() {
    $('#showBtn').hide();
    $('#hideBtn, .display').show();
});

$('#resetBtn').click(function() {
    if ( moveEnabled === true ) {
        resetObjects();
        document.cookie = "objects=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    } else {
        resetCharacter();
        document.cookie = "character=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "notes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        setCharacter();
    };
});

$('#printBtn').click(function() {
    window.print();
});
$('#saveLink').click(function() {
    saveFile();
});

// --------------------------------------------------------------------------------------
// -- Display Setup --
// --------------------------------------------------------------------------------------
$('.display').blur(function() {
    var dit = $(this);

    if ( dit.attr('id') === "characterNameDisplay" ) {
        if ( dit.text() !== "" ) {
            file.character.name = dit.text();
        } else {
            file.character.name = "JoSheet";
        };
    };
    if ( dit.attr('id') === "levelDisplay" ) {
        file.character.level = dit.text();
    };
    if ( dit.attr('id') === "playerNameDisplay" ) {
        file.character.player = dit.text();
    };
    if ( dit.attr('id') === "raceDisplay" ) {
        file.character.race = dit.text();
    };
    if ( dit.attr('id') === "classDisplay" ) {
        file.character.class = dit.text();
    };
    if ( dit.attr('id') === "backgroundDisplay" ) {
        file.character.background = dit.text();
    };

    saveCookies();
    setCharacter();
});

}); // ----------------------------------------------------------------------------------

function setObjects() {
    for ( var i = 0; i < Object.keys(file.objects).length; i++ ) {
        var naam = Object.keys(file.objects)[i];
        var obj = $("#" + naam);
        obj.removeAttr("data-x");
        obj.removeAttr("data-y");
        obj.removeAttr("style");

        var x = file.objects[naam].x;
        var y = file.objects[naam].y;

        if ( file.objects[naam].x ) {
            obj.css("transform", "translate(" + x + "px, " + y + "px)");
            obj.attr("data-x", x);
        };
        if ( file.objects[naam].y ) {
            obj.css("transform", "translate(" + x + "px, " + y + "px)");
            obj.attr("data-y", y);
        };
        if ( file.objects[naam].width ) {
            obj.width(file.objects[naam].width);
        };
        if ( file.objects[naam].height ) {
            obj.height(file.objects[naam].height);
        };
    };
};

function resetObjects() {
    file.objects = {
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
    $('#characterNameDisplay').text(file.character.name);
    $('#playerNameDisplay').text(file.character.player);
    $('#levelDisplay').text(file.character.level);

    if ( typeof ClassList[file.character.race] !== "undefined" ) {
        $('#raceDisplay').text(RaceList[file.character.race].name);
    } else {
        $('#raceDisplay').text(file.character.race);
    };

    if ( typeof ClassList[file.character.class] !== "undefined" ) {
        $('#classDisplay').text(ClassList[file.character.class].name);
    } else {
        $('#classDisplay').text(file.character.class);
    };

    if ( typeof ClassList[file.character.background] !== "undefined" ) {
        $('#backgroundDisplay').text(BackgroundList[file.character.background].name);
    } else {
        $('#backgroundDisplay').text(file.character.background);
    };
};

function resetCharacter() {
    file.character = {
        name : "JoSheet",
        player : "",
        level : 1,
        race : "",
        subRace : "",
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
        saves : {},
        skills : {},
        health : {},
        feats : {},
        languages : {},
        armor : "",
        shield : "",
        weapons : {},
        ammo : {},
        equipment : {
            magicItems : {},
            currency : {},
        },
        gender : "",
        alignment : "",
        age : "",
        faith : "",
        height : "",
        weight : "",
        hair : "",
        skin : "",
        eyes : "",
    };
    file.notes = {
        appearance : "",
        history : "",
        allies : "",
        enemies : "",
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

function saveFile() {
    var url = "data:text/plain," + encodeURIComponent(JSON.stringify(file));
    var filename = file.character.name + " (lvl " + file.character.level + " " + file.character.class + ")" + ".txt";
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
                file = JSON.parse(reader.result);
                setObjects();
                setCharacter();
                saveCookies();
                setAlert('success', 'Character loaded.');
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

function setAuthLink() {
    var dbx = new Dropbox({ clientId: CLIENT_ID });
    //var authUrl = dbx.getAuthenticationUrl('http://localhost/~Joyce/JoSheet/');
    var authUrl = dbx.getAuthenticationUrl('https://joycekimberly.github.io/JoSheet/');
    document.getElementById('authLink').href = authUrl;
    $('#saveLink').hide();
    $('#authLink').show();
};

function setAlert(type, msg) {
    $('#alerts').append('\
        <div class="alert alert-' + type + ' alert-dismissible fade show boxShadow" role="alert">\
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
            <div class="content">' + msg + '</div>\
        </div>\
    ');
    setTimeout(function() {
        $('.alert-' + type).alert('close');
    }, 5000);
};

function saveCookies() {
    var d = new Date();
    d.setTime(d.getTime() + (14*24*60*60*1000));
    
    document.cookie = "objects=" + JSON.stringify(file.objects) + "; expires=" + d.toUTCString() + "; path=/";
    document.cookie = "character=" + JSON.stringify(file.character) + "; expires=" + d.toUTCString() + "; path=/";
    document.cookie = "notes=" + JSON.stringify(file.notes) + "; expires=" + d.toUTCString() + "; path=/";
};
function loadCookies() {
    if ( getCookie("objects") ) {
        file.objects = JSON.parse(getCookie("objects"));
    };
    if ( getCookie("character") ) {
        file.character = JSON.parse(getCookie("character"));
    };
    if ( getCookie("notes") ) {
        file.notes = JSON.parse(getCookie("notes"));
    };
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
