var disabledComponentList = [];
function saveChanges() {
	chrome.storage.sync.set({disabledComponents: disabledComponentList}, function() {
		console.log("Saved changes!");
	});
}
function createList() {
	var sortedComponents = window.components;
	for (var componentIndex in sortedComponents) {
		if (componentIndex == "runAll") {
			continue;
		}
		var component = sortedComponents[componentIndex];
		var $appendMe = $("<li></li>");
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
			$label.html("&nbsp;" + component.displayName);
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

		$("#features > ul").append($appendMe);
	}
}

function progressHandlingFunction(e) {
	console.log(e);
	if(e.lengthComputable){
        //$('progress').attr({value:e.loaded,max:e.total});
    }
}

function saveBgUrlSizing(url) {
	chrome.storage.sync.set({backgroundImage: {
		url: url,
		sizing: $(".bgSizing:checked").val()
	}});
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
				alert("Error - " + res.errorMsg);
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
	chrome.storage.sync.set({backgroundColor: newColor});
};
var onTextColorPickerChange = function() {
	var newColor = $("#secretTextColorPicker").val();
	$(".textColor.custom").css("background-color", newColor);
	$(".textColor.custom").css("color", newColor);
	chrome.storage.sync.set({textColor: newColor});
};
var onLinkTextColorPickerChange = function() {
	var newColor = $("#secretLinkTextColorPicker").val();
	$(".linkTextColor.custom").css("background-color", newColor);
	$(".linkTextColor.custom").css("color", newColor);
	chrome.storage.sync.set({linkTextColor: newColor});
};
var onNavTextColorPickerChange = function() {
	var newColor = $("#secretNavTextColorPicker").val();
	$(".navTextColor.custom").css("background-color", newColor);
	$(".navTextColor.custom").css("color", newColor);
	chrome.storage.sync.set({navTextColor: newColor});
};

$(document).ready(function() {
	chrome.storage.sync.get("disabledComponents", function(items) {
		disabledComponentList = ($.isArray(items.disabledComponents) ? items.disabledComponents : []);
		console.log(disabledComponentList);
		createList();
	});
	chrome.storage.sync.get("backgroundColor", function(items) {
		if (items.backgroundColor === undefined) {
			return;
		}
		$(".background.white").removeClass("selected");
		if ($(".background").hasClass(items.backgroundColor)) {
			$(".background." + items.backgroundColor).addClass("selected");
		} else {
			$(".background.custom").addClass("selected");
			$("#secretColorPicker").val(items.backgroundColor);
			onBgColorPickerChange();
		}
	});
	chrome.storage.sync.get("backgroundImage", function(items) {
		if (items.backgroundImage === undefined || items.backgroundImage === false) {
			return;
		}
		$("#backgroundImagePreview").attr("src", items.backgroundImage.url);
	});
	chrome.storage.sync.get("textColor", function(items) {
		if (items.textColor === undefined) {
			return;
		}
		$(".textColor.black").removeClass("selected");
		if ($(".textColor").hasClass(items.textColor)) {
			$(".textColor." + items.textColor).addClass("selected");
		} else {
			$(".textColor.custom").addClass("selected");
			$("#secretTextColorPicker").val(items.textColor);
			onTextColorPickerChange();
		}
	});
	chrome.storage.sync.get("linkTextColor", function(items) {
		if (items.linkTextColor === undefined) {
			return;
		}
		if (items.linkTextColor == "#428BCA") {
			// It's the "bluish" color.
			return;
		}
		$(".linkTextColor.bluish").removeClass("selected");
		if ($(".linkTextColor").hasClass(items.linkTextColor)) {
			$(".linkTextColor." + items.linkTextColor).addClass("selected");
		} else {
			$(".linkTextColor.custom").addClass("selected");
			$("#secretLinkTextColorPicker").val(items.linkTextColor);
			onLinkTextColorPickerChange();
		}
	});
	chrome.storage.sync.get("navTextColor", function(items) {
		if (items.navTextColor === undefined) {
			return;
		}
		$(".navTextColor.black").removeClass("selected");
		if ($(".navTextColor").hasClass(items.navTextColor)) {
			$(".navTextColor." + items.navTextColor).addClass("selected");
		} else {
			$(".navTextColor.custom").addClass("selected");
			$("#secretNavTextColorPicker").val(items.navTextColor);
			onNavTextColorPickerChange();
		}
	});
	chrome.storage.sync.get("logoType", function(items) {
		if (items.logoType === undefined) {
			return;
		}
		chrome.storage.sync.get("logoImage", function(items) {
			if (items.logoImage === undefined) {
				return;
			}
			$(".logo.regular").removeClass("selected");
			$(".logo." + items.logoImage).addClass("selected");
			$(".selectedLogo").attr("src", chrome.runtime.getURL("images/logos/" + items.logoImage + ".png"));
		});
	});
	$(".selectedLogo").attr("src", chrome.runtime.getURL("images/logos/regular.png"));
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
			alert("Unknown error connecting to background image server!");
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
			chrome.storage.sync.set({backgroundColor: e.to});
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
		chrome.storage.sync.set({backgroundImage: false});
		window.location.reload();
	});

	$(".textColor").on("selBoxChanged", function(e) {
		if (e.to != "custom") {
			chrome.storage.sync.set({textColor: e.to});
		} else {
			$("#secretTextColorPicker")[0].click();
		}
	});
	$(".linkTextColor").on("selBoxChanged", function(e) {
		if (e.to != "custom") {
			chrome.storage.sync.set({linkTextColor: e.to});
		} else {
			$("#secretLinkTextColorPicker")[0].click();
		}
	});
	$(".navTextColor").on("selBoxChanged", function(e) {
		if (e.to != "custom") {
			chrome.storage.sync.set({navTextColor: e.to});
		} else {
			$("#secretNavTextColorPicker")[0].click();
		}
	});
	$(".logo").on("selBoxChanged" ,function(e) {
		chrome.storage.sync.set({logoType: "preload", logoImage: e.to});
		$(".selectedLogo").attr("src", chrome.runtime.getURL("images/logos/" + e.to + ".png"));
	});
	$("#selectLogo").click(function() {
		$("#selLogoModal").modal();
	});
	var recalcStorage = function() {
		chrome.storage.sync.getBytesInUse(null, function(bytes) {
			$("#storageUsage").text(Math.round((bytes / 1024) * 100) / 100 + " kB out of " + (chrome.storage.sync.QUOTA_BYTES / 1024) + " kB total used");
		});		
	};
	recalcStorage();
	$("#clearStorage").click(function() {
		if (confirm("This will reset Courses+ to its original state, removing all stored information, including completed assignments, course customizations, and more.\n\nAre you SURE you want to clear storage?\nThis action cannot be undone.")) {
			chrome.storage.sync.clear(function() {
				recalcStorage();
				window.location.reload();
			});
		}
	});
});