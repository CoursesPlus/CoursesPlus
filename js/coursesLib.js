/*
 * CoursesLib
 * This file contains useful helper functions that do various course- and event-related tasks.
 */
window.coursesLib = {};

window.coursesLib.getCourseInfo = function(courseId, doneFunc) {
	$.get("/course/view.php" + "?id=" + courseId, function (resText) {
		var $response = $(resText);
		var respObj = {};

		respObj.id = courseId;
		respObj.title = $response.children("#page-header").children(".headermain").text();

		doneFunc(respObj);
	});
};

window.coursesLib.getCourseEvents = function(courseId, doneFunc) {
	$.get("/course/view.php" + "?id=" + courseId, function (resText) {
		var $response = $(resText);
		var respObj = {};

		respObj.id = courseId;
		respObj.title = $response.children("#page-content")
								.children("#region-main-box")
								.children("#region-post-box")
								.children("#region-main-wrap")
								.children("#region-main")
								.children("#region-main-box")
								.children(".region-content")
								.children(".course-content")
								.text();

		doneFunc(respObj);
	});
};

window.coursesLib.getUpcomingCourseEvents = function(courseId, doneFunc) {
	$.get("/calendar/view.php" + "?course=" + courseId, function (resText) {
		var $response = $(resText);
		var respObj = {};

		respObj.id = courseId;
		respObj.events = [];

		$response.children("#page-content")
					.children("#region-main-box")
					.children("#region-post-box")
					.children("#region-main-wrap")
					.children("#region-main")
					.children(".region-content")
					.children(".maincalendar")
					.children(".heightcontainer")
					.children(".eventlist")
					.children(".event").each(function() {
						// !!!
						var eventTitle = $(this).children("tbody").children(".r0").children(".topic").children(".referer").children("a").text().replace(/\s{2,}/g, " ");
						var eventHtml = $(this).children("tbody").children(".r1").children(".description").html();
						var eventText = $(this).children("tbody").children(".r1").children(".description").text();
						var eventNormText = $(this).children("tbody").children(".r1").children(".description").text().replace(/\r/g, "").replace(/\n/g, " ");
						var eventLink = $(this).children("tbody").children(".r0").children(".topic").children(".referer").children("a").attr("href");
						
						var eventObj = {title: eventTitle, text: eventText, normText: eventNormText, html: eventHtml, link: eventLink};

						respObj.events.push(eventObj);
					});
		/* = $response.children("#page-content")
								.children("#region-main-box")
								.children("#region-post-box")
								.children("#region-main-wrap")
								.children("#region-main")
								.children("#region-main-box")
								.children(".region-content")
								.children(".course-content")
								.text();*/

		doneFunc(respObj);
	});
};

console.log("CoursesLib ready!");

/*window.coursesLib.getUpcomingCourseEvents(565, function(res) {
	console.log(res);
});*/