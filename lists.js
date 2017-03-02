//var tDoc = {};
tDoc.info = { SheetType : "JoSheet - a4 - printer friendly" };
tDoc.bookmarkRoot = {
  children : [{
    children : [],
  }],
};
tDoc.resetForm = function() {};
tDoc.calculateNow = function() {};

tDoc.getField = function(event) {
  var field = {};
  var ele = document.querySelector('[data-field="' + event + '"]');

  if ( event === "Template.extras.WSfront" ) {
    field = "";
/*
  } else if ( event === "Race Remember" ) {
    field = file.character.race;

  } else if ( event === "Class Features Remember" ) {
    field = "";

  } else if ( event === "Proficiencies Remember" ) {
    field = "";*/
/*
  } else if ( event === "Proficiency Weapon Martial" ) {
    field.value = "";
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};

  } else if ( event === "Proficiency Weapon Simple" ) {
    field.value = "";
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};

  } else if ( event === "Proficiency Armor Light" ) {
    field.value = "";
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};

  } else if ( event === "Proficiency Armor Medium" ) {
    field.value = "";
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};

  } else if ( event === "Proficiency Armor Heavy" ) {
    field.value = "";
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};

  } else if ( event === "Proficiency Shields" ) {
    field.value = "";
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};

  } else if ( event === "Proficiency Weapon Other" ) {
    field.value = "";
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};
*/
  } else if ( ele ) {
    var value = document.querySelector('[data-field="' + event + '"]').value;
    field.value = value;
    field.submitName = value;
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};
    field.setAction = function() {};
    field.buttonGetCaption = function() {};

  } else {
    field.value = "";
    field.submitName = "";
    field.isBoxChecked = function() {};
    field.checkThisBox = function() {};
    field.setAction = function() {};
    field.buttonGetCaption = function() {};
    console.log(event);
  };
  return field;
};

function Value(field, FldValue, tooltip) {
  console.log("Setting: " + field + " -> " + JSON.stringify(FldValue) );
  var ele = document.querySelector('[data-field="' + field + '"]');

	if (!ele) return false;
  if ( ele.classList.contains('number') ) {
    ele.value = +(FldValue);

  } else {
  	ele.value = FldValue;
  };

	if (tooltip !== undefined) {
    ele.setAttribute('title', tooltip);
	};
};
function Checkbox(field, FldValue, tooltip) {
  console.log("Checking: " + field + " -> " + JSON.stringify(FldValue) );
  var ele = document.querySelector('[data-field="' + field + '"]');

	if (!ele) return false;
	var Checkit = (FldValue === undefined) ? true : FldValue;
  ele.checked = Checkit;

	if (tooltip !== undefined) {
    ele.setAttribute('title', tooltip);
	};
};
function Show() {};
function Hide() {};
function DontPrint() {};
function testSource() { return false; };

/*
		"AC Armor Bonus", //0
		"Medium Armor", //1
		"Heavy Armor", //2
		"AC Stealth Disadvantage", //3
		"AC Armor Weight", //4
		"AC Dexterity Modifier"
*/

var app = {};
app.thermometer = {
  begin : function() {},
  end : function() {},
};
app.alert = function() {};
app.execDialog = function() {};

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
