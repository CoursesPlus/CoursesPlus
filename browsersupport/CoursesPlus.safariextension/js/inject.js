console.log("Hello from inject.js!");

if (window.location.href.indexOf(".pdf") != -1) {
	console.log("It's a PDF! Let's stop now.");
} else {
	console.log("Set event listener.");
	document.addEventListener('DOMContentLoaded', onDOM_Ready, false);
}
window.components.runAll();

function onDOM_Ready () {
	console.log("onDOM_Ready called!");
    //window.components.runAll();
}