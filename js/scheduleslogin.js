function logOut() {
	cpal.storage.removeKey("schedules-owner", function() {
		cpal.storage.removeKey("schedules-key", function() {
			cpal.storage.removeKey("schedules-user", function() {
				
			});
		});
	});
}
$(document).ready(function() {
	var schedulesUrl = "https://schedules.dalton.org/roux/index.php";

	$("#logOut").click(function() {
		logOut();
		window.location.reload();
	});

	cpal.storage.getKey("schedules-user", function(username) {
		if (username == undefined) {
			$("#statusCheck").hide();
			$("#loginPrompt").show();
		} else {
			cpal.storage.getKey("schedules-owner", function(owner) {
				cpal.storage.getKey("schedules-key", function(key) {
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
							var $data = $(data);
							var statusCode = $data.find("result").attr("status");
							if (statusCode == 200) {
								$("#statusCheck").hide();
								$("#username").text(username);
								$("#loggedIn").show();
							} else {
								logOut();
								$("#statusCheck").hide();
								$("#loginPrompt").show();
							}
						},
						error: function() {
							alert("An error occured while connecting to Schedules.\n\nTry again later, or, if that doesn't work, send an email to emails@coursesplus.tk.");
						}
					});
				});
			});			
		}
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
							cpal.storage.setKey("schedules-user", daltonid, function() {
								alert("Success! You've been signed in to Schedules.");
								window.location.reload();
							});
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