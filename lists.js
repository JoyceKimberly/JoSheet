//var tDoc = {};
tDoc.info = { SheetType : "JoSheet" };
tDoc.bookmarkRoot = {
  children : [{
    children : [],
  }],
};

tDoc.getField = function(event) {
  return event;
};
var app = {};
//function desc(event) { return event; };

function What(event) {
  //return tDoc.getField(field) ? tDoc.getField(field).value : "";
  var field = event;
  if ( event === "Class and Levels" ) {
    console.log("Class and Levels (field requested)");

  } else if ( event === "Character Level" ) {
    field = file.character.level;

  };
  console.log(field);
  return field;
};

/*
var url = "https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet/raw/master/";
var lists = [
  url + "_variables/Lists.js",
  url + "_variables/ListsSources.js",
  url + "_variables/ListsBackgrounds.js",
  url + "_variables/ListsClasses.js",
  url + "_variables/ListsClassesUAArtificer.js",
  url + "_variables/ListsCreatures.js",
  url + "_variables/ListsFeats.js",
  url + "_variables/ListsRaces.js",
  url + "_variables/ListsRacesUA.js",
  url + "_variables/ListsSpells.js",
  url + "_variables/ListsGear.js",
];

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

//a function to test if the input is not being excluded by the resource dialogue
function testSource(key, obj, CSatt, concise) {
	/*var theRe = false;
	if (obj.source) {
		var theSource = isArray(obj.source) ? obj.source[0] : obj.source;
		theRe = SourceList[theSource] && CurrentSources.globalExcl.indexOf(theSource) !== -1;
		if (theRe && concise) theRe = "source";
	}
	if (!theRe && CSatt && CurrentSources[CSatt] && CurrentSources[CSatt].indexOf(key) !== -1) theRe = true;
	return theRe;*/
  return true;
};

//detects classes entered and parses information to global classes variable
function FindClasses(event) {
	if (event === undefined) {
		//classes.field = What("Class and Levels");
    classes.field = file.character.class;
	};
	var temp = clean(classes.field.toLowerCase()) === "" ? "" : classes.field.toLowerCase();
	var tempArray = [];
	var tempPosition = 0;
	var tempChar = "";
	var tempType = 0;
	var tempString = "";
	var tempDie = "";
	var tempFound = false;
	var tempClass = "";
	var tempSubClass = "";
	var tempLevel = "";
	var primeClass = "";

	//put the old classes.known in classes.old so the differences in level can be queried
	var oldClassesString = $.extend( {}, classes.old );
	var oldClasses = eval(oldClassesString);
	var goDeleteUSS = true;
	classes.old = {};
	classes.oldspellcastlvl = classes.spellcastlvl;
	for (var aClass in classes.known) {
		classes.old[aClass] = {
			classlevel : IsSubclassException[aClass] && oldClasses[aClass] && oldClasses[aClass].classlevel ? oldClasses[aClass].classlevel : IsSubclassException[aClass] ? 0 : classes.known[aClass].level,
			subclass : classes.known[aClass].subclass,
			fullname : CurrentClasses[aClass].fullname
		}
		delete CurrentArmour.proficiencies[CurrentClasses[aClass].name];
		delete CurrentWeapons.proficiencies[CurrentClasses[aClass].name];
		if (IsSubclassException[aClass]) goDeleteUSS = false;
	}
	if(goDeleteUSS) delete UpdateSpellSheets.class;

	//reset the global classes variables
	classes.parsed = [];
	classes.known = {};
	classes.hd = [];
	classes.hp = 0;
	var i = 0;

	//split raw string at string-number divides and push parts into temp array
	for (i = 0; i < temp.length; i++) {
		tempChar = parseInt(temp.charAt(i), 10);
		if (isNaN(tempChar)) {
			if (tempType === 2) {
				tempArray.push(Number(temp.substring(tempPosition, i)));
				tempPosition = i;
			}
			if (i === temp.length - 1) {
				tempArray.push(String(temp.substring(tempPosition, i + 1)));
			}
			tempType = 1;
		} else {
			if (tempType === 1) {
				tempArray.push(String(temp.substring(tempPosition, i)));
				tempPosition = i;
			}
			if (i === temp.length - 1) {
				tempArray.push(Number(temp.substring(tempPosition, i + 1)));
			}
			tempType = 2;
		}
	}

	//move elements tempArray into parsed array

	temp = [];

	for (i = 0; i < tempArray.length; i++) {
		if (typeof tempArray[i] === "string") {
			tempString = clean(tempArray[i]);
			if (tempString.length > 0) {
				temp[temp.length] = [];
				temp[temp.length - 1][0] = tempString;
				if (i === tempArray.length - 1) {
					temp[temp.length - 1][1] = 0; //set class level to 0 if none given
				}
			}
		} else if (typeof tempArray[i] === "number" && temp.length > 0) {
			temp[temp.length - 1][1] = Math.min(Math.max(tempArray[i], 1), 999);
		}
		if (temp[temp.length - 1][1] === 0) { //set class level to Character Level field if only 1 class, or 1 if multiclassing
			temp[temp.length - 1][1] = temp.length - 1 === 0 && What("Character Level") ? What("Character Level") : 1;
		}
	}

	classes.parsed = temp;
	classesTemp = {};

	//find known classes and push them into known array, add hd
	for (i = 0; i < classes.parsed.length; i++) {
		tempString = classes.parsed[i][0];
		tempLevel = classes.parsed[i][1];
		tempFound = ParseClass(tempString);

		if (tempFound) { //class detected
			tempClass = tempFound[0];
			tempSubClass = tempFound[1];
			tempDie = ClassList[tempClass].die;

			if (i === 0) {
				primeClass = tempClass;
			};
			classesTemp[tempClass] = {
				name : tempClass,
				level : tempLevel,
				subclass : tempSubClass,
				string : clean(tempString, " ")
			};

			if (classes.hd[tempDie] === undefined) { //add hd
				classes.hd[tempDie] = [tempDie, tempLevel];
			} else {
				classes.hd[tempDie][1] += tempLevel;
			};

			if (classes.hp === 0) { //add first level hp
				classes.hp = tempDie;
			}
		}
	}

	//check every class in classes old and if they are not in classesTemp, remove their features. Don't do anything on a reset
	if (IsNotReset) {
	for (var oClass in classes.old) {
		classes.known = {};

		//temporarily add the class to classes known for the next step
		classes.known[oClass] = {
			name : oClass,
			level : 0,
			subclass : classes.old[oClass].subclass
		}

		var tempCl = CurrentClasses[oClass];
		var oClassLvl = classes.old[oClass].classlevel;

		if (!classesTemp[oClass]) { //when removing a class, do the following
			//delete armor and weapon proficiencies gained from class features
			delete CurrentArmour.proficiencies[tempCl.fullname];
			delete CurrentWeapons.proficiencies[tempCl.fullname];

			//remove saving throw proficiencies and rest equipment button tooltip, if it was primary class
			if (classes.primary === oClass) {
				Checkbox(tempCl.saves[0] + " ST Prof", false, "");
				Checkbox(tempCl.saves[1] + " ST Prof", false, "");

				AddTooltip("Equipment.menu", "Click here to add equipment to the adventuring gear section, or to reset it (this button does not print).\n\nIt is recommended to pick a pack first before you add any background's items.");
			}

			//remove tools gained from the class
			for (var tls = 0; tls < tempCl.tools.length; tls++) {
				RemoveTool(tempCl.tools[tls], tempCl.name);
			}

			//delete class header string
			var ClassHeaderString = tempCl.fullname + ", level " + oClassLvl + ":";
			if (What("Class Features").indexOf("\r\r"+ ClassHeaderString) !== -1) {
				ClassHeaderString = "\r\r"+ ClassHeaderString;
			}
			RemoveString("Class Features", ClassHeaderString, false);

			//delete stuff from features using the function with the class switch
			UpdateLevelFeatures("class");

			//remove the class from the SubClass Remember field
			RemoveString("SubClass Remember", oClass, false);

			//remove the class from the CurrentSpells variable
			delete CurrentSpells[oClass];

		} else if (classes.old[oClass].subclass && classesTemp[oClass].subclass !== classes.old[oClass].subclass) {//when only changing the subclass, do the following

			//delete class header string
			var ClassHeaderString = tempCl.fullname + ", level " + oClassLvl + ":";
			if (What("Class Features").indexOf("\r\r"+ ClassHeaderString) !== -1) {
				ClassHeaderString = "\r\r"+ ClassHeaderString;
			}
			RemoveString("Class Features", ClassHeaderString, false);

			//delete armor and weapon proficiencies gained from class features
			delete CurrentArmour.proficiencies[tempCl.fullname];
			delete CurrentWeapons.proficiencies[tempCl.fullname];

			//delete stuff from features using the function with the class switch
			UpdateLevelFeatures("class");

			//set the class' old level to 0 so all features are added again
			classes.old[oClass].classlevel = 0;

			//if removing the subclass, also remove the class from the SubClass Remember field
			if (!classesTemp[oClass].subclass) {
				RemoveString("SubClass Remember", oClass, false);
			}

			//remove certain aspects from the CurrentSpells variable if they belonged to the (sub)class, if the subclass was a spellcaster
			if (CurrentSpells[oClass] && tempCl.spellcastingFactor) {
				var ocSpells = CurrentSpells[oClass];
				ocSpells.extra = tempCl.spellcastingExtra ? "" : ocSpells.extra ? ocSpells.extra : "";
				if (tempCl.spellcastingBonus) {
					delete ocSpells.bonus[tempCl.name];
				}
			}
		}
	}
	}

	classes.known = classesTemp;
	classes.primary = primeClass;

	var multiCaster = {default : 0, warlock : 0};

	temp = [1];
	//lookup classes and subclasses and put their attributes in CurrentClasses global variable
	for (var aClass in classes.known) {

		//define new global variable based on the known classes
		CurrentClasses[aClass] = {
			name : "",
			source : [],
			primaryAbility : "",
			abilitySave : 0,
			abilitySaveAlt : 0,
			prereqs : "",
			improvements : [],
			saves : [],
			skills : [],
			tools : [],
			armor : [],
			weapons : [],
			equipment : "",
			attacks : [],
			features : {},
			subname : "",
			fullname : "",
			spellcastingFactor : 0,
			spellcastingTable : "",
			spellcastingList : "",
			spellcastingKnown : "",
			spellcastingExtra : "",
		};

		var Temps = CurrentClasses[aClass];

		//fill in the properties of this newly defined global variable and prefer subclass attributes over class attributes
		for (var prop in Temps) {
			if (prop !== "features") {
				if (classes.known[aClass].subclass && ClassSubList[classes.known[aClass].subclass][prop] !== undefined) {
					Temps[prop] = ClassSubList[classes.known[aClass].subclass][prop];
				} else if (ClassList[aClass][prop] !== undefined) {
					Temps[prop] = ClassList[aClass][prop];
				}
			}
		}

		//special something for classes that have alternative ability scores that can be used for the DC
		if (Temps.abilitySave && Temps.abilitySaveAlt) {
			var as1 = Number(What(AbilityScores.abbreviations[Temps.abilitySave - 1] + " Mod"));
			var as2 = Number(What(AbilityScores.abbreviations[Temps.abilitySaveAlt - 1] + " Mod"));
			if (as1 < as2) Temps.abilitySave = Temps.abilitySaveAlt;
		}

		var fAB = [];
		var fTrans = {};
		//add features of the class
		for (prop in ClassList[aClass].features) {
			var cPropAtt = ClassList[aClass].features[prop];
			var fNm = ("0" + cPropAtt.minlevel).slice(-2) + (prop.match(/subclassfeature/i) ? "" : "()") + cPropAtt.name;
			if (fNm.toString().length > 2) {
				fAB.push(fNm);
				fTrans[fNm] = {name: prop, list: "ClassList", item: aClass};
			}
		}

		var hasSub = false;
		//add features of subclass
		if (classes.known[aClass].subclass && ClassSubList[classes.known[aClass].subclass].features !== undefined) {
			hasSub = true;
			for (prop in ClassSubList[classes.known[aClass].subclass].features) {
				var csPropAtt = ClassSubList[classes.known[aClass].subclass].features[prop];
				var fNm = ("0" + csPropAtt.minlevel).slice(-2) + csPropAtt.name;
				if (fNm.toString().length > 2) {
					fAB.push(fNm);
					fTrans[fNm] = {name: prop, list: "ClassSubList", item: classes.known[aClass].subclass};
				}
			}
		}

		fAB.sort();

		for (var f = 0; f < fAB.length; f++) {
			var propAtt = fTrans[fAB[f]];
			if (hasSub && propAtt.list === "ClassList" && propAtt.name.match(/subclassfeature/i)) continue; // skip any "subclassfeature" from the class if a subclass is known
			Temps.features[propAtt.name] = tDoc[propAtt.list][propAtt.item].features[propAtt.name];
		}

		//make fullname if not defined by subclass
		if (Temps.fullname === "") {
			tempString = Temps.subname ? " (" + Temps.subname + ")" : "";
			Temps.fullname = Temps.name + tempString;
		}

		//add class weapon and armor proficiencies to global variables (only if classes are not set to manual)
		if (What("Manual Class Remember") !== "Yes") {
			n = aClass === classes.primary ? 0 : 1;
			if (Temps.armor[n] !== undefined) {
				CurrentArmour.proficiencies[Temps.name] = Temps.armor[n];
			}
			if (Temps.weapons[n] !== undefined) {
				CurrentWeapons.proficiencies[Temps.name] = Temps.weapons[n];
			}
		}

		//see if this class is a spellcaster and what we need to do with that
		if (Temps.spellcastingFactor) {
			var casterType = !isNaN(Temps.spellcastingFactor) ? "default" : Temps.spellcastingFactor.replace(/\d/g, "");
			var casterFactor = Temps.spellcastingFactor.match(/\d/g) ? Number(Temps.spellcastingFactor.match(/\d/g).join("")) : 1;
			//now only continue if the class level is the factor or higher
			if (casterFactor <= classes.known[aClass].level) {
				//add one to the casterType for seeing if this casterType is multiclassing later on
				if (multiCaster[casterType]) {
					multiCaster[casterType] += 1;
				} else {
					multiCaster[casterType] = 1;
				}
			//now update the entry in the CurrentSpells variable
				//first see if the entry exists or not, and create it if it doesn't
				if (!CurrentSpells[aClass]) {
					CurrentSpells[aClass] = {};
					CurrentSpells[aClass].bonus = {};
				}
				var cSpells = CurrentSpells[aClass];
				cSpells.name = Temps.fullname;
				cSpells.level = classes.known[aClass].level;
				cSpells.ability = Temps.abilitySave;
				cSpells.list = Temps.spellcastingList ? Temps.spellcastingList : {class : aClass};
				cSpells.known = Temps.spellcastingKnown;
				cSpells.typeSp = !cSpells.known || cSpells.known.spells === undefined ? false : isArray(cSpells.known.spells) ? cSpells.known.spells[cSpells.level - 1] : cSpells.known.spells;
				cSpells.typeSp = cSpells.typeSp === "" ? "" : isNaN(cSpells.typeSp) ? cSpells.typeSp : "known";
				cSpells.factor = [casterFactor, casterType];
				cSpells.spellsTable = Temps.spellcastingTable ? Temps.spellcastingTable : false;

				//spells from subclass that are auto-prepared (cleric/druid/paladin) or added to class list to choose from (warlock)
				cSpells.extra = Temps.spellcastingExtra ? Temps.spellcastingExtra : cSpells.extra ? cSpells.extra : "";

				//spells from a (sub)class feature that allow the addition of non-standard spells to the spell list (either known list or otherwise), with certain conditions (i.e. a cantrip from the wizard spell list)
				if (Temps.spellcastingBonus && !cSpells.bonus[Temps.name]) {
					cSpells.bonus[Temps.name] = Temps.spellcastingBonus;
				}
			}
		}

		//add number of attacks to temp array
		temp.push(CurrentClasses[aClass].attacks[Math.floor(classes.known[aClass].level - 1, 20)]);
	}
	//pick highest number of attacks in temp array and put that into global classes variable
	classes.attacks = Math.max.apply(Math, temp);

	//reset the global variable for spellcasting levels
	classes.spellcastlvl = {default : 0, warlock : 0};
	//loop through the classes to find the new spellcasting level totals
	for (var aClass in classes.known) {
		var Temps = CurrentClasses[aClass];
		//add the spellcasting level to the classes.spellcastlvl global variable
		if (Temps.spellcastingFactor) {
			var casterType = !isNaN(Temps.spellcastingFactor) ? "default" : Temps.spellcastingFactor.replace(/\d/g, "");
			var casterFactor = Temps.spellcastingFactor.match(/\d/g) ? Number(Temps.spellcastingFactor.match(/\d/g).join("")) : 1;
			//now add this class' levels to the global variable when using the known tables and are of sufficient level
			if (classes.known[aClass].level >= casterFactor && (multiCaster[casterType] > 1 || !Temps.spellcastingTable)) {
				var casterLvl = multiCaster[casterType] > 1 ? Math.floor(classes.known[aClass].level / casterFactor) : Math.ceil(classes.known[aClass].level / casterFactor);
				if (classes.spellcastlvl[casterType]) {
					classes.spellcastlvl[casterType] += casterLvl;
				} else {
					classes.spellcastlvl[casterType] = casterLvl;
				}
			} else if (classes.known[aClass].level >= casterFactor && Temps.spellcastingTable && multiCaster[casterType] === 1) {
				if (!classes.spellcastlvl.otherTables) {
					classes.spellcastlvl.otherTables = Temps.spellcastingTable[classes.known[aClass].level]
				} else {
					classes.spellcastlvl.otherTables = classes.spellcastlvl.otherTables.map(function (num, idx) {
					  return num + Temps.spellcastingTable[classes.known[aClass].level][idx];
					});
				}
			}
		}
	}

	//add the current classes.known into classes.old on startup of the sheet
	if (!event) {
		for (var aClass in classes.known) {
			classes.old[aClass] = {
				classlevel : classes.known[aClass].level,
				subclass : classes.known[aClass].subclass,
				fullname : CurrentClasses[aClass].fullname
			}
		}
		classes.oldspellcastlvl = classes.spellcastlvl;
	}
};
