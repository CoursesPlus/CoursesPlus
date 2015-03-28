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
		description: "Displays events from the Online Planbook (at daltonplanner.org) in your calendar.",
		type: "calendar",
		origins: ["*://daltonplanner.org/"],
		requires: [],
		onEnable: function() {
			// TODO: signin
		},
		createCalendarEvents: function(callback) {
			// TODO: get events
			// Should the request be on-demand or in the background?
			cpal.storage.getKey("daltonplanner-cache", function(events) {
				callback([{
					id: "IAmUnique",
					title: "Test event",
					cssClass: "hw",
					icon: "assign",
					date: new Date("2-19-2015"),
					description: "This is a test event added by the 'Planbook' service. It's client-side only, and inserted by the Courses+ service manager. <br/> <b>BOLD</b><i>ITALIC</i><u>UNDERLINE</u>"
				}]);
			});
		}
	},
	lunchMenu: {
		displayName: "Lunch menu",
		description: "Displays what's for lunch in the sidebar.",
		type: "block",
		origins: ["*://*.myschooldining.com/"],
		requires: [],
		onEnable: function() {
			// TODO: nothing!
		},
		createBlock: function() {
			$.get("https://www.myschooldining.com/api/", {
				key: "B6EEF83E-7E80-11E1-BAEF-DBA84824019B",
				siteID: 336,
				locationId: 753,
				lib: "menus"
			}, function(data) {
				var $builtList = $("<ul></ul>");
				$builtList.css("list-style-type", "none");
				var mealItems = data["meal periods"][0]["menu items"];
				if (mealItems.length == 0) {
					$builtList.append($("<li>No lunch today!</li>"));
				}
				$.each(mealItems, function() {
					var $menuLi = $("<li></li>");
					$menuLi.text(this.name);
					$builtList.append($menuLi);
				});
				$("#coursesPlus_services_lunchMenu_overHerePls").html("");
				$("#coursesPlus_services_lunchMenu_overHerePls").append($builtList);
			});
			return $("<p><center id=\"coursesPlus_services_lunchMenu_overHerePls\">Loading...</center></p>");
		}
	},
	schedules: {
		displayName: "Schedules",
		description: "Displays what classes you've got next in the sidebar.",
		type: "block",
		origins: ["*://schedules.dalton.org/"],
		requires: [],
		onEnable: function() {
			// TODO: signin
			// Does Schedules have an API to hook in to? How long do session cookies last?
		},
		createBlock: function() {
			// TODO: get events
			// This shouldn't change much, so maybe some sort of caching (with a force refresh option)?
			return $("<p>Schedule!</p>");
		}
	},
	/* This is not a service because it should affect a whole site with all the above geatures
	archivedCourses:
		displayName: "Archived Courses",
		description: "Allows Courses+to work on Archived Courses",
		type: "block", // I do not know what to put here.
		origins: ["*://.dalton.org/"],
		requires: [],
		onEnable: function() {
			// TODO: Change a bunch of links in the code. This should be simple.
		},
	},*/
	athletics: {
		displayName: "Athletics",
		description: "Displays your sport's schedule in the sidebar.",
		type: "block",
		origins: ["*://www.dalton.org/"], // dalton.org/program/athletics/schedules
		requires: [],
		onEnable: function() {
			// TODO: ajax.
		},
		createBlock: function() {
			// TODO: get events and games.
			return $("<p>Athletics!</p>");
		}
	},
	randomStudent: {
		displayName: "Random Student of the Day",
		description: "Displays a random student every day. NOTE: Your name will be displayed to other students if you enable this option.",
		type: "block",
		origins: [],
		requires: [],
		onEnable: function() {
			// TODO: ask student for name.
			//     - store names on server.
		},
		createBlock: function() {
			// TODO: fetch a name from the server.
			return $("<p>HIII!</p>");
		}
	},
	googleDrive: {
		displayName: "Google Drive Connect",
		description: "Allows you to connect a Google Drive document to an assignment.",
		type: "assignment",
		origins: ["*://drive.google.com"],
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
				var $blockBody = service.createBlock();

				var $blockToAppend = $("<div></div>");

				$blockToAppend.attr("id", serviceIndex + "_service_block");
				$blockToAppend.addClass("block");

					var $header = $("<div class=\"header\"><div class=\"title\"><h2></h2></div></div>");

						$header.find("h2").text(service.displayName);

					$blockToAppend.append($header);

					var $content = $("<div class=\"content\"></div>");

						$content.append($blockBody);

					$blockToAppend.append($content);

				$("#region-post > .region-content").append($blockToAppend);

				break;
			case "calendar":
				service.createCalendarEvents(function(events) {
					// date.getTime() / 1000 // in Unix time 
					if (testURL("calendar/view.php?view=month")) {
						console.log("Month view!");

						var curDate = new Date(parseInt(getParameterByName("time", window.location.href)) * 1000);

						var dayEventAddThing = {};

						$(".day > .day").each(function() {
							dayEventAddThing[$(this).text()] = [];
						});

						for (var eventIndex in events) {
							var thisEvent = events[eventIndex];

							if (thisEvent.date.getMonth() == curDate.getMonth()) {
								dayEventAddThing[thisEvent.date.getDate()].push(thisEvent);
							}
						}

						$(".day > .day").each(function() {
							for (var eventIndex in dayEventAddThing[$(this).text()]) {
								var thisEvent = dayEventAddThing[$(this).text()][eventIndex];

								var eventId = "event_" + serviceIndex + "_" + thisEvent.id;

								var $appendMe = $("<li></li>");

								$appendMe.addClass("calendar_event_course");
								$appendMe.addClass("cal_" + thisEvent.cssClass);

								$appendMe.append($("<a></a>"));
								$appendMe.children("a").text(service.displayName + " - " + thisEvent.title);

								var linkTo = window.location.href;

								linkTo = linkTo.replace("month", "day");
								linkTo = linkTo.replace(getParameterByName("time", window.location.href), thisEvent.date.getTime() / 1000);
								linkTo += "#";
								linkTo += eventId;

								$appendMe.children("a").attr("href", linkTo);

								$(this).parent().children(".events-new").append($appendMe);
							}
						});
					}				
					if (testURL("calendar/view.php?view=day")) {
						console.log("Day view!");

						var curDate = new Date(parseInt(getParameterByName("time", window.location.href)) * 1000);

						for (var eventIndex in events) {
							var thisEvent = events[eventIndex];

							if (thisEvent.date.getMonth() == curDate.getMonth() && thisEvent.date.getDay() == curDate.getDay() && thisEvent.date.getDate() == curDate.getDate() && thisEvent.date.getYear() == curDate.getYear()) {
								var eventId = "event_" + serviceIndex + "_" + thisEvent.id;

								var $appendMe = $("<table></table>");

								$appendMe.addClass("event");

								$appendMe.append($("<tbody></tbody>"));

								var r0 = $("<tr></tr>");
								
									r0.addClass("r0");

									var c0_1 = $("<td></td>");

										c0_1.addClass("picture");
										c0_1.addClass("cell");
										c0_1.addClass("c0");

										c0_1.css("width", "32px");

										c0_1.append($('<a name="' + eventId + '"></a>'));

										var $eventImg = $("<img />");

											var thisIconHref = $("link[rel='shortcut icon']").attr("href");

											thisIconHref = thisIconHref.replace("dalton/theme", "dalton/" + thisEvent.icon);
											thisIconHref = thisIconHref.replace("favicon", "icon");

											$eventImg.attr("src", thisIconHref);
											$eventImg.addClass("icon");

										c0_1.append($eventImg);

									r0.append(c0_1);

									var c1_1 = $("<td></td>");

										c1_1.addClass("topic");
										c1_1.addClass("cell");
										c1_1.addClass("c1");
										c1_1.addClass("lastcol");

										// No, referer with one r *is not a typo*.
										// At least, not one made in Courses+.
										var $referer = $("<div>");

											$referer.addClass("referer");

											var $refererLink = $("<a></a>");

												$refererLink.attr("href", "#");
												$refererLink.text(thisEvent.title);

											$referer.append($refererLink);

										c1_1.append($referer);

										var $course = $("<div>");

											$course.addClass("course");

											var $courseLink = $("<a></a>");

												$courseLink.css("color", "gray");
												$courseLink.css("cursor", "default");
												$courseLink.css("text-decoration", "none");
												$courseLink.text("from " + service.displayName);

											$course.append($courseLink);

										c1_1.append($course);

									r0.append(c1_1);

								$appendMe.children("tbody").append(r0);

								var r1 = $("<tr></tr>");
								
									r1.addClass("r1");
									r1.addClass("lastrow");

									var c0_2 = $("<td></td>");

										c0_2.addClass("side");
										c0_2.addClass("cell");
										c0_2.addClass("c0");

										c0_2.html("&nbsp");

									r1.append(c0_2);

									var c1_2 = $("<td></td>");

										c1_2.addClass("description");
										c1_2.addClass("cell");
										c1_2.addClass("c0");
										c1_2.addClass("lastcol");

										var $noOverflowCont = $("<div></div>");

											$noOverflowCont.addClass("no-overflow");
											$noOverflowCont.html(thisEvent.description);

										c1_2.append($noOverflowCont);

									r1.append(c1_2);

								$appendMe.children("tbody").append(r1);

								$(".eventlist").append($appendMe);
							}
						}
					}
				});
				break;
		}

		runCount++;
	}
	console.log("Ran " + runCount + " service(s)!");
};