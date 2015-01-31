if (window.location.href.indexOf(".pdf") != -1) {
	console.log("It's a PDF! Let's stop now.");
} else {
	document.addEventListener ('DOMContentLoaded', onDOM_Ready, false);
}

function onDOM_Ready () {
    window.components.runAll();

    //-- Make page visible again.
    //document.body.style.setProperty ("display", "inherit", "important");
}
/* $(document).ready(function() {	
	window.components.runAll();
*/
	/*if (window.location.href.indexOf("https://courses2015.dalton.org/calendar/view.php?view=month") > -1) {
		// Event hunting
		var d = 26;
		var m = 11;
		var y = 2012;
		var id = 2389;
		var type = "course";
		$("li.calendar_event_" + type).each(function(index) {
			var element = $(this);
			console.log(element[0]);
		});
	}*/
/*});*/ 