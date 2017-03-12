var cWidth = 745;
var moveEnabled = true;
window.file = {
  objects   : {},
  character : {},
  notes     : {},
};
window.allowCalc = true;
var pages = 3;
var characterFiles = [];

$(function() { // -----------------------------------------------------------------------
  loadCookies();
  setObjects();
  if ( allowCalc ) {
    //$('input').attr("disabled", true);
    initializeLists();
  };
  setCharacter();

  var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth,
    document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var zoomScale = ((vw-30)/cWidth);

  window.addEventListener("resize", function() {
    $('#blockMenuContainer, #page1').css("margin-top", ($('#navbar').outerHeight()));
  }, false);
  $('#blockMenuContainer, #page1').css("margin-top", ($('#navbar').outerHeight()));

  if ( !!getAccessToken() ) {
    dbx = new Dropbox({ accessToken: getAccessToken() });
    $('#authLink').hide();
    listCharacters();
    //setAlert('success', 'Success! You have connected to Dropbox.');
  } else {
    setAuthLink();
    $('#authLink').click(function(event) {
      event.preventDefault();
      window.location = $(this).attr("href");
    });
  };

  //setAlert('info', 'Move all... the... things!');
  //$('.page input').prop('disabled', true);
  $('[data-toggle="tooltip"]').tooltip();
  $('#hiddenFields input').wrap("<div></div>").before(function() {
    return "<label>" + $(this).attr("name") + ": </label>";
  });

  function setBodyTag() {
    var body = $('body');
    if ( moveEnabled === true ) {
      body.removeClass('inputMode').addClass('moveMode');
    } else {
      body.removeClass('moveMode').addClass('inputMode');
    };
  };
  setBodyTag();

  // ------------------------------------------------------------------------------------
  // -- Menu --
  // ------------------------------------------------------------------------------------
  $('#inputBtn').click(function() {
    moveEnabled = false;
    setBodyTag();
    $(this).addClass('btn-info active').removeClass('btn-secondary');
    $('#moveBtn').removeClass('btn-info active').addClass('btn-secondary');
    $('#showBtn').trigger('click');
    $('#edit').removeClass('show').hide();
    $('#moveResetBtn').hide();
    $('#inputResetBtn, #calcBtn').show();
  });
  $('#moveBtn').click(function() {
    moveEnabled = true;
    setBodyTag();
    $(this).addClass('btn-info active').removeClass('btn-secondary');
    $('#inputBtn').removeClass('btn-info active').addClass('btn-secondary');
    $('#inputResetBtn').hide();
    $('#moveResetBtn').show();
  });

  $('#hideBtn').click(function() {
    $('#hideBtn, .display, .custom-checkbox .custom-control-indicator').hide();
    $('#showBtn, .custom-checkbox .checkBall').show();
  });
  $('#showBtn').click(function() {
    setCharacter();
    calculateAll();
    $('#showBtn, .custom-checkbox .checkBall').hide();
    $('#hideBtn, .display, .custom-checkbox .custom-control-indicator').show();
  });

  $('#calcBtn').click(function() {
    $('#calcModal').modal('show');
  });

  $('#moveResetBtn').click(function() {
    resetObjects();
    document.cookie = "objects=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setObjects();
  });
  $('#inputResetBtn').click(function() {
    resetCharacter();
    document.cookie = "character=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "notes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setCharacter();
    if ( allowCalc ) {
      initializeLists();
    };
  });

  $('#printBtn').click(function() {
    window.print();
  });
  $('#saveLink').click(function() {
    saveFile();
  });

  // ------------------------------------------------------------------------------------
  // -- Objects --
  // ------------------------------------------------------------------------------------
  $('.outerPage').on('touchstart mousedown', function() {
    if ( moveEnabled === true ) {
      $(this).addClass("grid");
    };
  }).on('touchend mouseup', function() {
    $(this).removeClass("grid");
  });

  function moveListener(event) {
    var target = event.target,
      x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    if ( event.type === "resizemove" ) {
      target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0),
        y = (parseFloat(target.getAttribute('data-y')) || 0);

      if ( $(target).hasClass('resizableX') ) {
        target.style.width  = event.rect.width + 'px';

      } else if ( $(target).hasClass('resizableY') ) {
        target.style.height = event.rect.height + 'px';

      } else {
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
      };

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

    overflowHider($(target));
    saveCookies();
  };

  var restrictObj = {
    restriction: 'parent',
    elementRect: { top: 0, right: 1, bottom: 1, left: 0 },
  };

  var snapObj = {
    targets: [ interact.createSnapGrid({ x: 5, y: 5 }) ],
    relativePoints: [ { x: 0, y: 0 } ],
  };

  interact('.moveMode .draggable').origin('parent').draggable({
    restrict: restrictObj,
    snap: snapObj,
    onmove: moveListener,
  });

  interact('.moveMode .resizable').origin('parent').draggable({
    restrict: restrictObj,
    snap: snapObj,
    onmove: moveListener,

  }).resizable({
    preserveAspectRatio: false,
    restrict: restrictObj,
    edges: { top: true, right: true, bottom: true, left: true },
    invert: 'reposition',
    max: Infinity,
    snap: snapObj,

  }).on('resizemove', moveListener);

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
      if ( file.objects[naam].page ) {
        objectToPage(obj, file.objects[naam].page);
      };
    };
    overflowHider($('.resizable'));
  };

  function resetObjects() {
    file.objects = {};
    var obj = $('.draggable, .resizable');
    obj.removeAttr("data-x");
    obj.removeAttr("data-y");
    obj.removeAttr("style");

    $.getJSON( "presets/default.json", function(objects) {
      $.extend(true, file, objects);
    })
    .done(function() {
      setObjects();
    })
    .fail(function(jqxhr, textStatus, error) {
      setAlert( "danger", error );
    });
    overflowHider($('.resizable'));
  };

  $('.draggable, .resizable').on('touchstart mouseenter', function() {
    if ( moveEnabled ) {
      var dit = $(this);
      var pos = dit.offset();
      var oldPage = dit.parents('.outerPage').attr('data-page');
      var edit = $('#edit');
      var menu = edit.find('.dropdown-menu');

      edit.show();
      edit.offset({ top: pos.top, left: pos.left });
      menu.html('<h6 class="dropdown-header">Move block to</h6>');
      for ( var i = 0; i < pages; i++ ) {
        if ( (i+1) != oldPage ) {
          menu.append('<a class="pageBtn dropdown-item" data-source="' + dit.attr('id') + '" data-toPage="' + (i+1) + '">Page ' + (i+1) + '</a>');
        };
      };
      menu.append('<div style="position: initial;" class="dropdown-divider"></div>\
        <a class="pageBtn dropdown-item" data-source="' + dit.attr('id') + '" data-toPage="4">Remove</a>');
    };
  });

  $('#edit').on('mouseleave', function() {
    var edit = $('#edit');
    edit.removeClass('show');
    edit.hide();
  }).on('click', '.pageBtn', function() {
    var dit = $(this);
    var source = dit.attr('data-source');
    var parent = $('#' + source);
    var newPage = dit.attr('data-toPage');
    var obj = {
      [source] : {
        page : parseInt(dit.attr('data-toPage'))
      }
    };
    $.extend(true, file.objects, obj);
    objectToPage(parent, newPage);
    saveCookies();
  });

  function objectToPage(obj, page) {
    var newPage = $('#page' + page + ' .page');
    newPage.append(obj);
  };

  function overflowHider(obj) {
    $.each( obj, function() {
      var dit = $(this);
      var visibleHeight = dit.find('.content').height();
      var totalHeight = 0;
      dit.find('.longContent').children('div').css("visibility", "visible");
      dit.find('.longContent').children('div').each(function() {
        var dit = $(this);
        totalHeight = totalHeight + dit.outerHeight(true);
        if ( totalHeight > visibleHeight ) {
          dit.css("visibility", "hidden");
        };
      });

      var underlines = dit.find('.underlines');
      var lineHeight = dit.find('.line').outerHeight(true);
      var nrLines = (visibleHeight / lineHeight)-1;
      underlines.find('.line').remove();
      for ( var i = 0; i < nrLines; i++ ) {
        underlines.append('<div class="line"></div>');
      };
    });
  };

  // ------------------------------------------------------------------------------------
  // -- Fields --
  // ------------------------------------------------------------------------------------
  function resetCharacter() {
    file.character = {
      name : "JoSheet",
    };
    file.notes = {};
  };

  $('.display').on('focusout', function() {
    var $ele = $(event.target);
    var character = {};
    var key = $ele.attr('id');

    if ( $ele.is('#name') ) {
      if ( $ele.val() !== "" ) {
        character.name = encodeURIComponent($ele.val());
      } else {
        character.name = "JoSheet";
      };

    } else if ( $ele.is('.number') ) {
      character[key] = Number($ele.val());

    } else if ( $ele.is('input[type=checkbox]') ) {
      character[key] = $ele.prop('checked');

    } else {
      character[key] = encodeURIComponent($ele.val());
    };

    $.extend(true, file.character, character);
    saveCookies();
    setCharacter();
  });

  function setValue($ele, newVal) {
    if ( $ele.is('.display.number.mod') ) {
      $ele.val((newVal>0?'+':'') + newVal);
    } else {
      $ele.val(newVal);
    };
    file.character[$ele.attr('id')] = newVal;
    saveCookies();
  };

  function setCharacter() {
    $('[name="Character Level"]').val(parseInt(file.character.level));
    for ( var i = 0; i < Object.keys(file.character).length; i++ ) {
      var key = Object.keys(file.character)[i];
      var $ele = $("#" + key);

      if ( $ele.is('.display.number.mod') ) {
        $ele.val((file.character[key]>0?'+':'') + file.character[key]);

      } else if ( $ele.is('.number') ) {
        $ele.val(file.character[key]);

      } else if ( $ele.is('input[type=checkbox]') ) {
        $ele.prop('checked', file.character[key]);

      } else {
        $ele.val(decodeURIComponent(file.character[key]));
      };
    };
    $('.name').text($('#name').val());
    //console.log(tDoc); // debug
  };

  // ------------------------------------------------------------------------------------
  // -- Calculation --
  // ------------------------------------------------------------------------------------
  $('[name="Class and Levels"]').on('change', function() { if ( allowCalc ) {
    ApplyClasses($(this).val());
  }});

  $('[name="Race"]').on('change', function() { if ( allowCalc ) {
    ApplyRace($(this).val());
  }});

  $('[name="Background"]').on('change', function() { if ( allowCalc ) {
    ApplyBackground($(this).val());
    var $menu = $('#persTraitsConfig');
    $menu.html('');
    MakeBackgroundMenu();
    $.each(Menus.background[0].oSubMenu, function(i, value) {
      $menu.append('\
<label class="custom-control custom-checkbox">\
  <input data-index="' + i + '" type="checkbox" class="custom-control-input">\
  <span class="custom-control-indicator"></span>\
  <span class="custom-control-description form-control-sm">' + value.cName + '</span>\
</label>\
      ');
    });

    $menu = $('#idealsConfig');
    $.each(Menus.background[1].oSubMenu, function(i, value) {    
      $menu.append('\
<label class="custom-control custom-radio">\
  <input data-index="' + i + '" name="idealsConfig" type="radio" class="custom-control-input">\
  <span class="custom-control-indicator"></span>\
  <span class="custom-control-description form-control-sm">' + value.cName + '</span>\
</label>\
      ');
    });
    console.log(Menus);
  }});

  $('#level').on('change', function() { if ( allowCalc ) {
    $('[name="Character Level"]').val(parseInt($ele.val()));
  }});

  $('[name="Proficiency Bonus"]').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    event.target.name = $dit.attr("name");
    ProfBonus();
    var newVal = Number(event.value);
    setValue($dit, newVal);
  }});

  $('.attr').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    event.target.name = $dit.attr("name");
    CalcMod();
    var newVal = Number(event.value);
    setValue($dit, newVal);
  }});

  $('.save').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    event.target.name = $dit.attr("name");
    CalcSave();
    var newVal = Number(event.value);
    setValue($dit, newVal);
  }});

  $('.skill').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    event.target.name = $dit.attr("name");
    CalcSkill();
    var newVal = Number(event.value);
    setValue($dit, newVal);
  }});

  $('.skillProfCheck').change(function() { if ( allowCalc ) {
    $(this).parents('.savesSkill').find('.skill').trigger('change');
  }});

  $('[name="AC"]').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    CalcAC();
    var newVal = Number(event.value);
    setValue($dit, newVal);
  }});

  $('[name="AC Dexterity Modifier"]').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    var newVal = parseInt(calcMaxDexToAC());
    setValue($dit, newVal);
  }});

  $('[name="AC Armor Description"]').on('change', function() { if ( allowCalc ) {
    ApplyArmor($(this).val());
    $('[name="AC"]').trigger('change');
  }});

  $('[name="AC Shield Bonus Description"]').on('change', function() { if ( allowCalc ) {
    ApplyShield($(this).val());
    $('[name="AC"]').trigger('change');
  }});

  $('.attack').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    event.target.name = $dit.attr("name");
    ApplyWeapon($dit.val(), $dit.attr("name"));
    CalcAttackDmgHit();
  }});

  $('.hitDie').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    event.value = $dit.val().split("+")[0].replace("d", "");
    FormatHD();
    var newVal = event.value;
    setValue($dit, newVal);
  }});

  $('[name="HP Max"]').on('change', function() { if ( allowCalc ) {
    var $dit = $(this);
    SetHPTooltip();
    setValue($dit, $dit.val());
  }});


  calculateAll = function() {
    $('[name="Character Level"]').val(parseInt(file.character.level));
    calcAbilityScores();
    $('[name="Race"], [name="Class and Levels"], [name="Background"], #profBonus, .attr').trigger('change');
    ApplyArmor($('#armor').val());
    ApplyShield($('#shield').val());
    $('[name="AC Dexterity Modifier"]').val(parseInt(calcMaxDexToAC()));
    $('.save, .skill, [name="AC"], .hitDie, .attack, [name="HP Max"]').trigger('change');
    ApplyProficiencies(true);
    return true;
  };

  $('#calcModal').on('touchstart mousedown', '#calcModalSave', function() {
    var $dit = $(this);
    var $progressBar = $dit.siblings('.progress');
    $progressBar.show();

  }).on('click', '#calcModalSave', function() {
    var $dit = $(this);
    var $progressBar = $dit.siblings('.progress');
    var character = {};
    $.each(AbilityScores.abbreviations, function(key, value) {
      character["base" + value] = Number($("#base" + value).val());
      character["race" + value] = Number($("#race" + value).val());
      character["feat" + value] = Number($("#feat" + value).val());
      character["magic" + value] = Number($("#magic" + value).val());
      character["extra" + value] = Number($("#extra" + value).val());
      Value(value + " Remember", character["base" + value] + "," + character["race" + value] + "," + character["extra" + value] + ",0," + character["magic" + value] + "," + character["feat" + value]);
    });
    $.extend(true, file.character, character);
    setCharacter();
    saveCookies();
    calculateAll();
    $progressBar.hide();
    $dit.removeClass('btn-primary').addClass('btn-success');

    MakeClassMenu();
    MakeRaceMenu();
    console.log(Menus); // debug

  }).on('show.bs.modal', function() {
    $.each(AbilityScores.abbreviations, function(key, value) {
      $("#base" + value).val(file.character["base" + value]);
      $("#race" + value).val(file.character["race" + value]);
      $("#magic" + value).val(file.character["magic" + value]);
      $("#extra" + value).val(file.character["extra" + value]);
    });

  }).on('hidden.bs.modal', function() {
    $(this).find('.btnSave').removeClass('btn-success').addClass('btn-primary');
  });

  // ------------------------------------------------------------------------------------
  // -- Dropbox --
  // ------------------------------------------------------------------------------------
  function listCharacters() {
    var dbx = new Dropbox({ accessToken: getAccessToken() });
    dbx.filesListFolder({ path: '' })
      .then(function(response) {
        characterFiles = response.entries;
        $('#saveLink').show();
        $('.loadCharacter').remove();

        for ( var i = 0; i < characterFiles.length; i++ ) {
          $('#authLink').before('\
          <div class="loadCharacter dropdown-item">\
            <a id="load' + i + '">\
              <i class="fa fa-user fa-fw"></i>\
              ' + characterFiles[i].name.slice(0, -4) + '\
            </a>\
            <button type="button" id="delete' + i + '" class="deleteCharacter close">\
              <i class="fa fa-trash"></i>\
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
        console.error(error);
        setAlert('danger', error);
        setAuthLink();
      });
  };

  function saveFile() {
    console.log(file);
    var dbx = new Dropbox({ accessToken: getAccessToken() });
    var url = "data:text/plain," + encodeURIComponent(JSON.stringify(file));
    var filename = file.character.name + " (lvl " + file.character.level + " " + file.character.class + ")" + ".txt";
    dbx.filesSaveUrl({ path: '/Apps/JoSheet/' + filename, url: url })
      .then(function(response) {
        setAlert('success', 'Character saved to your Dropbox.');
        listCharacters();
      })
      .catch(function(error) {
        console.error(error);
        setAlert('danger', error.error);
      });
  };

  function loadFile(i) {
    var dbx = new Dropbox({ accessToken: getAccessToken() });
    dbx.filesDownload({ path: characterFiles[i].path_lower })
      .then(function(response) {
        var blob = response.fileBlob;
        var reader = new FileReader();
        reader.onload = function() {
          resetObjects();
          resetCharacter();
          $.extend(true, file, JSON.parse(reader.result));
          setObjects();
          setCharacter();
          saveCookies();
          location.reload();
          setAlert('success', 'Character loaded.');
        }
        reader.readAsText(blob);
      })
      .catch(function(error) {
        console.error(error);
        setAlert('danger', error);
      });
  };

  function deleteFile(i) {
    var dbx = new Dropbox({ accessToken: getAccessToken() });
    dbx.filesDelete({ path: characterFiles[i].path_lower })
      .then(function(response) {
        setAlert('success', 'Character deleted from your Dropbox.');
        listCharacters();
      })
      .catch(function(error) {
        console.error(error);
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

  // ------------------------------------------------------------------------------------
  // -- Helpers --
  // ------------------------------------------------------------------------------------
  function loadCookies() {
    if ( !!getCookie("objects") ) {
      var objects = {};
      try {
        objects = JSON.parse(getCookie("objects"));
      } catch(error) {
        console.error(error);
        deleteCookie("objects");
      };
      $.extend(true, file.objects, objects);
    } else {
      resetObjects();
    };

    if ( !!getCookie("character") ) {
      var character = {};
      try {
        character = JSON.parse(getCookie("character"));
      } catch(error) {
        console.error(error);
        deleteCookie("character");
      };
      $.extend(true, file.character, character);
    } else {
      resetCharacter();
    };

    if ( !!getCookie("notes") ) {
      var notes = {};
      try {
        notes = JSON.parse(getCookie("notes"));
      } catch(error) {
        console.error(error);
        deleteCookie("notes");
      };
      $.extend(true, file.notes, notes);
    };
  };

  function setAlert(type, msg) {
    var $alert = $('\
      <div class="alert alert-' + type + ' alert-dismissible fade show boxShadow" role="alert">\
        <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>\
        <div class="content">' + JSON.stringify(msg) + '</div>\
      </div>\
    ').appendTo('#alerts');
    setTimeout(function() {
      $($alert).alert('close');
    }, (10 * 1000));
  };

}); // ----------------------------------------------------------------------------------
var CLIENT_ID = 'ztucdd8z8fjuh08';

// Parses the url and gets the access token if it is in the urls hash
function getAccessTokenFromUrl() {
  return utils.parseQueryString(window.location.hash).access_token;
};

function getAccessToken() {
  if ( !!getAccessTokenFromUrl() ) {
    var d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    document.cookie = "token=" + getAccessTokenFromUrl() + "; expires=" + d.toUTCString() + "; path=/";
    return getAccessTokenFromUrl();

  } else if ( !!getCookie("token") ) {
    return getCookie("token");
  } else {
    return "";
  };
};

// If the user was just redirected from authenticating, the urls hash will
// contain the access token.
function isAuthenticated() {
  return !!getAccessTokenFromUrl();
};

function saveCookies() {
  var d = new Date();
  d.setTime(d.getTime() + (14*24*60*60*1000));

  document.cookie = "objects=" + JSON.stringify(file.objects) + "; expires=" + d.toUTCString() + "; path=/";
  document.cookie = "character=" + JSON.stringify(file.character) + "; expires=" + d.toUTCString() + "; path=/";
  document.cookie = "notes=" + JSON.stringify(file.notes) + "; expires=" + d.toUTCString() + "; path=/";
};

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

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
};

(function(window) {/*
  window.onerror = function(msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
      console.error('Script Error: See Browser Console for Detail');
    } else {
      var message = [
        'Message: ' + msg,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + columnNo,
        'Error object: ' + JSON.stringify(error)
      ].join(' - ');
      console.error(message);
    };
    return true;
  };
*/
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
