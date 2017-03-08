info = { SheetType : "JoSheet - a4 - printer friendly" };
bookmarkRoot = {
  children : [{
    children : [],
  }],
};
resetForm = function() {};

initializeLists = function() {
  //classes.old.toSource = function() { return $.extend({}, this); };

  $.each(AbilityScores.abbreviations, function(key, value) {
    Value(value + " Remember", file.character["base" + value] + ",0,0,0,0");
  });

  //setListsUnitSystem(false, true);
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
  //FindManualOtherWeapons(true);
  ApplyProficiencies(true);
  UpdateTooltips();
  //SetRichTextFields();

  //console.log(classes);
};

calculateNow = function(event, value) {
/*  if ( event ) {
    console.log(event);
    //console.log(value);
    //$('[name="' + event + '"]').focusout();
  };*/
};

calcAbilityScores = function() {
  for ( var i = 0; i <= AbilityScores.abbreviations.length; i++ ) {
    var AbiI = i === AbilityScores.abbreviations.length ? "HoS" : AbilityScores.abbreviations[i];
    var tempArray = What(AbiI + " Remember").split(",");
    AbilityScores.current[AbiI].base = tempArray[0];
    AbilityScores.current[AbiI].race = tempArray[1] ? tempArray[1] : "0";
    AbilityScores.current[AbiI].extra = tempArray[2] ? tempArray[2] : "0";
    AbilityScores.current[AbiI].magic = tempArray[3] ? tempArray[3] : "0";
    AbilityScores.current[AbiI].extra2 = tempArray[4] ? tempArray[4] : "0";
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
  var field = {};
  var ele = document.getElementsByName(event)[0];
  var $ele = $('[name="' + event + '"]');

  if ( ele ) {
    field.value = ele.value;
    field.userName = ele.title;
    field.submitName = ele.title;
    field.isBoxChecked = function() {
      //console.log(event + " is checked? " + ele.checked);
      return Number(ele.checked);
    };
    field.buttonGetCaption = function() {};
    field.setItems = function(value) {
      $ele.autocomplete({ source: value });
    };

  } else {
    field.value = "";
    field.userName = "";
    field.submitName = "";
    field.isBoxChecked = function() {};
    field.buttonGetCaption = function() {};
    field.setItems = function(value) {
      console.log(event);
      console.log(value);
    };
    console.log(event);
  };
  field.setAction = function(type, value) {
    if ( type === "Calculate" ) {
      calculateNow(event, value);
    } else {
      console.log(type);
      console.log(value);
    };
  };
  field.clearItems = function() {};
  return field;
};

//Object.prototype.toSource = function() { return $.extend({}, this); };
testSource = function() { return false; };

app = {};
app.thermometer = {};
app.thermometer.begin = function() {},
app.thermometer.end = function() {},
app.alert = function() {};
app.execDialog = function() {};

$(function() { // -----------------------------------------------------------------------
  for ( var i = 0; i < levels.length; i++ ) {
    if ( i === 0 ) {
      $('#level').append('<option value="' + levels[i] + '" selected>' + levels[i] + '</option>');
    } else {
      $('#level').append('<option value="' + levels[i] + '">' + levels[i] + '</option>');
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
