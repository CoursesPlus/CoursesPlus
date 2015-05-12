var helpers = {};

helpers.escapeRegExp = function(string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

helpers.getParameterByName = function(name, href) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( href );
	if (results == null) {
	  return "";
	} else {
	  return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
};

helpers.getUniqueID = function(callback) {
	cpal.storage.getKey("uniqueId", function(result) {
		if (result != undefined) {
			callback(result);
		} else {
			var newid = helpers.randomString(24);
			cpal.storage.setKey("uniqueId", newid, function() {
				callback(newId);
			});
		}
	});
};

helpers.randomString = function(len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var randomString = '';
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz,randomPoz+1);
	}
	return randomString;
};

helpers.testURL = function(url) {
	var saveView = "";
	if (window.location.href.indexOf("view.php") != -1) {
		saveView = helpers.getParameterByName("view", window.location.href);
	}
	var saveViewing = "";
	if (window.location.href.indexOf("index.php") != -1) {
		saveViewing = helpers.getParameterByName("viewing", window.location.href);
	}
	var testThing = window.location.href.replace("http://", "")
										.replace("https://", "")
										.replace("courses2015.dalton.org/")
										.replace("undefined", "")
										.replace("index.php", "")
										.replace(window.location.search, "")
										.replace(/#.*$/, "")
										.replace("?", "")
										+ (saveView != "" ? ("?view=" + saveView) : "")
										+ (saveViewing != "" ? ("?viewing=" + saveViewing) : "");
	return testThing.indexOf(url) > -1;
};

window.helpers = helpers;

// Prototype:

String.prototype.replaceAll = function(search, replace) {
	// If replace is null, return original string; otherwise, it will replace search string with 'undefined'.

	if(!replace) {
		return this;
	}

	return this.replace(new RegExp(helpers.escapeRegExp(search), 'g'), replace);
};