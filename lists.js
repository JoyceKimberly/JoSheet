(function($) { $(document).ready(function() { // ----------------------------------------

var url = "https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/";
var lists = [
  url + "_variables/Lists.js",
  url + "_variables/ListsSources.js",
  url + "_variables/ListsBackgrounds.js",
  url + "_variables/ListsClasses.js",
  url + "_variables/ListsCreatures.js",
  url + "_variables/ListsFeats.js",
  url + "_variables/ListsRaces.js",
  url + "_variables/ListsSpells.js",
  url + "_variables/ListsGear.js",
  url + "_variables/ListsClassesUAArtificer.js",
  url + "_variables/ListsRacesUA.js",
];

for ( var i = 0; i < lists.length; i++ ) {
  $.ajax({
    async: false,
    url: lists[i],
    dataType: "script",
  });
};
/*Object.prototype.toSource || (Object.prototype.toSource = function() {
  return this;
});*/

}); // ----------------------------------------------------------------------------------

window.processLists = function() {
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
  console.log(ClassSubList);
};

})(jQuery); // --------------------------------------------------------------------------

var tDoc = {
  info : {
    SheetType : "Jo's",
  },
  bookmarkRoot : {
    children : [{
      children : [],
    }],
  },
  getField : function(event) { return event; },
};
var app = {};
function desc(event) { return event; };

/*
"_functions/Functions.js",
"_functions/Functions2.js",
"_variables/Lists.js",
"_variables/ListsRaces.js",
"_variables/ListsClasses.js",
"_variables/ListsBackgrounds.js",
"_variables/ListsCreatures.js",
"_variables/ListsFeats.js",
"_variables/ListsSpells.js",
"_variables/ListsGear.js",
"_variables/ListsSources.js",
"_variables/ListsRacesUA.js",
"_variables/ListsClassesUA.js",
"_variables/ListsClassesUAArtificer.js",
"_variables/Icons.js",
"_functions/FunctionsResources.js",
"_functions/FunctionsSpells.js",
"_functions/AbilityScores.js",
"_functions/FunctionsImport.js",
"_functions/Shutdown.js",
"_functions/Startup.js",
*/

function toUni(input) {
  input = input.toString();
  var UniBoldItal = {
    "0" : "\uD835\uDFCE",
    "1" : "\uD835\uDFCF",
    "2" : "\uD835\uDFD0",
    "3" : "\uD835\uDFD1",
    "4" : "\uD835\uDFD2",
    "5" : "\uD835\uDFD3",
    "6" : "\uD835\uDFD4",
    "7" : "\uD835\uDFD5",
    "8" : "\uD835\uDFD6",
    "9" : "\uD835\uDFD7",
    "A" : "\uD835\uDE3C",
    "B" : "\uD835\uDE3D",
    "C" : "\uD835\uDE3E",
    "D" : "\uD835\uDE3F",
    "E" : "\uD835\uDE40",
    "F" : "\uD835\uDE41",
    "G" : "\uD835\uDE42",
    "H" : "\uD835\uDE43",
    "I" : "\uD835\uDE44",
    "J" : "\uD835\uDE45",
    "K" : "\uD835\uDE46",
    "L" : "\uD835\uDE47",
    "M" : "\uD835\uDE48",
    "N" : "\uD835\uDE49",
    "O" : "\uD835\uDE4A",
    "P" : "\uD835\uDE4B",
    "Q" : "\uD835\uDE4C",
    "R" : "\uD835\uDE4D",
    "S" : "\uD835\uDE4E",
    "T" : "\uD835\uDE4F",
    "U" : "\uD835\uDE50",
    "V" : "\uD835\uDE51",
    "W" : "\uD835\uDE52",
    "X" : "\uD835\uDE53",
    "Y" : "\uD835\uDE54",
    "Z" : "\uD835\uDE55",
    "a" : "\uD835\uDE56",
    "b" : "\uD835\uDE57",
    "c" : "\uD835\uDE58",
    "d" : "\uD835\uDE59",
    "e" : "\uD835\uDE5A",
    "f" : "\uD835\uDE5B",
    "g" : "\uD835\uDE5C",
    "h" : "\uD835\uDE5D",
    "i" : "\uD835\uDE5E",
    "j" : "\uD835\uDE5F",
    "k" : "\uD835\uDE60",
    "l" : "\uD835\uDE61",
    "m" : "\uD835\uDE62",
    "n" : "\uD835\uDE63",
    "o" : "\uD835\uDE64",
    "p" : "\uD835\uDE65",
    "q" : "\uD835\uDE66",
    "r" : "\uD835\uDE67",
    "s" : "\uD835\uDE68",
    "t" : "\uD835\uDE69",
    "u" : "\uD835\uDE6A",
    "v" : "\uD835\uDE6B",
    "w" : "\uD835\uDE6C",
    "x" : "\uD835\uDE6D",
    "y" : "\uD835\uDE6E",
    "z" : "\uD835\uDE6F",
  };
  var output = "";
  for (i = 0; i < input.length; i++) {
    var tempChar = input.charAt(i);
    output += UniBoldItal[tempChar] ? UniBoldItal[tempChar] : tempChar;
  }
  return output;
};
