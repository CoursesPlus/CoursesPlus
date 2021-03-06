// Trunk8
(function ($) { var methods, utils, SIDES = { center: 'center', left: 'left', right: 'right' }, WIDTH = { auto: 'auto' }; function trunk8(element) { this.$element = $(element); this.original_text = this.$element.html(); this.settings = $.extend({}, $.fn.trunk8.defaults); } trunk8.prototype.updateSettings = function (options) { this.settings = $.extend(this.settings, options); }; function truncate() { var data = this.data('trunk8'), settings = data.settings, width = settings.width, side = settings.side, fill = settings.fill, line_height = utils.getLineHeight(this) * settings.lines, str = data.original_text, length = str.length, max_bite = '', lower, upper, bite_size, bite; this.html(str); if (width === WIDTH.auto) { if (this.height() <= line_height) { return; } lower = 0; upper = length - 1; while (lower <= upper) { bite_size = lower + ((upper - lower) >> 1); bite = utils.eatStr(str, side, length - bite_size, fill); this.html(bite); if (this.height() > line_height) { upper = bite_size - 1; } else { lower = bite_size + 1; max_bite = (max_bite.length > bite.length) ? max_bite : bite; } } this.html(''); this.html(max_bite); if (settings.tooltip) { this.attr('title', str); } } else if (!isNaN(width)) { bite_size = length - width; bite = utils.eatStr(str, side, bite_size, fill); this.html(bite); if (settings.tooltip) { this.attr('title', str); } } else { $.error('Invalid width "' + width + '".'); } } methods = { init: function (options) { return this.each(function () { var $this = $(this), data = $this.data('trunk8'); if (!data) { $this.data('trunk8', (data = new trunk8(this))); } data.updateSettings(options); truncate.call($this); }); }, update: function (new_string) { return this.each(function () { var $this = $(this); if (new_string) { $this.data('trunk8').original_text = new_string; } truncate.call($this); }); }, revert: function () { return this.each(function () { var text = $(this).data('trunk8').original_text; $(this).html(text); }); }, getSettings: function () { return this.get(0).data('trunk8').settings; } }; utils = { eatStr: function (str, side, bite_size, fill) { var length = str.length, key = utils.eatStr.generateKey.apply(null, arguments), half_length, half_bite_size; if (utils.eatStr.cache[key]) { return utils.eatStr.cache[key]; } if ((typeof str !== 'string') || (length === 0)) { $.error('Invalid source string "' + str + '".'); } if ((bite_size < 0) || (bite_size > length)) { $.error('Invalid bite size "' + bite_size + '".'); } else if (bite_size === 0) { return str; } if (typeof (fill + '') !== 'string') { $.error('Fill unable to be converted to a string.'); } switch (side) { case SIDES.right: return utils.eatStr.cache[key] = $.trim(str.substr(0, length - bite_size)) + fill; case SIDES.left: return utils.eatStr.cache[key] = fill + $.trim(str.substr(bite_size)); case SIDES.center: half_length = length >> 1; half_bite_size = bite_size >> 1; return utils.eatStr.cache[key] = $.trim(utils.eatStr(str.substr(0, length - half_length), SIDES.right, bite_size - half_bite_size, '')) + fill + $.trim(utils.eatStr(str.substr(length - half_length), SIDES.left, half_bite_size, '')); default: $.error('Invalid side "' + side + '".'); } }, getLineHeight: function (elem) { var $elem = $(elem), float = $elem.css('float'), position = $elem.css('position'), html = $elem.html(), wrapper_id = 'line-height-test', line_height; if (float !== 'none') { $elem.css('float', 'none'); } if (position === 'absolute') { $elem.css('position', 'static'); } $elem.html('i').wrap('<div id="' + wrapper_id + '" />'); line_height = $('#' + wrapper_id).innerHeight(); $elem.html(html).css({ 'float': float, 'position': position }).unwrap(); return line_height; } }; utils.eatStr.cache = {}; utils.eatStr.generateKey = function () { return Array.prototype.join.call(arguments, ''); }; $.fn.trunk8 = function (method) { if (methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); } else if (typeof method === 'object' || !method) { return methods.init.apply(this, arguments); } else { $.error('Method ' + method + ' does not exist on jQuery.trunk8'); } }; $.fn.trunk8.defaults = { fill: '&hellip;', lines: 1, side: SIDES.right, tooltip: true, width: WIDTH.auto }; })(jQuery);

function setPageTo(pageId, dataStuff) {
	$("html, body").animate({ scrollTop: 0 }, 125);

	setTimeout(function () {
		$(".page.showing").removeClass("showing");
		$("#" + pageId).addClass("showing");
	}, 150);
}

function shouldLoadWelcome(callback) {
	cpal.storage.getKey("showedMenubarWelcome", function (resp) {
		if (resp == undefined || resp == false) {
			callback(true);
		} else {
			callback(false);
		}
	});
}

function getSettings(callback) {
	var defaults = {
		upcomingEvents: true,
		serviceUpsell: false,
		quickLinks: true
	};
	cpal.storage.getKey("menubarSettings", function (settings) {
		var retSet;
		if (settings == undefined || settings == {}) {
			retSet = defaults;
		} else {
			retSet = settings;
		}
		cpal.storage.getKey("menubarServices", function (serviceResp) {
			if (serviceResp == undefined) {
				callback(retSet, []);
			} else {
				callback(retSet, serviceResp);
			}
		});
	});
}

$(document).ready(function () {
	shouldLoadWelcome(function (loadWelcome) {
		if (!loadWelcome) {
			getSettings(function (settings, menubarServices) {

				if (settings.upcomingEvents) {
					window.coursesLib.checkLoggedIn(function (loginStatus) {
						if (!loginStatus.isLoggedIn) {
							setPageTo("notLoggedInPage");
							return;
						}
						window.coursesLib.getProfile(function (response) {
							window.coursesLib.getUpcomingEvents(function (response) {
								$("#upcomingEventList").text("");
								for (var i = 0; i < response.events.length; i++) {
									var thisEvent = response.events[i];
									var $eventItem = $('<li><div class="upcoming-title"></div><div class="upcoming-course"></div><div class="upcoming-desc"></div></li>');

									$eventItem.children(".upcoming-title").text(thisEvent.title);
									$eventItem.children(".upcoming-course").text(thisEvent.course);
									var descThing = thisEvent.normText;
									if (descThing.length > 150) {
										descThing = descThing.substring(0, 150);
										descThing += "...";
									}
									$eventItem.children(".upcoming-desc").text(descThing + " ");

									var $readLink = $('<a target="_blank">see details &rarr;</a>');
										$readLink.attr("href", thisEvent.link);
									$eventItem.children(".upcoming-desc").append($readLink);

									$("#upcomingEventList").append($eventItem);
									/*$(".upcoming-desc").each(function () {
										//$(this).text().sp
									});*/
								}
							});
						});
					});	
				} else {
					$("#upcomingEvents").hide();
				}

				if (!settings.quickLinks) {
					$("#quickLinks").hide();
				}
				
				if (menubarServices.length != 0) {
					for (var serviceIndexIndex in menubarServices) {
						var serviceIndex = menubarServices[serviceIndexIndex];
						var thisService = window.services[serviceIndex];
						var $blockBody = thisService.createBlock(true);
						var $blockToAppend = $("<div></div>");

						$blockToAppend.attr("id", serviceIndex + "_service_block");
							$blockToAppend.addClass("block");

							var $header = $("<div class=\"header\"><div class=\"title\"><h2></h2></div></div>");
							$header.find("h2").text(thisService.displayName);

							if (thisService.options) {
									var $settingIcon = $('<i class="fa fa-wrench pull-right"></i>');

									$settingIcon.attr("data-serviceIndex", serviceIndex);

									$settingIcon.css("position", "relative");
									$settingIcon.css("top", "-31px");
									$settingIcon.css("right", "6px");
									$settingIcon.css("cursor", "pointer");

									$settingIcon.click(function () {
										chrome.tabs.create({
											url: cpal.resources.getURL("etc/options.html#soptions:" + $(this).attr("data-serviceIndex"))
										});
									});

									$header.children(".title").append($settingIcon);
								}
							$blockToAppend.append($header);

							var $content = $("<div class=\"content\"></div>");
								$content.append($blockBody);
							$blockToAppend.append($content);

						$("#serviceSpot").append($blockToAppend);
					}
				} else {
					if (!settings.serviceUpsell) {
						var $upsellElem = $('<div id="serviceUpsell">You can add services up here! Just select the "Menubar" section of the options page to pick what shows up.</div>');
							$upsellElem.append("<br />");
							var $learnMoreBtn = $('<a href="' + cpal.resources.getURL("etc/options.html#menubar") + '" target="_blank" class="btn btn-primary btn-lg">Learn more</a>');
							$upsellElem.append($learnMoreBtn);

							$upsellElem.append("<br />");

							var $noThanksBtn = $('<button class="btn btn-primary">No thanks</button>');
								$noThanksBtn.click(function() {
									getSettings(function (settings) {
										settings.serviceUpsell = true;
										cpal.storage.setKey("menubarSettings", settings, function () {
											window.location.reload();
										});
									});
								});
							$upsellElem.append($noThanksBtn);
						$("#serviceSpot").append($upsellElem);
					} else {
						$("#services").hide();
					}
				}

				setPageTo("mainPage");
			});
		} else {
			setPageTo("welcomePage");
		}
	});

	$("#soundsGood").click(function () {
		cpal.storage.setKey("showedMenubarWelcome", true, function () {
			window.location.reload();
		});		
	});
	$("#noThanks").click(function () {
		chrome.tabs.create({
			url: cpal.resources.getURL("etc/disablemenu.html")
		});
	});
});