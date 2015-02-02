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
	return chrome.runtime.getVersion();
};

/*
 * cpal.logging
 */
cpal.logging = {};

cpal.logging.specificErrorDetails = function() {
	var details = "";

		details += "Platform: Google Chrome";
		details += "Extension ID: " + chrome.runtime.id;

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