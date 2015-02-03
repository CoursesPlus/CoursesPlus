/*
 * CoursesPlus Abstraction Layer
 * This abstracts away things like storage or resource-ness.
 * Safari version
 */

cpal = {};

/*
 * cpal.extension
 */
cpal.extension = {};

cpal.extension.getBrowserVersion = function() {
	return navigator.appVersion.split('/')[2].replace(" Safari", ""); // Yes, this is the same in both Chrome and Safari. :O
};
cpal.extension.getExtensionVersion = function() {
	return safari.extension.displayVersion;
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

		details += "Platform: Apple Safari";
		details += "\n"

	return details;
};

/*
 * cpal.resources
 */
cpal.resources = {};

cpal.resources.getURL = function(item) {
	return safari.extension.baseURI + item;
};

/*
 * cpal.request
 */
cpal.request = {};

cpal.request.addBeforeSendHeaders = function(urls, listener) {
	console.error("no-op");
};

/*
 * cpal.storage
 */
cpal.storage = {};

cpal.storage.clear = function(callback) {
	console.error("no-op");
};
cpal.storage.getKey = function(keyName, callback) {
	console.error("no-op");
	callback("notarray");
};
cpal.storage.setKey = function(keyName, keyValue, callback) {
	console.error("no-op");
};
/*
 * cpal.storage.quota
 */
cpal.storage.quota = {};
cpal.storage.quota.getUsedBytes = function(callback) {
	console.error("no-op");
};
cpal.storage.quota.getTotalBytes = function() {
	console.error("no-op");
};