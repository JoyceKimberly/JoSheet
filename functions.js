var cWidth = 745;
var moveEnabled = true;
window.file = {
  objects   : {},
  character : {},
  notes     : {},
};
var pages = 3;
var characterFiles = [];

$(function() { // -----------------------------------------------------------------------
  loadCookies();
  setObjects();
  setCharacter();

  var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth,
    document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var zoomScale = ((vw-30)/cWidth);

  window.addEventListener("resize", function() {
    $('#blockMenuContainer, #page1').css("margin-top", ($('#navbar').outerHeight()));
  }, false);
  $('#blockMenuContainer, #page1').css("margin-top", ($('#navbar').outerHeight()));

  if ( !!getAccessToken() ) {
    if ( typeof Dropbox === "undefined" ) {
      $('#fileMenu').hide();
      setAlert('warning', 'Dropbox features are currently unavailable.');
      return;
    };
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
  $('#hiddenFields input, #hiddenFields select').wrap("<div></div>").before(function() {
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
    });
  };

  $('select.data-list-input').change(function() {
    $(this).siblings('input.data-list-input').val($(this).val());
  });
  $('input.data-list-input').change(function() {
    $(this).siblings('select.data-list-input').val('');
  });

  // ------------------------------------------------------------------------------------
  // -- Fields --
  // ------------------------------------------------------------------------------------
  /*
    $('div.notes').on('touchstart mousedown', function() {
      var $dit = $(this);
      $dit.siblings('textarea.notes').show().focus();
      $dit.hide();
    });
    $('textarea.notes').on('focusout', function() {
      var $dit = $(this);
      $dit.siblings('div.notes').show();
      $dit.hide();
      tDoc.getField($dit.attr('[name]'));
    });
  */

  function resetCharacter() {
    file.character = {
      "Name" : "JoSheet",
    };
    file.notes = {};
    $('[name]').val('');
    $('input[type=checkbox]').prop('checked', false);
  };

  function setCharacter() {
    for ( var i = 0; i < Object.keys(file.character).length; i++ ) {
      var key = Object.keys(file.character)[i];
      var $ele = $('[name="' + key + '"]');

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
    $('.name').text(decodeURIComponent(file.character["Name"]));
    //console.log(tDoc); // debug
  };

  $('body').on('change focusout', '[name]', function() {
    var $ele = $(this);
    var character = {};
    var key = $ele.attr('name');

    if ( key === "Class and Levels" ) {
      setJoClass();
    } else if ( key === "Race" ) {
      setJoRace();
    } else if ( key === "Background" ) {
      setJoBackground();
    } else if ( key === "Level" ) {
      calculateAll();
      setJoLevel();
    } else if ( key === "Proficiency Bonus" ) {
      setJoProfBonus();
    } else if ( key === "AC" ) {
      setJoAc();
    } else if ( key === "AC Dexterity Modifier" ) {
      setJoAcDex();
    } else if ( key === "HP Max" ) {
      setJoHp();
    } else if ( key === "AC Armor Description" ) {
      if ( allowCalc ) { ApplyArmor($ele.val()); };
      setJoAc();
    } else if ( key === "AC Shield Bonus Description" ) {
      if ( allowCalc ) { ApplyShield($ele.val()); };
      setJoAc();
    } else if ( key === "Background Feature" ) {
      setJoBgF();
    } else if ( key === "Spell Save DC 1" ) {
      setJoSpellSave();
    } else if ( $ele.is('.attr') ) {
      setJoAttrMod($ele);
    } else if ( $ele.is('.save') ) {
      setJoSave($ele);
    } else if ( $ele.is('.skill') ) {
      if ( allowCalc ) {
        event = Object.create(event, {
          target: { value: $ele.get(0) }
        });
        CalcSkill();
        $ele.val(Number(event.value));
      };
    } else if ( $ele.is('.attack') ) {
      if ( allowCalc ) {
        event = Object.create(event, {
          target: { value: $ele.get(0) }
        });
        ApplyWeapon($ele.val(), key);
        CalcAttackDmgHit();
      };
    } else if ( $ele.is('.hitDie') ) {
      if ( allowCalc ) {
        event = Object.create(event, {
          target: { value: $ele.get(0) },
          value: { value: $ele.val().split("+")[0].replace("d", "") }
        });
        FormatHD();
        $ele.val(event.value);
      };
    } else if ( $ele.is('.feat') ) {
      if ( allowCalc ) {
        event = Object.create(event);
        ApplyFeat($ele.val(), key.slice(-1));
      };
    };

    if ( key === "Name" ) {
      if ( $ele.val() !== "" ) {
        character[key] = encodeURIComponent($ele.val());
      } else {
        character[key] = "JoSheet";
      };

    } else if ( $ele.is('.number') ) {
      character[key] = Number($ele.val());

    } else if ( $ele.is('input[type=checkbox]') ) {
      character[key] = $ele.prop('checked');

    } else if ( $ele.val() === "" ) {
      delete file.character[key];

    } else {
      character[key] = encodeURIComponent($ele.val());
    };
    $.extend(true, file.character, character);
    saveCookies();
    //setCharacter();

    if ( $ele.is('.mod') ) {
      $ele.val((file.character[key]>0?'+':'') + file.character[key]);
    } /*else if ( $ele.is('.hitDie') ) {
      if ( allowCalc ) {
        event.value = $ele.val().split("+")[0].replace("d", "");
        FormatHD();
        $ele.val(event.value);
      };
    }*/;

    if ( $ele.is('.skillProfCheck') ) {
      if ( allowCalc ) {
        $ele.parents('.savesSkill').find('.skill').trigger('change');
      };
    };
  });

  // ------------------------------------------------------------------------------------
  // -- Calculation --
  // ------------------------------------------------------------------------------------
  function setJoClass() { if ( allowCalc ) {
    ApplyClasses($('[name="Class and Levels"]').val());
    $.each(AbilityScores.abbreviations, function(key, value) {
      file.character[value + ' Remember'] = $('[name="' + value + ' Remember"]').val();
    });
    MakeClassMenu();
    if ( Menus.classfeatures[0].oSubMenu ) {
      $('#classConfig').show();
      var $menu = $('#classConfig .card-block');
      $menu.html('');
      $.each(Menus.classfeatures[0].oSubMenu, function(i, value) {
        $menu.append('\
          <div class="form-group">\
            <label for="classFeat' + i + '" class="form-label form-label-sm">' + value.cName + '</label>\
            <select multiple id="classFeat' + i + '" data-class-feat="' + i + '" class="custom-select"></select>\
          </div>\
        ');
        var $subMenu = $('#classFeat' + i);
        $.each(Menus.classfeatures[0].oSubMenu[i].oSubMenu, function(i2, value2) {
          $subMenu.append('<option value="' + i2 + '">' + value2.cName + '</option>');
        });
      });
    };
  }};

  function setJoRace() { if ( allowCalc ) {
    ApplyRace($('[name="Race Display"]').val());
    MakeRaceMenu();
  }};

  function setJoBackground() { if ( allowCalc ) {
    ApplyBackground($('[name="Background"]').val());
    MakeBackgroundMenu();
    if ( Menus.background[3] ) {
      $('#backgroundConfig').show();
      var $menu = $('#persTraitsConfig');
      $menu.html('');
      $.each(Menus.background[0].oSubMenu, function(i, value) {
        $menu.append('<option value="' + i + '">' + value.cName + '</option>');
        if ( $.inArray(i.toString(), file.character.persTraitsConfig) !== -1 ) {
          AddString("Personality Trait", CurrentBackground.trait[i], " ");
        };
      });
      $menu = $('#idealsConfig');
      $menu.html('<option selected></option>');
      $.each(Menus.background[1].oSubMenu, function(i, value) {
        $menu.append('<option value="' + i + '">' + CurrentBackground.ideal[i][1] + '</option>');
        if ( $.inArray(i.toString(), file.character.idealsConfig) !== -1 ) {
          Value("Ideal", CurrentBackground.ideal[i][1]);
        };
      });
      $menu = $('#bondsConfig');
      $menu.html('<option selected></option>');
      $.each(Menus.background[2].oSubMenu, function(i, value) {
        $menu.append('<option value="' + i + '">' + value.cName + '</option>');
        if ( $.inArray(i.toString(), file.character.bondsConfig) !== -1 ) {
          Value("Bond", CurrentBackground.bond[i]);
        };
      });
      $menu = $('#flawsConfig');
      $menu.html('<option selected></option>');
      $.each(Menus.background[3].oSubMenu, function(i, value) {
        $menu.append('<option value="' + i + '">' + value.cName + '</option>');
        if ( $.inArray(i.toString(), file.character.flawsConfig) !== -1 ) {
          Value("Flaw", CurrentBackground.flaw[i]);
        };
      });
    };
  }};

  function setJoLevel() { if ( allowCalc ) {
    $('[name="Character Level"]').val(parseInt($('[name="Level"]').val())).trigger('change');
  }};

  function setJoProfBonus() { if ( allowCalc ) {
    var $ele = $('[name="Proficiency Bonus"]');
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    ProfBonus();
    $ele.val(Number(event.value));
  }};

  function setJoAc() { if ( allowCalc ) {
    var $ele = $('[name="AC"]');
    event = Object.create(event);
    CalcAC();
    $ele.val(Number(event.value));
  }};

  function setJoAcDex() { if ( allowCalc ) {
    var $ele = $('[name="AC Dexterity Modifier"]');
    $ele.val(parseInt(calcMaxDexToAC()));
  }};

  function setJoHp() { if ( allowCalc ) {
    var $ele = $('[name="HP Max"]');
    SetHPTooltip();
  }};

  function setJoBgF() { if ( allowCalc ) {
    var $ele = $('[name="Background Feature"]');
    event = Object.create(event);
    ApplyBackgroundFeature($ele.val());
  }};

  function setJoSpellSave() { if ( allowCalc ) {
    var $ele = $('[name="Spell Save DC 1"]');
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    CalcAbilityDC();
    $ele.val(event.value);
  }};

  function setJoAttrMod($ele) { if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    CalcMod();
    $ele.val((Number(event.value)>0?'+':'') + Number(event.value));
  }};

  function setJoSave($ele) { if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    CalcSave();
    $ele.val((Number(event.value)>0?'+':'') + Number(event.value));
  }};

/*
} else if ( $ele.is('.skill') ) {
  if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    CalcSkill();
    $ele.val(Number(event.value));
  };
} else if ( $ele.is('.attack') ) {
  if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    ApplyWeapon($ele.val(), key);
    CalcAttackDmgHit();
  };
} else if ( $ele.is('.hitDie') ) {
  if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) },
      value: { value: $ele.val().split("+")[0].replace("d", "") }
    });
    FormatHD();
    $ele.val(event.value);
  };
} else if ( $ele.is('.feat') ) {
  if ( allowCalc ) {
    event = Object.create(event);
    ApplyFeat($ele.val(), key.slice(-1));
  };
};
*/

  calculateAll = function() { if ( allowCalc ) {
    setJoLevel();
    setJoRace();
    setJoClass();
    setJoBackground();
    setJoAbilityScores();
    setJoProfBonus();
    $('.attr').each(function(i, value) {
      setJoAttrMod($(value));
    });
    ApplyArmor($('#armor').val());
    ApplyShield($('#shield').val());
    setJoAcDex();
    setJoHp();
    //$('.save, .skill, .hitDie, .attack, .feat').trigger('change');
    //setJoSave
    $('.save').each(function(i, value) {
      setJoSave($(value));
    });
    setJoBgF();
    setJoAc();
    ApplyProficiencies(true);
    setJoSpells();
    setJoSpellSave();
  }};

  $('#calcModal').on('change focusout', 'select', function() {
    var $dit = $(this);
    file.character[$dit.attr("id")] = $dit.val();
  });

  $('#calcModal').on('show.bs.modal', function() { if ( allowCalc ) {
    initializeLists();
    $.each(AbilityScores.abbreviations, function(key, value) {
      var scores = $('[name="' + value + ' Remember"]').val().split(",");
      $("#base" + value).val(scores[0]);
      $("#race" + value).val(scores[1]);
      $("#extra" + value).val(scores[2]);
      $("#magic" + value).val(scores[4]);
      $("#feat" + value).val(scores[5]);
    });
    $('#calcModal').find('select').each(function(i, ele) {
      $(ele).val(file.character[$(ele).attr("id")]);
    });

  }}).on('touchstart mousedown', '#calcModalSave', function() {
    var $dit = $(this);
    var $progressBar = $dit.siblings('.progress');
    $progressBar.show();

  }).on('click', '#calcModalSave', function() { if ( allowCalc ) {
    var $dit = $(this);
    var $calcModal = $('#calcModal');
    var $progressBar = $dit.siblings('.progress');
    $.each(AbilityScores.abbreviations, function(key, value) {
      Value(value + " Remember", Number($("#base" + value).val()) + "," + Number($("#race" + value).val()) + "," + Number($("#extra" + value).val()) + ",0," + Number($("#magic" + value).val()) + "," + Number($("#feat" + value).val()));
      $('[name="' + value + ' Remember"]').trigger('change');
    });
    $calcModal.find('select').each(function(i, ele) {
      if ( Menus.classfeatures[0].oSubMenu ) {
        if ( $(ele).attr("data-class-feat") !== undefined ) {
          $.each(Menus.classfeatures[0].oSubMenu[$(ele).attr("data-class-feat")].oSubMenu, function(key, value) {
            if ( $.inArray(key.toString(), $(ele).val()) !== -1 ) {
              var cReturn = Menus.classfeatures[0].oSubMenu[$(ele).attr("data-class-feat")].oSubMenu[key].cReturn.split("#");
              var newReturn = [cReturn[0], cReturn[1], cReturn[2].toLowerCase(), cReturn[3]];
              ClassFeatureOptions(newReturn, "add");
            } else {
              var cReturn = Menus.classfeatures[0].oSubMenu[$(ele).attr("data-class-feat")].oSubMenu[key].cReturn.split("#");
              var newReturn = [cReturn[0], cReturn[1], cReturn[2].toLowerCase(), cReturn[3]];
              //ClassFeatureOptions(newReturn, "remove");
            };
          });
        };
      };
      if ( Menus.background[3] ) {
        if ( $(ele).is('#persTraitsConfig') ) {
          $.each(Menus.background[0].oSubMenu, function(key, value) {
            if ( $.inArray(key.toString(), $(ele).val()) !== -1 ) {
              Menus.background[0].oSubMenu[key].bMarked = true;
              AddString("Personality Trait", CurrentBackground.trait[key], " ");
            } else {
              Menus.background[0].oSubMenu[key].bMarked = false;
            };
          });
        };
        if ( $(ele).is('#idealsConfig') ) {
          $.each(Menus.background[1].oSubMenu, function(key, value) {
            if ( $.inArray(key.toString(), $(ele).val()) !== -1 ) {
              Value("Ideal", CurrentBackground.ideal[key][1]);
            };
          });
        };
        if ( $(ele).is('#bondsConfig') ) {
          $.each(Menus.background[2].oSubMenu, function(key, value) {
            if ( $.inArray(key.toString(), $(ele).val()) !== -1 ) {
              Value("Bond", CurrentBackground.bond[key]);
            };
          });
        };
        if ( $(ele).is('#flawsConfig') ) {
          $.each(Menus.background[3].oSubMenu, function(key, value) {
            if ( $.inArray(key.toString(), $(ele).val()) !== -1 ) {
              Value("Flaw", CurrentBackground.flaw[key]);
            };
          });
        };
      };
    });
    setCharacter();
    saveCookies();
    calculateAll();
    $progressBar.hide();
    $dit.removeClass('btn-primary').addClass('btn-success');

  }}).on('hidden.bs.modal', function() {
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

    if ( !isWebAppiOS && !isWebAppChrome ) {
      window.open(url, '_blank');
    };

    var filename = file.character["Name"] + ".txt";
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
          initializeLists();
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
  isWebAppiOS = (window.navigator.standalone == true);
  isWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);

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
