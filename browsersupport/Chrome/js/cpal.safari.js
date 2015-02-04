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

cpal.extension.getBrowser = function() {
	return "safari";
};
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

var callbackStorage;

cpal.storage.clear = function(callback) {
	callbackStorage = callback;
	safari.self.tab.dispatchMessage("clearStorage", [null]);
};
cpal.storage.getKey = function(keyName, callback) {
	callbackStorage = callback;
	safari.self.tab.dispatchMessage("getKey", [keyName, null]);
};
cpal.storage.setKey = function(keyName, keyValue, callback) {
	callbackStorage = callback;
	safari.self.tab.dispatchMessage("setKey", [keyName, keyValue, null]);
};
/*
 * cpal.storage.quota
 */
cpal.storage.quota = {};
cpal.storage.quota.getUsedBytes = function(callback) {
	return 0;
};
cpal.storage.quota.getTotalBytes = function() {
	return 1024;
};

// Safari callback thing
function messageHandler(messageEvent) {
	console.log("Got message!");
	console.log(messageEvent);
	if (messageEvent.name === "callback") {
		//var callback = messageEvent.message[0];
		var param = messageEvent.message[1];
		callbackStorage(param);
	}
}

if (window.ZOMGBGSAFARIHACKONEONEONE !== true) {
	safari.self.addEventListener("message", messageHandler, false);
}