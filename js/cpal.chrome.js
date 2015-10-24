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

cpal.extension.getBrowser = function() {
	return "chrome";
};
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
 * cpal.request
 */
cpal.request = {};

cpal.request.addBeforeSendHeaders = function(urls, listener) {
	chrome.webRequest.onBeforeSendHeaders.addListener(listener, {urls: urls}, ["blocking", "requestHeaders"]);
};

/*
 * cpal.storage
 */
cpal.storage = {};

cpal.storage.clear = function(callback) {
	chrome.storage.local.clear(function() {
		callback();
	});
};
cpal.storage.getKey = function(keyName, callback) {
	console.log("getKey start - " + keyName);
	chrome.storage.local.get(keyName, function(result) {
		console.log("getKey callback - " + keyName);
		callback(result[keyName], keyName);
	});
};
cpal.storage.getAll = function(callback) {
	chrome.storage.local.get(null, function(items) {
		callback(items);
	});
};
cpal.storage.setKey = function(keyName, keyValue, callback) {
	var saveObj = {};
	saveObj[keyName] = keyValue;
	chrome.storage.local.set(saveObj, function() {
		if (callback !== undefined) {
			callback();
		}
	});
};
cpal.storage.removeKey = function(keyName, callback) {
	chrome.storage.local.remove(keyName, function() {
		callback();
	});
};
/*
 * cpal.storage.quota
 */
cpal.storage.quota = {};
cpal.storage.quota.getUsedBytes = function(callback) {
	chrome.storage.sync.getBytesInUse(null, function(bytes) {
		callback(bytes);
	});
};
cpal.storage.quota.getTotalBytes = function() {
	return chrome.storage.sync.QUOTA_BYTES;
};