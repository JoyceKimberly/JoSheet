window.allowCalc = false;
tDoc.info = { SheetType : "JoSheet - a4 - printer friendly" };
tDoc.bookmarkRoot = {
  children : [{
    children : [],
  }],
};

tDoc.getField = function(field) {
  //event = Object.create(event);
  var ele = document.getElementsByName(field)[0];
  var $ele = $(ele);

  if ( !ele ) {
    if ( field === "Highlighting" ) {
      return "";
    };
    console.log("getField: " + field);
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

  if ( ele.currentValueIndices === undefined ) {
    ele.currentValueIndices = ele.selectedIndex;
  } else if ( ele.currentValueIndices < 1 ) {
    //console.log(field + " -> " + ele.currentValueIndices);
  } else {
    console.log(field + " -> " + ele.currentValueIndices);
    //ele.selectedIndex = ele.currentValueIndices;
  };

  ele.isBoxChecked = function() {
    return Number($ele.prop('checked'));
  };
  ele.checkThisBox = function(box, value) {
    $ele.prop('checked', value);
  };
  ele.buttonGetCaption = function() {};
  ele.buttonSetCaption = function() {};
  ele.setItems = function(value) {
    $ele.html('');
    $.each(value, function(i, val) {
      $ele.append('<option value="' + val + '">' + val + '</option>');
    });
  };
  ele.setAction = function(type, value) {
    if ( type === "Calculate" ) {
      calculateNow(field, value);
    } else {
      console.log("setAction " + type + ": " + field + " -> " + value);
    };
  };
  ele.setFocus = function() {};
  ele.clearItems = function() {};
  ele.rect = "";
  ele.page = 0;

  //console.log(field);
  //console.log(ele);
  return ele;
};

What = function(field) {
  if ( field === "HD1 Die" ) {
    var value = tDoc.getField(field) ? tDoc.getField(field).value : "";
    return value.split("+")[0].replace("d", "");
  } else {
    return tDoc.getField(field) ? tDoc.getField(field).value : "";
  };
}

Value = function(field, FldValue, tooltip) {
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
};

initializeLists = function() { if ( allowCalc ) {
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
  FindFeats();
  LoadLevelsonStartup();
  UpdateLevelFeatures("all");
  //FindManualOtherWeapons(true);
  ApplyProficiencies(true);
  UpdateTooltips();
  //SetRichTextFields();
  setJoAbilityScores();
  //console.log(classes);
}};

calculateNow = function(event, value) { if ( allowCalc ) {
  if ( event === "AC Armor Bonus" ) {
    $('[name="AC"]').trigger('focusout');
  } else {
    //console.log("Calculate: " + event + " -> " + value);
  };
}};

setJoAbilityScores = function() { if ( allowCalc ) {
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
    "oHoS" : ASround(What("HoS")),
    "bStr" : AbilityScores.current.Str.base,
    "bDex" : AbilityScores.current.Dex.base,
    "bCon" : AbilityScores.current.Con.base,
    "bInt" : AbilityScores.current.Int.base,
    "bWis" : AbilityScores.current.Wis.base,
    "bCha" : AbilityScores.current.Cha.base,
    "bHoS" : AbilityScores.current.HoS.base,
    "rStr" : AbilityScores.current.Str.race,
    "rDex" : AbilityScores.current.Dex.race,
    "rCon" : AbilityScores.current.Con.race,
    "rInt" : AbilityScores.current.Int.race,
    "rWis" : AbilityScores.current.Wis.race,
    "rCha" : AbilityScores.current.Cha.race,
    "rHoS" : AbilityScores.current.HoS.race,
    "eStr" : AbilityScores.current.Str.extra,
    "eDex" : AbilityScores.current.Dex.extra,
    "eCon" : AbilityScores.current.Con.extra,
    "eInt" : AbilityScores.current.Int.extra,
    "eWis" : AbilityScores.current.Wis.extra,
    "eCha" : AbilityScores.current.Cha.extra,
    "eHoS" : AbilityScores.current.HoS.extra,
    "EStr" : AbilityScores.current.Str.extra2,
    "EDex" : AbilityScores.current.Dex.extra2,
    "ECon" : AbilityScores.current.Con.extra2,
    "EInt" : AbilityScores.current.Int.extra2,
    "EWis" : AbilityScores.current.Wis.extra2,
    "ECha" : AbilityScores.current.Cha.extra2,
    "EHoS" : AbilityScores.current.HoS.extra2,
    "mStr" : AbilityScores.current.Str.magic,
    "mDex" : AbilityScores.current.Dex.magic,
    "mCon" : AbilityScores.current.Con.magic,
    "mInt" : AbilityScores.current.Int.magic,
    "mWis" : AbilityScores.current.Wis.magic,
    "mCha" : AbilityScores.current.Cha.magic,
    "mHoS" : AbilityScores.current.HoS.magic,
    "fStr" : AbilityScores.current.Str.feat,
    "fDex" : AbilityScores.current.Dex.feat,
    "fCon" : AbilityScores.current.Con.feat,
    "fInt" : AbilityScores.current.Int.feat,
    "fWis" : AbilityScores.current.Wis.feat,
    "fCha" : AbilityScores.current.Cha.feat,
    "fHoS" : AbilityScores.current.HoS.feat,
  };
  var totals = {
    "tStr" : ASCalcTotal(scores, "Str"),
    "tDex" : ASCalcTotal(scores, "Dex"),
    "tCon" : ASCalcTotal(scores, "Con"),
    "tInt" : ASCalcTotal(scores, "Int"),
    "tWis" : ASCalcTotal(scores, "Wis"),
    "tCha" : ASCalcTotal(scores, "Cha"),
    "tHoS" : ASCalcTotal(scores, "HoS"),
  };
  $.each(AbilityScores.abbreviations, function(key, value) {
    var total = Number(totals['t' + value]);
    $('[name="' + value + '"]').val(total);
    file.character[value] = total;
  });
  saveCookies();
}};

setJoSpells = function() { if ( allowCalc ) {
for ( var i = 0; i < 9; i++ ) {
  $('#spellsBlock' + i + ' .spellsList tbody').html('<tr class="lastRow"></tr>');
  if ( classes.primary !== "" ) {
    $.each(SpellsList, function(key, value) {
      if ( $.inArray(classes.primary, SpellsList[key].classes) > -1 && SpellsList[key].level === i ) {
        $('#spellsBlock' + i + ' .spellsList .lastRow').before('\
    <tr>\
      <td>&nbsp;</td>\
      <td>' + SpellsList[key].name + '</td>\
      <td>' + SpellsList[key].description + '</td>\
      <td>&nbsp;</td>\
      <td>' + SpellsList[key].school + '</td>\
      <td>' + SpellsList[key].time + '</td>\
      <td>' + SpellsList[key].range + '</td>\
      <td>' + SpellsList[key].components + '</td>\
      <td>' + SpellsList[key].duration + '</td>\
      <td>' + SpellsList[key].source[0] + '</td>\
      <td class="right">' + SpellsList[key].source[1] + '</td>\
    </tr>\
        ');
      };
    });
  };
};
}};

AddResistance = function(Input, tooltiptext, replaceThis) { if ( allowCalc ) {
  var useful = 0;
  var tooltipString = Input;
  if (isNaN(Input) && Input.search(/\(.+\)/) === -1) {
    for (var key in DamageTypes) {
      if (Input.toLowerCase().indexOf(key) !== -1) {
        useful = DamageTypes[key].index;
        tooltipString = key.capitalize();
        break;
      }
    }
  };
  var tempString = tooltiptext !== undefined ? "The resistance to \"" + tooltipString + "\" was gained from " + tooltiptext + "." : "";
  var doReplace = false;
  for (var n = 1; n <= 2; n++) {
    for (var k = 1; k < 7; k++) {
      var next = tDoc.getField("Resistance Damage Type " + k);
      if (n === 1 && ((useful && next.currentValueIndices === useful) || (!useful && next.value.toLowerCase().indexOf(Input.toLowerCase()) !== -1))) {
        k = 7;
        n = 3;
      } else if (n === 1 && replaceThis && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) {
        doReplace = true;
      } else if (n === 2 && ((doReplace && next.value.toLowerCase().indexOf(replaceThis.toLowerCase()) !== -1) || (!doReplace && clean(next.value) === ""))) {
        PickDropdown("Resistance Damage Type " + k, useful);
        if (!doReplace) next.userName = tempString;
        k = 7;
      }
    }
  }
}};

Hide = function() {};
DontPrint = function() {};
Show = function() {};
resetForm = function() {};
amendBookmarks = function() {};
testSource = function() { return false; };
getTemplate = function(value) {
  var temp = {};
  temp.spawn = function(pageNr, bool1, bool2) {
    //console.log(pageNr);
  };
  return temp;
};
deletePages = function(page) {
  //console.log(page);
};

app = {};
app.thermometer = {};
app.thermometer.begin = function() {},
app.thermometer.end = function() {},
app.execDialog = function() {};
app.alert = function(alert) {
  console.log(alert.cMsg);
  var type = "info";
  var $alert = $('\
    <div class="alert alert-' + type + ' alert-dismissible fade show boxShadow" role="alert">\
      <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>\
      <div class="content"><h6>' + alert.cTitle + '</h6>' + alert.cMsg.replace(/\n/g, "<br>") + '</div>\
    </div>\
  ').appendTo('#alerts');
  setTimeout(function() {
    $($alert).alert('close');
  }, (5 * 1000));
};

$(function() { // -----------------------------------------------------------------------
  if ( AbilityScores !== undefined ) {
    allowCalc = true;
    console.log(tDoc);
  };

  if ( allowCalc ) {
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
  };
}); // ----------------------------------------------------------------------------------
