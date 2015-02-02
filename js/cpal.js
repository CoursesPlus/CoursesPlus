/*
 * CoursesPlus Abstraction Layer
 * This abstracts away things like storage or resource-ness.
 * Base
 */

cpal = {};

cpal.notImplemented = function() {
	alert("Error - this function has not been implemented in the abstraction layer. :(");
	return "NOIMPL!";
}

/*
 * cpal.extension
 */
cpal.extension = {};

cpal.extension.getBrowserVersion = cpal.notImplemented;
cpal.extension.getExtensionVersion = cpal.notImplemented;

/*
 * cpal.logging
 */
cpal.logging = {};

cpal.logging.getReportLink = cpal.notImplemented;
cpal.logging.specificErrorDetails = cpal.notImplemented;

/*
 * cpal.resources
 */
cpal.resources = {};

cpal.resources.getURL = cpal.notImplemented;

/*
 * cpal.storage
 */
cpal.storage = {};

cpal.storage.clear = cpal.notImplemented;
cpal.storage.getKey = cpal.notImplemented;
cpal.storage.setKey = cpal.notImplemented;
/*
 * cpal.storage.quota
 */
cpal.storage.quota = {};
cpal.storage.quota.getUsedBytes = cpal.notImplemented;
cpal.storage.quota.getTotalBytes = cpal.notImplemented;

window.cpal = {};

console.log("CPAL base ready!");