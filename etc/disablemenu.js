$(document).ready(function() {
	if (navigator.userAgent.indexOf("Chrome") > -1) {
		$(".chromeOnly").removeClass("hidden");
	}
	if (navigator.userAgent.indexOf("Firefox") > -1) {
		$(".firefoxOnly").removeClass("hidden");
	}
});