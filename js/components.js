function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
String.prototype.replaceAll = function(search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
        return this;

    return this.replace(new RegExp(escapeRegExp(search), 'g'), replace);
};

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
function getParameterByName( name,href )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( href );
  if( results == null )
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}
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
		$('input[type="submit"], button').not(".nobootstrapchange").addClass("btn");
		$('input[type="submit"], button').not(".nobootstrapchange").addClass("btn-primary");
		$('input[type="submit"], button').not(".nobootstrapchange").css("background-color", "rgb(66, 139, 202)");

		// Fix buttons being hidden
		$(".messagesend form div").css("display", "block");
		$(".messagesend form fieldset").removeClass("hidden");

		// Fix "Search Courses" label
		$("label[for=shortsearchbox]").html("Search courses:&nbsp;&nbsp;");

		if (testURL("calendar/view.php")) {
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
	}, js: [], css: ["bootstrap.css"], runOn: "*", requires: []},
	/*logo: {displayName: "Logo change", description: "Changes the logo to the circular Dalton School thing.", exec: function() {
		// MOVED to runNonComponentTweaks();
		// Change logo
		//$("#page-header").css("background-image", "url(" + cpal.resources.getURL("images/logos/circle.png") + ")");
		//$("#page-header").css("background-size", "80px 80px");
	}, js: [], css:"", runOn: "*"},*/
	teacherList: {displayName: "Condense list of teachers", description: "Makes a list of teachers just say the first teacher's name and bla others.", exec: function() {
		$(".teachers").each(function(index) {
			// Get rid of the "Teacher: " text.
			$(this).children().each(function(index) {
				$(this).html($(this).html().replace("Teacher: ", ""));
			});
		});
		// List of teachers is sometimes long... this just makes it say "multiple teachers"
		$(".coursebox.clearfix").each(function() {
			var myLength = $(this).children(".content").children(".teachers").children("li").length;
			if (myLength > 1) {
				var first = $(this).children(".content").children(".teachers").children("li").first();
				$(this).children(".content").children(".teachers").html("<li>" + first.html() +  " and " + (myLength - 1) + " other" + (myLength == 2 ? "" : "s") + "</li>");
			}
		});
	}, js: [], css: [], runOn: "", requires: []},
	dstBug: {displayName: "Fix date bug", description: "Fixes a bug where going to some days' event views would cause the wrong date to be shown.", exec: function() {
		var realTime = getParameterByName("time", window.location.href);
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
		$(".block_course_overview.block").css("height", ((count*57) + 108) + "px");
		$(".collapsibleregioncaption").html("");
		$(".activity_info").remove();
		$(".block_course_overview .content .notice").css("text-align", "center");
		$(".block_course_overview .content .notice").css("font-style", "italic");
		if ($(".block_course_overview .content .notice").html() != undefined) {
			$(".block_course_overview .content .notice").html($(".block_course_overview .content .notice").html().replace("You have ", ""));
		}
		$(".block_course_overview .content .notice").css("margin-top", ((count*57) + 50) + "px");

		if ($(".box.notice").length == 2) {
			// Customization mode!
			$(".block_course_overview.block").css("height", ((count*57) + 160) + "px");
			$(".block_course_overview .content .notice:first-child").css("margin-top", "0px");
		}
	}, js: [], css: ["my.css"], runOn: "my/", requires: []},
	uselessText: {displayName: "Remove useless text", description: "Removes the \"Dalton Courses is your place for ... bla bla bla\" text on the main page.", exec: function() {
		// Get rid of the useless "Dalton Courses is your place for... bla bla bla"
		if ($("#inst2").attr("aria-label") == "Course/site summary") {
			$("#inst2").css("display", "none");
		}
	}, js: [], css: [], runOn: "", requires: []},
	courseGrid: {displayName: "Grid view for homepage", description: "Makes your courses on the homepage into a grid. We recommend you choose the 'Condense list of teachers' option too.", exec: function() {
		$(".coursebox.even").after($('<div style="position: relative;float: left;width: 100%;"></div>'));
	}, js: [], css: ["grid.css"], runOn: "", requires: []},
	customCourses: {displayName: "Customizable courses", description: "Makes the courses on the homepage be customizable.", exec: function() {	
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
			var $saveThis = $(this);
			cpal.storage.getKey("course-" + courseId, function(result) {
				var courseInfo = {
					fontFamily: "Helvetica Neue",
					backgroundColor: "white"
				};
				if (result !== undefined) {
					courseInfo = $.extend(courseInfo, result);
				}
				$saveThis.attr("data-font-family", courseInfo.fontFamily);
				var fontFamilyCss = courseInfo.fontFamily;
				if (fontFamilyCss == "Helvetica Neue") {
					// Not all Windows machines have Helvetica Neue. So, we add in some replacements
					fontFamilyCss = "'Helvetica Neue', Helvetica, Arial, sans-serif;";
				}
				$saveThis.css("font-family", fontFamilyCss);

				$saveThis.css("background-color", courseInfo.backgroundColor);
				$saveThis.attr("data-background-color", courseInfo.backgroundColor);
			});

			var $editBtn = $('<button class="editBtn nobootstrapchange btn btn-default btn-sm"><i class="glyphicon glyphicon-edit"></i></button>');
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
		$fontDropdown.append($('<option value="Arial Rounded MT Bold" class="editFont arialRounded">Arial Rounded MT Bold</option>'));
		$fontDropdown.append($('<option value="Georgia" class="editFont georgia">Georgia</option>'));
		$fontDropdown.append($('<option value="Helvetica Neue" class="editFont helveticaNeue">Helvetica Neue (default)</option>'));
		$fontDropdown.append($('<option value="Impact" class="editFont impact">Impact</option>'));
		$fontDropdown.append($('<option value="Tahoma" class="editFont tahoma">Tahoma</option>'));
		$fontDropdown.append($('<option value="PT Sans" class="editFont ptSans">PT Sans</option>'));
		$fontDropdown.append($('<option value="Times New Roman" class="editFont timesNewRoman">Times New Roman</option>'));
		$fontDropdown.append($('<option value="Trebuchet MS" class="editFont trebuchetMS">Trebuchet MS</option>'));
		$fontDropdown.append($('<option value="Verdana" class="editFont verdana">Verdana</option>'));
		$fontDropdown.change(function() {
			var courseId = $(".editCourseModal").attr("data-courseid");
			$(".coursebox").each(function() {
				if ($(this).attr("data-courseid") == courseId) {
					$(this).css("font-family", $(".editFontDropdown").val());
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

		var $secretColorPicker = $('<input type="color" class="secretCourseBgColorPicker" value="white" style="position:absolute;top:-5000px;left:-5000px;" />');
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
	}, js: [], css: ["modalstuff.css", "customCourses.css"], runOn: "", requires: ["bootstrap"]},
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
	}, js: [], css: ["homelogin.css"], runOn: "", requires: ["bootstrap"]},
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
									$upcomingLink.children("a").attr("href", "https://courses2015.dalton.org/calendar/view.php");

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
		$("body").css("padding-top", "70px");
		$("body").append($navbar);

		$(".navbar").css("overflow", "initial");
	}, js: [], css: ["newNav.css"], runOn: "*", requires: ["bootstrap"]},
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
					var $emoteCell = $('<td></td>');

						$emoteCell.append($('<span><img src="' + emoteBaseUrl + emoteTable[emoteCode].url + '" alt="' + emoteCode + '" title="' + emoteCode + '"/><br/>' + emoteCode + '</span>'));
					
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

		var $emotionButton = $('<button id="emotionButton" class="btn btn-info">Emotions...</button>');
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
	}, js: [], css: ["messages.css", "spacer.css"], runOn: "message/", requires: ["bootstrap"]},
	modernAsides: {displayName: "Modern asides", description: "Makes the asides on course pages look more modern.", exec: function() {
		// Pure CSS! :)
	}, js: [], css: ["modernAsides.css"], runOn: "*", requires: []},
	markEvents: {displayName: "Mark events", description: "Mark events as done.", exec: function() {
		if (testURL("calendar/view.php")) {
			$(".event").each(function() {
				var $r0 = $(this).children("tbody").children(".r0");
				var thisId = $r0.children(".picture").children("a").attr("name");
				
				var $eventCheck = $('<input type="checkbox" class="eventCheck" />');
				$eventCheck.change(function() {
					var eventId = $(this).parent().children("a").attr("name");
					var $r0 = $(this).parent().parent();
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
								var $eventNameElem = $r0.children(".topic").children(".referer").children("a");
								$eventNameElem.text("DONE - " + $eventNameElem.text());
								$r0.parent().parent().addClass("eventComplete");
								$eventCheck.prop('checked', true);
							} else {
								var $eventNameElem = $r0.children(".topic").children(".referer").children("a");
								$eventNameElem.text($eventNameElem.text().replace("DONE - ", ""));
								$r0.parent().parent().removeClass("eventComplete");
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
							var $eventNameElem = $r0.children(".topic").children(".referer").children("a");
							$eventNameElem.text("DONE - " + $eventNameElem.text());
							$r0.parent().parent().addClass("eventComplete");
							$eventCheck.prop('checked', true);
						}
					}
					$r0.children(".picture").prepend($eventCheck);
				});
			});
		}
		if (testURL("calendar/view.php?view=month")) {
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
	}, js: [], css: ["markEvents.css"], runOn: "*", requires: ["bootstrap"]},
	loginPageFixes: {displayName: "Login page fixes", description: "Makes the full-screen login page (the one you see on session timeout) look nicer.", exec: function() {
		$("#username").attr("placeholder", "Username");
		$("#password").attr("placeholder", "Password");
	}, js: [], css: ["loginPageFixes.css"], runOn: "login/", requires: ["bootstrap"]},
	tableOverflow: {displayName: "Table scrolling", description: "Make tables on course pages be scrollable if they go off the page.", exec: function() {
		$("table:not(.calendartable)").wrap($('<div class="coursesplus-tableOverflowContainer"></div>'));
	}, js: [], css: ["tableOverflow.css"], runOn: "course/view.php", requires: []},
	calendarTweaks: {displayName: "Calendar tweaks", description: "Makes some tweaks to the calendar block.", exec: function() {
		// Pure CSS! :)
	}, js: [], css: ["calendarTweaks.css"], runOn: "*", requires: ["bootstrap"]},
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

			var $upcomingEventsBtn = $('<button class="upcomingEventsBtn nobootstrapchange btn btn-default btn-sm"><i class="glyphicon glyphicon-time"></i></button>');
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
	}, js: [], css: ["modalstuff.css", "upcomingEventsBtn.css"], runOn: "", requires: ["bootstrap"]}
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
		$bgElements.css("background-image", "url('" + result.url + "')");
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
		if (result === undefined) {
			console.log("Text color not set!");
			return;
		}
		$("html, body, #dalton-nav, #page-content").css("color", result);
		$(".content h3.sectionname").css("color", result);
		$("p").css("color", result);
	});

	console.log("Changing link text color...");
	cpal.storage.getKey("linkTextColor", function(result) {
		if (result === undefined) {
			console.log("Link text color not set!");
			return;
		}
		$("a").not(".dropdown-toggle").not(".navbar-brand").not(".dropdown-menu > li > a").css("color", result);
	});

	console.log("Changing navbar text color...");
	cpal.storage.getKey("navTextColor", function(result) {
		if (result === undefined) {
			console.log("Nav text color not set!");
			return;
		}
		$(".dropdown-toggle, .navbar-brand, .dropdown-menu > li > a").css("color", result);
	});

	console.log("Changing logo...");
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
				var newUrl = cpal.resources.getURL("images/logos/regular.png");
				var newWidth = (328 / 2) + "px";
				var newHeight = (80 / 2) + "px";
				$(".navbar-brand").html('<img class="navbarHappyLogo" src="' + newUrl + '" alt="Logo" width="' + newWidth + '" height="' + newHeight + '"/>');
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

				var logoUrl = cpal.resources.getURL("images/logos/" + logoImage + ".png");
				var logoWidth = "";
				var logoHeight = "";

				// TODO: Make for efficient
				switch (logoImage) {
					case "regular":
						logoWidth = "328px";
						logoHeight = "80px";
						break;

					case "circle":
						logoWidth = "80px";
						logoHeight = "80px";
						break;

					case "coursesbigwordmark":
						logoWidth = "216px";
						logoHeight = "80px";
						break;

					case "coursespluswordmark":
						logoWidth = "194px";
						logoHeight = "31px";
						break;

					case "daltoncourseswordmark":
						logoWidth = "237px";
						logoHeight = "35px";
						break;

					default:
						break;

				}

				if (newNavbar) {
					console.log("New navbar, new logo.");
					var newWidth = (parseInt(logoWidth.replace("px", "")) / 2) + "px";
					var newHeight = (parseInt(logoHeight.replace("px", "")) / 2) + "px";
					$(".navbar-brand").html('<img class="navbarHappyLogo" src="' + logoUrl + '" alt="Logo" width="' + newWidth + '" height="' + newHeight + '"/>');
				} else {
					console.log("Old navbar, old logo.");
					$("#page-header").css("background-image", "url(" + logoUrl + ")");
					$("#page-header").css("background-size", logoWidth + " " + logoHeight);
				}
			});
		}
	});
}

window.components = components;
window.components.createErrorModal = function() {
	var $errorModal = $('<div id="coursesplus-errorModal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><h4 class="modal-title">An error occured.</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

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

				$errorTechDetails.val("Error occured while loading the technical details!");

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
			if (component.runOn == "*" || testURL(component.runOn)) {
				if (component.runOn == "" && window.location.href.replace("index.php", "").replace(window.location.search, "").replace("?", "") != "https://courses2015.dalton.org/") {
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
						console.error("COMPONENT ERROR OCCURED");
						console.error(e);
						console.error(e.stack);

						var detailsText = "Courses+ Error\n\n";
						detailsText += "Component error.\n";
						detailsText += "Encountered while running code for component ";
						detailsText += component.displayName;
						detailsText += " (with index ";
						detailsText += componentIndex;
						detailsText += ").\n";
						detailsText += "\n";
						detailsText += "Error details\n";
						detailsText += "Message: ";
						detailsText += e.message;
						detailsText += "\n";
						detailsText += "Stack:\n";
						detailsText += e.stack;
						detailsText += "\n";
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
						detailsText += "\n";
						detailsText += "\n";
						detailsText += "CPAL platform-specifics:\n";
						detailsText += cpal.logging.specificErrorDetails();

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
		}, 100);
	});
};