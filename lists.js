//var tDoc = {};
tDoc.info = { SheetType : "JoSheet" };
tDoc.bookmarkRoot = {
  children : [{
    children : [],
  }],
};
tDoc.resetForm = function() {};
var app = {};
app.thermometer = {
  begin : function() {},
  end : function() {},
};

tDoc.getField = function(event) {
  var field = {};

  if ( event === "Class and Levels" ) {
    field.value = file.character.class;

  } else if ( event === "Character Level" ) {
    field.value = file.character.level;

  } else if ( event === "Race Remember" ) {
    field.value = file.character.race;

  } else if ( event === "Background" ) {
    field.value = file.character.background;

  } else if ( event === "Template.extras.WSfront" ) {
    field = "";

  } else if ( event === "Class Features Remember" ) {
    field = "";

  } else if ( event === "Proficiencies Remember" ) {
    field = "";

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

  } else if ( event === "AC Armor Description" ) {
    field.value = file.character.armor;

  } else if ( event === "AC Shield Bonus Description" ) {
    field.value = file.character.shield;

  };
  //console.log(event + ": " + JSON.stringify(field));
  return field;
};

function Hide() {};
function DontPrint() {};
function testSource() { return false; };

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
