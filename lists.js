info = { SheetType : "JoSheet - a4 - printer friendly" };
bookmarkRoot = {
  children : [{
    children : [],
  }],
};
resetForm = function() {};

initializeLists = function() {
  SetStringifieds();
  setListsUnitSystem("imperial");
  UAstartupCode();
  FindClasses();
  FindRace();
  //FindCompRace();
  FindWeapons();
  //FindCompWeapons();
  FindArmor();
  FindBackground();
  //FindFeats();
  LoadLevelsonStartup();
  UpdateLevelFeatures("all");
  //FindManualOtherWeapons(true);
  ApplyProficiencies(true);
  UpdateTooltips();
  //SetRichTextFields();
  setJoAbilityScores();
  //console.log(classes);
};

setJoAbilityScores = function() {
  for ( var i = 0; i <= AbilityScores.abbreviations.length; i++ ) {
    var AbiI = i === AbilityScores.abbreviations.length ? "HoS" : AbilityScores.abbreviations[i];
    var tempArray = What(AbiI + " Remember").split(",");
    AbilityScores.current[AbiI].base = tempArray[0];
    AbilityScores.current[AbiI].race = tempArray[1] ? tempArray[1] : "0";
    AbilityScores.current[AbiI].extra = tempArray[2] ? tempArray[2] : "0";
    AbilityScores.current[AbiI].extra2 = tempArray[3] ? tempArray[3] : "0";
    AbilityScores.current[AbiI].magic = tempArray[4] ? tempArray[4] : "0";
    AbilityScores.current[AbiI].feat = tempArray[5] ? tempArray[5] : "0";
  };

  var scores = {
    "oStr" : ASround(What("Str")),
    "oDex" : ASround(What("Dex")),
    "oCon" : ASround(What("Con")),
    "oInt" : ASround(What("Int")),
    "oWis" : ASround(What("Wis")),
    "oCha" : ASround(What("Cha")),
    //"oHoS" : ASround(What("HoS")),
    "bStr" : AbilityScores.current.Str.base,
    "bDex" : AbilityScores.current.Dex.base,
    "bCon" : AbilityScores.current.Con.base,
    "bInt" : AbilityScores.current.Int.base,
    "bWis" : AbilityScores.current.Wis.base,
    "bCha" : AbilityScores.current.Cha.base,
    //"bHoS" : AbilityScores.current.HoS.base,
    "rStr" : AbilityScores.current.Str.race,
    "rDex" : AbilityScores.current.Dex.race,
    "rCon" : AbilityScores.current.Con.race,
    "rInt" : AbilityScores.current.Int.race,
    "rWis" : AbilityScores.current.Wis.race,
    "rCha" : AbilityScores.current.Cha.race,
    //"rHoS" : AbilityScores.current.HoS.race,
    "eStr" : AbilityScores.current.Str.extra,
    "eDex" : AbilityScores.current.Dex.extra,
    "eCon" : AbilityScores.current.Con.extra,
    "eInt" : AbilityScores.current.Int.extra,
    "eWis" : AbilityScores.current.Wis.extra,
    "eCha" : AbilityScores.current.Cha.extra,
    //"eHoS" : AbilityScores.current.HoS.extra,
    "EStr" : AbilityScores.current.Str.extra2,
    "EDex" : AbilityScores.current.Dex.extra2,
    "ECon" : AbilityScores.current.Con.extra2,
    "EInt" : AbilityScores.current.Int.extra2,
    "EWis" : AbilityScores.current.Wis.extra2,
    "ECha" : AbilityScores.current.Cha.extra2,
    //"EHoS" : AbilityScores.current.HoS.extra2,
    "mStr" : AbilityScores.current.Str.magic,
    "mDex" : AbilityScores.current.Dex.magic,
    "mCon" : AbilityScores.current.Con.magic,
    "mInt" : AbilityScores.current.Int.magic,
    "mWis" : AbilityScores.current.Wis.magic,
    "mCha" : AbilityScores.current.Cha.magic,
    //"mHoS" : AbilityScores.current.HoS.magic,
    "fStr" : AbilityScores.current.Str.feat,
    "fDex" : AbilityScores.current.Dex.feat,
    "fCon" : AbilityScores.current.Con.feat,
    "fInt" : AbilityScores.current.Int.feat,
    "fWis" : AbilityScores.current.Wis.feat,
    "fCha" : AbilityScores.current.Cha.feat,
    //"fHoS" : AbilityScores.current.HoS.feat,
  };

  var totals = {
    "tStr" : ASCalcTotal(scores, "Str"),
    "tDex" : ASCalcTotal(scores, "Dex"),
    "tCon" : ASCalcTotal(scores, "Con"),
    "tInt" : ASCalcTotal(scores, "Int"),
    "tWis" : ASCalcTotal(scores, "Wis"),
    "tCha" : ASCalcTotal(scores, "Cha"),
    //"tHoS" : ASCalcTotal(scores, "HoS"),
  };

  $.each(AbilityScores.abbreviations, function(key, value) {
    var total = Number(totals['t' + value]);
    $('#' + value.toLowerCase() + 'Attr').val(total);
    file.character[value.toLowerCase() + 'Attr'] = total;
  });
  saveCookies();
};

getField = function(event) {
  var ele = document.getElementsByName(event)[0];

  if ( !ele ) {
    if ( event === "Highlighting" ) {
      return "";
    };
    console.log("getField: " + event);
    return false;
  };

  if ( ele.userName === undefined ) {
    ele.userName = ele.title;
  } else {
    ele.title = ele.userName;
  };

  if ( ele.submitName === undefined ) {
    ele.submitName = ele.getAttribute("data-subname");
  } else {
    ele.setAttribute("data-subname", ele.submitName);
  };

  ele.isBoxChecked = function() {
    return Number(ele.checked);
  };
  ele.checkThisBox = function(box, value) {
    ele.checked = value;
  };
  ele.buttonGetCaption = function() {};
  ele.setItems = function(value) {
    $(ele).autocomplete({ source: value });
  };
  ele.setAction = function(type, value) {
    if ( type === "Calculate" ) {
      calculateNow(event, value);
    } else {
      console.log("setAction " + type + ": " + event + " -> " + value);
    };
  };
  ele.clearItems = function() {};

  //console.log(event);
  //console.log(ele);
  return ele;
};

function What(field) {
  if ( field === "HD1 Die" ) {
    var value = tDoc.getField(field) ? tDoc.getField(field).value : "";
    return value.split("+")[0].replace("d", "");
  } else {
    return tDoc.getField(field) ? tDoc.getField(field).value : "";
  };
}

function Value(field, FldValue, tooltip) {
  var ele = document.getElementsByName(field)[0];

  if (!ele) {
    console.log(field + " -> " + JSON.stringify(FldValue) );
    return false;
  };
  if ( ele.classList.contains('number') ) {
    ele.value = +(FldValue);

  } else if ( ele.classList.contains('custom-select') ) {
    ele.selectedIndex = FldValue;

  } else {
    ele.value = FldValue;
  };

  if ( tooltip !== undefined ) {
    ele.setAttribute('title', tooltip);
  };

  $(ele).trigger('change');
};

calculateNow = function(event, value) {
  if ( event === "AC Armor Bonus" ) {
    $('[name="AC"]').trigger('calculate');
  } else {
    //console.log("Calculate: " + event + " -> " + value);
  };
};

getMenu = function(menuname) {
	try {
		var temp = app.popUpMenuEx.apply(app, Menus[menuname]);
	} catch (err) {
		var temp = null;
	}
	temp = temp === null ? "nothing#toreport" : temp;
	temp = temp.toLowerCase();
	temp = temp.split("#");
  console.log(temp);
	return temp;
};

//Object.prototype.toSource = function() { return $.extend({}, this); };
Hide = function() {};
DontPrint = function() {};
Show = function() {};
testSource = function() { return false; };

app = {};
app.thermometer = {};
app.thermometer.begin = function() {},
app.thermometer.end = function() {},
app.alert = function(alert) {
  /*var type = "info";
  var $alert = $('\
    <div class="alert alert-' + type + ' alert-dismissible fade show boxShadow" role="alert">\
      <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>\
      <div class="content"><h6>' + alert.cTitle + '</h6>' + alert.cMsg.replace(/\n/g, "<br>") + '</div>\
    </div>\
  ').appendTo('#alerts');
  setTimeout(function() {
    $($alert).alert('close');
  }, (10 * 1000));*/
};
app.execDialog = function() {};

$(function() { // -----------------------------------------------------------------------
  $.each(AbilityScores.abbreviations, function(key, value) {
    $('.abiDrop').append('<option value="' + value + ' Mod">' + value + '</option>');
  });

  $.each(DamageTypes, function(key, value) {
    $('.dmgDrop').append('<option value="' + key + '">' + key + '</option>');
  });

  for ( var i = 0; i < levels.length; i++ ) {
    if ( i === 0 ) {
      $('[name="Level"]').append('<option value="' + levels[i] + '" selected>' + levels[i] + '</option>');
    } else {
      $('[name="Level"]').append('<option value="' + levels[i] + '">' + levels[i] + '</option>');
    };
  };
  UpdateDropdown();
}); // ----------------------------------------------------------------------------------

/*
for ( var key in RaceList ) {
  if ( RaceList.hasOwnProperty(key) ) {
    $('#race').append('<option value="' + key + '">' + RaceList[key].name + '</option>');
  };
};
for ( var key in ClassList ) {
  if ( ClassList.hasOwnProperty(key) ) {
    $('#class').append('<option value="' + key + '">' + ClassList[key].name + '</option>');
  };
};
for ( var key in BackgroundList ) {
  if ( BackgroundList.hasOwnProperty(key) ) {
    $('#background').append('<option value="' + key + '">' + BackgroundList[key].name + '</option>');
  };
};
*/
