var disabledComponentList = [];
function saveChanges() {
	cpal.storage.setKey("disabledComponents", disabledComponentList, function() {
		console.log("Saved changes!");
	});
}
function createList(sortedComponents, $ulToAppendTo) {
	//var sortedComponents = window.components;
	for (var componentIndex in sortedComponents) {
		if (componentIndex == "runAll") {
			continue;
		}
		var component = sortedComponents[componentIndex];
		var $appendMeReally = $('<li class="col-1-4 feature"></li>');
		$appendMeReally.attr("data-componentIndex", componentIndex);
		var $appendMe = $('<div class="content"></div>');
		$appendMe.addClass("feature");
			var $check = $("<input type=\"checkbox\" />");
				$check.addClass("featureCheck");
				$check.prop("checked", disabledComponentList.indexOf(componentIndex) == -1);
				$check.attr("data-index", componentIndex);
				$check.click(function() {
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
							if (!confirm("Some other features require the one you're trying to disable.\nSpecifically: " + result + " all require it.\nIf you disable just this one without disabling the ones in the list before, *BAD THINGS MIGHT HAPPEN*.\n\n\nAre you sure you want to disable this feature? (***BAD THINGS MIGHT HAPPEN***)")) {
								$(this).prop("checked", true);
								return;
							}
						}
						disabledComponentList.push(index);
					}
					console.log(disabledComponentList);
					saveChanges();
				});
			$appendMe.append($check);

			var $label = $("<strong></strong>");
			$label.addClass("featureLabel");
			$label.html(/*"&nbsp;" + */component.displayName);
			$appendMe.append($label);

			var $desc = $("<p></p>");
			$desc.addClass("featureDesc");
			$desc.html(component.description);
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
		url: 'https://coursesplus.tk/usrupl/uploadFilePost.php',  //Server script to process data
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

$(document).ready(function() {
	createList(window.services, $("#services > ul"));
	cpal.storage.getKey("disabledComponents", function(result) {
		disabledComponentList = ($.isArray(result) ? result : []);
		console.log(disabledComponentList);
		createList(window.components, $("#features > ul"));
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
		$(".textColor.black").removeClass("selected");
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
		$(".linkTextColor.bluish").removeClass("selected");
		if ($(".linkTextColor").hasClass(result)) {
			$(".linkTextColor." + result).addClass("selected");
		} else {
			$(".linkTextColor.custom").addClass("selected");
			$("#secretLinkTextColorPicker").val(result);
			onLinkTextColorPickerChange();
		}
	});
	cpal.storage.getKey("navTextColor", function(items) {
		if (result === undefined) {
			return;
		}
		$(".navTextColor.black").removeClass("selected");
		if ($(".navTextColor").hasClass(result)) {
			$(".navTextColor." + result).addClass("selected");
		} else {
			$(".navTextColor.custom").addClass("selected");
			$("#secretNavTextColorPicker").val(result);
			onNavTextColorPickerChange();
		}
	});
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
			$(".selectedLogo").attr("src", cpal.resources.getURL("images/logos/" + logoImage + ".png"));
		});
	});
	$(".selectedLogo").attr("src", cpal.resources.getURL("images/logos/regular.png"));
	$.ajax({
		url: 'https://coursesplus.tk/usrupl/uplInfo.php',  //Server script to process data
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
		$(".selectedLogo").attr("src", cpal.resources.getURL("images/logos/" + e.to + ".png"));
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
});