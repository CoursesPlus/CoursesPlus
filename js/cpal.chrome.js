/*
 * CoursesPlus Abstraction Layer
 * This abstracts away things like storage or resource-ness.
 * Chrome version
 */

cpal = {};

/*
 * cpal.extension
 */
cpal.extension = {};

cpal.extension.getBrowserVersion = function() {
	return navigator.appVersion.split("/")[2].replace(" Safari", "");
};
cpal.extension.getExtensionVersion = function() {
	return chrome.runtime.getManifest().version;
};

/*
 * cpal.logging
 */
cpal.logging = {};

cpal.logging.getReportLink = function() {
	return "https://chrome.google.com/webstore/detail/courses%2B/pieincmodljnbihihjnapcmhdddhbpgi/support";
};
cpal.logging.specificErrorDetails = function() {
	var details = "";

		details += "Platform: Google Chrome";
		details += "\n";
		details += "Extension ID: " + chrome.runtime.id;
		details += "\n"

	return details;
};

/*
 * cpal.resources
 */
cpal.resources = {};

cpal.resources.getURL = function(item) {
	return chrome.runtime.getURL(item);
};

/*
 * cpal.storage
 */
cpal.storage = {};

cpal.storage.getKey = function(keyName, callback) {
	chrome.storage.sync.get(keyName, function(result) {
		callback(result[keyName]);
	});
};