// Trunk8
(function($){var methods,utils,SIDES={center:'center',left:'left',right:'right'},WIDTH={auto:'auto'};function trunk8(element){this.$element=$(element);this.original_text=this.$element.html();this.settings=$.extend({},$.fn.trunk8.defaults);}trunk8.prototype.updateSettings=function(options){this.settings=$.extend(this.settings,options);};function truncate(){var data=this.data('trunk8'),settings=data.settings,width=settings.width,side=settings.side,fill=settings.fill,line_height=utils.getLineHeight(this)*settings.lines,str=data.original_text,length=str.length,max_bite='',lower,upper,bite_size,bite;this.html(str);if(width===WIDTH.auto){if(this.height()<=line_height){return;}lower=0;upper=length-1;while(lower<=upper){bite_size=lower+((upper-lower)>>1);bite=utils.eatStr(str,side,length-bite_size,fill);this.html(bite);if(this.height()>line_height){upper=bite_size-1;}else{lower=bite_size+1;max_bite=(max_bite.length>bite.length)?max_bite:bite;}}this.html('');this.html(max_bite);if(settings.tooltip){this.attr('title',str);}}else if(!isNaN(width)){bite_size=length-width;bite=utils.eatStr(str,side,bite_size,fill);this.html(bite);if(settings.tooltip){this.attr('title',str);}}else{$.error('Invalid width "'+width+'".');}}methods={init:function(options){return this.each(function(){var $this=$(this),data=$this.data('trunk8');if(!data){$this.data('trunk8',(data=new trunk8(this)));}data.updateSettings(options);truncate.call($this);});},update:function(new_string){return this.each(function(){var $this=$(this);if(new_string){$this.data('trunk8').original_text=new_string;}truncate.call($this);});},revert:function(){return this.each(function(){var text=$(this).data('trunk8').original_text;$(this).html(text);});},getSettings:function(){return this.get(0).data('trunk8').settings;}};utils={eatStr:function(str,side,bite_size,fill){var length=str.length,key=utils.eatStr.generateKey.apply(null,arguments),half_length,half_bite_size;if(utils.eatStr.cache[key]){return utils.eatStr.cache[key];}if((typeof str!=='string')||(length===0)){$.error('Invalid source string "'+str+'".');}if((bite_size<0)||(bite_size>length)){$.error('Invalid bite size "'+bite_size+'".');}else if(bite_size===0){return str;}if(typeof(fill+'')!=='string'){$.error('Fill unable to be converted to a string.');}switch(side){case SIDES.right:return utils.eatStr.cache[key]=$.trim(str.substr(0,length-bite_size))+fill;case SIDES.left:return utils.eatStr.cache[key]=fill+$.trim(str.substr(bite_size));case SIDES.center:half_length=length>>1;half_bite_size=bite_size>>1;return utils.eatStr.cache[key]=$.trim(utils.eatStr(str.substr(0,length-half_length),SIDES.right,bite_size-half_bite_size,''))+fill+$.trim(utils.eatStr(str.substr(length-half_length),SIDES.left,half_bite_size,''));default:$.error('Invalid side "'+side+'".');}},getLineHeight:function(elem){var $elem=$(elem),float=$elem.css('float'),position=$elem.css('position'),html=$elem.html(),wrapper_id='line-height-test',line_height;if(float!=='none'){$elem.css('float','none');}if(position==='absolute'){$elem.css('position','static');}$elem.html('i').wrap('<div id="'+wrapper_id+'" />');line_height=$('#'+wrapper_id).innerHeight();$elem.html(html).css({'float':float,'position':position}).unwrap();return line_height;}};utils.eatStr.cache={};utils.eatStr.generateKey=function(){return Array.prototype.join.call(arguments,'');};$.fn.trunk8=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.trunk8');}};$.fn.trunk8.defaults={fill:'&hellip;',lines:1,side:SIDES.right,tooltip:true,width:WIDTH.auto};})(jQuery);

function setPageTo(pageId) {
	$("html, body").animate({ scrollTop: 0 }, 125);

	History.pushState({}, "Dalton Courses", "#!" + pageId)
	setTimeout(function() {
		$(".page.showing").removeClass("showing");
		$("#" + pageId).addClass("showing");
	}, 150);
}

function getMonthLength(month, year) {
	var testDate = new Date(year, month - 1, 0);
	return testDate.getDate();
}
function getStartingDayOfWeek(month, year) {
	var testDate = new Date(year, month - 1, 1);
	return testDate.getDay();
}
function weekCount(year, month_number) {
    var firstOfMonth = new Date(year, month_number-1, 1);
    var lastOfMonth = new Date(year, month_number, 0);

    var used = firstOfMonth.getDay() + lastOfMonth.getDate();

    return Math.ceil( used / 7);
}
function getCalendarHTML(month, year) {
	var html = "";

	var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	// var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	html += '<table class="calendar">';
		html += '<thead>';

			html += '<tr><th class="calendar-month" colspan="7">';
			html += months[month - 1];
			html += ' ';
			html += year;
			html += '</th></tr>';
			html += '<tr class="calendar-daysOfWeek">';
				for (var i = 0; i < daysOfWeek.length; i++) {
					html += '<th class="calendar-dayOfWeek">';
					html += daysOfWeek[i];
					html += '</th>';
				}
			html += '</tr>';

		html += '</thead>';
		html += '<tbody>';

		// For every week...
		// if start week, add blank cells
		// add cells until end of week
		// if end week, add blank cells
		// repeat until end of month
		var weeks = weekCount(year, month);
		var curDay = 1;
		for (var j = 0; j < weeks; j++) {
			var weekDayIndex = 0;
			var daysInWeek = 7;
			if (j == (weeks - 1)) {
				// Last week!						
				var lastDay = new Date(year, month, 0);
				daysInWeek = lastDay.getDay() + 1;
			}
			html += '<tr>';

				if (j == 0) {
					// Start week!
					// We have to worry about the starting days...
					var startDow = getStartingDayOfWeek(month,year);
					for (var k = 0; k < startDow; k++) {
						html += '<td class="calendar-notInMonth"></td>';
						weekDayIndex++;
					}
				}
				for (;weekDayIndex < daysInWeek; weekDayIndex++) {
					html += '<td class="calendar-day">';
					html += curDay;
					html += '</td>';
					curDay++;
				}
				if (weekDayIndex != 6) {
					for (;weekDayIndex < 7; weekDayIndex++) {
						html += '<td class="calendar-notInMonth"></td>';
						curDay++;
					}
				}


			html += '</tr>';
		}

		html += '</tbody>';
	html += '</table>';
	
	return html;
}

$(document).ready(function() {
	$("#hamburger-icon").click(function() {
		$("body").toggleClass("nav-expanded");
	});
	$("#user-actions > li").click(function() {
		$("body").removeClass("nav-expanded");
	});

	// Menu items
	$("#optionsMenuItem").click(function() {
		setPageTo("optionsPage");
	});
	$("#logOutMenuItem").click(function() {
		setPageTo("loadingPage");
	});

	// Load info
	window.coursesLib.checkLoggedIn(function(loginStatus) {
		if (!loginStatus.isLoggedIn) {
			setPageTo("notLoggedInPage");
			return;
		}
		$("#calendarSpot").html(getCalendarHTML(1, 2015));
		window.coursesLib.getProfile(function(response) {
			$("#username-big").text(response.firstName);
			$("#username-img").attr("src", response.avatarUrl);
			window.coursesLib.getUpcomingEvents(function(response) {
				console.log(response);
				for (var i = 0; i < response.events.length; i++) {
					var thisEvent = response.events[i];
					var $eventItem = $('<li><div class="upcoming-title"></div><div class="upcoming-course"></div><div class="upcoming-desc"></div></li>');

					$eventItem.children(".upcoming-title").text(thisEvent.title);
					$eventItem.children(".upcoming-course").text(thisEvent.course);
					var descThing = thisEvent.normText;
					if (descThing.length > 200) {
						descThing = descThing.substring(0, 200);
						descThing += "...";
					}
					$eventItem.children(".upcoming-desc").text(descThing);

					$("#upcomingEventList").append($eventItem);
					$(".upcoming-desc").each(function() {
						//$(this).text().sp
					});

					console.log(thisEvent);
				}
				setPageTo("mainPage");
			});
		});
	});
});

$(window).resize(function() {
	$("body").removeClass("nav-expanded");
});