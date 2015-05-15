/*
 * CoursesPlus Abstraction Layer
 * This abstracts away things like storage or resource-ness.
 * Firefox version
 */

cpal = {};

/*
 * cpal.extension
 */
cpal.extension = {};

cpal.extension.getBrowser = function() {
	return "firefox";
};
cpal.extension.getBrowserVersion = function() {
	return navigator.appVersion.split("/")[3];//.replace(" Firefox", "");
};
cpal.extension.getExtensionVersion = function() {
	return "??";
};

/*
 * cpal.logging
 */
cpal.logging = {};

cpal.logging.getReportLink = function() {
	return "";
};
cpal.logging.specificErrorDetails = function() {
	var details = "";

		details += "Platform: Mozilla Firefox";
		details += "\n";
		details += "Extension ID: " + chrome.runtime.id;
		details += "\n"

	return details;
};

/*
 * cpal.resources
 */
cpal.resources = {};

cpal.resources._baseUrl = self.options.dataTestUrl.replace("WOOTWOOTWOOT", "");
cpal.resources.getURL = function(item) {
	return cpal.resources._baseUrl + item;
};

/*
 * cpal.request
 */
cpal.request = {};

cpal.request.addBeforeSendHeaders = function(urls, listener) {
	
};

/*
 * cpal.storage
 */
cpal.storage = {};

cpal.storage.clear = function(callback) {
	callback();
};
cpal.storage.getKey = function(keyName, callback) {
	callback(undefined, keyName);
};
cpal.storage.getAll = function(callback) {
	callback({});	
};
cpal.storage.setKey = function(keyName, keyValue, callback) {
	callback(keyName);	
};
cpal.storage.removeKey = function(keyName, callback) {
	callback();
};

/*
 * cpal.storage.quota
 */
cpal.storage.quota = {};
cpal.storage.quota.getUsedBytes = function(callback) {
	callback(0);
};
cpal.storage.quota.getTotalBytes = function() {
	return 0;
};