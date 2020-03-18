/*====================================================================================================
*							If this code works,
*					it was written by Mohamed Adem Ben Moussa.
*				If not, then it was written by Mohamed Mehdi Charni.
====================================================================================================*/
/* Prevent users from submitting a form by hitting Enter */
$(function()
{
	$(window).keydown(function(event)
	{
		if(event.keyCode == 13)
		{
			event.preventDefault();
			return false;
		}
	});
});
/*==================================================
				Menu
==================================================*/
/* Switch Between Menu Sections */
$(function()
{
	// When Clicking on Lights Button in Menu
	$("#lights-btn, #mobile-lights-btn").click(function()
	{
		// Display Lights Section
		DisplaySection("#lights", "Lights", "#lights-btn, #mobile-lights-btn");
	});

	// When Clicking on Groups Button in Menu
	$("#groups-btn, #mobile-groups-btn").click(function()
	
		{// Display Groups Section
		DisplaySection("#groups", "Groups", "#groups-btn, #mobile-groups-btn");
	});

	// When Clicking on Settings Button in Menu
	$("#settings-btn, #mobile-settings-btn").click(function()
	{
		// Display Settings Section
		DisplaySection("#settings", "Settings", "#settings-btn, #mobile-settings-btn");
	});

	// When Clicking on Support Button in Menu
	$("#support-btn, #mobile-support-btn").click(function()
	{
		// Display Support Section
		DisplaySection("#support", "Support", "#support-btn, #mobile-support-btn");
	});
});
/* Save Last Open Tab and Open it when Refreshing */
$(function()
{
	if (localStorage.getItem("LightWays_SECTION") == null){localStorage.setItem("LightWays_SECTION", "#lights-btn");}
		
	$("#lights-btn, #mobile-lights-btn").click(function(){localStorage.setItem("LightWays_SECTION", "#lights-btn");});
	$("#groups-btn, #mobile-groups-btn").click(function(){localStorage.setItem("LightWays_SECTION", "#groups-btn");});
	$("#settings-btn, #mobile-settings-btn").click(function(){localStorage.setItem("LightWays_SECTION", "#settings-btn");});
	$("#support-btn, #mobile-support-btn").click(function(){localStorage.setItem("LightWays_SECTION", "#support-btn");});

	$(localStorage.getItem("LightWays_SECTION")).click();
});
/* Mobile Menu */
$(function()
{
	// Show Mobile Menu
	$("#mobile-menu-open-btn").click(function()
	{
		$("#mobile-menu").slideDown(500);
	});
	// Hide Mobile Menu
	$("#mobile-menu-close-btn, #mobile-menu button").click(function()
	{
		$("#mobile-menu").slideUp(500);
	});
});
/*==================================================
				Sections
==================================================*/
/*=========================
		Lights
=========================*/
/* Load Floors into Floors Navigation */
$(window).on("load", function()
{
	LoadFloorsLightsSection();

	/* When Changing Floors Select */
	$("#lights-floors-navigation").change(function()
	{
		// Get Selected Option Value
		var floor = $("#lights-floors-navigation").val();
		// Empty The Rooms List
		$("#lights #lights-rooms-navigation").empty();
		// Remove Room Name if it is Displayed
		$("#lights #lights-room-name").html("");
		// Remove Devices Number if it is Displayed
		$("#lights #lights-room-devices-number").html("");
		// Load Rooms corresponding to the selected Floor
		LoadRoomsLightsSection(floor);
	});
});
/* Turn ON and OFF Devices */
$(function()
{
	$("#lights").on("click", "table#lights-room-devices tbody img", function()
	{
		var device = $(this);
		var id = device.attr("id");
		var status = device.attr("class");
		var image = device.attr("src");
		
		$.ajax
		({
			url: "../php/device_status.php",
			type: "POST",
			dataType: "json",
			data: {device: id, status: status}
		})
		.done(function(response)
		{
			if (response.result)
			{
				if (status == "ON")
				{
					// Change Status to OFF
					$(device).removeClass("ON");
					$(device).addClass("OFF");
					$(device).css("background-color", "var(--device-color)");
					// Change Icon
					image = image.replace("_ON", "_OFF");
				}
				else
				{
					// Change Status to ON
					$(device).removeClass("OFF");
					$(device).addClass("ON");
					// Change Icon
					image = image.replace("_OFF", "_ON");
					$(device).css("background-color", "#FFCC00")
				}

				$(device).attr("src", image);
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "An Error Occurred, Please Try Again !" });
		});
	});
});
/*=========================
		Groups
=========================*/
/* Load Groups into Groups List */
$(window).on("load", function()
{
	DisplayGroupsListGroupsSection();

	$("#groups-btn, #mobile-groups-btn").click(function()
	{
		DisplayGroupsListGroupsSection();
	});
});
/* Turn ON and OFF Group */
$(function()
{
	$("#groups-list").on("click", "article.group-details .control-group-button", function()
	{
		var parent = $(this).parent().parent().parent().parent();
		var group = parent.attr("id");
		var status;

		if($(this).is(":checked"))
		{
			status = "ON";
			// Turn ON Group Devices
			GroupStatus(group, status, true);
			// Change Text Color to Orange
			$(parent).find("h4").css("color", "var(--text-color)");
			// Add Box Shadow
			$(parent).addClass("uk-box-shadow-medium");
			// Change in Lights Section
			$("#lights #lights-room-groups button#"+group).removeClass("OFF");
			$("#lights #lights-room-groups button#"+group).addClass("ON");
			$("#lights #lights-room-groups button#"+group).css("background-color", $("#lights #lights-room-groups button#"+group).css("border-color"));
		}
		else if($(this).is(":not(:checked)"))
		{
			status = "OFF";
			// Turn OFF Group Devices
			GroupStatus(group, status, true);
			// Change Text Color to Blue
			$(parent).find("h4").css("color", "var(--secondary-color)");
			// Remove Box Shadow
			$(parent).removeClass("uk-box-shadow-medium");
			// Change in Lights Section
			$("#lights #lights-room-groups button#"+group).removeClass("ON");
			$("#lights #lights-room-groups button#"+group).addClass("OFF");
			$("#lights #lights-room-groups button#"+group).css("background-color", "var(--primary-color)");
		}
	});
});
/*=========================
		Settings
=========================*/
/* Load User's Setting */
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_THEME") == "DARK")
	{
		$("#setting-theme").attr("checked", "checked");
	}
	else
	{
		$("#setting-theme").removeAttr("checked");
	}

	var fname;
	var lname;
	var new_fname;
	var new_lname;

	$.ajax
	({
		url: "../php/user.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		if (response.length != 0)
		{
			fname = response.fname;
			lname = response.lname;
			$("#setting-fname").val(fname);
			$("#setting-lname").val(lname);
		}
		else
		{
			$.growl.error({ message: "Oops, There was an Error Loading Your Data!" });
		}
	})
	.fail(function()
	{
		$.growl.error({ message: "Oops, There was an Error Loading Your Data!" });
	});

	/* Cancel Settings Form Account */
	$("#setting-cancel-btn").click(function(e)
	{
		e.preventDefault();

		ResetSettingsAccountForm();
		$("#setting-fname").val(fname);
		$("#setting-lname").val(lname);
	});

	/* Update Settings Form Account */
	$("#setting-save-btn").click(function(e)
	{
		e.preventDefault();

		new_fname = $("#setting-fname").val();
		new_lname = $("#setting-lname").val();

		if (!new_fname)
		{
			$("#setting-fname").css("border-color", "#F0506E");
			$("#setting-fname-error").show();
		}
		else
		{
			$("#setting-fname").css("border-color", "var(--secondary-color)");
			$("#setting-fname-error").hide();
		}

		if (!new_lname)
		{
			$("#setting-lname").css("border-color", "#F0506E");
			$("#setting-lname-error").show();
		}
		else
		{
			$("#setting-lname").css("border-color", "var(--secondary-color)");
			$("#setting-lname-error").hide();
		}

		/* Update Name */
		if (new_fname && new_lname)
		{
			if ((fname != new_fname) || (lname != new_lname))
			{
				$.ajax
				({
					url: "../php/update_user.php",
					type: "POST",
					dataType: "json",
					data: {fname: new_fname, lname: new_lname},
				})
				.done(function(response)
				{
					ResetSettingsAccountForm();

					if (response.result)
					{
						$.growl.notice({ message: "Name has been Successfully Updated!" });
						$("#setting-fname").val(new_fname);
						$("#setting-lname").val(new_lname);
					}
					else
					{
						$.growl.error({ message: "Oops, There was an Error Updating Your Name !" });
						$("#setting-fname").val(fname);
						$("#setting-lname").val(lname);
					}
				})
				.fail(function()
				{
					$.growl.error({ message: "Oops, There was an Error Updating Your Name !" });
					ResetSettingsAccountForm();
					$("#setting-fname").val(fname);
					$("#setting-lname").val(lname);
				});
				
			}
		}

		var old_password = $("#setting-old-password").val();
		var new_password = $("#setting-new-password").val();
		var confirm_password = $("#setting-confirm-new-password").val();

		if ((old_password) || (new_password) || (confirm_password))
		{
			$.ajax
			({
				url: "../php/get_password.php",
				type: "POST",
				dataType: "json",
			})
			.done(function(response)
			{
				if (old_password != response.pw)
				{
					$("#setting-old-password").css("border-color", "#F0506E");
					$("#setting-old-password-error").show();
				}
				else
				{
					$("#setting-old-password").css("border-color", "var(--secondary-color)");
					$("#setting-old-password-error").hide();
				}

				if (!new_password)
				{
					$("#setting-new-password").css("border-color", "#F0506E");
					$("#setting-new-password-error").show();
				}
				else
				{
					$("#setting-new-password").css("border-color", "var(--secondary-color)");
					$("#setting-new-password-error").hide();
				}

				if (!confirm_password)
				{
					$("#setting-confirm-new-password").css("border-color", "#F0506E");
					$("#setting-confirm-new-password-error").show();
				}
				else
				{
					$("#setting-confirm-new-password").css("border-color", "var(--secondary-color)");
					$("#setting-confirm-new-password-error").hide();
				}

				/* Password Doesn't Match */
				if (new_password != confirm_password)
				{
					$("#setting-confirm-new-password").css("border-color", "#F0506E");
					$("#setting-confirm-new-password-error").show();
				}

				if (old_password && new_password && confirm_password && (new_password == confirm_password) && (old_password == response.pw))
				{
					if (old_password == new_password)
					{
						$.growl({ title: "Same Password", message: "Your Old Password Matches Your New Password !" });
					}
					else
					{
						$.ajax
						({
							url: "../php/change_password.php",
							type: "POST",
							dataType: "json",
							data: {password: new_password},
						})
						.done(function(response)
						{
							ResetSettingsAccountForm();

							if (response.result)
							{
								$.growl.notice({ message: "Password has been Successfully Changed !" });
								response.pw = "";
							}
							else
							{
								$.growl.error({ message: "Oops, There was an Error Changing Your Password !" });
							}
						})
						.fail(function()
						{
							$.growl.error({ message: "Oops, There was an Error Changing Your Password !" });
							ResetSettingsAccountForm();
						});
					}
				}
			});
		}
	});
});
/* Turn ON and OFF Dark Theme */
$(function()
{
	$("#setting-theme").click(function()
	{
		if($(this).is(":checked"))
		{
			localStorage.setItem("LightWays_THEME", "DARK");
			$(document.body).css("--primary-color", "#252729");
			$(document.body).css("--secondary-color", "#B7B2A8");
			$(document.body).css("--body-color", "#202223");
			$(document.body).css("--text-color", "#D6D3CD");
			$(document.body).css("--input-color", "#181A1B");
		}
		else
		{
			localStorage.setItem("LightWays_THEME", "LIGHT");
			$(document.body).css("--primary-color", "#D2D2EC");
			$(document.body).css("--secondary-color", "#A1A5BE");
			$(document.body).css("--body-color", "#E7E7E4");
			$(document.body).css("--text-color", "#333333");
			$(document.body).css("--input-color", "#FFFFFF");
		}
	});
});
/*==================================================
				Functions
==================================================*/
/* Hide All Sections Function */
function HideAllSections()
{
	$("#lights").hide();
	$("#groups").hide();
	$("#settings").hide();
	$("#support").hide();

	// Remove Active Class From the Selected Section
	$("#lights-btn, #mobile-lights-btn").removeClass("active");
	$("#groups-btn, #mobile-groups-btn").removeClass("active");
	$("#settings-btn, #mobile-settings-btn").removeClass("active");
	$("#support-btn, #mobile-support-btn").removeClass("active");
}
/* Display Section Function */
function DisplaySection(Section, Title, Button)
{
	// Hide All Sections
	HideAllSections();
	// Display Section Title
	$("#sections #section-title span").html(Title);
	// Display Selected Section
	$(Section).show();
	// Make Button Active
	$(Button).addClass("active");
}
/*==================================================
		Lights Section Functions
==================================================*/
/* Load Floors into Floors Navigation */
function LoadFloorsLightsSection()
{
	$("#lights-floors-navigation").empty();

	$.ajax
	({
		url: "../php/floors.php",
		type: "POST",
		dataType: "json"
	})
	.done(function(response)
	{
		var len = response.length;

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				$("#lights-floors-navigation").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
			}

			// Get Selected Option Value
			var floor = $("#lights-floors-navigation").val();
			// Empty The Rooms List
			$("#lights-rooms-navigation").empty();
			// Remove Room Name if it is Displayed
			$("#lights #lights-room-name").html("");
			// Remove Devices Number if it is Displayed
			$("#lights #lights-room-devices-number").html("");
			// Load Rooms corresponding to the selected Floor
			LoadRoomsLightsSection(floor);
		}
		else // There is no Floors
		{
			$("#lights table#lights-room-devices tbody").empty();
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='40' height='40'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
			$("#lights #lights-room-groups").empty();
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Floor !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#lights table#lights-room-devices tbody").empty();
		$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Floors !</th></tr>");
		$("#lights #lights-room-groups").empty();
		$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
	});
}
/* Load Rooms Related to a Floor Function */
function LoadRoomsLightsSection(floor)
{
	$("#lights-rooms-navigation").empty();

	$.ajax
	({
		url: "../php/rooms.php",
		type: "POST",
		dataType: "json",
		data: {floor: floor}
	})
	.done(function(response)
	{
		var len = response.length;

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				$("#lights-rooms-navigation").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
			}

			// Get Selected Option Value
			var room = $("#lights-rooms-navigation").val();
			// Empty The Devices Display Room
			$("#lights table#lights-room-devices tbody").empty();
			// Load Devices corresponding to the selected Room
			LoadDevicesLightsSection(room);
			// Load Groups corresponding to the selected Room
			setTimeout("LoadGroupsLightsSection("+room+")", 100);
		}
		else
		{
			$("#lights table#lights-room-devices tbody").empty();
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
			$("#lights #lights-room-groups").empty();
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Floor !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}

	})
	.fail(function()
	{
		$("#lights #lights-room-name").html(); // Remove Room Name if it is Displayed
		$("#lights #lights-room-devices-number").html(); // Remove Devices Number if it is Displayed
		$("#lights #lights-room table#lights-room-devices tbody").empty();
		$("#lights #lights-room table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Rooms !</th></tr>");
	});

	/* When Changing Rooms Select */
	$("#lights-rooms-navigation").change(function()
	{
		// Get Selected Option Value
		var room = $("#lights-rooms-navigation").val();
		// Empty The Rooms List
		$("#lights table#lights-room-devices tbody").empty();
		// Load Rooms corresponding to the selected Floor
		LoadDevicesLightsSection(room);
		// Load Groups corresponding to the selected Room
		setTimeout("LoadGroupsLightsSection("+room+")", 100);
	});
}
/* Load Devices Related to a Room Function */
function LoadDevicesLightsSection(room)
{
	$.ajax
	({
		url: "../php/devices.php",
		type: "POST",
		dataType: "json",
		data: {room: room}
	})
	.done(function(response)
	{
		// Display Room Name
		$("#lights #lights-room-name").html($("#lights #lights-rooms-navigation option[value='"+room+"']").text());

		var len = response.length;

		if (len != 0)
		{
			$("#lights table#lights-room-devices tbody").empty(); // Empty Devices

			// Display Number of Devices to 0
			$("#lights #lights-room-devices-number").html(len+" Devices");

			var width = response[0].width; // Get Room Width
			var height = response[0].height; // Get Room Height

			for (var line = 1; line <= height; line++)
			{
				$("#lights table#lights-room-devices tbody").append("<tr id='"+line+"' class='uk-animation-scale-down uk-text-center'></tr>");

				for (var column = 1; column <= width; column++)
				{
					$("#lights table#lights-room-devices tbody tr#"+line).append("<td id='"+line+"-"+column+"'><div></div></td>");
				}
			}

			for (var i = 0; i < len; i++)
			{
				var tooltip = "Type <span>"+response[i].type+"</span><br>Pin <span>"+response[i].pin+"</span><br>Card <span>"+response[i].card+"</span><br>Card IP <span>"+response[i].ip+"</span>";
				$("#lights table#lights-room-devices tbody td#"+response[i].lin+"-"+response[i].col).attr("class", "device");
				$("#lights table#lights-room-devices tbody td#"+response[i].lin+"-"+response[i].col+" div").html("<img id='"+response[i].id+"' class='"+response[i].status+"' src='../images/devices/"+response[i].type+"_"+response[i].status+".png' width='50' height='50' uk-tooltip='"+tooltip+"'>");
			}
		}
		else
		{
			$("#lights #lights-room-devices-number").html("0 Devices"); // Display Number of Devices to 0
			$("#lights table#lights-room-devices tbody").empty();
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='40' height='40'><br><br>No Devices Found in This Room !<br><small>Make Sure You Add Devices...</small></th></tr>");
		}
	})
	.fail(function()
	{
		$("#lights table#lights-room-devices tbody").empty();
		$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Devices !</th></tr>");
	});

	/* When Activating Full Screen */
	$("#fullscreen-btn-on").click(function()
	{
		$("#fullscreen-btn-on").hide();
		$("#lights #fullscreen").addClass("fullscreen");
		$("#fullscreen-btn-off").show();
		
		if (document.documentElement.requestFullscreen)
		{
			document.documentElement.requestFullscreen();
		}
		else if (document.documentElement.mozRequestFullScreen)
		{
			document.documentElement.mozRequestFullScreen();
		}
		else if (document.documentElement.webkitRequestFullscreen)
		{
			document.documentElement.webkitRequestFullscreen();
		}
		else if (document.documentElement.msRequestFullscreen)
		{
			document.documentElement.msRequestFullscreen();
		}

		screen.orientation.lock("landscape-primary");
	});

	$("#fullscreen-btn-off").click(function()
	{
		$("#fullscreen-btn-off").hide();
		$("#lights #fullscreen").removeClass("fullscreen");
		$("#fullscreen-btn-on").show();
		
		if (document.exitFullscreen)
		{
			document.exitFullscreen();
		}
		else if (document.webkitExitFullscreen)
		{
			document.webkitExitFullscreen();
		}
		else if (document.mozCancelFullScreen)
		{
			document.mozCancelFullScreen();
		}
		else if (document.msExitFullscreen)
		{
			document.msExitFullscreen();
		}

		screen.orientation.unlock();
	});
}
/* Load Groups Related to a Room Function */
function LoadGroupsLightsSection(room)
{
	$.ajax
	({
		url: "../php/room_groups.php",
		type: "POST",
		dataType: "json",
		data: {room: room}
	})
	.done(function(response)
	{
		var len = response.length;

		$("#lights table#lights-room-devices tbody img").css("border-color", "var(--text-color)");

		if (len != 0)
		{
			$("#lights #lights-room-groups").empty(); // Empty Groups

			var groups = [];
			var bgcolor;

			for (var i = 0; i < len; i++)
			{
				
				$("#lights table#lights-room-devices tbody img#"+response[i].device).css("border-color", response[i].color);

				if (!groups.includes(response[i].name))
				{
					
					groups.push(response[i].name);
					bgcolor = "var(--primary-color)";

					if (response[i].status == "ON")
					{
						bgcolor = response[i].color;
					}

					$("#lights #lights-room-groups").append("<button id='"+response[i].id+"' class='uk-button uk-width-small uk-animation-scale-down "+response[i].status+"' style='background-color: "+bgcolor+"; border-color: "+response[i].color+"'><span>"+response[i].name+"</span></button>");
				}
			}

			groups = [];
		}
		else
		{
			$("#lights #lights-room-groups").empty();
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Room !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#lights #lights-room-groups").empty();
		$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
	});

	$("#lights #lights-room-groups").off("click").on("click", "button", function()
	{
		var group = $(this);
		var id = group.attr("id");
		var status;

		if (group.hasClass("ON"))
		{
			status = "OFF";
		}
		else
		{
			status = "ON";
		}

		// Turn on or off the Light
		GroupStatus(id, status, false);

		if (status == "ON")
		{
			group.removeClass("ON");
			group.addClass("OFF");
			group.css("background-color", "var(--primary-color)");
			$("#groups #groups-list article#"+id+" .control-group-button").click();
		}
		else
		{
			group.removeClass("OFF");
			group.addClass("ON");
			group.css("background-color", group.css("border-color"));
			$("#groups #groups-list article#"+id+" .control-group-button").click();
		}
	});
}
/*==================================================
		Groups Section Functions
==================================================*/
/* Display Groups List in Groups Section */
function DisplayGroupsListGroupsSection()
{
	$.ajax
	({
		url: "../php/groups.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		// Empty The Group List
		$("#groups #groups-list").empty();

		var len = response.length;

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				var id = response[i].id; // Get Group ID
				var name = response[i].name; // Get Group Name
				var status = response[i].status; // Get Group Status
				var devices = response[i].devices; // Get Group Devices Number
				var checked = "checked";
				var shadow = "uk-box-shadow-medium";
				var bgcolor = "var(--text-color)";

				if (status == "OFF")
				{
					shadow = "";
					bgcolor = "var(--secondary-color)";
					checked = "";
				}

				// Display Group
				$("#groups #groups-list").append("<article id='"+id+"' class='uk-comment group-details uk-margin-small-top uk-animation-scale-down "+shadow+"'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right' uk-grid><div class='uk-width-expand'><h4 class='uk-comment-title uk-margin-remove' style='color: "+bgcolor+";'>"+name+"</h4><h6 class='uk-comment-meta uk-margin-remove-top'>"+devices+" Devices</h6></div><div class='uk-width-auto uk-text-right uk-margin-small-right'><label class='uk-switch'><input type='checkbox' class='control-group-button' "+checked+"><div class='uk-switch-slider'></div></label></div></header></article>");
			}
		}
		else
		{
			$("#groups #groups-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#groups #groups-list").empty();
		$("#groups #groups-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
	});
}
/* Change Group Status Function */
function GroupStatus(group, status, flag)
{
	if (status == "ON")
	{
		var opposite = "OFF";
	}
	else
	{
		var opposite = "ON";
	}

	if (flag)
	{
		// Turn on or off the Lights
		$.ajax
		({
			url: "../php/group_status.php",
			type: "POST",
			dataType: "json",
			data: {group: group, status: status}
		})
		.done(function(response)
		{
			var len = response.length;

			if (len != 0)
			{
				for (var i = 0; i < len; i++)
				{
					var device = $("#lights table#lights-room-devices img#"+response[i].id);

					if ($(device).attr("class") == opposite)
					{
						// Change Status to status
						$(device).removeClass(opposite);
						$(device).addClass(status);
						// Change Icon
						image = $(device).attr("src");
						image = image.replace("_"+opposite, "_"+status);
						$(device).attr("src", image);
					}

					if ($(device).attr("class") == "ON")
					{
						$(device).css("background-color", "#FFCC00");
					}
					else
					{
						$(device).css("background-color", "var(--device-color)");
					}
				}
			}
			else
			{
				$.growl({ title: "This Group Has no Devices.", message: "Make Sure You Add Devices!" });
			}
		})
		.fail(function()
		{
				$.growl.error({ message: "Failed to Change Group Status !" });
		});
	}
}
/*==================================================
		Settings Section Functions
==================================================*/
/* Reset Settings Form Account */
function ResetSettingsAccountForm()
{
	$("#setting-old-password").val("");
	$("#setting-new-password").val("");
	$("#setting-confirm-new-password").val("");

	$("#setting-fname").css("border-color", "var(--secondary-color)");
	$("#setting-lname").css("border-color", "var(--secondary-color)");
	$("#setting-old-password").css("border-color", "var(--secondary-color)");
	$("#setting-new-password").css("border-color", "var(--secondary-color)");
	$("#setting-confirm-new-password").css("border-color", "var(--secondary-color)");

	$("#setting-fname-error").hide();
	$("#setting-lname-error").hide();
	$("#setting-old-password-error").hide();
	$("#setting-new-password-error").hide();
	$("#setting-confirm-new-password-error").hide();
}