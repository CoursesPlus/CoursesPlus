var services = {
	/*planbook: {
		displayName: "Planbook",
		description: "Displays events from the Online Planbook (at daltonplanner.org) in your calendar.",
		type: "calendar",
		origins: ["*://daltonplanner.org/"],
		requires: [],
		onEnable: function() {
			// TODO: signin
		},
		onDisable: function() {
			// TODO: clear info
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
	},*/
	lunchMenu: {
		displayName: "Lunch Menu",		
		author: "CoursesPlus",
		authorVerification: true,
		description: "Displays what's for lunch in the sidebar.",
		type: "block",
		origins: ["*://*.myschooldining.com/"],
		requires: [],
		options: false,
		menuBar: true,
		onEnable: function() {

		},
		onDisable: function() {

		},
		createBlock: function(menubar) {
			$.get("https://services.coursesplus.tk/lunch.php", {}, function(strData) {
				var data = JSON.parse(strData);
				
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
			return $("<p><center id=\"coursesPlus_services_lunchMenu_overHerePls\">Loading, please wait...</center></p>");
		}
	},
	schedules: {
		displayName: "Schedule",
		author: "CoursesPlus",
		authorVerification: true,
		description: "Displays what classes you've got next in the sidebar.",
		type: "block",
		origins: ["*://schedules.dalton.org/"],
		requires: [],
		options: "etc/scheduleslogin.html",
		menuBar: true,
		onEnable: function() {

		},
		onDisable: function() {
			cpal.storage.removeKey("schedules-owner", function() {
				cpal.storage.removeKey("schedules-key", function() {
					
				});
			});
		},
		createBlock: function(menubar) {
			var schedulesUrl = "https://schedules.dalton.org/roux/index.php";

			cpal.storage.getKey("schedules-owner", function(owner) {
				cpal.storage.getKey("schedules-key", function(key) {
					if (owner == undefined || key == undefined) {
						$("#coursesplus_services_schedule_blockarea").text("You're not signed in! Please go to the options page, scroll to 'Services', and disable and re-enable the Schedules service.");
						return;
					}

					var month = (new Date().getMonth() + 1);
					var day = new Date().getDate();
					var reqDate = (new Date().getYear() + 1900).toString() + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day);

					$.ajax({
						url: schedulesUrl,
						type: "POST",
						data: {
							rouxRequest: "<request><key>" + key + "</key><action>selectStudentCalendar</action><ID>" + owner + "</ID><academicyear>" + (new Date().getYear() + 1900).toString() + "</academicyear><start>" + reqDate + "</start><end>" + reqDate + "</end></request>"
						},
						success: function(data) {
							$("#coursesplus_services_schedule_blockarea").text("");
							var $appendMe = $("<ul></ul>");

							console.log(data);
							var $data = $(data);

							if ($data.find("result").children("error").children("code").text() == "505") {
								// Invalid key!								
								var $errMsg = $("<div></div>");
								
								$errMsg.html("Your session has expired. Please disable this service and re-enable it on the options page to restore the schedule. Then, reload this page.");

								/*var $logInButton = $('<button class="btn btn-primary btn-sm">Log in</button>');
								$logInButton.click(function() {
									var url = chrome.runtime.getURL("scheduleslogin.html"); // TODO: cpal
									var loc = "_blank";
									var w = 500;
									var h = 300;

									var left = (screen.width/2)-(w/2);
									var top = (screen.height/2)-(h/2);
									window.open(url, loc, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
								});
								$errMsg.append($logInButton);*/

								$("#coursesplus_services_schedule_blockarea").append($errMsg);
								return;
							} else if ($data.find("result").children("error").children("code").text() != "") {

								var $errMsg = $("<div></div>");
								
								$errMsg.text("Error " + $data.find("result").children("error").children("code").text() + " - " + $data.find("result").children("error").children("message").text());

								$("#coursesplus_services_schedule_blockarea").append($errMsg);
								return;
							}
							if ($data.find("period").length == 0) {
								$("#coursesplus_services_schedule_blockarea").text("No school today!");								
							}
							$data.find("period").each(function() {
								var $listItem = $("<li></li>");

								var name = $(this).children("section").children("name").text().replace("<![CDATA[", "").replace("]]>");
								var instructor = $(this).children("instructor").children("name").text();
								var location = $(this).children("location").text();

								$listItem.append("<strong>" + name + " in " + location + "</strong><br />");
								if (instructor != "") {
									$listItem.append("with " + instructor);
								}

								$appendMe.append($listItem);
							});

							$("#coursesplus_services_schedule_blockarea").append($appendMe);
						}
					});
				});
			});

			return $("<div id=\"coursesplus_services_schedule_blockarea\">Loading, please wait...</div>");
		}
	},
	weather: {
		displayName: "Weather",		
		author: "CoursesPlus",
		authorVerification: true,
		description: "Displays the weather in your chosen location in your sidebar.",
		type: "block",
		origins: ["*://*.wunderground.com/"],
		requires: [],
		options: "etc/weatheroptions.html",
		menuBar: true,
		onEnable: function() {
			
		},
		onDisable: function() {
			cpal.storage.removeKey("weather", function() {

			});
		},
		createBlock: function(menubar) {
			var $outputObj = $('<div id="coursesplus_services_weather_here"></div>');

				var $iframe = $("<iframe seamless></iframe>");

					$iframe.attr("src", cpal.resources.getURL("etc/weatherdisplay.html"));
					$iframe.attr("allowtransparency", "true");
					$iframe.attr("scrolling", "no");
					$iframe.css("border", "none");
					$iframe.css("width", "175px");
					$iframe.css("height", "160px");
					$iframe.css("overflow", "hidden");

				$outputObj.append($iframe);

			return $outputObj;
		},
	},
	wolframAlpha: {
		displayName: "Wolfram|Alpha",
		author: "CoursesPlus",
		authorVerification: true,
		description: "Displays a Wolfram|Alpha search box in the sidebar.",
		type: "block",
		origins: ["*://*.wolframalpha.com/"],
		requires: [],
		options: false,
		menuBar: true,
		onEnable: function() {
			
		},
		onDisable: function() {

		},
		createBlock: function(menubar) {
			return $('<script type="text/javascript" id="WolframAlphaScript6fbaac131efc42254f296c437c069dbf" src="//www.wolframalpha.com/widget/widget.jsp?id=6fbaac131efc42254f296c437c069dbf&theme=gray"></script>');
		}
	}//,
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
	},*//*
	athletics: {
		displayName: "Athletics",
		description: "Displays your sport's schedule in the sidebar.",
		type: "block",
		origins: ["*://www.dalton.org/"], // dalton.org/program/athletics/schedules
		requires: [],
		onEnable: function() {
			// TODO: ajax.
		},
		onDisable: function() {
			
		},
		createBlock: function() {
			// TODO: get events and games.
			return $("<p>Athletics!</p>");
		}
	}*//*,
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
		onDisable: function() {
			// TODO: reset participant info
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
		onDisable: function() {
			// TODO: un-OAuth?
		},
		addAssignmentButton: function() {
			// TODO: button to add a google document.
		}
	}*/
};

window.services = services;
window.services.runAll = function() {
	console.log("Getting service list...");
	cpal.storage.getKey("services", function(result) {
		cpal.storage.getKey("serviceUpsell", function(serviceUpsell) {
			var serviceList = ($.isArray(result) ? result : []);
			console.log(serviceList);

			console.log("Running all services...");

			if (serviceList.length == 0 && serviceUpsell == undefined) {
				var $serviceUpsell = $('<div class="coursesplus_services_serviceUpsell"></div>');

				$serviceUpsell.css("background", "white");
				$serviceUpsell.css("border", "solid 1px black");
				$serviceUpsell.css("border-radius", "5px");
				$serviceUpsell.css("padding", "5px");

				$serviceUpsell.text("Enable Services to connect Courses+ with other websites and information, like the current lunch or your schedule.");

				var $learnMore = $('<a class="btn btn-primary" target="_blank">Learn more</a>');
				var $noThanks = $('<a class="btn btn-primary btn-sm">No thanks</a>');

				$learnMore.attr("href", cpal.resources.getURL("etc/options.html#services"));
				$noThanks.click(function() {
					cpal.storage.setKey("serviceUpsell", true, function() {
						window.location.reload();
					});
					return false;
				});

				$serviceUpsell.append("<br />");
				$serviceUpsell.append($learnMore);
				$serviceUpsell.append("<br />");
				$serviceUpsell.append($noThanks);

				$("#region-post > .region-content").append($serviceUpsell);
			}

			var runCount = 0;

			for (var serviceCount in serviceList) {
				var serviceIndex = serviceList[serviceCount];

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
						cpal.storage.getKey("serviceHidden-" + serviceIndex, function(hiddenRaw, keyName) {
							var saveServiceIndex = keyName.replace("serviceHidden-", "");
							var saveService = window.services[saveServiceIndex];

							var isHidden = (hiddenRaw ? hiddenRaw : false);

							var $blockBody = saveService.createBlock();

							var $blockToAppend = $("<div></div>");

							$blockToAppend.attr("id", saveServiceIndex + "_service_block");
							$blockToAppend.addClass("block");
							if (isHidden) {
								$blockToAppend.addClass("hidden");
							}

								var $header = $("<div class=\"header\"><div class=\"title\"><h2></h2></div></div>");

									$header.find("h2").text(saveService.displayName);

									if (saveService.options) {
										var $settingIcon = $('<i class="fa fa-wrench pull-right"></i>');

											$settingIcon.attr("data-serviceIndex", saveServiceIndex);

											$settingIcon.css("position", "relative");
											$settingIcon.css("top", "-12px");
											$settingIcon.css("right", "24px");
											$settingIcon.css("cursor", "pointer");

											$settingIcon.click(function() {
												window.location.href = cpal.resources.getURL("etc/options.html#soptions:" + $(this).attr("data-serviceIndex"));
											});

										$header.children(".title").append($settingIcon);
									}
									var $toggleVisibleIcon = $('<i class="fa fa-minus-square pull-right"></i>');

										if (isHidden) {
											$toggleVisibleIcon.toggleClass("fa-minus-square");
											$toggleVisibleIcon.toggleClass("fa-plus-square");
										}
										$toggleVisibleIcon.attr("data-serviceIndex", saveServiceIndex);

										$toggleVisibleIcon.css("position", "relative");
										$toggleVisibleIcon.css("top", "-12px");
										$toggleVisibleIcon.css("right", "6px");
										if (saveService.options) {
											$toggleVisibleIcon.css("right", "-10px");										
										}
										$toggleVisibleIcon.css("cursor", "pointer");

										$toggleVisibleIcon.click(function() {
											$(this).toggleClass("fa-minus-square");
											$(this).toggleClass("fa-plus-square");
											var $blockElem = $(this).parent().parent().parent();
											$blockElem.toggleClass("hidden");
											cpal.storage.setKey("serviceHidden-" + $(this).attr("data-serviceIndex"), $blockElem.hasClass("hidden"), function() {

											});
										});

									$header.children(".title").append($toggleVisibleIcon);

								$blockToAppend.append($header);

								var $content = $("<div class=\"content\"></div>");

									$content.append($blockBody);

								$blockToAppend.append($content);

							$("#region-post > .region-content").append($blockToAppend);
						});

						break;
					case "calendar":
						service.createCalendarEvents(function(events) {
							// date.getTime() / 1000 // in Unix time 
							if (helpers.testURL("calendar/view.php?view=month")) {
								console.log("Month view!");

								var curDate = new Date(parseInt(helpers.getParameterByName("time", window.location.href)) * 1000);

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
										linkTo = linkTo.replace(helpers.getParameterByName("time", window.location.href), thisEvent.date.getTime() / 1000);
										linkTo += "#";
										linkTo += eventId;

										$appendMe.children("a").attr("href", linkTo);

										$(this).parent().children(".events-new").append($appendMe);
									}
								});
							}				
							if (helpers.testURL("calendar/view.php?view=day")) {
								console.log("Day view!");

								var curDate = new Date(parseInt(helpers.getParameterByName("time", window.location.href)) * 1000);

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
		});
	});
};
