function testURL(url) {
	var saveView = "";
	if (window.location.href.indexOf("view.php") != -1) {
		saveView = getParameterByName("view", window.location.href);
	}
	var saveViewing = "";
	if (window.location.href.indexOf("index.php") != -1) {
		saveViewing = getParameterByName("viewing", window.location.href);
	}
	var testThing = window.location.href.replace("http://", "")
										.replace("https://", "")
										.replace("courses2015.dalton.org/")
										.replace("undefined", "")
										.replace("index.php", "")
										.replace(window.location.search, "")
										.replace(window.location.hash, "").replace("?", "")
										+ (saveView != "" ? ("?view=" + saveView) : "")
										+ (saveViewing != "" ? ("?viewing=" + saveViewing) : "");
	return testThing.indexOf(url) > -1;
}
function getParameterByName(name, href) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(href);
	if (results == null) {
		return "";
	}
	else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

var services = {
	planbook: {
		displayName: "Planbook",
		description: "Displays events from daltonplanner.org in your calendar.",
		type: "calendar",
		permissions: ["*://daltonplanner.org/"],
		requires: [],
		onEnable: function() {
			// TODO: signin
		},
		createCalendarEvents: function() {
			// TODO: get events
			// Should the request be on-demand or in the background?

			return [{
				id: "IAmUnique",
				title: "Test event",
				cssClass: "hw",
				icon: "assign",
				date: new Date("2-19-2015"),
				description: "This is a test event added by the 'Planbook' service. It's client-side only, and inserted by the Courses+ service manager. <br/> <b>BOLD</b><i>ITALIC</i><u>UNDERLINE</u>"
			}];
		}
	},
	lunchMenu: {
		displayName: "Lunch menu",
		description: "Displays what's for lunch in the sidebar.",
		type: "block",
		permissions: ["*://www.myschooldining.com/"],
		requires: [],
		onEnable: function() {
			// TODO: nothing!
		},
		createBlock: function() {
			// TODO: get lunch menu from http://www.myschooldining.com/dalton/?cmd=menus
			// This shouldn't change every day, so maybe some sort of caching?
			// Maybe a RSS I don't know if they have one.
		}
	},
	schedules: {
		displayName: "Schedules",
		description: "Displays what classes you've got next in the sidebar.",
		type: "block",
		permissions: ["*://schedules.dalton.org/"],
		requires: [],
		onEnable: function() {
			// TODO: signin
			// Does Schedules have an API to hook in to? How long do session cookies last?
		},
		createBlock: function() {
			// TODO: get events
			// This shouldn't change much, so maybe some sort of caching (with a force refresh option)?
		}
	},
	/* This is not a service because it should affect a whole site with all the above geatures
	archivedCourses:
		displayName: "Archived Courses",
		description: "Allows Courses+to work on Archived Courses",
		type: "block", // I do not know what to put here.
		permissions: ["*://.dalton.org/"],
		requires: [],
		onEnable: function() {
			// TODO: Change a bunch of links in the code. This should be simple.
		},
	},*/
	athletics: {
		displayName: "Athletics",
		description: "Displays your sport's schedule in the sidebar.",
		type: "block",
		permissions: ["*://www.dalton.org/"], // dalton.org/program/athletics/schedules
		requires: [],
		onEnable: function() {
			// TODO: ajax.
		},
		createBlock: function() {
			// TODO: get events and games.
		}
	},
	randomStudent: {
		displayName: "Random Student of the Day",
		description: "Displays a random student every day. NOTE: Your name will be displayed to other students if you enable this option.",
		type: "block",
		permissions: [],
		requires: [],
		onEnable: function() {
			// TODO: ask student for name.
			//     - store names on server.
		},
		createBlock: function() {
			// TODO: fetch a name from the server.
		}
	},
	googleDrive: {
		displayName: "Google Drive Connect",
		description: "Allows you to connect a Google Drive document to an assignment.",
		type: "assignment",
		permissions: ["*://drive.google.com"],
		requires: [],
		onEnable: function() {
			// TODO: write a google script, ask for OAuth signin
		},
		addAssignmentButton: function() {
			// TODO: button to add a google document.
		}
	}
};

window.services = services;
window.services.runAll = function() {
	console.log("Running all services...");

	var runCount = 0;

	for (var serviceIndex in window.services) {
		if (serviceIndex == "runAll") {
			continue;
		}
		var service = window.services[serviceIndex];
		
		console.log("Running service '" + service.displayName + "'...");

		switch (service.type) {
			case "assignment":
				console.warn("TODO: assignment services");
				break;
			case "block":
				console.warn("TODO: block services");
				break;
			case "calendar":
				var events = service.createCalendarEvents();
				// date.getTime() / 1000 // in Unix time 
				if (testURL("calendar/view.php?view=month")) {
					console.log("Month view!");

					var dayEventAddThing = {};

					$(".day > .day").each(function() {
						dayEventAddThing[$(this).text()] = [];
					});

					for (var eventIndex in events) {
						var thisEvent = events[eventIndex];

						if (thisEvent.date.getMonth() == new Date(parseInt(getParameterByName("time", window.location.href)) * 1000).getMonth()) {
							dayEventAddThing[thisEvent.date.getDate()].push(thisEvent);
						}
					}

					$(".day > .day").each(function() {
						for (var eventIndex in dayEventAddThing[$(this).text()]) {
							var thisEvent = dayEventAddThing[$(this).text()][eventIndex];
							var $appendMe = $("<li></li>");

							$appendMe.addClass("calendar_event_course");
							$appendMe.addClass("cal_" + thisEvent.cssClass);

							$appendMe.append($("<a></a>"));
							$appendMe.children("a").text(service.displayName + " - "+ thisEvent.title);

							var linkTo = window.location.href;

							linkTo = linkTo.replace("month", "day");
							linkTo = linkTo.replace(getParameterByName("time", window.location.href), thisEvent.date.getTime() / 1000);

							$appendMe.children("a").attr("href", linkTo);

							$(this).parent().children(".events-new").append($appendMe);
						}
					});
				}
				break;
		}

		runCount++;
	}
	console.log("Ran " + runCount + " service(s)!");
};