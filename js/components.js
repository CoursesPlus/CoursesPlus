var emoteBaseUrl = "https://coursesplus.tk/emotions/";
var emoteTable = {
	":)" : {url: "smile.png"},
	":D" : {url: "Big-Grin.png"},
	":P" : {url: "Tongue.png"},
	">:(": {url: "Angry.png"},
	":(" : {url: "Sad.png"},
	":angry:": {url: "Angry.png"},
	":balloon:": {url: "Balloon.png"},
	":biggrin:": {url: "Big-Grin.png"},
	":bomb:": {url: "Bomb.png"},
	":brokenheart:": {url: "Broken-Heart.png"},
	":cake:": {url: "Cake.png"},
	":cat:": {url: "Cat.png"},
	":clock:": {url: "Clock.png"},
	":clown:": {url: "Clown.png"},
	":cold:": {url: "Cold.png"},
	":confused:": {url: "Confused.png"},
	":cool:": {url: "Cool.png"},
	":crying:": {url: "Crying.png"},
	":crying2:": {url: "Crying2.png"},
	":dead:": {url: "Dead.png"},
	":devil:": {url: "Devil.png"},
	":dizzy:": {url: "Dizzy.png"},
	":dog:": {url: "Dog.png"},
	":donttellanyone:": {url: "Don't-tell-Anyone.png"},
	":drinks:": {url: "Drinks.png"},
	":drooling:": {url: "Drooling.png"},
	":flower:": {url: "Flower.png"},
	":ghost:": {url: "Ghost.png"},
	":gift:": {url: "Gift.png"},
	":girl:": {url: "Girl.png"},
	":goodbye:": {url: "Goodbye.png"},
	":heart:": {url: "Heart.png"},
	":hug:": {url: "Hug.png"},
	":kiss:": {url: "Kiss.png"},
	":laughing:": {url: "Laughing.png"},
	":lightbulb:": {url: "Lightbulb.png"},
	":loser:": {url: "Loser.png"},
	":love:": {url: "Love.png"},
	":mail:": {url: "Mail.png"},
	":music:": {url: "Music.png"},
	":nerd:": {url: "Nerd.png"},
	":night:": {url: "Night.png"},
	":ninja:": {url: "Ninja.png"},
	":nottalking:": {url: "Not-Talking.png"},
	":party:": {url: "Party.png"},
	":phone:": {url: "on-the-Phone.png"},
	":pig:": {url: "Pig.png"},
	":poo:": {url: "Poo.png"},
	":rainbow:": {url: "Rainbow.png"},
	":raining:": {url: "Raining.png"},
	":sacred:": {url: "Sacred.png"},
	":sad:": {url: "Sad.png"},
	":scared:": {url: "Scared.png"},
	":sick:": {url: "Sick.png"},
	":sick2:": {url: "Sick2.png"},
	":silly:": {url: "Silly.png"},
	":sleeping:": {url: "Sleeping.png"},
	":sleeping2:": {url: "Sleeping2.png"},
	":sleepy:": {url: "Sleepy.png"},
	":sleepy2:": {url: "Sleepy2.png"},
	":smile:": {url: "smile.png"},
	":smoking:": {url: "Smoking.png"},
	":smug:": {url: "Smug.png"},
	":stars:": {url: "Stars.png"},
	":straightface:": {url: "Straight-Face.png"},
	":sun:": {url: "Sun.png"},
	":sweat:": {url: "Sweating.png"},
	":sweating:": {url: "Sweating.png"},
	":thinking:": {url: "Thinking.png"},
	":tongue:": {url: "Tongue.png"},
	":vomit:": {url: "Vomit.png"},
	":wave:": {url: "Wave.png"},
	":whew:": {url: "Whew.png"},
	":win:": {url: "Win.png"},
	":winking:": {url: "Winking.png"},
	":yawn:": {url: "Yawn.png"},
	":yawn2:": {url: "Yawn2.png"},
	":zombie:": {url: "Zombie.png"}
};

function componentEnabled(name, callback) {
	var componentsToSkip = [];

	cpal.storage.getKey("disabledComponents", function(result) {
		componentsToSkip = ($.isArray(result) ? result : []);
		var response = (componentsToSkip.indexOf(name) == -1);
		callback(response);
	});
}

function createDebugReport(e, component) {
	var detailsText = "CoursesPlus\n";
	detailsText += "Debug report\n";
	if (consts.isBeta) {
		detailsText += "Public beta\n";
	}
	detailsText += "\n";
	if (component != undefined) {
		detailsText += "Error encountered while running code for component ";
		detailsText += component.displayName;
		detailsText += " (with index ";
		if (componentIndex) {
			detailsText += componentIndex;
		} else {
			detailsText += "undefined";
		}
		detailsText += ").\n";
	} else {
		detailsText += "No component info - manual report?"
	}
	detailsText += "\n";
	detailsText += "\n";
	detailsText += "Error details\n";
	if (e != undefined) {
		detailsText += "Message: ";
		detailsText += e.message;
		detailsText += "\n";
		detailsText += "Stack:\n";
		detailsText += e.stack;
		detailsText += "\n";
	} else {
		detailsText += "No error - report is from debug mode?\n";
	}
	detailsText += "\n";
	detailsText += "Context info\n";
	detailsText += "Page URL: ";
	detailsText += window.location.href;
	detailsText += "\n";
	detailsText += "Browser version: ";
	detailsText += cpal.extension.getBrowserVersion();
	detailsText += "\n";
	detailsText += "Extension version: ";
	detailsText += cpal.extension.getExtensionVersion();
	if (consts.isBeta) {
		detailsText += " (beta)";
	}
	detailsText += "\n";
	detailsText += "\n";
	detailsText += "CPAL platform-specifics:\n";
	detailsText += cpal.logging.specificErrorDetails();

	return detailsText;
}

// All of the components.
var components = {
	bootstrap: {displayName: "Bootstrap-ification", description: "Changes Courses' look and feel - things like the navigation bar, buttons, etc.", exec: function() {
		// Make the navbar Bootstrap-y
		var $navbar = $("#dalton_nav");

		var $innerCont = $('<div class="container-fluid">');

		var $navInner = $('<div class="collapse navbar-collapse">');
		$($navInner).wrap($innerCont);
		$("#topnav").addClass("nav navbar-nav");

		$("#topnav").wrap($navInner);

		$navbar.addClass("navbar-default");
		// FORCE IT
		$navbar.css("background", "#f7f8f8");
		$navbar.css("border", "1px solid #ddd");

		// Force teh pwetty colors
		$(".navbar a").css("color", "rgb(119, 119, 119)");
		$("li#dalton_nav_date a").css("color", "rgb(119, 119, 119)");

		// Change the home icon's logo
		$("#topnav li").addClass("linkylink");
		$(".linkylink a img").attr("src", "data:image/png;base64,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");
		
		// Fix the date
		$("#dalton_nav_date").addClass("navbar-text");

		// YAY buttons
		$('input[type="submit"], input[type="button"], button').not(".nobootstrapchange").addClass("btn");
		$('input[type="submit"], input[type="button"], button').not(".nobootstrapchange").addClass("btn-primary");
		$('input[type="submit"], input[type="button"], button').not(".nobootstrapchange").css("background-color", "rgb(66, 139, 202)");

		// Fix buttons being hidden
		$(".messagesend form > fieldset > div").css("display", "block");
		$(".messagesend form fieldset").removeClass("hidden");

		// Fix "Search Courses" label
		$("label[for=shortsearchbox]").html("Search courses:&nbsp;&nbsp;");

		if (helpers.testURL("calendar/view.php")) {
			// Move the calendar's "New event" button
			var neb = $(".path-calendar .maincalendar .header .buttons > form").parent().html();
			if (neb != undefined) {
				$(".navbar .navbutton").prepend("<div class=\"singlebutton\">" + neb + "</div>");
			}
			$(".maincalendar > .heightcontainer > .header").html("");
		}

		// Hack to make Course updates, Events key, and more text smaller
		// TODO: find a way to do this in CSS (maybe very specific path of parent elements?) or at least optimize this... somehow.
		$("h3").each(function() {
			if ($(this).text() == "Course updates:" || $(this).text() == "Events key" || $(this).text() == "Assignments submitted:" || $(this).text() == "New forum posts:" || $(this).text() == "New glossary entries:") {
				$(this).css("font-size", "16px");
			}
		});

		// Deal with news forums
		if (helpers.testURL("forum/view.php")) {
			$("table").addClass("table table-striped");
			$("table").css("margin-left", "10px");
			$("table").css("border-radius", "4px");
			$("table > tbody").css("overflow", "hidden");
			$("table > tbody > tr").css("background", "#fff");
			$(".table > thead > tr > .header").css("border-bottom", "none");
			$("table > tbody > tr > .topic").css("border", "none");
		}

		// Fix that one lone... thingy next to the topics on a course
		$(".section > .left.side").each(function() {
			if ($(this).find("img").length == 0) {
				var addMe = '<img width="1" height="1" class="spacer" alt="" title="" src="/theme/image.php/dalton/core/1425901267/spacer">';
				$(this).append(addMe);
			}
		});

		// Fix event mess introduced in Courses 2016
		$(":not(.content) > .event").each(function() {
			var $header = $('<header></header>');
			
			$header.append($(this).children(".name"));
			$header.append($(this).children(".referer"));
			$header.append($(this).children(".course"));
			$header.append($(this).children(".date"));
			$header.append('<div style="clear:both"></div>');

			// Normalize name into referer.
			$header.children(".name").addClass("referer");
			$header.children(".name").removeClass("name");

			$header.children(".referer").prepend($('<span class="insTop"></span> '));

			// no img for now because it looks nicer
			//$header.children(".referer").prepend($(this).children("img"));

			$(this).children("img").remove();
			$(this).children(".name").remove();
			$(this).children(".referer").remove();
			$(this).children(".course").remove();
			$(this).children(".date").remove();

			$header.css("background-color", "#3B6FFF");
			$header.css("color", "white");
			$header.css("padding", "10px");
			$header.css("margin-bottom", "10px");
			$header.css("font-size", "1.1em");

			$header.children(".referer").children("img").css("width", "24px");
			$header.children(".referer").children("img").css("height", "24px");
			$header.children(".referer").css("margin-top", "0");

			$header.children("h3").children("a").css("color", "white");
			$header.children("h3").css("font-size", "1.5em");
			$header.children("div").children("a").css("color", "white");

			$(this).children(".description").removeClass("calendar_event_course"); // some holidays have this. 
			$(this).children(".description").css("padding", "10px");

			$(this).prepend($header);
		});

		// Fix JS error on homepage when loading collapsible sections
		/*var injectedScript = `var oldM = M.block_course_overview.CollapsibleRegion;
		M.block_course_overview.CollapsibleRegion = function(Y, id, userpref, strtooltip) {
			if ($("#" + id).length == 0) {
				console.warn("CollapsibleRegion given invalid id!");
				return;
			}
			oldM(Y, id, userpref, strtooltip);
		};`
		var $script = $('<script></script>');
			$script.html(injectedScript);
		$("body").append($script);*/
	}, js: [], css: ["bootstrap.css", "../scss_gen/fonts.css", "font-awesome.min.css"], runOn: "*", requires: []},
	teacherList: {displayName: "Condense list of teachers", description: "Makes a list of teachers just say the first teacher's name and bla others.", exec: function() {
		$(".teachers").each(function(index) {
			// Get rid of the "Teacher: " text.
			$(this).children().each(function(index) {
				$(this).html($(this).html().split(": ")[1]);
			});
		});
		var $teacherListModal = $('<div class="teacherListModal modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">List of teachers</h4></div><div class="modal-body"><ul id="coursesplus-teacherotherdialog-listofteachers"></ul></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');
		$("body").append($teacherListModal);
		// List of teachers is sometimes long... this just makes it say "multiple teachers"
		$(".coursebox.clearfix").each(function() {
			var myLength = $(this).children(".content").children(".teachers").children("li").length;
			if (myLength > 1) {
				var teacherListStr = $(this).children(".content").children(".teachers").children("li").map(function(i, opt) {
					return $(opt).text();
				}).toArray().join(',');
				var first = $(this).children(".content").children(".teachers").children("li").first();
				$(this).children(".content").children(".teachers").html("");

				var $appendMe = $("<li>" + first.html() +  " and " + (myLength - 1) + " </li>");
				
					var $otherlink = $("<a class=\"coursesplus-teachers-otherlink\" href=\"#\">other" + (myLength == 2 ? "" : "s") + "</a>");
					$otherlink.attr("data-teacherlist", teacherListStr);
					$otherlink.click(function() {
						$("#coursesplus-teacherotherdialog-listofteachers").html("");
						var teacherArray = $(this).attr("data-teacherlist").split(',');
						for (var teacherIndex in teacherArray) {
							var $teacherItem = $("<li></li>");
							$teacherItem.text(teacherArray[teacherIndex]);
							$("#coursesplus-teacherotherdialog-listofteachers").append($teacherItem);
						}
						$teacherListModal.modal();
					});

				$appendMe.append($otherlink);

				$(this).children(".content").children(".teachers").append($appendMe);
			}
		});
	}, js: [], css: [], runOn: "", requires: []},
	dstBug: {displayName: "Fix date bug", description: "Fixes a bug where going to some days' event views would cause the wrong date to be shown.", exec: function() {
		var realTime = helpers.getParameterByName("time", window.location.href);
		var myDate = new Date( parseInt(realTime) *1000);
		var rawDateStr = myDate.toGMTString();
		var dateParts = rawDateStr.split(' ');
		var dayOfWeek = dateParts[0].replace(',', '');
		var prevDow = "";
		var nextDow = "";
		var month = dateParts[2];

		var dowArray = [
			{shortN: "Mon", longN: "Monday"},
			{shortN: "Tue", longN: "Tuesday"},
			{shortN: "Wed", longN: "Wednesday"},
			{shortN: "Thu", longN: "Thursday"},
			{shortN: "Fri", longN: "Friday"},
			{shortN: "Sat", longN: "Saturday"},
			{shortN: "Sun", longN: "Sunday"}
		];
		for (var dowThing in dowArray) {
			if (dowArray[dowThing].shortN == dayOfWeek) {
				dayOfWeek = dowArray[dowThing].longN + ",";
				if (dowThing == 0) {
					prevDow = dowArray[6].longN;
				} else {
					prevDow = dowArray[parseInt(dowThing) - 1].longN;
				}
				if (dowThing == 6) {
					nextDow = dowArray[0].longN;
				} else {
					nextDow = dowArray[parseInt(dowThing) + 1].longN;
				}
				break;
			}
		}

		var monthArray = [
			{shortN: "Jan", longN: "January"},
			{shortN: "Feb", longN: "February"},
			{shortN: "Mar", longN: "March"},
			{shortN: "Apr", longN: "April"},
			{shortN: "May", longN: "May"},
			{shortN: "Jun", longN: "June"},
			{shortN: "Jul", longN: "July"},
			{shortN: "Aug", longN: "August"},
			{shortN: "Sep", longN: "September"},
			{shortN: "Oct", longN: "October"},
			{shortN: "Nov", longN: "November"},
			{shortN: "Dec", longN: "December"}
		];
		for (var monthThing in monthArray) {
			if (monthArray[monthThing].shortN == month) {
				month = monthArray[monthThing].longN;
				break;
			}
		}

		var dayNum = parseInt(dateParts[1]);

		var finalDateStr = dayOfWeek + ' ' + dayNum + ' ' + month + ' ' + dateParts[3];

		console.log(rawDateStr);
		console.log(finalDateStr);

		if ($(".path-calendar .maincalendar .calendar-controls .current").text() != finalDateStr) {
			console.log("Date is messed up!");
			$(".path-calendar .maincalendar .calendar-controls .current").text(finalDateStr);
			$(".path-calendar .maincalendar .calendar-controls .previous").attr("title", prevDow);
			$(".path-calendar .maincalendar .calendar-controls .previous .arrow_text").text(prevDow);
			$(".path-calendar .maincalendar .calendar-controls .next").attr("title", nextDow);
			$(".path-calendar .maincalendar .calendar-controls .next .arrow_text").text(nextDow);
		} else {
			console.log("Date is good.");
		}
	}, js: [], css: [], runOn: "calendar/view.php?view=day", requires: []},
	myHome: {displayName: "\"My home\" fixes", description: "Makes some fixes to the \"my home\" page to make it work with Courses+.", exec: function() {
		if ($(".box.notice").length == 1) {
			// Customization mode
			// let's not break things...
			return;
		}
		$(".coursebox").addClass("myHome");
		var even = false;
		var count = 0;
		$(".coursebox").each(function() {
			if (even) {
				$(this).addClass("even");
			} else {
				$(this).addClass("odd");
				count++;
			}
			even = !even;
		});
		// Fix height (because the "Show all courses" page doesn't have the text at the bottom to push the box down)
		//$(".block_course_overview.block").css("height", ((count*57) + 108) + "px");
		$(".collapsibleregioncaption").html("");
		//$(".activity_info").remove();
		$(".block_course_overview .content .notice").css("text-align", "center");
		$(".block_course_overview .content .notice").css("font-style", "italic");
		if ($(".block_course_overview .content .notice").html() != undefined) {
			$(".block_course_overview .content .notice").html($(".block_course_overview .content .notice").html().replace("You have ", ""));
		}
		//$(".block_course_overview .content .notice").css("margin-top", ((count*57) + 50) + "px");

		// fool with the my home page to make it more like the home page
		$(".region-content > .block").first().css("background", "none");
		$(".region-content > .block:first > .header").remove();
	}, js: [], css: ["my.css"], runOn: "my/", requires: []},
	uselessText: {displayName: "Remove useless text", description: "Removes the \"Dalton Courses is your place for ... bla bla bla\" text on the main page.", exec: function() {
		// Get rid of the useless "Dalton Courses is your place for... bla bla bla"
		if ($("#inst2").attr("aria-label") == "Course/site summary") {
			$("#inst2").css("display", "none");
		}
	}, js: [], css: [], runOn: "", requires: []},
	courseGrid: {displayName: "Grid view for homepage", description: "Makes your courses on the homepage into a grid. We recommend you choose the 'Condense list of teachers' option too.", exec: function() {
		$(".coursebox.even").after($('<div style="position: relative;float: left;width: 100%;" class="coursesplus-evillongnamegridhelper"></div>'));
	}, js: [], css: ["grid.css"], runOn: "", requires: []},
	customCourses: {displayName: "Customizable courses", description: "Makes the courses on the homepage be customizable.", exec: function() {	
		if (!(helpers.testURL("") || helpers.testURL("my/"))) {
			return; // go away
		}

		var onEditBtnDown = function() {
			var courseId = $(this).parent().attr("data-courseid");
			var courseName = $($(this).parent().children()[0]).text();
			var courseTeacher = $(this).parent().children(".content").children(".teachers").text();

			$(".editCourseModal").attr("data-courseid", courseId);

			$(".editCourseName").text(courseName);
			$(".editCourseTeacher").text(courseTeacher);

			$(".editFontDropdown").val($(this).parent().attr("data-font-family"));
			$(".editBackgroundColors").children().removeClass("selected");

			var thisBgColor = $(this).parent().attr("data-background-color");
			if ($(".editBackgroundColors > *").hasClass(thisBgColor)) {
				$(".editBackgroundColors > ." + thisBgColor).addClass("selected");
			} else {
				$(".editBackgroundColors > .custom").addClass("selected");
				$(".secretCourseBgColorPicker").val(thisBgColor);
				$(".selBox.background.custom").css("background-color", thisBgColor);
				$(".selBox.background.custom").css("color", thisBgColor);
			}

			$(".editCourseModal").modal();
		};

		$('.coursebox').each(function() {
			var courseId = $(this).attr("data-courseid");
			if ($(this).attr("data-courseid") == undefined) {
				$(this).attr("data-courseid", $(this).attr("id").replace("course-", ""));
				courseId = $(this).attr("data-courseid");
			}
			var $saveThis = $(this);
			cpal.storage.getKey("course-" + courseId, function(result) {
				var courseInfo = {
					fontFamily: "ThemeDefault",
					backgroundColor: "white"
				};
				if (result !== undefined) {
					courseInfo = $.extend(courseInfo, result);
				}
				$saveThis.attr("data-font-family", courseInfo.fontFamily);
				var fontFamilyCss = courseInfo.fontFamily;
				if (fontFamilyCss == "Helvetica Neue") {
					// Not all Windows machines have Helvetica Neue. So, we add in some replacements
					fontFamilyCss = "'Helvetica Neue', Helvetica, Arial, sans-serif";
				}
				if (courseInfo.fontFamily !== "ThemeDefault") {
					$saveThis.css("font-family", fontFamilyCss);
					$saveThis.find("a").css("font-family", fontFamilyCss);
				}

				$saveThis.css("background-color", courseInfo.backgroundColor);
				$saveThis.attr("data-background-color", courseInfo.backgroundColor);
			});

			var $editBtn = $('<button class="editBtn nobootstrapchange btn btn-primary btn-sm"><i class="glyphicon glyphicon-edit"></i></button>');
			//$editBtn.css("left", ($('.coursebox').width() - 43) + "px");
			$editBtn.click(onEditBtnDown);
			$editBtn.mouseup(onEditBtnDown);

			$editBtn.css("opacity", "0");

			$(this).append($editBtn)

			$(this).mouseover(function() {
				$(this).children('.editBtn').css("opacity", "1");
			});
			$(this).mouseleave(function() {
				$(this).children('.editBtn').css("opacity", "0");
			});
		});

		var $editModal = $('<div class="editCourseModal modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">Edit course</h4></div><div class="modal-body"><h4 class="editCourseName"></h4><h5 class="editCourseTeacher"></h5><p></p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');
		
		var $fontHeader = $('<h6 class="editUppercase">Font</h6>');
		var $fontDropdown = $('<select class="editFontDropdown"></select>');
		$fontDropdown.append($('<option value="ThemeDefault" class="editFont themeDefault">Theme default</option>'));
		$fontDropdown.append($('<option disabled>&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;&#9473;</option>'));
		$fontDropdown.append($('<option value="Arial Rounded MT Bold" class="editFont arialRounded">Arial Rounded MT Bold</option>'));
		$fontDropdown.append($('<option value="Georgia" class="editFont georgia">Georgia</option>'));
		$fontDropdown.append($('<option value="Helvetica Neue" class="editFont helveticaNeue">Helvetica Neue</option>'));
		$fontDropdown.append($('<option value="Impact" class="editFont impact">Impact</option>'));
		$fontDropdown.append($('<option value="Lato" class="editFont lato">Lato</option>'));
		$fontDropdown.append($('<option value="Oxygen" class="editFont oxygen">Oxygen</option>'));
		$fontDropdown.append($('<option value="PT Sans" class="editFont ptSans">PT Sans</option>'));
		$fontDropdown.append($('<option value="Tahoma" class="editFont tahoma">Tahoma</option>'));
		$fontDropdown.append($('<option value="Times New Roman" class="editFont timesNewRoman">Times New Roman</option>'));
		$fontDropdown.append($('<option value="Trebuchet MS" class="editFont trebuchetMS">Trebuchet MS</option>'));
		$fontDropdown.append($('<option value="Verdana" class="editFont verdana">Verdana</option>'));

		$fontDropdown.change(function() {
			var courseId = $(".editCourseModal").attr("data-courseid");
			$(".coursebox").each(function() {
				if ($(this).attr("data-courseid") == courseId) {
					var cssFamily = $(".editFontDropdown").val()
					if (cssFamily == "ThemeDefault") {
						cssFamily = "inherit";
					}
					$(this).css("font-family", cssFamily);
					$(this).find("a").css("font-family", cssFamily);
					$(this).attr("data-font-family", $(".editFontDropdown").val());
					cpal.storage.getKey("course-" + courseId, function(result) {
						var courseInfo = {};
						if (result !== undefined) {
							courseInfo = result;
						}
						courseInfo.fontFamily = $(".editFontDropdown").val();
						cpal.storage.setKey("course-" + courseId, courseInfo);
					});
				}
			});
		});

		var $bgHeader = $('<h6 class="editUppercase">Background color</h6>');
		var $bgSelboxContainer = $('<div class="editBackgroundColors"></div>');

		var $secretColorPicker = $('<input type="color" class="secretCourseBgColorPicker" value="#ffffff" style="position:absolute;top:-5000px;left:-5000px;" />');
		$bgSelboxContainer.append($secretColorPicker);

		$bgSelboxContainer.append($('<div class="selBox background white" data-selBoxGroup="background" data-selBoxVal="white"></div>'));
		$bgSelboxContainer.append($('<div class="selBox background pink" data-selBoxGroup="background" data-selBoxVal="pink"></div>'));
		$bgSelboxContainer.append($('<div class="selBox background lightgreen" data-selBoxGroup="background" data-selBoxVal="lightgreen"></div>'));
		$bgSelboxContainer.append($('<div class="selBox background lightblue" data-selBoxGroup="background" data-selBoxVal="lightblue"></div>'));
		$bgSelboxContainer.append($('<div class="selBox background orange" data-selBoxGroup="background" data-selBoxVal="orange"></div>'));
		$bgSelboxContainer.append($('<div class="selBox background transparent selected" data-selBoxGroup="background" data-selBoxVal="transparent"></div>'));
		$bgSelboxContainer.append($('<div class="selBox background custom" data-selBoxGroup="background" data-selBoxVal="custom"><span>...</span></div>'));
		//$bgSelboxContainer.append($('<div class="selBox background gray" data-selBoxGroup="background" data-selBoxVal="gray"></div>'));

		var setCourseBgColor = function(courseId, to) {
			$(".coursebox").each(function() {
				if ($(this).attr("data-courseid") == courseId) {
					$(this).css("background-color", to);
					$(this).attr("data-background-color", to);
					cpal.storage.getKey("course-" + courseId, function(result) {
						var courseInfo = {};
						if (result !== undefined) {
							courseInfo = result;
						}
						courseInfo.backgroundColor = to;
						cpal.storage.setKey("course-" + courseId, courseInfo);
					});
				}
			});
		};
		var onBgColorPickerChange = function() {
			var courseId = $(".editCourseModal").attr("data-courseid");
			var newColor = $(".secretCourseBgColorPicker").val();

			$(".selBox.background.custom").css("background-color", newColor);
			$(".selBox.background.custom").css("color", newColor);

			setCourseBgColor(courseId, newColor);
		};

		$secretColorPicker.change(onBgColorPickerChange);

		$bgSelboxContainer.on("selBoxChanged", function(e) {
			if (e.to == "custom") {
				$(".secretCourseBgColorPicker")[0].click();
			} else {
				var courseId = $(".editCourseModal").attr("data-courseid");
				setCourseBgColor(courseId, e.to);
			}
		});

		//new Array("adjust","align-center","align-justify","align-left","align-right","arrow-down","arrow-left","arrow-right","arrow-up","asterisk","backward","ban-circle","barcode","bell","bold","book","bookmark","briefcase","bullhorn","calendar","camera","certificate","check","chevron-down","chevron-left","chevron-right","chevron-up","circle-arrow-down","circle-arrow-left","circle-arrow-right","circle-arrow-up","cloud","cloud-download","cloud-upload","cog","collapse-down","collapse-up","comment","compressed","copyright-mark","credit-card","cutlery","dashboard","download","download-alt","earphone","edit","eject","envelope","euro","exclamation-sign","expand","export","eye-close","eye-open","facetime-video","fast-backward","fast-forward","file","film","filter","fire","flag","flash","floppy-disk","floppy-open","floppy-remove","floppy-save","floppy-saved","folder-close","folder-open","font","forward","fullscreen","gbp","gift","glass","globe","hand-down","hand-left","hand-right","hand-up","hd-video","hdd","header","headphones","heart","heart-empty","home","import","inbox","indent-left","indent-right","info-sign","italic","leaf","link","list","list-alt","lock","log-in","log-out","magnet","map-marker","minus","minus-sign","move","music","new-window","off","ok","ok-circle","ok-sign","open","paperclip","pause","pencil","phone","phone-alt","picture","plane","play","play-circle","plus","plus-sign","print","pushpin","qrcode","question-sign","random","record","refresh","registration-mark","remove","remove-circle","remove-sign","repeat","resize-full","resize-horizontal","resize-small","resize-vertical","retweet","road","save","saved","screenshot","sd-video","search","send","share","share-alt","shopping-cart","signal","sort","sort-by-alphabet","sort-by-alphabet-alt","sort-by-attributes","sort-by-attributes-alt","sort-by-order","sort-by-order-alt","sound-5-1","sound-6-1","sound-7-1","sound-dolby","sound-stereo","star","star-empty","stats","step-backward","step-forward","stop","subtitles","tag","tags","tasks","text-height","text-width","th","th-large","th-list","thumbs-down","thumbs-up","time","tint","tower","transfer","trash","tree-conifer","tree-deciduous","unchecked","upload","usd","user","volume-down","volume-off","volume-up","warning-sign","wrench","zoom-in","zoom-out");
		// TODO: Icons

		$editModal.children(".modal-dialog").children(".modal-content").children(".modal-body").append($fontHeader);
		$editModal.children(".modal-dialog").children(".modal-content").children(".modal-body").append($fontDropdown);

		$editModal.children(".modal-dialog").children(".modal-content").children(".modal-body").append($bgHeader);
		$editModal.children(".modal-dialog").children(".modal-content").children(".modal-body").append($bgSelboxContainer);

		$('body').append($editModal);

		$(".transparent").css("background-image", "url('" + cpal.resources.getURL("images/transparent.png") + "')");

		$(".selBox").click(function() {
			if ($(this).hasClass("selected") && !$(this).hasClass("custom")) {
				// Do nothing
				return;
			}
			console.log($("[data-selBoxGroup=" + $(this).attr("data-selBoxGroup") +"]"));
			$("[data-selBoxGroup=" + $(this).attr("data-selBoxGroup") +"]").removeClass("selected");
			$(this).addClass("selected");
			$(this).trigger({
				type: "selBoxChanged",
				to: $(this).attr("data-selBoxVal")
			});
		});

		
		//$(".modal").modal();
	}, js: [], css: ["modalstuff.css", "customCourses.css"], runOn: "*", requires: []},
	homeLogin: {displayName: "Login form changes", description: "Makes the login on the Courses homepage look nicer.", exec: function() {
		$("#form-home input.text").css("margin-bottom", "0");
		$("#form-home input.text").css("border-bottom-left-radius", "0");
		$("#form-home input.text").css("border-bottom-right-radius", "0");

		$("#form-home input.password").css("margin-top", "0");
		$("#form-home input.password").css("border-top", "none");
		$("#form-home input.password").css("border-top-left-radius", "0");
		$("#form-home input.password").css("border-top-right-radius", "0");

		$("#form-home button.submit").html("<i class=\"glyphicon glyphicon-log-in\"></i>");
		$("#form-home button.submit").css("font-size", "13px");
		$("#form-home button.submit").css("display", "inline-block");
		$("#form-home button.submit").css("height", "83px");
		$("#form-home button.submit").css("width", "35px");
		$("#form-home button.submit").css("position", "relative");
		$("#form-home button.submit").css("top", "-49px");
	}, js: [], css: ["homelogin.css"], runOn: "", requires: []},
	newNavbar: {displayName: "New navbar", description: "Changes the top navigation bar to a smaller and neater version.", exec: function() {

		var $navbar = $('<nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="margin:0;"></nav>');

			var $navbarContainer = $('<div class="container-fluid"></div>');

				$navbarContainer.append($('<div class="navbar-header"><button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#coursesplusnavcollapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="/">Dalton Courses</a></div>'));

				$navbarContainer.append($('<div class="collapse navbar-collapse" id="coursesplusnavcollapse"></div>'));

					var $navbarLinks = $('<ul class="nav navbar-nav"></ul>');

						//$navbarLinks.append('<li class="navbar-text">This is a test</li>');

						var subProcessFunction = function() {
							var menuName = $(this).parent().children("a").text()
							var $dropdownContainer = $('<li class="dropdown"></li>');
								var $dropdownName = $('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span class="dropdownCoursesPlusThingText">Error</span> <span class="caret"></span></a>');
									$dropdownName.children(".dropdownCoursesPlusThingText").text(menuName);
								$dropdownContainer.append($dropdownName);

								var $dropdownList = $('<ul class="dropdown-menu" role="menu"></ul>');

									$(this).children("p").children("a").each(function() {
										var $dropdownLink = $('<li><a></a></li>');

											$dropdownLink.children("a").attr("href", $(this).attr("href"));
											$dropdownLink.children("a").text($(this).text());

											if ($(this).hasClass("login")) {
												$dropdownLink.children("a").prepend($('<i class="smallLoginIcon glyphicon glyphicon-lock"></i>'));
											}

										$dropdownList.append($dropdownLink);
									});

								$dropdownContainer.append($dropdownList);
							$navbarLinks.append($dropdownContainer);
						};

						$("#dalton_nav ul li .sub").each(subProcessFunction);

						if ($("#dalton_nav").length == 0) {
							// Oh, it's one of *those* pages...
							$("#custommenu li .sub").each(subProcessFunction);
							$("#custommenu").remove();
						}

				$navbarContainer.children(".collapse").append($navbarLinks);


				var $logDownLinks = $('<ul class="nav navbar-nav navbar-right"></ul>');
					var $logDownContainer = $('<li class="dropdown"></li>');
						var $logDownName = $('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span class="dropdownCoursesPlusThingText">Error</span> <span class="caret"></span></a>');
							$logDownName.children(".dropdownCoursesPlusThingText").text($(".logininfo > a:first").text());
						$logDownContainer.append($logDownName);

						var loggedIn = ($(".logininfo > a:first").text() != "Log in");

						var $logDownList = $('<ul class="dropdown-menu" role="menu"></ul>');

							var $optionsLink = $('<li><a target="_blank"></a></li>');

								$optionsLink.children("a").html("<i class=\"glyphicon glyphicon-wrench\"></i>&nbsp;&nbsp;Courses+ Options");
								$optionsLink.children("a").attr("href", cpal.resources.getURL("etc/options.html"));

							$logDownList.append($optionsLink);

							if (loggedIn) {
								var $upcomingLink = $('<li><a></a></li>');

									$upcomingLink.children("a").html("<i class=\"glyphicon glyphicon-time\"></i>&nbsp;&nbsp;Upcoming events");
									$upcomingLink.children("a").attr("href", "https://courses2017.dalton.org/calendar/view.php");

								$logDownList.append($upcomingLink);
							}

							var $logDownLink = $('<li><a></a></li>');

								$logDownLink.children("a").html((!loggedIn ? "<i class=\"glyphicon glyphicon-log-in\"></i>&nbsp;&nbsp;Log in to Courses" : "<i class=\"glyphicon glyphicon-log-out\"></i>&nbsp;&nbsp;Log out"));
								var linkTo = $(".logininfo > a:nth-child(2)").attr("href");
								if ($(".logininfo > a:first").text() == "Log in") {
									linkTo = $(".logininfo > a:first()").attr("href");
								}
								$logDownLink.children("a").attr("href", linkTo);

							$logDownList.append($logDownLink);

						$logDownContainer.append($logDownList);
					$logDownLinks.append($logDownContainer);

				$navbarContainer.children(".collapse").append($logDownLinks);
			$navbar.append($navbarContainer);

		$("#page-header > a").remove();
		$(".headermain").remove();
		$(".headermenu").remove();
		$("#dalton_nav").remove();
		$("body").css("padding-top", "60px");
		$("body").append($navbar);

		$(".navbar").css("overflow", "initial");
	}, js: [], css: ["newNav.css"], runOn: "*", requires: []},
	messageFixes: {displayName: "Messaging changes", description: "Makes some changes to the messaging system.", exec: function() {
		$("#id_message").attr("placeholder", "Type message here...");

		var $emotionModal = $('<div class="emotionModal modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">Emotions</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');
		
			var $emotePanel = $('<div class="emotePanel"></div>');

				var $emoteInstructions = $('<p class="coursesplus-emotionInstructions">Type the symbol of an emotion (displayed below it) and it will become an icon in your message - even if the other person doesn\'t have Courses+!</p>');
				$emotePanel.append($emoteInstructions);

				var emoteColumn = 1;
				var $emoteTable = $('<table class="coursesplus-emotiontable"></table>');

				var $emoteRow = $('<tr></tr>');

				for ( var emoteCode in emoteTable ) {
					var $emoteCell = $('<td class="emoteCell"></td>');

						$emoteCell.append($('<span><img src="' + emoteBaseUrl + emoteTable[emoteCode].url + '" alt="' + emoteCode + '" title="' + emoteCode + '"/><br/>' + emoteCode + '</span>'));
					
						$emoteCell.click(function () {
							$("#id_message").val($("#id_message").val() + $(this).children("span").text());
							$(".emotionModal").modal("hide");
						});

					$emoteRow.append($emoteCell);

					emoteColumn++;
					if (emoteColumn > 6) {
						emoteColumn = 1;
						$emoteTable.append($emoteRow);
						$emoteRow = $('<tr></tr>');
					}
				}

				$emotePanel.append($emoteTable);

			$emotionModal.children(".modal-dialog").children(".modal-content").children(".modal-body").append($emotePanel);

		$("body").append($emotionModal);

		var $emotionButton = $('<input type="submit" id="emotionButton" class="btn btn-info" value="Emotions..." />');
		$emotionButton.click(function() {
			$(".emotionModal").modal();
			return false;
		});

		$(".felement.fsubmit").prepend($('<div class="coursesplus-spacer"></div>'));
		$(".felement.fsubmit").prepend($emotionButton);

		// Hook into message send
		$("#id_submitbutton").click(function() {
			$("#id_message").hide();
			$(".felement.ftextarea").append('<div style="width: 100%; height: 100%;"></div>')
			$(".felement.ftextarea").children("div").css("font-size", "20px");
			$(".felement.ftextarea").children("div").css("text-align", "center");
			$(".felement.ftextarea").children("div").text("Sending your message...");
			console.log("Parsing message...");

			var origText = $("#id_message").val();
			var text = $("#id_message").val();
			var isChanged = false;

			for ( var emoteCode in emoteTable ) {
				var imgTitle = emoteCode;
				if (imgTitle == ">:(") {
					// This is a hack.
					imgTitle = "__HACKYCOURSESPLUSEMOTIONFROWNYVERUSANGRYFACEYAYYAYYAY__";
				}
				var replaceCode = '<img src="' + emoteBaseUrl + emoteTable[emoteCode].url + '" alt="' + imgTitle + '" title="' + imgTitle + '"/>';
				text = text.replaceAll(emoteCode, replaceCode);
			}

			text = text.replaceAll("__HACKYCOURSESPLUSEMOTIONFROWNYVERUSANGRYFACEYAYYAYYAY__", ">:(");
			
			isChanged = !(origText == text);

			if (isChanged) {
				text = '<!-- Hi! If you\'re seeing this, click the link at the bottom of this email to view this message properly. Thanks! -->' + text;
				text = text + "<!-- Message parsed by Courses+ with parser revision 1-ish -->";
				$("#id_message").val(text);
			}

			console.log("Parsed message!");
			return true;
		});
	}, js: [], css: ["messages.css", "spacer.css"], runOn: "message/", requires: []},
	modernAsides: {displayName: "Modern asides", description: "Makes the asides on course pages look more modern.", exec: function() {
		// Pure CSS! :)
	}, js: [], css: ["modernAsides.css"], runOn: "*", requires: []},
	markEvents: {displayName: "Mark events", description: "Mark events as done.", exec: function() {
		if (helpers.testURL("calendar/view.php")) {
			$(".event").each(function() {
				var $r0 = $(this);
				var thisId = $r0.attr("id");
				
				var $eventCheck = $('<input type="checkbox" class="eventCheck" />');
				
				$eventCheck.attr("data-id", thisId);

				$eventCheck.css("position", "relative");
				$eventCheck.css("top", "-3px");
				$eventCheck.css("margin-right", "8px");

				$eventCheck.change(function() {
					var eventId = $(this).attr("data-id");
					var $r0 = $(this).parent().parent().parent().parent();
					var eventDone = $(this).prop('checked');

					var saveThing = {};
					cpal.storage.getKey(thisId, function(result) {
						saveThing = result;
						if (saveThing == undefined) {
							saveThing = {};
						}
						saveThing.done = eventDone;
						cpal.storage.setKey(eventId, saveThing, function() {
							if (saveThing.done) {
								var $eventNameElem = $r0.children(".header").children(".referer");
								$eventNameElem.text("DONE - " + $eventNameElem.text());
								$r0.addClass("eventComplete");
								$eventCheck.prop('checked', true);
							} else {
								var $eventNameElem = $r0.children(".header").children(".referer");
								$eventNameElem.text($eventNameElem.text().replace("DONE - ", ""));
								$r0.removeClass("eventComplete");
								$eventCheck.prop('checked', false);
							}
						});
					});
				});

				cpal.storage.getKey(thisId, function(result) {
					if (result == undefined) {
						console.log(thisId + " not set!");
					} else {
						if (result.done) {
							var $eventNameElem = $r0.children(".header").children(".referer");
							$eventNameElem.text("DONE - " + $eventNameElem.text());
							$r0.addClass("eventComplete");
							$eventCheck.prop('checked', true);
						}
					}
					$r0.children("header").children(".referer").children(".insTop").prepend($eventCheck);
				});
			});
		}
		if (helpers.testURL("calendar/view.php?view=month")) {
			$(".calendar_event_course:not(.day), .calendar_event_user:not(.day)").each(function() {
				var url = $(this).children("a").attr("href");
				if (url != undefined) {
					var eventId = url.split("#")[1];
					var $thingThis = $(this);
					console.log(eventId);				
					cpal.storage.getKey(eventId, function(result) {
						if (result == undefined) {
							console.log(eventId + " not set!");
						} else {
							console.log("Set! - " + eventId);
							if (result.done) {
								console.log("It's complete!");
								$thingThis.addClass("calendar-eventComplete");
							}
						}
					});
				}
			});
		}
	}, js: [], css: ["markEvents.css"], runOn: "*", requires: []},
	loginPageFixes: {displayName: "Login page fixes", description: "Makes the full-screen login page (the one you see on session timeout) look nicer.", exec: function() {
		$("#username").attr("placeholder", "Username");
		$("#password").attr("placeholder", "Password");
	}, js: [], css: ["loginPageFixes.css"], runOn: "login/", requires: []},
	tableOverflow: {displayName: "Table scrolling", description: "Make tables on course pages be scrollable if they go off the page.", exec: function() {
		if (helpers.testURL("course/view.php")) {
			$("table:not(.calendartable)").wrap($('<div class="coursesplus-tableOverflowContainer"></div>'));
		}
		if (helpers.testURL("calendar/view.php")) {
			$("table:not(.calendartable):not(.event)").wrap($('<div class="coursesplus-tableOverflowContainer coursesplus-tableOverflowContainerBig"></div>'));
		}
	}, js: [], css: ["tableOverflow.css"], runOn: "view.php", requires: []},
	calendarTweaks: {displayName: "Calendar tweaks", description: "Makes some tweaks to the calendar block, including changing the hover popup.", exec: function() {
		/*$(".day.hasevent > a").each(function() {
			$(this).popover({ trigger: "hover", content: function() {
				return $(this).parent().find(".yui3-widget-bd").children(".eventcontent").html();
			}, title: "Events", placement: "bottom", html: true });
		});*/
	}, js: [], css: ["calendarTweaks.css"], runOn: "*", requires: []},
	upcomingEventsBtn: {displayName: "Upcoming events button", description: "Adds an 'upcoming events' button to courses on the main page.", exec: function() {	
		(function($){var methods,utils,SIDES={center:'center',left:'left',right:'right'},WIDTH={auto:'auto'};function trunk8(element){this.$element=$(element);this.original_text=this.$element.html();this.settings=$.extend({},$.fn.trunk8.defaults);}trunk8.prototype.updateSettings=function(options){this.settings=$.extend(this.settings,options);};function truncate(){var data=this.data('trunk8'),settings=data.settings,width=settings.width,side=settings.side,fill=settings.fill,line_height=utils.getLineHeight(this)*settings.lines,str=data.original_text,length=str.length,max_bite='',lower,upper,bite_size,bite;this.html(str);if(width===WIDTH.auto){if(this.height()<=line_height){return;}lower=0;upper=length-1;while(lower<=upper){bite_size=lower+((upper-lower)>>1);bite=utils.eatStr(str,side,length-bite_size,fill);this.html(bite);if(this.height()>line_height){upper=bite_size-1;}else{lower=bite_size+1;max_bite=(max_bite.length>bite.length)?max_bite:bite;}}this.html('');this.html(max_bite);if(settings.tooltip){this.attr('title',str);}}else if(!isNaN(width)){bite_size=length-width;bite=utils.eatStr(str,side,bite_size,fill);this.html(bite);if(settings.tooltip){this.attr('title',str);}}else{$.error('Invalid width "'+width+'".');}}methods={init:function(options){return this.each(function(){var $this=$(this),data=$this.data('trunk8');if(!data){$this.data('trunk8',(data=new trunk8(this)));}data.updateSettings(options);truncate.call($this);});},update:function(new_string){return this.each(function(){var $this=$(this);if(new_string){$this.data('trunk8').original_text=new_string;}truncate.call($this);});},revert:function(){return this.each(function(){var text=$(this).data('trunk8').original_text;$(this).html(text);});},getSettings:function(){return this.get(0).data('trunk8').settings;}};utils={eatStr:function(str,side,bite_size,fill){var length=str.length,key=utils.eatStr.generateKey.apply(null,arguments),half_length,half_bite_size;if(utils.eatStr.cache[key]){return utils.eatStr.cache[key];}if((typeof str!=='string')||(length===0)){$.error('Invalid source string "'+str+'".');}if((bite_size<0)||(bite_size>length)){$.error('Invalid bite size "'+bite_size+'".');}else if(bite_size===0){return str;}if(typeof(fill+'')!=='string'){$.error('Fill unable to be converted to a string.');}switch(side){case SIDES.right:return utils.eatStr.cache[key]=$.trim(str.substr(0,length-bite_size))+fill;case SIDES.left:return utils.eatStr.cache[key]=fill+$.trim(str.substr(bite_size));case SIDES.center:half_length=length>>1;half_bite_size=bite_size>>1;return utils.eatStr.cache[key]=$.trim(utils.eatStr(str.substr(0,length-half_length),SIDES.right,bite_size-half_bite_size,''))+fill+$.trim(utils.eatStr(str.substr(length-half_length),SIDES.left,half_bite_size,''));default:$.error('Invalid side "'+side+'".');}},getLineHeight:function(elem){var $elem=$(elem),float=$elem.css('float'),position=$elem.css('position'),html=$elem.html(),wrapper_id='line-height-test',line_height;if(float!=='none'){$elem.css('float','none');}if(position==='absolute'){$elem.css('position','static');}$elem.html('i').wrap('<div id="'+wrapper_id+'" />');line_height=$('#'+wrapper_id).innerHeight();$elem.html(html).css({'float':float,'position':position}).unwrap();return line_height;}};utils.eatStr.cache={};utils.eatStr.generateKey=function(){return Array.prototype.join.call(arguments,'');};$.fn.trunk8=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.trunk8');}};$.fn.trunk8.defaults={fill:'&hellip;',lines:1,side:SIDES.right,tooltip:true,width:WIDTH.auto};})(jQuery);

		var $upcomingEventsModal = $('<div class="upcomingEventsModal modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">Upcoming events for course</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');
		
		var onUpcomingEventsBtnDown = function() {
			var courseId = $(this).parent().attr("data-courseid");
	
			$(".upcomingEventsModal").find(".upcomingPanel").text("Loading upcoming events...");
			
			window.coursesLib.getUpcomingCourseEvents(courseId, function(res) {
				if (res.events.length == 0) {
					$(".upcomingEventsModal").find(".upcomingPanel").text("There are no upcoming events for this course.");
					return;
				}
				$(".upcomingEventsModal").find(".upcomingPanel").text("");
				for (var eventIndex in res.events) {
					var thisEvent = res.events[eventIndex];
					var $thisEvent = $('<div class="coursesplus-thisEvent"></div>');

					$thisEvent.append($('<div class="coursesplus-eventTitle"></div>'));
					$thisEvent.children(".coursesplus-eventTitle").text(thisEvent.title);

					$thisEvent.append($('<div class="coursesplus-eventDesc"></div>'));
					$thisEvent.children(".coursesplus-eventDesc").text(thisEvent.normText);

					$thisEvent.append($('<div class="coursesplus-eventGo"><a href="" class="btn btn-sm btn-primary">read more</a></div>'));
					$thisEvent.children(".coursesplus-eventGo").children("a").attr("href", thisEvent.link);

					$(".upcomingEventsModal").find(".upcomingPanel").append($thisEvent);

					$("body").find(".coursesplus-eventDesc").trunk8({lines: 3});
				}
			});

			$(".upcomingEventsModal").modal();
		};

		$('.coursebox').each(function() {
			var courseId = $(this).attr("data-courseid");

			var $upcomingEventsBtn = $('<button class="upcomingEventsBtn nobootstrapchange btn btn-primary btn-sm"><i class="glyphicon glyphicon-time"></i></button>');
			$upcomingEventsBtn.click(onUpcomingEventsBtnDown);
			$upcomingEventsBtn.mouseup(onUpcomingEventsBtnDown);

			$upcomingEventsBtn.css("opacity", "0");

			$(this).append($upcomingEventsBtn);

			$(this).mouseover(function() {
				$(this).children('.upcomingEventsBtn').css("opacity", "1");
			});
			$(this).mouseleave(function() {
				$(this).children('.upcomingEventsBtn').css("opacity", "0");
			});
		});

		var $panel = $('<div class="upcomingPanel"></div>');

		$panel.text("Loading upcoming events...");

		$upcomingEventsModal.children(".modal-dialog").children(".modal-content").children(".modal-body").append($panel);

		$('body').append($upcomingEventsModal);
	}, js: [], css: ["modalstuff.css", "upcomingEventsBtn.css"], runOn: "", requires: []},
	debugMode: {displayName: "Debug mode", description: "Adds a debugging mode for problem reporting.", exec: function() {
		/*
		 * Konami-JS ~ 
		 * :: Now with support for touch events and multiple instances for 
		 * :: those situations that call for multiple easter eggs!
		 * Code: http://konami-js.googlecode.com/
		 * Examples: http://www.snaptortoise.com/konami-js
		 * Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
		 * Version: 1.4.2 (9/2/2013)
		 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
		 * Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+, Mobile Safari 2.2.1 and Dolphin Browser
		 */
		var Konami=function(a){var b={addEvent:function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&(a["e"+b+c]=c,a[b+c]=function(){a["e"+b+c](window.event,d)},a.attachEvent("on"+b,a[b+c]))},input:"",pattern:"38384040373937396665",load:function(a){this.addEvent(document,"keydown",function(c,d){return d&&(b=d),b.input+=c?c.keyCode:event.keyCode,b.input.length>b.pattern.length&&(b.input=b.input.substr(b.input.length-b.pattern.length)),b.input==b.pattern?(b.code(a),b.input="",c.preventDefault(),!1):void 0},this),this.iphone.load(a)},code:function(a){window.location=a},iphone:{start_x:0,start_y:0,stop_x:0,stop_y:0,tap:!1,capture:!1,orig_keys:"",keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP"],code:function(a){b.code(a)},load:function(a){this.orig_keys=this.keys,b.addEvent(document,"touchmove",function(a){if(1==a.touches.length&&1==b.iphone.capture){var c=a.touches[0];b.iphone.stop_x=c.pageX,b.iphone.stop_y=c.pageY,b.iphone.tap=!1,b.iphone.capture=!1,b.iphone.check_direction()}}),b.addEvent(document,"touchend",function(){1==b.iphone.tap&&b.iphone.check_direction(a)},!1),b.addEvent(document,"touchstart",function(a){b.iphone.start_x=a.changedTouches[0].pageX,b.iphone.start_y=a.changedTouches[0].pageY,b.iphone.tap=!0,b.iphone.capture=!0})},check_direction:function(a){x_magnitude=Math.abs(this.start_x-this.stop_x),y_magnitude=Math.abs(this.start_y-this.stop_y),x=this.start_x-this.stop_x<0?"RIGHT":"LEFT",y=this.start_y-this.stop_y<0?"DOWN":"UP",result=x_magnitude>y_magnitude?x:y,result=1==this.tap?"TAP":result,result==this.keys[0]&&(this.keys=this.keys.slice(1,this.keys.length)),0==this.keys.length&&(this.keys=this.orig_keys,this.code(a))}}};return"string"==typeof a&&b.load(a),"function"==typeof a&&(b.code=a,b.load()),b};
		// END Konami-JS

		var $debugModal = $('<div class="debugModal modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title"><span class="fa-stack fa-lg"><i class="fa fa-square fa-stack-2x"></i><i class="fa fa-terminal fa-stack-1x fa-inverse"></i></span> Debug menu</h4></div><div class="modal-body"><p>Press the button below, then email the Debug Report to <a href="mailto:emails@coursesplus.tk">emails@coursesplus.tk</a>.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

			//$debugModal.find(".modal-body").html("Select an option below.");
			//$debugModal.find(".modal-body").append("<br />");

			var $createDbgRptBtn = $('<button class="btn btn-primary">Create debug report...</button>');

				$createDbgRptBtn.click(function() {
					$("#debugModalOutputTextarea").val(createDebugReport());
				})

			$debugModal.find(".modal-body").append($createDbgRptBtn);

			$debugModal.find(".modal-body").append("<br />");
			
			var $outputTextarea = $('<textarea id="debugModalOutputTextarea" placeholder="Output..." style="width: 100%; height: 200px; font-family: monospace;"></textarea>');
			$debugModal.find(".modal-body").append($outputTextarea);
		
		$("body").append($debugModal);

		var easter_egg = new Konami();
		easter_egg.code = function() {
			$(".debugModal").modal("toggle");
		};
		easter_egg.load();
		
	}, js: [], css: [], runOn: "*", requires: []},	
	prefixColors: {displayName: "Colored prefixes", description: "For teachers, colors the prefixes on the new/edit assignments.", exec: function() {
		if ($("label[for=id_name]").text() != "Assignment name ") {
			return;
		}

		var $mic = $('<div class="magic-input-container"></div>');
		$("#id_name").wrap($mic);

		var $firstword = $('<div class="form-control first-word hiddenThing"></div>');
		$(".magic-input-container").prepend($firstword);

		$(document).on('keydown keyup change', '.magic-input-container input', function (){
			if (($(this).val().length) && ($(this).val().split(' ').length)) {
				var prefix = $(this).val().split(' ')[0];
				var $element = $(this).closest('.magic-input-container').find('.first-word');
				$element.html(prefix);
				prefix = prefix.toLowerCase();
				$element.removeClass("cal_no_prefix");
				$element.removeClass("cal_hw");
				$element.removeClass("cal_project");
				$element.removeClass("cal_paper");
				$element.removeClass("cal_quiz");
				$element.removeClass("cal_test");
				$element.removeClass("cal_ica");

				switch (prefix) {
					case "hw":
						$element.addClass("cal_hw");
						break;
					case "project":
						$element.addClass("cal_project");
						break;
					case "paper":
						$element.addClass("cal_paper");
						break;
					case "quiz":
						$element.addClass("cal_quiz");
						break;
					case "test":
						$element.addClass("cal_test");
						break;
					case "ica":
						$element.addClass("cal_ica");
						break;
					default:
						$element.addClass("cal_no_prefix");
						break;
				}
				$(this).closest('.magic-input-container').find('.first-word').removeClass("hiddenThing");
			}
			else { 
				$(this).closest('.magic-input-container').find('.first-word').addClass("hiddenThing");
			}
		});

		$(document).on('click', '.magic-input-container .first-word', function (){	
			$(this).closest('.magic-input-container').find('input').focus();
		});

		$(".magic-input-container").after().append("<br />");
		$(".magic-input-container").after().append("<em>Start the assignment name with a special prefix so it appears color-coded on students' calendars. <a href=\"#\" id=\"coursesplus_teacherassignment_prefixes_learnmore\"> Learn more about prefixes...</a></em>");
		
		var $prefixModal = $('<div id="coursesplus_learnmore_prefixes" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">About prefixes</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

		$prefixModal.find(".modal-body").append("<p>Start an assignment with a prefix so it appears color-coded on student's calendars. This helps students see, at-a-glance, where they have quizzes, tests, projects, and more. While it is not required, it is convenient for students. Assignments with no special prefix show up as a pink-ish color. The special prefixes are:</p>");
		$prefixModal.find(".modal-body").append('<div class="coursesplus_prefixBlock cal_hw">HW</div>');
		$prefixModal.find(".modal-body").append('<div class="coursesplus_prefixBlock cal_project">Project</div>');
		$prefixModal.find(".modal-body").append('<div class="coursesplus_prefixBlock cal_paper">Paper</div>');
		$prefixModal.find(".modal-body").append('<div class="coursesplus_prefixBlock cal_quiz">Quiz</div>');
		$prefixModal.find(".modal-body").append('<div class="coursesplus_prefixBlock cal_test">Test</div>');
		$prefixModal.find(".modal-body").append('<div class="coursesplus_prefixBlock cal_ica">ICA</div>');
		$prefixModal.find(".modal-body").append('<div class="coursesplus_prefixBlock cal_no_prefix">No prefix</div>');

		$("body").append($prefixModal);

		$("#coursesplus_teacherassignment_prefixes_learnmore").click(function() {
			$("#coursesplus_learnmore_prefixes").modal();
		});
	}, js: [], css: ["prefixColors.css"], runOn: "course/modedit.php", requires: []},
	navbarMessages: {displayName: "Navbar messages", description: "Shows messages and information underneath the navbar.", exec: function() {
		componentEnabled("newNavbar", function(newNav) {
			helpers.getUniqueID(function(id) {
				$.get("https://analytics.coursesplus.tk/getmsg.php", {
					uniqid: id,
					version: cpal.extension.getExtensionVersion(),
					browser: cpal.extension.getBrowser(),
					browserVersion: cpal.extension.getBrowserVersion()
				}, function(data) {
					var response = JSON.parse(data);

					if (response.message == "") {
						return;
					}

					var message = response.message;
					var style = response.style;
					var cid = response.campaignId;
					var canDismiss = true;

					var $closeButton = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');

					$closeButton.click(function () {
						$.get("https://analytics.coursesplus.tk/closemsg.php", {
							uniqid: id,
							campaignId: cid
						}, function (data) {

						});
					});
					
					var $alertElem = $('<div class="alert fade in" role="alert"></div>');
					$alertElem.addClass(style);
					$alertElem.html(message);
					if (canDismiss) {
						$alertElem.addClass("alert-dismissible");
						$closeButton.css("z-index", "1001");
						$closeButton.css("right", "25px");
						$closeButton.css("box-shadow", "none");
						$alertElem.append($closeButton);
					}

					if (newNav) {
						$alertElem.css("z-index", "1000");
						$alertElem.css("position", "fixed");
						$alertElem.css("top", "50px");
						$alertElem.css("left", "0");
						$alertElem.css("width", "100%");
						$alertElem.css("padding", "7px 0");
						$alertElem.css("text-align", "center");
						$alertElem.css("border-radius", "0");
						$("body").css("padding-top", "90px");

						$alertElem.on('closed.bs.alert', function () {
							$("body").css("padding-top", "70px");
						});

						$("body").append($alertElem);
					} else {
						$alertElem.css("width", "100%");
						$alertElem.find("button").css("right", "0");

						$("#page-content").prepend($alertElem);
					}
				});

			});
		});
	}, js: [], css: [], runOn: "*", requires: []},
	iconset: {displayName: "Change icons", description: "Changes the icons in Courses to a new, modern iconset.", exec: function() {
		setTimeout(function() {
			$(".block-hider-hide").attr("src", cpal.resources.getURL("images/minus-square.png"));
			$(".block-hider-show").attr("src", cpal.resources.getURL("images/plus-square.png"));
		}, 1000);
	}, js: [], css: [], runOn: "*", requires: []},
	hideEvents: {displayName: "Hide events", description: "Adds a hide button to events on the calendar.", exec: function() {
		if (helpers.testURL("calendar/view.php?view=day")) {
			var eventMap = {};
			var hiddenEvents = [];
			var allEventsHidden = function(count) {
				if (count == 0) {
					return;
				}
				var $event = $('<div class="event hiddenEvent"></div>');
					var $infoText = $('<span></span>');
						var infoText = count + " events hidden";
						if (count == 1) { infoText = "1 event hidden"; }
						$infoText.text(infoText);
					$event.append($infoText);

					var $openToggle = $('<a class="hiddenEventOpenToggle">open</a>');
						$openToggle.click(function() {
							$(".hiddenEventList").toggleClass("hidden");
							if ($(this).text() == "open") {
								$(this).text("close");
							} else {
								$(this).text("open");
							}
						});
					$event.append($openToggle);

					var $eventList = $('<ul class="hiddenEventList hidden"></ul>');
						for (var eventIndex in hiddenEvents) {
							var eventID = hiddenEvents[eventIndex];
							var event = eventMap[eventID];
							var $eventItem = $('<li></li>');
								$eventItem.attr("data-eventID", eventID);
								$eventItem.text(event.name);
								var $unhideLink = $('<a class="hiddenEventUnhide">unhide</a>');
									$unhideLink.click(function() {
										var eventID = $eventItem.attr("data-eventID");
										cpal.storage.getKey(eventID, function(info) {
											var eventInfo = info || {};
											eventInfo.hide = false;
											cpal.storage.setKey(eventID, eventInfo, function() {
												window.location.reload();
											});
										});
									});
								$eventItem.append($unhideLink);
							$eventList.append($eventItem);
						}
					$event.append($eventList);
				$(".eventlist").append($event);
			};
			var hiddenCount = 0;
			var eventCount = 0;
			var eventTotal = $(".event").length;
			$(".event").each(function() {
				var eventID = $(this).attr("id");
				var $that = $(this);
				eventMap[eventID] = {
					name: $(this).find(".referer").text()
				};
				cpal.storage.getKey(eventID, function(info) {
					var eventInfo = info || {};

					eventCount++;

					if (eventInfo.hide) {
						hiddenEvents.push(eventID);
						hiddenCount++;
						$that.remove();
					} else {
						var $hideLink = $('<a class="eventHideLink">hide</a>');
							$hideLink.attr("data-eventID", eventID);
							$hideLink.click(function() {
								var eventID = $(this).attr("data-eventID");
								cpal.storage.getKey(eventID, function(info) {
									var eventInfo = info || {};
									eventInfo.hide = true;
									cpal.storage.setKey(eventID, eventInfo, function() {
										window.location.reload();
									});
								});
							});
						$that.find("header .date").prepend(" &bull; ");
						$that.find("header .date").prepend($hideLink);
					}

					if (eventCount == eventTotal) {
						allEventsHidden(hiddenCount);
					}
				});
			});
		}
		if (helpers.testURL("calendar/view.php?view=month")) {
			var eventsProcessed = 0;
			var eventsTotal = 0;
			var dayMap = {};
			$(".calendar_event_course:not(.day), .calendar_event_user:not(.day)").each(function(i) {
				var url = $(this).children("a").attr("href");
				if (url != undefined) {
					var eventID = url.split("#")[1];
					var $that = $(this);
					eventsTotal++;
					cpal.storage.getKey(eventID, function(result) {
						var eventInfo = result || {};
						var day = $that.parent().parent().find(".day").text();
						eventsProcessed++;
						if (eventInfo.hide) {
							var mapEntry = dayMap[day] || [];
							mapEntry.push(eventID);
							dayMap[day] = mapEntry;
							$that.remove();
						}
						console.log(eventsProcessed + " of " + eventsTotal);
						if (eventsProcessed == eventsTotal) {
							$(".day .day a").each(function() {
								console.log($(this).text());
								var day = dayMap[$(this).text()];
								if (!day || day.length == 0) {
									return;
								}
								var $hidden = $('<li class="hiddenEventCount"></li>');
									$hidden.text("(" + day.length + " hidden)");
								var $list = $(this).parent().parent().children(".events-new");
								$list.append($hidden);
							});
						}
					});
				}
			});
		}
	}, js: [], css: ["hideEvents.css"], runOn: "*", requires: []}
};

function runNonComponentTweaks(componentsToSkip) {
	var $superBgThing = $('<div id="superBgThing"></div>');

		$superBgThing.css("position", "fixed");
		$superBgThing.css("left", "0");
		$superBgThing.css("top", "0");
		$superBgThing.css("width", "100%");
		$superBgThing.css("height", "100%");
		$superBgThing.css("z-index", "-1");

	$("body").append($superBgThing);

	$("html, body, #dalton-nav, #page-content").css("background", "transparent");

	console.log("Changing theme...");
	cpal.storage.getKey("theme", function(value) {
		if (value != undefined) {
			var thisTheme = window.themes[value];
			for (var cssIndex in thisTheme.css) {
				var $themeStyleTag = $("<link rel=\"stylesheet\" />");
					$themeStyleTag.attr("href", cpal.resources.getURL("css/themes/" + thisTheme.css[cssIndex]));
				$("head").append($themeStyleTag);
			}
		}
	});

	console.log("Changing background color...");
	cpal.storage.getKey("backgroundColor", function(result) {
		if (result === undefined) {
			console.log("Background color not set!");
			return;
		}
		/*$("html, body, #dalton-nav, #page-content")*/
		$("#superBgThing").css("background", result);
	});

	console.log("Changing background image...");
	cpal.storage.getKey("backgroundImage", function(result) {
		if (result === undefined || result === false) {
			console.log("Background image not set!");
			return;
		}
		var $bgElements = $superBgThing;//$("html, body, #dalton-nav, #page-content");
		var url = result.url;
		if (url.indexOf("coursesplus.tk/usrupl/") > -1) {
			url = url.replace("coursesplus.tk/usrupl/", "usrupl.coursesplus.tk/");
			console.warn("Detected old URL format for background image; changing stored URL to " + url);
			var newResult = result;
			newResult.url = url;
			cpal.storage.setKey("backgroundImage", newResult, function () {
				console.log("Background image URL change success.");
			});
		}
		$bgElements.css("background-image", "url('" + url + "')");
		console.log(result);
		switch (result.sizing) {
			case "center":
				$bgElements.css("background-repeat", "no-repeat");
				$bgElements.css("background-position", "center center");
				break;
			case "tile":
				$bgElements.css("background-repeat", "repeat");
				break;
			case "fill":
				$bgElements.css("background-repeat", "no-repeat");
				$bgElements.css("background-size", "100% 100%");
				break;
		}
	});

	console.log("Changing text color...");
	cpal.storage.getKey("textColor", function(result) {
		if (result === undefined|| result === "themeDefault") {
			console.log("Text color not set or is default!");
			return;
		}
		$("html, body, #dalton-nav, #page-content, .content h3.sectionname, p, .btn, button").each(function () {
			$(this).style("color", result, "important");
		});
	});

	console.log("Changing link text color...");
	cpal.storage.getKey("linkTextColor", function(result) {
		if (result === undefined || result === "themeDefault") {
			console.log("Link text color not set or is default!");
			return;
		}
		$("a").not(".dropdown-toggle").not(".navbar-brand").not(".dropdown-menu > li > a").each(function() {
			$(this).style("color", result, "important");
		});
	});

	console.log("Changing navbar text color...");
	cpal.storage.getKey("navTextColor", function(result) {
		if (result === undefined || result === "themeDefault") {
			console.log("Nav text color not set or is default!");
			return;
		}
		$(".dropdown-toggle, .navbar-brand, .dropdown-menu > li > a, .dropdown").each(function(){ 
			$(this).style("color", result, "important");
		});
	});

	console.log("Changing logo...");
	cpal.storage.getKey("theme", function(value) {
		var themeBg = "white";
		if (value != undefined) {
			themeBg = window.themes[value].navbarbg;
		}
		console.log(themeBg);
		cpal.storage.getKey("logoType", function(logoType) {
			var newNavbar = (componentsToSkip.indexOf("newNavbar") == -1);
			if (newNavbar) {
				//console.log("Logo disabled because new navbar!");
				$("#page-header").css("background", "transparent");
				//return;
			}
			if (logoType === undefined) {
				console.log("Logo type not set!");
				if (newNavbar) {
					var logoImage = "regular";
					var newUrl = cpal.resources.getURL((themeBg == "white" ? window.logos[logoImage].whitebg : window.logos[logoImage].blackbg));
					var newWidth = (328 / 2) + "px";
					var newHeight = (80 / 2) + "px";
					var htmlToBrand = '<img class="navbarHappyLogo" src="' + newUrl + '" alt="Logo" width="' + newWidth + '" height="' + newHeight + '"/>';
					$(".navbar-brand").html(htmlToBrand);
				}
				return;
			}
			if (logoType == "preload") {
				console.log("Logo is preload, looking up which one...");
				cpal.storage.getKey("logoImage", function(logoImage) {
					if (logoImage === undefined) {
						console.log("Logo image not set!");
						return;
					}

					var logoUrl = cpal.resources.getURL((themeBg == "white" ? window.logos[logoImage].whitebg : window.logos[logoImage].blackbg));
					var logoWidth = window.logos[logoImage].width + "px";
					var logoHeight = window.logos[logoImage].height + "px";
					var logoRaiseness = window.logos[logoImage].raiseness + "px";

					if (newNavbar) {
						console.log("New navbar, new logo.");
						var newWidth = (parseInt(logoWidth.replace("px", "")) / 2) + "px";
						var newHeight = (parseInt(logoHeight.replace("px", "")) / 2) + "px";
						var topText = "";
						if (logoRaiseness != "") {
							topText = ' style="top: ' + logoRaiseness + '"';
						}
						var htmlToBrand = '<img class="navbarHappyLogo" src="' + logoUrl + '" alt="Logo" width="' + newWidth + '" height="' + newHeight + '"' + topText + '/>';
						$(".navbar-brand").html(htmlToBrand);
					} else {
						console.log("Old navbar, old logo.");
						$("#page-header").css("background-image", "url(" + logoUrl + ")");
						$("#page-header").css("background-size", logoWidth + " " + logoHeight);
					}
				});
			}
		});
	});
}

window.components = components;
window.components.createErrorModal = function() {
	var $errorModal = $('<div id="coursesplus-errorModal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">An error occurred.</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

		var $errorPanel = $('<div class="coursesplus-errorpanel"></div>');

			var $sadnessText = $("<p></p>");

				var errorHelperText = "";

				errorHelperText += 'Courses+ encountered an error while loading the <strong class="coursesplus-error-componentname"></strong> feature.<br />';
				errorHelperText += '<br />';
				errorHelperText += 'We\'re really sorry about this! We\'ve tried to load the other features you have enabled, but features that require <strong class="coursesplus-error-componentname"></strong> might not work.<br/>';
				errorHelperText += '<br />';
				errorHelperText += 'Try reloading the page. If that doesn\'t work, ';
				errorHelperText += 'please copy the technical details below (all of it!) and <a href="';
				errorHelperText += cpal.logging.getReportLink();
				errorHelperText += '">report a problem here.</a><br />';
				errorHelperText += '<br />';
				errorHelperText += 'We\'d really appreciate it if you did; your help lets us make Courses+ even better!<br />';
				errorHelperText += '<br />';
				errorHelperText += '(while you wait for our response, you can go the options page and disable <strong class="coursesplus-error-componentname"></strong> to stop this message from appearing.)';	
				
				$sadnessText.html(errorHelperText);

			$errorPanel.append($sadnessText);

			var $errorTechDetails = $('<textarea id="coursesplus-error-techDetails" class="form-control" style="height: 180px;"></textarea>');

				$errorTechDetails.val("Error occurred while loading the technical details!");

			$errorPanel.append($errorTechDetails);

		$errorModal.children(".modal-dialog").children(".modal-content").children(".modal-body").append($errorPanel);

	$("body").append($errorModal);

	console.log("Created error modal!");
};
window.components.runAll = function() {
	window.components.createErrorModal();

	var count = 0;
	var runCount = 0;
	var componentsToSkip = [];

	cpal.storage.getKey("disabledComponents", function(result) {
		console.log("Retrieved disabled components!");
		componentsToSkip = ($.isArray(result) ? result : []);
		runNonComponentTweaks(componentsToSkip);
		console.log(componentsToSkip);
		var addedCssFiles = [];
		var addedJsFiles = [];
		for (var componentIndex in window.components) {
			if (componentIndex == "runAll" || componentIndex == "createErrorModal") {
				continue;
			}
			var component = window.components[componentIndex];
			if (componentsToSkip.indexOf(componentIndex) != -1) {
				console.log("Skipping component '" + component.displayName + "' ('" + componentIndex + "') because it's disabled.");			
				continue;
			}
			if (component.runOn == "*" || helpers.testURL(component.runOn)) {
				if (component.runOn == "" && window.location.href.replace("index.php", "").replace(window.location.search, "").replace("?", "").replace(/#.*$/, "") != "https://courses2017.dalton.org/") {
					// TODO: Optimize this if statement into the one above.
					console.log("Skipping component '" + component.displayName + "' ('" + componentIndex + "') because it's for a different page.");						
				} else {
					console.log("Running component '" + component.displayName + "' ('" + componentIndex + "')...");
					for (var cssIndex in component.css) {
						var cssFile = component.css[cssIndex];
						if (addedCssFiles.indexOf(cssFile) > -1) {
							console.log("CSS file '" + cssFile + "' (for '" + componentIndex + "') already added!");
						} else {
							var $linkTag = $("<link rel=\"stylesheet\" />");
							$linkTag.attr("href", cpal.resources.getURL("css/" + cssFile));
							$("head").append($linkTag);
							addedCssFiles.push(cssFile);
							console.log("Added CSS file '" + cssFile + "' (for '" + componentIndex + "')!");
						}
					}
					for (var jsIndex in component.js) {
						var jsFile = component.js[jsIndex];
						if (addedJsFiles.indexOf(jsFile) > -1) {
							console.log("JS file '" + jsFile + "' (for '" + componentIndex + "') already added!");
						} else {
							var $scriptTag = $("<script type=\"text/javascript\"></script>");
							$scriptTag.attr("src", cpal.resources.getURL("js/" + jsFile));
							$("head").append($scriptTag);
							addedJsFiles.push(jsFile);
							console.log("Added JS file '" + jsFile + "' (for '" + componentIndex + "')!");
						}
					}
					try {
						component.exec();
					} catch (e) {
						console.error("COMPONENT ERROR OCCURRED");
						console.error(e);
						console.error(e.stack);

						var detailsText = createDebugReport(e, component);

						console.error("ERROR DETAILS:");
						console.error(detailsText);

						$("#coursesplus-error-techDetails").val(detailsText);
						$(".coursesplus-error-componentname").text(component.displayName);
						$("#coursesplus-errorModal").modal();
					}
					runCount++;
				}
			} else {
				console.log("Skipping component '" + component.displayName + "' ('" + componentIndex + "') because it's for a different page.");			
			}
			count++;
		}
		console.log("Ran " + runCount + " component(s)!");
		// Remove the curtain
		setTimeout(function() {
			console.log("Removed curtain!");
			$("body").addClass("removeCurtain");
		}, 200);
	});
};