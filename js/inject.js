if (window.location.href.indexOf(".pdf") != -1 || window.location.href.indexOf(".PDF") != -1) {
	console.log("It's a PDF! Let's stop now.");
} else {
	document.addEventListener('DOMContentLoaded', onDOM_Ready, false);
}

if (cpal.extension.getBrowser() == "safari" || cpal.extension.getBrowser() == "firefox") {
	window.services.runAll();
	window.components.runAll();
}

function onDOM_Ready () {
    if (cpal.extension.getBrowser() == "chrome") {
		window.services.runAll();
		window.components.runAll();
	}
}