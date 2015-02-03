if (window.location.href.indexOf(".pdf") != -1) {
	console.log("It's a PDF! Let's stop now.");
} else {
	document.addEventListener('DOMContentLoaded', onDOM_Ready, false);
}

function onDOM_Ready () {
    window.components.runAll();
}