$(document).ready(function() {
	var schedulesUrl = "https://schedules.dalton.org/roux/index.php";

	cpal.storage.removeKey("schedules-owner", function() {
		cpal.storage.removeKey("schedules-key", function() {
			
		});
	});

	$("#login").click(function() {
		$("#loginform").hide();
		$("#loggingin").show();

		var daltonid = $("#daltonid").val();
		var password = $("#password").val();

		$.ajax({
			url: schedulesUrl,
			type: "POST",
			data: {
				rouxRequest: "<request><key></key><action>authenticate</action><credentials><username>" + daltonid + "</username><password type=\"plaintext\">" + password + "</password></credentials></request>"
			},
			success: function(data) {
				console.log(data);
				var $data = $(data);
				var statusCode = $data.find("result").attr("status");
				if (statusCode == 200) {
					// YAY!
					var key = $data.find("result").children("key").text();
					var owner = $data.find("result").children("key").attr("owner");
					cpal.storage.setKey("schedules-owner", owner, function() {
						cpal.storage.setKey("schedules-key", key, function() {
							alert("Success! You've been signed in to Schedules.");
							window.close();
						});
					});
				} else {
					// Uh oh.
					var errCode = $data.find("error").children("code").text();
					var errMsg = $data.find("error").children("message").text();
					if (errCode == "505") {
						alert("That username and password combination didn't work.\n\nDouble-check you have't made any typos.");
						$("#loginform").show();
						$("#loggingin").hide();
					} else {
						alert("Error " + errCode + " - " + errMsg);
					}
				}
			},
			error: function() {
				alert("An error occured while connecting to Schedules.\n\nTry again later, or, if that doesn't work, send an email to emails@coursesplus.tk.");
				window.close();
			}
		});
	});
});