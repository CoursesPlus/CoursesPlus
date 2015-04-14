console.log("Hello from inject.js!");

if (window.location.href.indexOf(".pdf") != -1 || window.location.href.indexOf(".PDF") != -1) {
	console.log("It's a PDF! Let's stop now.");
} else {
	console.log("Set event listener.");
	document.addEventListener('DOMContentLoaded', onDOM_Ready, false);
}

if (cpal.extension.getBrowser() == "safari") {
	window.services.runAll();
	window.components.runAll();
}

function onDOM_Ready () {
	console.log("onDOM_Ready called!");
    if (cpal.extension.getBrowser() == "chrome") {
		window.services.runAll();
		window.components.runAll();
	}
}