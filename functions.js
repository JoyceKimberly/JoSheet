var cWidth = 745;
var moveEnabled = true;
window.file = {
  objects   : {},
  character : {},
};
var pages = 2;
var characterFiles = [];
var canDropbox = false;
event = new CustomEvent("event");

$(function() { // -----------------------------------------------------------------------
  if ( !!getAccessToken() ) {
    if ( typeof Dropbox === "undefined" ) {
      canDropbox = false;
      setAlert('warning', 'Dropbox features are currently unavailable.');
      return;
    };
    canDropbox = true;
    $('#authLink').hide();
    listCharacters();
    //setAlert('success', 'Success! You have connected to Dropbox.');
  } else {
    canDropbox = false;
    setAuthLink();
    $('#authLink').click(function(event) {
      event.preventDefault();
      window.location = $(this).attr("href");
    });
  };

  loadCookies();
  setObjects();
  setCharacter();

  var vw = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth,
    document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var zoomScale = ((vw-30)/cWidth);

  window.addEventListener("resize", function(event) {
    $('#blockMenuContainer, #page1').css("margin-top", ($('#navbar').outerHeight()));
  }, false);
  $('#blockMenuContainer, #page1').css("margin-top", ($('#navbar').outerHeight()));

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
  $('nav .navbar-brand').click(function(event) {
    location.reload(true);
  });

  $('#inputBtn').click(function(event) {
    moveEnabled = false;
    setBodyTag();
    $(this).addClass('btn-info active').removeClass('btn-secondary');
    $('#moveBtn').removeClass('btn-info active').addClass('btn-secondary');
    $('#showBtn').trigger('click');
    $('#edit').removeClass('show').hide();
    $('#moveResetBtn').hide();
    $('#inputResetBtn, #calcBtn').show();
    calculateAll();
  });
  $('#moveBtn').click(function(event) {
    moveEnabled = true;
    setBodyTag();
    $(this).addClass('btn-info active').removeClass('btn-secondary');
    $('#inputBtn').removeClass('btn-info active').addClass('btn-secondary');
    $('#inputResetBtn').hide();
    $('#moveResetBtn').show();
  });

  $('#hideBtn').click(function(event) {
    $('#hideBtn, .display, .custom-checkbox .custom-control-indicator').hide();
    $('#showBtn, .custom-checkbox .checkBall').show();
  });
  $('#showBtn').click(function(event) {
    //setCharacter();
    if ( allowCalc ) {
      AmendSpellsList();
      setSpellVariables();
      UpdateLevelFeatures("all");
    };
    calculateAll();
    $('#showBtn, .custom-checkbox .checkBall').hide();
    $('#hideBtn, .display, .custom-checkbox .custom-control-indicator').show();
  });

  $('#calcBtn').click(function(event) {
    $('#calcModal').modal('show');
  });

  $('#moveResetBtn').click(function(event) {
    resetObjects();
    document.cookie = "objects=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setObjects();
  });
  $('#inputResetBtn').click(function(event) {
    resetCharacter();
    document.cookie = "character=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setCharacter();
  });

  $('#printBtn').click(function(event) {
    window.print();
  });

  // ------------------------------------------------------------------------------------
  // -- Objects --
  // ------------------------------------------------------------------------------------
  $('.outerPage').on('touchstart mousedown', function(event) {
    if ( moveEnabled === true ) {
      $(this).addClass("grid");
    };
  }).on('touchend mouseup', function(event) {
    $(this).removeClass("grid");
  });

  function moveListener(event) {
    var obj = {};
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

    obj[target.id] = {
      width: target.style.width,
      height: target.style.height,
      x: x,
      y: y,
    };
    overflowHider($(target));
    $.extend(true, file.objects, obj);
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

  $('.draggable, .resizable').on('touchstart mouseenter', function(event) {
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
        <a class="pageBtn dropdown-item" data-source="' + dit.attr('id') + '" data-toPage="9">Remove</a>');
    };
  });

  $('#edit').on('mouseleave', function(event) {
    var edit = $('#edit');
    edit.removeClass('show');
    edit.hide();
  }).on('click', '.pageBtn', function(event) {
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
    saveCookies();
    objectToPage(parent, newPage);
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
      dit.find('.longContent').find('tr').css("visibility", "visible");
      dit.find('.longContent').find('tr').each(function() {
        var dit = $(this);
        totalHeight = totalHeight + dit.outerHeight(true) + 3;
        if ( totalHeight > visibleHeight ) {
          dit.css("visibility", "hidden");
        };
      });
    });
  };

  // ------------------------------------------------------------------------------------
  // -- Fields --
  // ------------------------------------------------------------------------------------
  $('div.notes').on('click', function(event) { if ( !allowCalc ) {
    var $dit = $(this);
    $dit.siblings('textarea.notes').show().focus();
    $dit.hide();
  }});
  $('textarea.notes').on('focusout', function(event) { if ( !allowCalc ) {
    var $dit = $(this);
    $dit.siblings('div.notes').show();
    $dit.hide();
    tDoc.getField($dit.attr('[name]'));
  }});

  function resetCharacter() {
    file.character = {
      "Name" : "JoSheet",
    };
    $('[name]').each(function(index, value) {
      var $ele = $(value);
      if ( $ele.data('default') ) {
        $ele.val($ele.data('default'));
      } else {
        $ele.val('');
      };
    });
    $('input[type=checkbox]').prop('checked', false);
  };

  function setCharacter() {
    $('[name]').each(function(index, value) {
      var $ele = $(value);
      var key = $ele.attr('name');

      if ( file.character[key] != null ) {
        if ( $ele.is('.display.number.mod') ) {
          $ele.val((file.character[key]>0?'+':'') + file.character[key]);

        } else if ( $ele.is('.number') ) {
          $ele.val(file.character[key]);

        } else if ( $ele.is('input[type=checkbox]') ) {
          $ele.prop('checked', file.character[key]);

        } else {
          $ele.val(decodeURIComponent(file.character[key]));
        };

      } else if ( $ele.data('default') ) {
        $ele.val($ele.data('default'));

      } else {
        $ele.val('');
      };
    });
    $('.name').text(decodeURIComponent(file.character["Name"]));
    if ( file.character["Portrait"] != null ) {
      loadPortrait(file.character["Portrait"]);
    };
  };

  $('body').on('change focusout', '[name]', function(event) {
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
      setJoSkill($ele);
    } else if ( $ele.is('.attack') ) {
      setJoAttack($ele);
    } else if ( $ele.is('.hitDie') ) {
      setJoHitDie($ele);
    } else if ( $ele.is('.feat') ) {
      setJoFeat($ele);
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

    if ( $ele.is('.skillProfCheck') ) {
      if ( allowCalc ) {
        $ele.parents('.savesSkill').find('.skill').trigger('change');
      };
    } else if ( $ele.is('.saveProfCheck') ) {
      if ( allowCalc ) {
        $ele.parents('.saveAttr').find('.save').trigger('change');
      };
    };
  });

  // ------------------------------------------------------------------------------------
  // -- Calculation --
  // ------------------------------------------------------------------------------------
  function setJoClass() { if ( allowCalc ) {
    var className = $('input[name="Class and Levels"]').val().replace("(", '').replace(")", '');
    event = Object.create(event, {
      target: { value: {} }
    });
    ApplyClasses(className, $('[name="Character Level"]').val());
    $.each(AbilityScores.abbreviations, function(key, value) {
      file.character[value + ' Remember'] = $('[name="' + value + ' Remember"]').val();
    });
    AddAttacksPerAction();
    $('[name="Extra.Notes"]').val('');
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
        var saved = file.character["classFeat" + i];
        if ( saved !== undefined ) {
          $.each(Menus.classfeatures[0].oSubMenu[i].oSubMenu, function(key, value) {
            if ( $.inArray(key.toString(), saved) !== -1 ) {
              var cReturn = Menus.classfeatures[0].oSubMenu[i].oSubMenu[key].cReturn.split("#");
              var newReturn = [cReturn[0], cReturn[1], cReturn[2].toLowerCase(), cReturn[3]];
              ClassFeatureOptions(newReturn, "add");
            } else {
              var cReturn = Menus.classfeatures[0].oSubMenu[i].oSubMenu[key].cReturn.split("#");
              var newReturn = [cReturn[0], cReturn[1], cReturn[2].toLowerCase(), "extra"];
              ClassFeatureOptions(newReturn, "remove");
            };
          });
        };
      });
    };
    $('.ltdRecovery').each(function(i, ele) {
      var $ele = $(ele);
      if ( $ele.attr('name').indexOf("Limited Feature Recovery ") !== -1 ) {
        if ( $ele.val() == "short rest" || $ele.val() == "Short Rest" ) {
          $ele.val("SR");
        } else if ( $ele.val() == "long rest" || $ele.val() == "Long Rest" ) {
          $ele.val("LR");
        };
      };
    });
    if ( Object.keys(CurrentSpells).length > 0 ) {
      $('#spellsPage1').show();
    } else {
      $('#spellsPage1').hide();
    };
  }};

  function setJoRace() { if ( allowCalc ) {
    $ele = $('input[name="Race"]');
    event = Object.create(event, {
      target: { value: {} }
    });
    ApplyRace($ele.val());
    MakeRaceMenu();
  }};

  function setJoBackground() { if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: {} }
    });
    ApplyBackground($('input[name="Background"]').val());
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
    var $ele = $('input[name="Proficiency Bonus"]');
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    ProfBonus();
    if ( event.value ) {
      $ele.val((Number(event.value)>0?'+':'') + Number(event.value));
    };
  }};

  function setJoAc() { if ( allowCalc ) {
    var $ele = $('input[name="AC"]');
    event = Object.create(event);
    CalcAC();
    if ( event.value ) {
      $ele.val(Number(event.value));
    };
  }};

  function setJoAcDex() { if ( allowCalc ) {
    var $ele = $('input[name="AC Dexterity Modifier"]');
    $ele.val(parseInt(calcMaxDexToAC()));
  }};

  function setJoHp() { if ( allowCalc ) {
    var $ele = $('input[name="HP Max"]');
    SetHPTooltip();
  }};

  function setJoBgF() { if ( allowCalc ) {
    var $ele = $('input[name="Background Feature"]');
    event = Object.create(event);
    if ( $ele.val() ) {
      ApplyBackgroundFeature($ele.val());
    };
  }};

  function setJoSpellSave() { if ( allowCalc ) {
    var $ele = $('input[name="Spell Save DC 1"]');
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    CalcAbilityDC();
    if ( event.value ) {
      $ele.val(event.value);
    };
  }};

  function setJoAttrMod($ele) { if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    CalcMod();
    if ( event.value ) {
      $ele.val((Number(event.value)>0?'+':'') + Number(event.value));
    };
  }};

  function setJoSave($ele) { if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    CalcSave();
    if ( event.value ) {
      $ele.val((Number(event.value)>0?'+':'') + Number(event.value));
    };
  }};

  function setJoSkill($ele) { if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    CalcSkill();
    if ( event.value ) {
      if ( $ele.is('[name="Passive Perception"]') ) {
        $ele.val(Number(event.value));
      } else {
        $ele.val((Number(event.value)>0?'+':'') + Number(event.value));
      };
    };
  }};

  function setJoAttack($ele) { if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: $ele.get(0) }
    });
    ApplyWeapon($ele.val(), $ele.attr('name'));
    CalcAttackDmgHit();
  }};

  function setJoHitDie($ele) { if ( allowCalc ) {
    var $display = $ele.siblings('div.display');
    var theCon = Number($('[name="Con Mod"]').val());
    var theResult = Number($ele.val().split("+")[0].replace("d", ""));
    if ( theResult > 0 ) {
      $display.html("d" + theResult + (theCon < 0 ? theCon : "+" + theCon));
    };
  }};

  function setJoFeat($ele) { if ( allowCalc ) {
    event = Object.create(event, {
      target: { value: {} }
    });
    if ( $ele.val() ) {
      ApplyFeat($ele.val(), Number($ele.attr('name').slice(-1)));
    };
    $('.ltdRecovery').each(function(i, ele) {
      var $ele = $(ele);
      if ( $ele.attr('name').indexOf("Limited Feature Recovery ") !== -1 ) {
        if ( $ele.val() == "short rest" || $ele.val() == "Short Rest" ) {
          $ele.val("SR");
        } else if ( $ele.val() == "long rest" || $ele.val() == "Long Rest" ) {
          $ele.val("LR");
        };
      };
    });
  }};

  calculateNow = function(event, value) { if ( allowCalc ) {
    if ( event === "AC Armor Bonus" ) {
      setJoAc();
    } else {
      //console.log("Calculate: " + event + " -> " + value);
    };
  }};

  calculateAll = function() { if ( allowCalc ) {
    SetStringifieds();
    setListsUnitSystem("imperial");
    UAstartupCode();
    setJoRace();
    setJoBackground();
    setJoClass();
    setJoLevel();
    LoadLevelsonStartup();
    setJoAbilityScores();
    setJoProfBonus();
    $('.attr').each(function(i, value) {
      setJoAttrMod($(value));
    });
    ApplyArmor($('[name="AC Armor Description"]').val());
    ApplyShield($('[name="AC Shield Bonus Description"]').val());
    setJoAcDex();
    setJoHp();
    $('.save').each(function(i, value) {
      setJoSave($(value));
    });
    $('.skill').each(function(i, value) {
      setJoSkill($(value));
    });
    $('.attack').each(function(i, value) {
      setJoAttack($(value));
    });
    $('.hitDie').each(function(i, value) {
      setJoHitDie($(value));
    });
    $('.feat').each(function(i, value) {
      setJoFeat($(value));
    });
    setJoBgF();
    setJoAc();
    setJoSpells();
    setJoSpellSave();
    ApplyProficiencies(true);
    UpdateTooltips();
    //SetRichTextFields();
    //console.log(classes);
  }};

  $('#calcModal').on('change focusout', 'select', function(event) {
    var $dit = $(this);
    file.character[$dit.attr("id")] = $dit.val();
  });

  $('#calcModal').on('show.bs.modal', function(event) { if ( allowCalc ) {
    calculateAll();
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

  }}).on('touchstart mousedown', '#calcModalSave', function(event) {
    var $dit = $(this);
    var $progressBar = $dit.siblings('.progress');
    $progressBar.show();

  }).on('click', '#calcModalSave', function(event) { if ( allowCalc ) {
    var $dit = $(this);
    var $calcModal = $('#calcModal');
    var $progressBar = $dit.siblings('.progress');
    $.each(AbilityScores.abbreviations, function(key, value) {
      Value(value + " Remember", Number($("#base" + value).val()) + "," + Number($("#race" + value).val()) + "," + Number($("#extra" + value).val()) + ",0," + Number($("#magic" + value).val()) + "," + Number($("#feat" + value).val()));
      $('[name="' + value + ' Remember"]').trigger('change');
    });
    calculateAll();
    saveCookies();
    $progressBar.hide();
    $dit.removeClass('btn-primary').addClass('btn-success');

  }}).on('hidden.bs.modal', function(event) {
    $(this).find('.btnSave').removeClass('btn-success').addClass('btn-primary');
  });

  // ------------------------------------------------------------------------------------
  // -- File management --
  // ------------------------------------------------------------------------------------
  function listCharacters() {
    var dbx = new Dropbox({ accessToken: getAccessToken() });
    dbx.filesListFolder({ path: '' })
      .then(function(response) {
        characterFiles = response.entries;
        $('.loadCharacter').remove();
        $('#portraitModal .modal-body').html('');

        for ( var i = 0; i < characterFiles.length; i++ ) {
          if ( characterFiles[i].name.endsWith(".txt") ) {
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
          } else {
            $('#portraitModal .modal-body').append('\
            <div class="thumb" data-img="' + characterFiles[i].path_lower + '">' + characterFiles[i].name + '</div>\
            ');
            var dbx = new Dropbox({ accessToken: getAccessToken() });
            dbx.filesGetThumbnail({ path: characterFiles[i].path_lower, size: {'.tag': 'w64h64'} })
              .then(function(response) {
                var blob = response.fileBlob;
                var reader = new FileReader();
                reader.onload = function() {
                  var img = new Image();
                  img.src = reader.result;
                  $('.thumb[data-img="' + response.path_lower + '"]').html(img);
                };
                reader.readAsDataURL(blob);
              })
              .catch(function(error) {
                console.error(error);
                setAlert('danger', error.error);
              });
          };
        };

        $('.loadCharacter a').click(function(event) {
          loadFile(Number($(this).attr('id').substring(4)));
        });
        $('.deleteCharacter').click(function(event) {
          deleteFile(Number($(this).attr('id').substring(6)));
        });
      })
      .catch(function(error) {
        console.error(error);
        setAlert('danger', error.error);
        setAuthLink();
      });
  };

  $('#openModal').on('click', '#openModalSave', function(event) {
    var $openModal = $('#openModal');
    var selectedFile = document.getElementById('openFileInput').files[0];
    var reader = new FileReader();
    reader.onload = function() {
      resetObjects();
      resetCharacter();
      $.extend(true, file, JSON.parse(reader.result));
      setObjects();
      setCharacter();
      saveCookies();
      calculateAll();
      setAlert('success', 'Character loaded.');
      $openModal.modal('hide');
    };
    reader.readAsText(selectedFile);
  });

  $('#saveLink').click(function(event) {
    var $saveLink = $('#saveLink');
    var filename = $('[name="Name"]').val() + " - lvl " + $('[name="Level"]').val() + " " + $('[name="Class and Levels"]').val() + ".txt";
    var url = "data:text/plain;base64," + btoa(JSON.stringify(file));

    if ( canDropbox ) {
      var dbx = new Dropbox({ accessToken: getAccessToken() });
      dbx.filesUpload({ path: '/' + filename, contents: JSON.stringify(file), mode: {'.tag': 'overwrite'} })
        .then(function(response) {
          setAlert('success', 'Character saved to your Dropbox.');
          listCharacters();
        })
        .catch(function(error) {
          console.error(error);
          setAlert('danger', error.error);
        });
    } else {
      $saveLink.attr("href", url);
      $saveLink.attr("download", filename);
      window.open($saveLink.attr('href'), '_blank');
    };
  });

  $('#loadLink').click(function(event) {
    $('#openModal').modal('show');
  });
  function loadFile(i) {
    var dbx = new Dropbox({ accessToken: getAccessToken() });
    dbx.filesDownload({ path: characterFiles[i].path_lower })
      .then(function(response) {
        var blob = response.fileBlob;
        var reader = new FileReader();
        reader.onload = function() {
          //resetObjects();
          resetCharacter();
          $.extend(true, file, JSON.parse(reader.result));
          setObjects();
          setCharacter();
          saveCookies();
          calculateAll();
          setAlert('success', 'Character loaded.');
        };
        reader.readAsText(blob);
      })
      .catch(function(error) {
        console.error(error);
        setAlert('danger', error.error);
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
        setAlert('danger', error.error);
      });
  };

  function setAuthLink() {
    var dbx = new Dropbox({ clientId: CLIENT_ID });
    //var authUrl = dbx.getAuthenticationUrl('http://localhost/~Joyce/JoSheet/');
    var authUrl = dbx.getAuthenticationUrl('https://joycekimberly.github.io/JoSheet/');
    document.getElementById('authLink').href = authUrl;
    $('#authLink').show();
  };

  $('#portraitImg').click(function(event) {
    if ( !moveEnabled ) {
      $('#portraitModal').modal('show');
    };
  });
  $('#portraitModal').on('click', '#portraitModalSave', function(event) {
    var $portraitModal = $('#portraitModal');
    $portraitModal.modal('hide');
  })
  .on('click', '.thumb', function(event) {
    var $dit = $(this);
    file.character["Portrait"] = $dit.data('img');
    loadPortrait(file.character["Portrait"]);
    saveCookies();
  });
  function loadPortrait(path) {
    if ( canDropbox ) {
      var dbx = new Dropbox({ accessToken: getAccessToken() });
      dbx.filesDownload({ path: path })
        .then(function(response) {
          var blob = response.fileBlob;
          var reader = new FileReader();
          reader.onload = function() {
            var img = new Image();
            img.src = reader.result;
            $('#portraitImg').html(img);
          };
          reader.readAsDataURL(blob);
        })
        .catch(function(error) {
          console.error(error);
          setAlert('danger', error.error);
        });
    };
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
