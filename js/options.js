var disabledComponentList = [];
function saveChanges() {
	cpal.storage.setKey("disabledComponents", disabledComponentList, function() {
		console.log("Saved changes!");
	});
}
function openServiceOptions(serviceIndex) {
	console.log("openServiceOptions: " + serviceIndex);
	var optionsUrl = services[serviceIndex].options;
	var url = cpal.resources.getURL(optionsUrl);
	var loc = "_blank";
	var w = 570;
	var h = 300;

	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	var $iframe = $("<iframe></iframe>");

		$iframe.attr("src", url);
		$iframe.css("width", w + "px");
		$iframe.css("height", h + "px");
		$iframe.css("border", "none");

	$("#serviceOptionsModal .modal-body").html("");
	$("#serviceOptionsModal .modal-body").append($iframe);

	$("#serviceOptionsModal").modal();
}
function createList(sortedComponents, $ulToAppendTo, checkList, checkPresence, clickEvent) {
	//var sortedComponents = window.components;
	for (var componentIndex in sortedComponents) {
	    if (componentIndex == "runAll" || componentIndex == "createErrorModal") {
			continue;
		}
		var component = sortedComponents[componentIndex];
		var $appendMeReally = $('<li class="col-1-4 feature"></li>');
		$appendMeReally.attr("data-componentIndex", componentIndex);
		var $appendMe = $('<div class="content"></div>');
		$appendMe.addClass("feature");
			var $check = $("<input type=\"checkbox\" />");
				$check.addClass("featureCheck");
				$check.prop("checked", (checkPresence ? checkList.indexOf(componentIndex) != -1 : checkList.indexOf(componentIndex) == -1));
				$check.attr("data-index", componentIndex);
				$check.click(clickEvent);
			$appendMe.append($check);

			var $label = $("<strong></strong>");
				$label.addClass("featureLabel");
				$label.html(/*"&nbsp;" + */component.displayName);
			$appendMe.append($label);

			var $desc = $("<p></p>");
				$desc.addClass("featureDesc");
				if (component.author != undefined) {
					var $author = $("<em></em>");
						$author.text("by " + component.author);
					$desc.append($author);
					if (component.authorVerification) {
						$desc.append("&nbsp;");
						$desc.append('<i class="fa fa-check-circle" data-toggle="tooltip" data-placement="bottom" title="Verified author"></i>');
					}
					$desc.append("<br />");
				}
				$desc.append("<span>" + component.description + "</span>");
				$appendMe.append($("<br />"));
			$appendMe.append($desc);

			var $req = $("<p></p>");
			$req.addClass("featureReq");

	        if (component.requires.length > 0) {
	            var result = "This feature requires ";
	            $.each(component.requires, function(index) {
	                if (index != 0) {
	                    result += ",";
	                }
	                if (component.requires.length > 1 && index == (component.requires.length - 1)) {
	                    result += " and ";
	                }
	                firstOne = false;
	                result += components[this].displayName;
	            });
	            result += " to be enabled.";
	            $req.html(result);
	            $appendMe.append($req);
	        }

			if (component.options) {
				var $options = $('<button>Options</button>');

					$options.addClass("btn");
					$options.addClass("btn-info");
					$options.addClass("btn-sm");
					$options.attr("data-componentIndex", componentIndex);
					$options.click(function() {
						// TODO: Check if service is enabled first.
						openServiceOptions($(this).attr("data-componentIndex"));						
					});

				$appendMe.append($options);
			}

		$appendMeReally.append($appendMe)
		$ulToAppendTo.append($appendMeReally);
	}
}

function progressHandlingFunction(e) {
	console.log(e);
	if(e.lengthComputable){
        //$('progress').attr({value:e.loaded,max:e.total});
    }
}

function saveBgUrlSizing(url) {
	cpal.storage.setKey("backgroundImage", {
		url: url,
		sizing: $(".bgSizing:checked").val()
	});
}
function saveBgSizing() {
	if ($("#backgroundImagePreview").attr("src") != "images/nobg.png") {
		saveBgUrlSizing($("#backgroundImagePreview").attr("src"));
	}
}

function showLoading() {
	$("#bgImgUpl > *").not("#uploadingText").not("#connectingText").hide();
	$("#uploadingText").show();
}

function hideLoading() {
	$("#bgImgUpl > *").not("#uploadingText").not("#connectingText").show();
	$("#uploadingText").hide();
}

function hideConnecting() {
	$("#bgImgUpl > *").not("#uploadingText").not("#connectingText").show();
	$("#connectingText").hide();
}

function uploadImageAndSetBg() {
	if ($("#fileToUpload").val() == "") {
		alert("Please select an image with the Choose File button! (above the green Upload Image button)");
		return false;
	}
	showLoading();
	var formData = new FormData($('form')[0]);
	$.ajax({
		url: 'https://usrupl.coursesplus.tk/uploadFilePost.php',  //Server script to process data
		type: 'POST',
		data: formData,
		cache: false,
		dataType: 'json',
		xhr: function() {  // Custom XMLHttpRequest
			var myXhr = $.ajaxSettings.xhr();
			if (myXhr.upload) { // Check if upload property exists
				myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
			}
			return myXhr;
		},
		//Ajax events
		//beforeSend: beforeSendHandler,
		success: function(res) {
			if (res.error) {
				alert("Error uploading image - " + res.errorMsg);
				hideLoading();
				window.location.reload();
				return;
			}

			$("#backgroundImagePreview").attr("src", res.url);
			hideLoading();

			saveBgSizing();

			console.log("Image uploaded to " + res.url + "!");
		},
		error: function(jqXHR, textStatus, errorThrown) {
			hideLoading();
			alert("Unknown error uploading image!");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
			window.location.reload();
		},
		// Options to tell jQuery not to process data or worry about content-type.
		contentType: false,
		processData: false
	});
	return false;
}

var onBgColorPickerChange = function() {
	var newColor = $("#secretColorPicker").val();
	$(".background.custom").css("background-color", newColor);
	$(".background.custom").css("color", newColor);
	cpal.storage.setKey("backgroundColor", newColor);
};
var onTextColorPickerChange = function() {
	var newColor = $("#secretTextColorPicker").val();
	$(".textColor.custom").css("background-color", newColor);
	$(".textColor.custom").css("color", newColor);
	cpal.storage.setKey("textColor", newColor);
};
var onLinkTextColorPickerChange = function() {
	var newColor = $("#secretLinkTextColorPicker").val();
	$(".linkTextColor.custom").css("background-color", newColor);
	$(".linkTextColor.custom").css("color", newColor);
	cpal.storage.setKey("linkTextColor", newColor);
};
var onNavTextColorPickerChange = function() {
	var newColor = $("#secretNavTextColorPicker").val();
	$(".navTextColor.custom").css("background-color", newColor);
	$(".navTextColor.custom").css("color", newColor);
	cpal.storage.setKey("navTextColor", newColor);
};

function handleServicePart2(index, thisService) {
	console.log("All permissions done!");
	cpal.storage.getKey("services", function(result) {
		serviceList = ($.isArray(result) ? result : []);
		console.log(serviceList);
		serviceList.push(index);
		cpal.storage.setKey("services", serviceList, function() {
			thisService.onEnable();
			if (thisService.options) {
				openServiceOptions(index);
			}
		});
	});
}

$(document).ready(function() {
	cpal.storage.getKey("services", function(result) {
		var serviceList = ($.isArray(result) ? result : []);
		createList(window.services, $("#services > ul"), serviceList, true, function() {
			var index = $(this).attr("data-index");
			var $this = $(this);
			var thisService = window.services[index];
			if ($(this).prop("checked")) {
				if (thisService.origins != []) {
					// TODO: cpal
					// Do we have them?
					console.log("Asking for permissions...");
					chrome.permissions.contains({
						permissions: [],
						origins: thisService.origins
					}, function(result) {
						if (result) {
							// Done with permission stuff!
							handleServicePart2(index, thisService);
						} else {
							// OK, let's ask.
							chrome.permissions.request({
								permissions: [],
								origins: thisService.origins
							}, function(granted) {
								if (granted) {
									// YAAAY
									handleServicePart2(index, thisService);
								} else {
									$this.prop("checked", false);
									alert(thisService.displayName + " requires those permissions.");
								}
							});
						}
					});
				} else {
					handleServicePart2(index, thisService);
				}			
			} else {
				var componentIndex = $(this).attr("data-index");
				cpal.storage.getKey("services", function(result) {
					serviceList = ($.isArray(result) ? result : []);
					console.log(componentIndex);
					serviceList.splice(serviceList.indexOf(componentIndex), 1);
					cpal.storage.setKey("services", serviceList, function() {
						
					});
				});
				thisService.onDisable();
			}
		});

		$('[data-toggle="tooltip"]').tooltip();
	});
	cpal.storage.getKey("disabledComponents", function(result) {
		disabledComponentList = ($.isArray(result) ? result : []);
		console.log(disabledComponentList);
		createList(window.components, $("#features > ul"), disabledComponentList, false, function() {
			var sortedComponents = window.components;
			var index = $(this).attr("data-index");
			var featureList = [];
			for (var checkInd in sortedComponents) {
				if (checkInd == "createErrorModal" || checkInd == "runAll") {
					continue;
				}
				if (sortedComponents[checkInd].requires.indexOf(index) != -1) {
					featureList.push(sortedComponents[checkInd].displayName); 
				}
			}
			if ($(this).prop("checked")) {
				disabledComponentList.splice(disabledComponentList.indexOf(index), 1);
			} else {
				if (featureList.length > 0) {
					var result = "";
					var index2 = 0;
					for (var featureIndex in featureList) {
						if (index2 != 0) {
							result += ", ";
						}
						if (featureList.length > 1 && index2 == (featureList.length - 1)) {
							result += "and ";
						}
						result += featureList[featureIndex];
						index2++;
					}
					if (!confirm("Some other features require the one you're trying to disable.\n\nSpecifically: " + result + ".\n\nIf you disable this feature without disabling the ones in the list before, *BAD THINGS MIGHT HAPPEN*.\n\n\nAre you sure you want to disable this feature? (***BAD THINGS MIGHT HAPPEN***)")) {
						$(this).prop("checked", true);
						return;
					}
				}
				disabledComponentList.push(index);
			}
			console.log(disabledComponentList);
			saveChanges();
		});
	});
	cpal.storage.getKey("backgroundColor", function(result) {
		if (result === undefined) {
			return;
		}
		$(".background.white").removeClass("selected");
		if ($(".background").hasClass(result)) {
			$(".background." + result).addClass("selected");
		} else {
			$(".background.custom").addClass("selected");
			$("#secretColorPicker").val(result);
			onBgColorPickerChange();
		}
	});
	cpal.storage.getKey("backgroundImage", function(result) {
		if (result === undefined || result === false) {
			return;
		}
		$("#backgroundImagePreview").attr("src", result.url);
	});
	cpal.storage.getKey("textColor", function(result) {
		if (result === undefined) {
			return;
		}
		$(".textColor.themeDefault").removeClass("selected");
		if ($(".textColor").hasClass(result)) {
			$(".textColor." + result).addClass("selected");
		} else {
			$(".textColor.custom").addClass("selected");
			$("#secretTextColorPicker").val(result);
			onTextColorPickerChange();
		}
	});
	cpal.storage.getKey("linkTextColor", function(result) {
		if (result === undefined) {
			return;
		}
		if (result == "#428BCA") {
			// It's the "bluish" color.
			return;
		}
		$(".linkTextColor.themeDefault").removeClass("selected");
		if ($(".linkTextColor").hasClass(result)) {
			$(".linkTextColor." + result).addClass("selected");
		} else {
			$(".linkTextColor.custom").addClass("selected");
			$("#secretLinkTextColorPicker").val(result);
			onLinkTextColorPickerChange();
		}
	});
	cpal.storage.getKey("navTextColor", function(result) {
		if (result === undefined) {
			return;
		}
		$(".navTextColor.themeDefault").removeClass("selected");
		if ($(".navTextColor").hasClass(result)) {
			$(".navTextColor." + result).addClass("selected");
		} else {
			$(".navTextColor.custom").addClass("selected");
			$("#secretNavTextColorPicker").val(result);
			onNavTextColorPickerChange();
		}
	});

	// Logos

		// Add logos to gallery
		for (var logoIndex in window.logos) {
			var thisLogo = window.logos[logoIndex];
			var $logo = $('<div class="selBox logo" data-selBoxGroup="logo"></div>');
				
				$logo.attr("data-selBoxVal", logoIndex);
				$logo.addClass(logoIndex);
				$logo.css("background-image", "url(" + cpal.resources.getURL(thisLogo.whitebg) + ")");
				$logo.css("width", thisLogo.width + "px");
				$logo.css("height", thisLogo.height + "px");

			$("#logoSelGallery").append($logo);
		}

		cpal.storage.getKey("logoType", function(logoType) {
			if (logoType === undefined) {
				return;
			}
			cpal.storage.getKey("logoImage", function(logoImage) {
				if (logoImage === undefined) {
					return;
				}
				$(".logo.regular").removeClass("selected");
				$(".logo." + logoImage).addClass("selected");
				$(".selectedLogo").attr("src", cpal.resources.getURL(window.logos[logoImage].whitebg));
			});
		});
		$(".selectedLogo").attr("src", cpal.resources.getURL(window.logos["regular"].whitebg));
		$.ajax({
			url: 'https://usrupl.coursesplus.tk/uplInfo.php',  //Server script to process data
			type: 'POST',
			dataType: 'json',
			success: function(res) {
				$("#bgFileInfo").html(res.typeAndSize);
				$("#bgPrivacy").html(res.privacy);

				hideConnecting();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$("#connectingText").text("Unknown error connecting to background image server!");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});

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

	$(".background").on("selBoxChanged", function(e) {
		if (e.to != "custom") {
			cpal.storage.setKey("backgroundColor", e.to);
		} else {
			$("#secretColorPicker")[0].click();
		}
	});

	$("#secretColorPicker").change(onBgColorPickerChange);
	$("#secretTextColorPicker").change(onTextColorPickerChange);
	$("#secretLinkTextColorPicker").change(onLinkTextColorPickerChange);
	$("#secretNavTextColorPicker").change(onNavTextColorPickerChange);

	$("#bgImgUplBtn").click(uploadImageAndSetBg);
	$(".bgSizing").change(function() {
		saveBgSizing();
	});
	$("#resetBg").click(function() {
		cpal.storage.setKey("backgroundImage", false);
		window.location.reload();
	});

	$(".textColor").on("selBoxChanged", function(e) {
		if (e.to != "custom") {
			cpal.storage.setKey("textColor", e.to);
		} else {
			$("#secretTextColorPicker")[0].click();
		}
	});
	$(".linkTextColor").on("selBoxChanged", function(e) {
		if (e.to != "custom") {
			cpal.storage.setKey("linkTextColor", e.to);
		} else {
			$("#secretLinkTextColorPicker")[0].click();
		}
	});
	$(".navTextColor").on("selBoxChanged", function(e) {
		if (e.to != "custom") {
			cpal.storage.setKey("navTextColor", e.to);
		} else {
			$("#secretNavTextColorPicker")[0].click();
		}
	});
	$(".logo").on("selBoxChanged" ,function(e) {
		cpal.storage.setKey("logoType", "preload");
		cpal.storage.setKey("logoImage", e.to);
		$(".selectedLogo").attr("src", cpal.resources.getURL(window.logos[e.to].whitebg));
	});
	$("#selectLogo").click(function() {
		$("#selLogoModal").modal();
	});
	var recalcStorage = function() {
		cpal.storage.quota.getUsedBytes(function(bytes) {
			$("#storageUsage").text(Math.round((bytes / 1024) * 100) / 100 + " kB out of " + (cpal.storage.quota.getTotalBytes() / 1024) + " kB total used");
		});		
	};
	recalcStorage();
	$("#clearStorage").click(function() {
		if (confirm("This will reset Courses+ to its original state, removing all stored information, including completed assignments, course customizations, and more.\n\nAre you SURE you want to clear storage?\nThis action cannot be undone.")) {
			cpal.storage.clear(function() {
				recalcStorage();
				window.location.reload();
			});
		}
	});
	cpal.storage.getKey("uniqueId", function(response) {
		if (response == undefined) {
			$("#coursesplus-uniqueid").text("not generated yet. Visit a page to have one generated for you.");
		} else {
			$("#coursesplus-uniqueid").text(response);
		}
	});
	$("#importData").click(function() {
		var response = prompt("THIS WILL REMOVE ALL CURRENTLY STORED DATA.\n\nIf you would like to continue, type in the new data and press OK. Otherwise, press Cancel.");
		if (response != null) {
			var responseData = JSON.parse(response);
			cpal.storage.clear(function() {
				for (var key in responseData) {
					cpal.storage.setKey(key, responseData[key], function() {});
				}
			});
		}
	});
	$("#exportData").click(function() {
		cpal.storage.getAll(function(items) {
			prompt("Here is all the information Courses+ has stored in JSON format.", JSON.stringify(items));
		});
	});

	// Themes
		for (var themeIndex in window.themes) {
			var thisTheme = window.themes[themeIndex];
			var $themeRadio = $("<div><label></label></div>");

				$themeRadio.addClass("radio");

				var $radioButton = $('<input type="radio" name="themeRadios" />');

					$radioButton.val(themeIndex);

				$themeRadio.children("label").append($radioButton);

				$themeRadio.children("label").append(thisTheme.name);
				if (thisTheme.editorsChoice) {
					$themeRadio.children("label").append(' <em>Editor\'s Choice!</em>');
				}

			$("#theme").append($themeRadio);
		}

		$("[name=themeRadios]").change(function() {
			var newTheme = $(this).val();
			cpal.storage.setKey("theme", newTheme, function() {

			});
		});

		cpal.storage.getKey("theme", function(value) {
			if (value != undefined) {
				$("input[name=themeRadios][value=" + value + "]").prop("checked", true);
			} else {
				$("input[name=themeRadios][value=bootstrap]").prop("checked", true);
			}
		});

	// Menubar
	var defaults = {
		upcomingEvents: true,
		services: [],
		serviceUpsell: false,
		quickLinks: true
	};
	cpal.storage.getKey("menubarSettings", function (resp) {
		cpal.storage.getKey("services", function (servicesEnabled) {
			var settings = defaults;
			if (resp != undefined && resp != {}) {
				settings = resp;
			}

			$("#showUpcoming").prop("checked", settings.upcomingEvents);
			$("#showQuickLinks").prop("checked", settings.quickLinks);

			$("#showUpcoming").click(function () {
				settings.upcomingEvents = $(this).prop("checked");
				cpal.storage.setKey("menubarSettings", settings, function () { });
			});
			$("#showQuickLinks").click(function () {
				settings.quickLinks = $(this).prop("checked");
				cpal.storage.setKey("menubarSettings", settings, function () { });
			});

			for (var serviceIndex in window.services) {
				if (serviceIndex == "runAll") {
					continue;
				}
				var thisService = window.services[serviceIndex];
				if (thisService.type != "block" || !thisService.menuBar) {
					var $serviceLi = $('<li></li>');
						$serviceLi.text(thisService.displayName + " (not compatible)");
					$("#menubarServicesUneligible").append($serviceLi);
				} else if (servicesEnabled.indexOf(serviceIndex) == -1) {
					var $serviceLi = $('<li></li>');
						$serviceLi.text(thisService.displayName + " (disabled)");
					$("#menubarServicesUneligible").append($serviceLi);
				} else {
					var $serviceLi = $('<li></li>');
						$serviceLi.text(thisService.displayName);
					$("#menubarServicesEligible").append($serviceLi);
				}
			}
		});
	});

	$("#pagelist > li").click(function() {
		$(".page.current").removeClass("current");

		window.location.hash = $(this).data("page");

		if ($(this).data("page").indexOf("external:") == 0) {
			window.location.href = $(this).data("page").replace("external:", "");
			return;
		}

		$("#" + $(this).data("page")).addClass("current");
	});

	if (window.location.hash != "") {
		$(".page.current").removeClass("current");
		if (window.location.hash.substr(1).indexOf("soptions:") == 0) {
			$(".page.current").removeClass("current");
			$("#services").addClass("current");
			openServiceOptions(window.location.hash.substr(1).replace("soptions:", ""));
			return;
		}
		$("#" + window.location.hash.substr(1)).addClass("current");
	}

	$(".currentVersion").text(cpal.extension.getExtensionVersion());
});