window.allowCalc = false;
tDoc.info = {};
tDoc.info.SheetType = "JoSheet - a4 - printer friendly";
tDoc.info.SpellsOnly = false;
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

  if ( field === "Spell DC 1 Mod" || field === "Spell DC 2 Mod" ) {
    ele.value = (AbilityScores.abbreviations[(Number(ele.value) - 1)] ? (AbilityScores.abbreviations[(Number(ele.value) - 1)] + " Mod") : ele.value );
    ele.value = ( (ele.value === "0") ? "" : ele.value );
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
    ele.currentValueIndices = Number(ele.selectedIndex);
  } else if ( Number(ele.currentValueIndices) > 1 ) {
    ele.selectedIndex = Number(ele.currentValueIndices);
  };

  if ( ele.classList.contains('notes') ) {
    ele.type = "text";
    ele.multiline = true;
    var content = "<p>" + ele.value.replace(/\n/g, '<br>').replace(/◆/g, '</p><p><i class="fa fa-circle fa-fw"></i>') + '</p>';
    $ele.siblings('div.notes').html(content.replace("<p></p>", ""));
  };

  ele.setItems = function(value) {
    if ( $ele.is('select') ) {
      $ele.html('');
      $.each(value, function(i, val) {
        $ele.append('<option value="' + val + '">' + val + '</option>');
      });
    } else {
      $ele.autocomplete({
        source: value
      });
    };
  };
  ele.setAction = function(type, value) {
    if ( type === "Calculate" ) {
      calculateNow(field, value);
    } else {
      console.log("setAction " + type + ": " + field + " -> " + value);
    };
  };
  ele.checkThisBox = function(box, value) {
    $ele.prop('checked', value);
  };
  ele.isBoxChecked = function() {
    return Number($ele.prop('checked'));
  };
  ele.buttonGetCaption = function() {};
  ele.buttonSetCaption = function() {};
  ele.setFocus = function() {};
  ele.clearItems = function() {};
  ele.page = 1;
  ele.rect = "";

  //console.log(ele);
  return ele;
};

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
    tDoc.getField(field).value = FldValue;
  };

  if ( tooltip !== undefined ) {
    ele.setAttribute('title', tooltip);
  };
};

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
  var isCaster = CurrentSpells[classes.primary] !== undefined ? true : false;
  if ( isCaster ) {
    AskUserSpellSheet();
    GenerateSpellSheet(true);
    $('#spellsConfig').show();
    var spellCastLvl = Number(CurrentSpells[classes.primary].level);
    var spellCastAbi = CurrentSpells[classes.primary].ability - 1;
    var spellCastAbiMod = Number(What(AbilityScores.abbreviations[spellCastAbi] + " Mod"));
    var isPrepared = CurrentSpells[classes.primary].known.prepared;
    var isPsionic = CurrentSpells[classes.primary].list.psionic;
    var school = (CurrentSpells[classes.primary].bonus.subclassfeature1 ? CurrentSpells[classes.primary].bonus.subclassfeature1.school[0] : "");
    var cantrips = CurrentSpells[classes.primary].known.cantrips[spellCastLvl];
    var spells = CurrentSpells[classes.primary].known.spells[spellCastLvl];
    var prepared = spellCastLvl + spellCastAbiMod;
    var spell = 0;
    var $configC = $('#spellsConfigLvl0');
    var $configS = $('#spellsConfigLvl1');
    $configC.html('');
    $configS.html('');
    $('[name="Spellcasting Class"]').val(classes.primary);
    $('[name="Spellcasting Ability"]').val(AbilityScores.names[spellCastAbi]);
    $('[name="Spell Attack Bonus"]').val($('[name="' + AbilityScores.abbreviations[spellCastAbi] + ' ST Mod"]').val());
    if ( cantrips > 0 ) {
      for ( var i = 0; i < cantrips; i++ ) {
        $configC.append('<select id="spellsSelectC' + i + '" class="custom-select form-control-sm mb-2"><option></option></select>');
      };
    };
    if ( isPrepared ) {
      for ( var i = 0; i < prepared; i++ ) {
        $configS.append('<select id="spellsSelectS' + i + '" class="custom-select form-control-sm mb-2"><option></option></select>');
      };
    } else {
      for ( var i = 0; i < spells; i++ ) {
        $configS.append('<select id="spellsSelectS' + i + '" class="custom-select form-control-sm mb-2"><option></option></select>');
      };
    };
    for ( var i = 0; i < 9; i++ ) {
      var slots = Number($('[name="SpellSlots.CheckboxesSet.lvl' + i + '"]').val());
      var $spellSlots = $('#spellsHeader' + i + ' .spellSlots');
      $('#spellsBlock' + i).html('<tr class="lastRow"></tr>');
      if ( slots > 0 ) {
        $spellSlots.html('');
        for ( var i2 = 0; i2 < slots; i2++ ) {
          $spellSlots.append('\
            <label class="custom-control custom-checkbox">\
              <span class="checkBall"></span>\
              <input name="Spell.Lvl.' + i + '.Slot.' + i2 + '" data-subname type="checkbox" class="custom-control-input">\
              <span class="custom-control-indicator"></span>\
            </label>\
          ');
        };
      };
      if ( isPsionic ) {
        $('.spells tr.lblRow th:first-child').html('PP');
        $.each(PsionicsList, function(key, value) {
          if ( ($.inArray(classes.primary, PsionicsList[key].classes) > -1 || PsionicsList[key].school === school) && PsionicsList[key].level === i ) {
            spell++;
            var spellId = "spell" + spell;
            var spellShow = "hidden";
            $.each(file.character, function(key, value) {
              if ( spellId === value ) {
                spellShow = "visible";
              };
            });
            $('#spellsBlock' + i + ' .lastRow').before('\
              <tr id="' + spellId + '" data-name="' + key + '" data-parent="' + key + '" class="spellRow ' + spellShow + '">\
                <td>&nbsp;</td>\
                <td title="' + PsionicsList[key].name + '">' + (PsionicsList[key].nameShort ? PsionicsList[key].nameShort : PsionicsList[key].name) + '</td>\
                <td title="' + PsionicsList[key].descriptionFull + '">' + PsionicsList[key].description + '</td>\
                <td>' + (PsionicsList[key].save ? PsionicsList[key].save : '&mdash;') + '</td>\
                <td>' + (PsionicsList[key].school ? PsionicsList[key].school : "") + '</td>\
                <td>' + PsionicsList[key].time + '</td>\
                <td>' + PsionicsList[key].range + '</td>\
                <td title="' + PsionicsList[key].compMaterial + '">' + (PsionicsList[key].components ? PsionicsList[key].components : "") + '</td>\
                <td>' + PsionicsList[key].duration + '</td>\
                <td title="' + SourceList[PsionicsList[key].source[0]].name + '">' + PsionicsList[key].source[0] + '</td>\
                <td class="right">' + PsionicsList[key].source[1] + '</td>\
              </tr>\
            ');
            if ( i === 0 ) {
              for ( var i2 = 0; i2 < cantrips; i2++ ) {
                $configC.find('select#spellsSelectC' + i2).append('<option value="spell' + spell + '" title="' + PsionicsList[key].descriptionFull + '">' + PsionicsList[key].name + '</option>');
              };
            } else if ( spells > 0 ) {
              $('#spellsHeader' + i + ', #spellsBlock' + i).show();
              for ( var i2 = 0; i2 < spells; i2++ ) {
                if ( PsionicsList[key].school === school && $.inArray(classes.primary, PsionicsList[key].classes) > -1 ) {
                  $configS.find('select#spellsSelectS' + i2).append('<option value="spell' + spell + '" title="' + PsionicsList[key].descriptionFull + '">' + PsionicsList[key].name + ' (lvl ' + i + ')</option>');
                };
              };
            } else {
              $('#spellsHeader' + i + ', #spellsBlock' + i).hide();
            };
          };
        });
        $('.spellRow.visible').each(function(index, value) {
          var key = $(value).data('parent');
          var dependencies = PsionicsList[key].dependencies;
          $.each(dependencies, function(index, value) {
            $('tr[data-parent="' + value + '"]').removeClass('hidden');
          });
        });
      } else {
        $.each(SpellsList, function(key, value) {
          if ( $.inArray(classes.primary, SpellsList[key].classes) > -1 && SpellsList[key].level === i ) {
            spell++;
            var spellId = "spell" + spell;
            var spellShow = "";
            if ( isPrepared ) {
              spellShow = "hidden";
              $.each(file.character, function(key, value) {
                if ( spellId === value ) {
                  spellShow = "";
                };
              });
            };
            $('#spellsBlock' + i + ' .lastRow').before('\
              <tr id="' + spellId + '" data-name="' + key + '" class="' + spellShow + '">\
                <td>&nbsp;</td>\
                <td title="' + SpellsList[key].name + '">' + (SpellsList[key].nameShort ? SpellsList[key].nameShort : SpellsList[key].name) + '</td>\
                <td title="' + SpellsList[key].descriptionFull + '">' + SpellsList[key].description + '</td>\
                <td>' + (SpellsList[key].save ? SpellsList[key].save : '&mdash;') + '</td>\
                <td>' + (SpellsList[key].school ? SpellsList[key].school : "") + '</td>\
                <td>' + SpellsList[key].time + '</td>\
                <td>' + SpellsList[key].range + '</td>\
                <td title="' + SpellsList[key].compMaterial + '">' + (SpellsList[key].components ? SpellsList[key].components : "") + '</td>\
                <td>' + SpellsList[key].duration + '</td>\
                <td title="' + SourceList[SpellsList[key].source[0]].name + '">' + SpellsList[key].source[0] + '</td>\
                <td class="right">' + SpellsList[key].source[1] + '</td>\
              </tr>\
            ');
            if ( i === 0 ) {
              for ( var i2 = 0; i2 < cantrips; i2++ ) {
                $configC.find('select#spellsSelectC' + i2).append('<option value="spell' + spell + '" title="' + SpellsList[key].descriptionFull + '">' + SpellsList[key].name + '</option>');
              };
            } else if ( slots > 0 ) {
              $('#spellsHeader' + i + ', #spellsBlock' + i).show();
              if ( isPrepared ) {
                for ( var i2 = 0; i2 < prepared; i2++ ) {
                  $configS.find('select#spellsSelectS' + i2).append('<option value="spell' + spell + '" title="' + SpellsList[key].descriptionFull + '">' + SpellsList[key].name + ' (lvl ' + i + ')</option>');
                };
              };
            } else {
              $('#spellsHeader' + i + ', #spellsBlock' + i).hide();
            };
          };
        });
      };
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
app.thermometer.begin = function() {};
app.thermometer.end = function() {};
app.execDialog = function(dialog) {
  if ( dialog.description.name === 'Set Spells' ) {
    dialog.selectCa = [];
    dialog.selectSp = [];
    $.each(file.character, function(key, value) {
      if ( key.toString().startsWith('spellsSelectC') ) {
        var spName = $('tr#' + value).data('name');
        if ( spName ) {
          dialog.selectCa.push(spName);
        };
      } else if ( key.toString().startsWith('spellsSelectS') ) {
        var spName = $('tr#' + value).data('name');
        if ( spName ) {
          dialog.selectSp.push(spName);
        };
      };
    });
  };
  //console.log(dialog);
  return "ok";
};
app.alert = function(alert) {
  //console.log(alert.cMsg);
  /*var type = "info";
  var $alert = $('\
    <div class="alert alert-' + type + ' alert-dismissible fade show boxShadow" role="alert">\
      <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>\
      <div class="content"><h6>' + alert.cTitle + '</h6>' + alert.cMsg.replace(/\n/g, "<br>") + '</div>\
    </div>\
  ').appendTo('#alerts');
  setTimeout(function() {
    $($alert).alert('close');
  }, (5 * 1000));*/
};

$(function() { // -----------------------------------------------------------------------
  if ( AbilityScores != null ) {
    allowCalc = true;
  };

  if ( allowCalc ) {
    $('.abiDrop').html('<option></option>');
    $.each(AbilityScores.abbreviations, function(key, value) {
      $('.abiDrop').append('<option value="' + value + ' Mod">' + value + '</option>');
    });

    $('.dmgDrop').html('<option></option>');
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

  var $spellsBlock = $('#hiddenFields')
  for ( var i = 1; i <= 8; i++ ) {
    $spellsBlock.append('<input name="P' + i + '.SSfront.spells.name.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellsdiv.Text.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellsdiv.Image.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.Spells Button" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellshead.Text.header.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellshead.Image.prepare.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellshead.Image.Header.Left.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellshead.class.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellshead.class.1" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellshead.class.2" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellshead.class.3" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.spellshead.ability.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.BlueText.spellshead.prepare.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.BlueText.spellshead.attack.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSfront.BlueText.spellshead.dc.0" data-subname type="text">');
    for ( var i2 = 0; i2 <= FieldNumbers.spells[1]; i2++ ) {
      $spellsBlock.append('<input name="P' + i + '.SSfront.spells.remember.' + i2 + '" data-subname type="text">');
    };
  };
  for ( var i = 1; i <= 8; i++ ) {
    $spellsBlock.append('<input name="P' + i + '.SSmore.spells.name.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSmore.spellshead.Text.header.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSmore.spellshead.Image.prepare.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSmore.spellshead.Image.Header.Left.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSmore.spellshead.class.0" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSmore.spellshead.class.1" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSmore.spellshead.class.2" data-subname type="text">');
    $spellsBlock.append('<input name="P' + i + '.SSmore.spellshead.class.3" data-subname type="text">');
    for ( var i2 = 0; i2 <= FieldNumbers.spells[1]; i2++ ) {
      $spellsBlock.append('<input name="P' + i + '.SSmore.spells.remember.' + i2 + '" data-subname type="text">');
    };
  };
}); // ----------------------------------------------------------------------------------
