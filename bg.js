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
/*chrome.webRequest.onCompleted.addListener(function(info) {
	console.log(info);
}, {urls: ["*://courses2015.dalton.org/*"]}, ["responseHeaders"]);*/