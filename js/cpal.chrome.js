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
cpal.storage = {
	storageArea: chrome.storage.sync
};

cpal.storage.clear = function(callback) {
	cpal.storage.storageArea.clear(function() {
		callback();
	});
};
cpal.storage.getKey = function(keyName, callback) {
	cpal.storage.storageArea.get(keyName, function(result) {
		callback(result[keyName], keyName);
	});
};
cpal.storage.getAll = function(callback) {
	cpal.storage.storageArea.get(null, function(items) {
		callback(items);
	});
};
cpal.storage.setKey = function(keyName, keyValue, callback) {
	var saveObj = {};
	saveObj[keyName] = keyValue;
	cpal.storage.storageArea.set(saveObj, function() {
		if (callback !== undefined) {
			callback();
		}
	});
};
cpal.storage.removeKey = function(keyName, callback) {
	cpal.storage.storageArea.remove(keyName, function() {
		callback();
	});
};
/*
 * cpal.storage.quota
 */
cpal.storage.quota = {};
cpal.storage.quota.getUsedBytes = function(callback) {
	if (cpal.isSecretlyFirefox) {
		callback(0);
		return;
	}
	cpal.storage.storageArea.getBytesInUse(null, function(bytes) {
		callback(bytes);
	});
};
cpal.storage.quota.getTotalBytes = function() {
	return cpal.storage.storageArea.QUOTA_BYTES;
};

cpal.isSecretlyFirefox = (navigator.userAgent.indexOf("Firefox/") > -1);
if (cpal.isSecretlyFirefox) {
	cpal.storage.storageArea = chrome.storage.local;
}