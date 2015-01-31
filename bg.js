/*// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf("https://courses2013.dalton.org/") > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);*/
console.log("Courses+ background page!");
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	if (details.url.indexOf("user/icon/dalton/") > -1) {
		details.requestHeaders.push({name: 'X-CoursesPlus-RefererSpoof-Yay', value: "https://courses2015.dalton.org/user/profile.php"});
	}
	for (var i = 0; i < details.requestHeaders.length; ++i) {
		if (details.requestHeaders[i].name === 'X-CoursesPlus-RefererSpoof-Yay') {
			var newVal = details.requestHeaders[i].value;
			//details.requestHeaders.splice(i, 1); 		
			for (var j = 0; j < details.requestHeaders.length; ++j) {
				if (details.requestHeaders[i].name === 'Referer') {
					break;
				}
			}
			if (details.requestHeaders[j] !== 'Referer') {
				details.requestHeaders.push({name: 'Referer', value: newVal});
			} else {
				details.requestHeaders[j].value = newVal;
			}
			break;
		}
	}
	return {requestHeaders: details.requestHeaders};
}, {urls: ["*://courses2015.dalton.org/*"]}, ["blocking", "requestHeaders"]);