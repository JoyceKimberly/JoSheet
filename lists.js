info = { SheetType : "JoSheet - a4 - printer friendly" };
bookmarkRoot = {
  children : [{
    children : [],
  }],
};
resetForm = function() {};

initializeLists = function() {
  classes.old.toSource = function() { return $.extend({}, this); };

  //setListsUnitSystem(false, true);
  //UAstartupCode();
  FindClasses();
  FindRace();
  //FindCompRace();
  FindWeapons();
  //FindCompWeapons();
  FindArmor();
  FindBackground();
  //FindFeats();

  $.each(AbilityScores.abbreviations, function(key, value) {
    Value(value + " Remember", file.character["base" + value] + "," + CurrentRace.scores[key]);
  });

  LoadLevelsonStartup();
  //FindManualOtherWeapons(true);
  ApplyProficiencies(true);
  //UpdateTooltips();
  //SetRichTextFields();

  console.log(classes);
};

calculateNow = function(event, value) {
  console.log(event);
  console.log(value);
};

getField = function(event) {
  var field = {};
  var ele = document.querySelector('[data-field="' + event + '"]');

  if ( ele ) {
    field.value = ele.value;
    field.submitName = ele.getAttribute('data-subname');
    field.isBoxChecked = function() {
      return ele.checked;
    };

  } else {
    field.value = "";
    field.submitName = "";
    field.isBoxChecked = function() {};
    field.buttonGetCaption = function() {};
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
  return field;
};

Value = function(field, FldValue, tooltip) {
  //console.log(field + " -> " + JSON.stringify(FldValue) );
  var ele = document.querySelector('[data-field="' + field + '"]');

  if (!ele) {
    console.log(field + " -> " + JSON.stringify(FldValue) );
    return false
  };
  if ( ele.classList.contains('number') ) {
    ele.value = +(FldValue);

  } else {
  	ele.value = FldValue;
  };

	if (tooltip !== undefined) {
    ele.setAttribute('title', tooltip);
	};
};
Checkbox = function(field, FldValue, tooltip) {
  //console.log(field + " -> " + JSON.stringify(FldValue) );
  var ele = document.querySelector('[data-field="' + field + '"]');

	if (!ele) {
    console.log(field + " -> " + JSON.stringify(FldValue) );
    return false
  };
	var Checkit = (FldValue === undefined) ? true : FldValue;
  ele.checked = Checkit;

	if (tooltip !== undefined) {
    ele.setAttribute('title', tooltip);
	};
};
Show = function() {};
Hide = function() {};
DontPrint = function() {};
testSource = function() { return false; };

app = {};
app.thermometer = {};
app.thermometer.begin = function() {},
app.thermometer.end = function() {},
app.alert = function() {};
app.execDialog = function() {};

/*
var Results = app.execDialog(AbilityScores_Dialog);

//don't continu with the function if "apply" was not pressed in the dialog
if (Results === "ok") {
  var remCon = What("Con");

*/
/*
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_functions/Functions.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_functions/Functions2.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/Lists.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsBackgrounds.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsClasses.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsCreatures.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsFeats.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsRaces.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsSources.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsSpells.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsGear.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsRacesUA.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/Icons.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsClassesUA.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_variables/ListsClassesUAArtificer.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_functions/FunctionsResources.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_functions/FunctionsSpells.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_functions/AbilityScores.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_functions/FunctionsImport.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_functions/Shutdown.js"></script>
<script src="https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/_functions/Startup.js"></script>
*/
