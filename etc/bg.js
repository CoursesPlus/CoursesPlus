console.log("Courses+ background page!");
cpal.request.addBeforeSendHeaders(["*://courses2016.dalton.org/*"], function(details) {
	if (details.url.indexOf("user/icon/dalton/") > -1) {
		details.requestHeaders.push({name: 'X-CoursesPlus-RefererSpoof-Yay', value: "https://courses2017.dalton.org/user/profile.php"});
	}
	if (details.url.indexOf("theme/image.php/dalton/core") > -1 && details.url.indexOf("/u/f1") > -1) {
		details.requestHeaders.push({name: 'X-CoursesPlus-RefererSpoof-Yay', value: "https://courses2017.dalton.org/user/profile.php"});
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
});
