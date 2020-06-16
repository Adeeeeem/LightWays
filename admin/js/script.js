/*====================================================================================================
*							If this code works,
*					it was written by Mohamed Adem Ben Moussa.
*				If not, then it was written by Mohamed Mehdi Charni.
====================================================================================================*/
/* Refresh Website every 12 Hour for new Data */
$(document).ready(function()
{
	setInterval(function()
	{
		window.location.reload(true);
	}, 43200000);
});
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

	// When Clicking on Scenes Button in Menu
	$("#scenes-btn, #mobile-scenes-btn").click(function()
	
		{// Display Scenes Section
		DisplaySection("#scenes", "Scenes", "#scenes-btn, #mobile-scenes-btn");
	});

	// When Clicking on Statistics Button in Menu
	$("#statistics-btn, #mobile-statistics-btn").click(function()
	{
		// Display Statistics Section
		DisplaySection("#statistics", "Statistics", "#statistics-btn, #mobile-statistics-btn");
	});

	// When Clicking on Configuration Button in Menu
	$("#configuration-btn, #mobile-configuration-btn").click(function()
	{
		if (!$("#configuration-btn, #mobile-configuration-btn").parent().hasClass("uk-open"))
		{
			$("#configuration-btn, #mobile-configuration-btn").removeClass("active")
		}
	});

	// When Clicking on Cards Button in Menu
	$("#cards-btn, #mobile-cards-btn").click(function()
	{
		// Display Cards Section
		DisplaySection("#cards", "Cards", "#cards-btn, #mobile-cards-btn");
		$("#configuration-btn, #mobile-configuration-btn").addClass("active");
	});

	// When Clicking on Floors Button in Menu
	$("#floors-btn, #mobile-floors-btn").click(function()
	{
		// Display Floors Section
		DisplaySection("#floors", "Floors", "#floors-btn, #mobile-floors-btn");
		$("#configuration-btn, #mobile-configuration-btn").addClass("active");
	});

	// When Clicking on Rooms Button in Menu
	$("#rooms-btn, #mobile-rooms-btn").click(function()
	{
		// Display Rooms Section
		DisplaySection("#rooms", "Rooms", "#rooms-btn, #mobile-rooms-btn");
		$("#configuration-btn, #mobile-configuration-btn").addClass("active");
	});

	// When Clicking on Users Button in Menu
	$("#users-btn, #mobile-users-btn").click(function()
	{
		// Display Users Section
		DisplaySection("#users", "Users", "#users-btn, #mobile-users-btn");
		$("#configuration-btn, #mobile-configuration-btn").addClass("active");
	});

	// When Clicking on History Button in Menu
	$("#history-btn, #mobile-history-btn").click(function()
	{
		// Display History Section
		DisplaySection("#history", "History", "#history-btn, #mobile-history-btn");
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
	if (localStorage.getItem("LightWays_ADMIN_SECTION") == null){localStorage.setItem("LightWays_ADMIN_SECTION", "#lights-btn");}
		
	$("#lights-btn, #mobile-lights-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#lights-btn");});
	$("#groups-btn, #mobile-groups-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#groups-btn");});
	$("#scenes-btn, #mobile-scenes-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#scenes-btn");});
	$("#statistics-btn, #mobile-statistics-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#statistics-btn");});
	$("#cards-btn, #mobile-cards-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#cards-btn")});
	$("#floors-btn, #mobile-floors-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#floors-btn")});
	$("#rooms-btn, #mobile-rooms-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#rooms-btn")});
	$("#users-btn, #mobile-users-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#users-btn")});
	$("#history-btn, #mobile-history-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#history-btn");});
	$("#settings-btn, #mobile-settings-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#settings-btn");});
	$("#support-btn, #mobile-support-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#support-btn");});

	$(localStorage.getItem("LightWays_ADMIN_SECTION")).click();
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
	$("#mobile-menu-close-btn, #mobile-menu button, #mobile-menu div.uk-accordion-content button").click(function()
	{
		if ($(this).attr("id") != "mobile-configuration-btn")
		{
			$("#mobile-menu").slideUp(500);
		}
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
/* Load Data to Add Group Modal */
$(function()
{
	$("#groups #add-group-btn").click(function()
	{
		$.ajax
		({
			url: "../php/floors.php",
			type: "POST",
			dataType: "json",
		})
		.done(function(response)
		{
			var len = response.length;
			$("#modal-add-group #add-group-room table").empty();

			if (len != 0)
			{
				for (var i = 0; i < len; i++)
				{
					$("#modal-add-group #add-group-search-floor").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
				}

				// Get Selected Option Value
				var floor = $("#add-group-search-floor").val();
				// Empty The Rooms List
				$("#add-group-search-room").empty();
				// Load Rooms corresponding to the selected Floor
				LoadRoomsAddGroupsSection(floor);
			}
			else
			{
				$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
			}
		})
		.fail(function()
		{
			$("#modal-add-group #add-group-room table").empty();
			$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Floors !</th></tr>");
		});
	});

	$("#add-group-search-floor").change(function()
	{
		// Get Selected Option Value
		var floor = $("#add-group-search-floor").val();
		// Empty The Rooms List
		$("#add-group-search-room").empty();
		// Load Rooms corresponding to the selected Floor
		LoadRoomsAddGroupsSection(floor);
	});
});
/* Confirm Adding Group */
$(function()
{
	var SelectedDevices = []; // Array For Selected Devices
	var SelectedDevicesRoom = []; // Array For Selected Devices' Room
	var room;

	/* Mark the Selected Devices */
	$("#modal-add-group").off("click").on("click", "#add-group-room table img", function()
	{
		var device = $(this);
		var color = device.css("background-color");
		var id = device.attr("id");
		room = $("#add-group-search-room").val();
		
		// Check if Device Belongs to a Group
		$.ajax
		({
			url: "../php/which_group.php",
			type: "POST",
			dataType: "json",
			data: {device: id},
		})
		.done(function(response)
		{
			if (response.id == null)
			{
				// Rooms
				if (SelectedDevicesRoom.length == 0)
				{
					SelectedDevicesRoom.push(room);
				}
				else
				{
					if (!SelectedDevicesRoom.includes(room))
					{
						SelectedDevicesRoom.push(room);
					}
				}

				if (SelectedDevicesRoom.length > 1)
				{
					$.growl({ title: "Info", message: "Group's Devices Must Belong to the same Room !" });
				}
				else
				{
					var selected = device.attr("class");
					var image = device.attr("src");

					if (selected == "SELECTED") // If It's Already Selected
					{
						device.removeClass("SELECTED");
						device.css("background-color", "var(--device-color)");
						for (var i = 0; i < SelectedDevices.length; i++) // Loop Array Search for the Item to Delete
						{
							if (SelectedDevices[i] == id)
							{
								SelectedDevices.splice(i, 1); // Delete when Found
							}
						}
					}
					else
					{
						device.addClass("SELECTED");
						device.css("background-color", $("#add-group-color").val());
						// Add to Array
						SelectedDevices.unshift(id);
					}
				}

				var count = 0;

				// If There is no Selected Devices in Room, Remove Room from Array
				$("#modal-add-group #add-group-room table div.device img.SELECTED").each(function()
				{
					count++;
				});

				if (count == 0)
				{
					for (var i = 0; i < SelectedDevicesRoom.length; i++) // Loop Array Search for the Item to Delete
					{
						if (SelectedDevicesRoom[i] == $("#add-group-search-room").val())
						{
							SelectedDevicesRoom.splice(i, 1); // Delete when Found
						}
					}
				}
			}
			else
			{
				$.growl({ title: "Device Already in a Group", message: "This Device Belongs to <span style='color: "+color+";'>"+response.name+"</span> Group!" });
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Identify Device's Group !" });
		});
	});

	/* When Changing Color, Change Selected Devices Background */
	$("#add-group-color").change(function()
	{
		$("#modal-add-group #add-group-room table img.SELECTED").css("background-color", $("#add-group-color").val());
	});

	/* When Loading Between Rooms Re-Select The Already Selected Devices */
	$("#modal-add-group #add-group-search-floor, #modal-add-group #add-group-search-room").bind("DOMNodeInserted DOMSubtreeModified DOMNodeRemoved", function()
	{
		setTimeout(function()
		{
			for (var i = 0; i < SelectedDevices.length; i++)
			{
				var device = $("#modal-add-group #add-group-room table img#"+SelectedDevices[i]);
				device.addClass("SELECTED");
				device.css("background-color", $("#add-group-color").val());
			}
		}, 200);
	});

	/* When Cancelling or Closing, Reset Form */
	$("#modal-add-group button.uk-modal-close").click(function()
	{
		ResetAddGroupModal(); // Reset Modal
		SelectedDevices = []; // Clear Selected Devices Array
		SelectedDevicesRoom = []; // Clear Selected Devices Rooms
	});

	/* When Confirming */
	$("#add-group-confirm-btn").click(function()
	{
		var group = $("#add-group-name").val(); // Get Group Name

		if (!group)
		{
			$("#add-group-name").css("border-color", "#F0506E");
			$("#add-group-name-error").show();
		}
		else
		{
			if (SelectedDevicesRoom.length > 1) // If Selected Devices are from Different Rooms
			{
				$.growl.error({ message: "Group's Devices Must Belong to the same Room !" });
			}
			else
			{
				var color = $("#add-group-color").val(); // Get Group Color
				var SelectedDevicesJson = JSON.stringify(SelectedDevices); // Get Selected Devices

				if (SelectedDevicesRoom.length == 0)
				{
					SelectedDevicesRoom[0] = $("#add-group-search-room").val();
				}

				$.ajax
				({
					url: "../php/add_group.php",
					type: "POST",
					dataType: "json",
					data: {group: group, color: color, room: SelectedDevicesRoom[0], devices: SelectedDevicesJson}
				})
				.done(function(response)
				{
					var len = response.length;

					UIkit.modal("#modal-add-group").hide(); // Hide Modal
					ResetAddGroupModal(); // Reset Modal
					SelectedDevices = []; // Clear Selected Devices Array
					SelectedDevicesRoom = []; // Clear Selected Devices Rooms

					if (len != 0)
					{
						$.growl.notice({ message: "Group has been Successfully Added !" }); // Success Notification

						// Add Group Dynamically
						var id = response.id;
						var name = response.name;
						var color = response.color;
						var status = response.status;
						var devices = response.devices;
						var room = response.room;
						var bgcolor = "var(--secondary-color)";

						if($("#groups #groups-list").find("article").length == 0)
						{
							$("#groups #groups-list").empty();
						}

						// Add to Groups List in Groups Section
						$("#groups #groups-list").prepend("<article id='"+id+"' class='uk-comment group-details uk-margin-small-top uk-animation-scale-down'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right' uk-grid><div class='uk-width-expand'><h4 class='uk-comment-title uk-margin-remove' style='color: "+bgcolor+";'>"+name+"</h4><h6 class='uk-comment-meta uk-margin-remove-top'>"+devices+" <span class='translate' key='Devices'>Devices</span></h6></div><div class='uk-width-auto uk-text-right uk-margin-small-right'><label class='uk-switch'><input type='checkbox' class='control-group-button'><div class='uk-switch-slider'></div></label></div></header></article>");
						
						// Add to Groups List in Lights Section
						if ($("#lights-rooms-navigation").val() == room)
						{
							LoadGroupsLightsSection($("#lights-rooms-navigation").val());
						}
					}
					else
					{
						$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
					}
				})
				.fail(function()
				{
					UIkit.modal("#modal-add-group").hide(); // Hide Modal
					ResetAddGroupModal(); // Reset Modal
					SelectedDevices = []; // Clear Selected Devices Array
					SelectedDevicesRoom = []; // Clear Selected Devices Rooms
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				});
			}
		}
	});
});
/* Load Data to Edit Group Modal and Get Group Details */
$(function()
{
	var SelectedDevices = []; // Array For Group Devices
	var SelectedDevicesRoom = []; // Array For Selected Devices' Room
	var group; // Group ID
	var room; // Room ID

	/* Loading Group Details and Assign its Devices to Selected Devices Array */
	$("#groups #groups-list").on("click", "article.group-details div:not(.uk-width-auto.uk-text-right.uk-margin-small-right, .uk-switch-slider)", function()
	{
		group = $(this).closest("article").attr("id"); // Assign Group ID
		UIkit.modal("#modal-edit-group").toggle(); // Show Modal

		// Get Group Details
		$.ajax
		({
			url: "../php/group_details.php",
			type: "POST",
			dataType: "json",
			data: {group: group},
		})
		.done(function(response)
		{
			var len = response.length;

			if (len != 0)
			{
				var group_floor = response[0].floor; // Get Group Floor
				var group_room = response[0].room; // Get Group Room
				var group_name = response[0].name; // Get Group Name
				var group_color = response[0].color; // Get Group Color
				var device = response[0].devices // Get First Device

				$("#edit-group-name").val(group_name);
				$("#edit-group-color").val(group_color);

				// Get Group's Devices
				if (device != null)
				{
					for (var i = 0; i < len; i++)
					{
						SelectedDevices.push(""+response[i].devices+"");
					}
				}
				else
				{
					$.growl({ title: "This Group Has no Devices.", message: "Make Sure You Add Devices!" });
				}

				// Load Floors
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
							$("#edit-group-search-floor").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
						}

						$("#edit-group-search-floor").val(group_floor).prop("selected", true); // Set Floor Room Selected
						
						$.ajax
						({
							url: "../php/rooms.php",
							type: "POST",
							dataType: "json",
							data: {floor: group_floor}
						})
						.done(function(response)
						{
							var len = response.length;

							if (len != 0)
							{
								for (var i = 0; i < len; i++)
								{
									$("#edit-group-search-room").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
								}

								$("#edit-group-search-room").val(group_room).prop("selected", true); // Set Group Room Selected

								// Empty The Devices Display Room
								$("#modal-edit-group #edit-group-room table").empty();
								// Display The Selected Room's Devices in Group Edit Section
								DisplayDevicesEditGroupsSection(group_room);

								SelectedDevicesRoom.push(""+group_room+"");

								// Color Group's Devices
								setTimeout(function()
								{
									
									for (var i = 0; i < SelectedDevices.length; i++)
									{
										$("#modal-edit-group #edit-group-room table img#"+SelectedDevices[i]).addClass("SELECTED");
										$("#modal-edit-group #edit-group-room table img#"+SelectedDevices[i]).css("background-color", group_color);
									}
								}, 200);
							}
							else
							{
								$("#modal-edit-group #edit-group-room table").empty();
								$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
							}

						})
						.fail(function()
						{
							$("#modal-edit-group #edit-group-room table").empty();
							$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Rooms !</th></tr>");
						});

					}
					else
					{
						$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
					}
				})
				.fail(function()
				{
					$("#modal-edit-group #edit-group-room table").empty();
					$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Floors !</th></tr>");
				});
			}
			else
			{
				$.growl.error({ message: "Failed to Get Selected Group Details !" });
				ResetEditGroupModal();
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Get Selected Group Details !" });
			ResetEditGroupModal();
		});
	});

	/* Mark the Selected Devices */
	$("#modal-edit-group").off("click").on("click", "#edit-group-room table img", function()
	{
		var device = $(this);
		var id = device.attr("id");
		room = $("#edit-group-search-room").val();

		// Check if Device Belongs to a Group
		$.ajax
		({
			url: "../php/which_group.php",
			type: "POST",
			dataType: "json",
			data: {device: id},
		})
		.done(function(response)
		{
			if ( (response.id == null) || (response.id == group))
			{
				if (SelectedDevicesRoom.length == 0)
				{
					SelectedDevicesRoom.push(room);
				}
				else
				{
					if (!SelectedDevicesRoom.includes(room))
					{
						SelectedDevicesRoom.push(room);
					}
				}

				var selected = device.attr("class");
				var image = device.attr("src");

				if (selected == "SELECTED") // If It's Already Selected
				{
					device.removeClass("SELECTED");
					device.css("background-color", "var(--device-color)");
					for (var i = 0; i < SelectedDevices.length; i++) // Loop Array Search for the Item to Delete
					{
						if (SelectedDevices[i] == id)
						{
							SelectedDevices.splice(i, 1); // Delete when Found
						}
					}
				}
				else
				{
					device.addClass("SELECTED");
					device.css("background-color", $("#edit-group-color").val());
					// Add to Array
					SelectedDevices.unshift(id);
				}

				var count = 0;

				// If There is no Selected Devices in Room, Remove Room from Array
				$("#modal-edit-group #edit-group-room table div.device img.SELECTED").each(function()
				{
					count++;
				});

				if (count == 0)
				{
					for (var i = 0; i < SelectedDevicesRoom.length; i++) // Loop Array Search for the Item to Delete
					{
						if (SelectedDevicesRoom[i] == $("#edit-group-search-room").val())
						{
							SelectedDevicesRoom.splice(i, 1); // Delete when Found
						}
					}
				}

				if (SelectedDevicesRoom.length > 1)
				{
					$.growl({ title: "Info", message: "Group's Devices Must Belong to the same Room !" });
				}
			}
			else
			{
				$.growl({ title: "Device Already in a Group", message: "This Device Belongs to <span style='color: var(--orange-color);'>"+response.name+"</span> Group!" });
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Identify Device's Group !" });
		});
	});

	/* When Changing the Floor from Select in Edit Group Section, Return Rooms corresponding to the selected Floor */
	$("#edit-group-search-floor").change(function()
	{
		// Get Selected Option Value
		var floor = $("#edit-group-search-floor").val();
		// Empty The Rooms List
		$("#edit-group-search-room").empty();
		// Load Rooms corresponding to the selected Floor
		LoadRoomsEditGroupsSection(floor);

		setTimeout(function()
		{
			for (var i = 0; i < SelectedDevices.length; i++)
			{
				var device = $("#modal-edit-group #edit-group-room table img#"+SelectedDevices[i]);
				device.addClass("SELECTED");
				device.css("background-color", $("#edit-group-color").val());
			}
		}, 400);
	});

	/* When Changing the Room from Select in Edit Group Section, Return Devices corresponding to the selected Room */
	$("#edit-group-search-room").change(function()
	{
		// Get Selected Option Value
		var room = $("#edit-group-search-room").val();
		// Load Devices corresponding to the selected Room
		DisplayDevicesEditGroupsSection(room);

		setTimeout(function()
		{
			for (var i = 0; i < SelectedDevices.length; i++)
			{
				var device = $("#modal-edit-group #edit-group-room table img#"+SelectedDevices[i]);
				device.addClass("SELECTED");
				device.css("background-color", $("#edit-group-color").val());
			}
		}, 400);
	});

	/* When Changing Color, Change Selected Devices Background */
	$("#edit-group-color").change(function()
	{
		$("#modal-edit-group #edit-group-room table img.SELECTED").css("background-color", $("#edit-group-color").val());
	});

	/* When Cancelling or Closing, Reset Form */
	$("#modal-edit-group button.uk-modal-close").click(function()
	{
		ResetEditGroupModal(); // Reset Modal
		SelectedDevices = []; // Clear Selected Devices Array
		SelectedDevicesRoom = []; // Clear Selected Devices Rooms
	});

	/* When Confirming */
	$("#edit-group-confirm-btn").click(function()
	{
		var new_group_name = $("#edit-group-name").val(); // Get Group Name

		if (!new_group_name)
		{
			$("#edit-group-name").css("border-color", "#F0506E");
			$("#edit-group-name-error").show();
		}
		else
		{
			if (SelectedDevicesRoom.length > 1) // If Selected Devices are from Different Rooms
			{
				$.growl.error({ message: "Group's Devices Must Belong to the same Room !" });
			}
			else
			{
				var new_group_color = $("#edit-group-color").val(); // Get Group Color
				var SelectedDevicesJson = JSON.stringify(SelectedDevices); // Get Selected Devices

				if (SelectedDevicesRoom.length == 0)
				{
					SelectedDevicesRoom[0] = $("#edit-group-search-room").val();
				}

				// Test if Group Status is ON so Close
				if ($("#groups article#"+group+".group-details .control-group-button").is(":checked"))
				{
					$("#groups article#"+group+".group-details .control-group-button").click();
				}

				$.ajax
				({
					url: "../php/update_group.php",
					type: "POST",
					dataType: "json",
					data: {group: group, name: new_group_name, color: new_group_color, room: SelectedDevicesRoom[0], devices: SelectedDevicesJson}
				})
				.done(function(response)
				{
					if (response.result)
					{
						$.growl.notice({ message: "Group has been Successfully Updated !" }); // Success Notification
						$("#groups article#"+group+".group-details h6").html(SelectedDevices.length+" Devices");
						$("#lights #lights-room-groups button#"+group+" span").html(new_group_name);
						$("#lights #lights-room-groups button#"+group).css("border-color", new_group_color);
					}
					else
					{
						$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
					}

					UIkit.modal("#modal-edit-group").hide(); // Hide Modal
					ResetEditGroupModal(); // Reset Modal
					SelectedDevices = []; // Clear Selected Devices Array
					SelectedDevicesRoom = []; // Clear Selected Devices Rooms
				})
				.fail(function()
				{
					UIkit.modal("#modal-edit-group").hide(); // Hide Modal
					ResetEditGroupModal(); // Reset Modal
					SelectedDevices = []; // Clear Selected Devices Array
					SelectedDevicesRoom = []; // Clear Selected Devices Rooms
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				});
			}
		}
	});

	/* Delete Group */
	$("#delete-group-btn").click(function(e)
	{
		e.preventDefault();

		$("#modal-delete-group h2.uk-modal-title span").html($("#edit-group-name").val());
		$("#modal-delete-group h2.uk-modal-title span").css("color", $("#edit-group-color").val())
	});

	/* Confirm Delete Group */
	$("#delete-group-confirm-btn").click(function()
	{
		if ($("#groups article#"+group+".group-details .control-group-button").is(":checked"))
		{
			$("#groups article#"+group+".group-details .control-group-button").click();
		}

		$.ajax
		({
			url: "../php/delete_group.php",
			type: "POST",
			dataType: "json",
			data: {group: group},
		})
		.done(function(response)
		{
			UIkit.modal("#modal-delete-group").hide(); // Hide Delete Modal

			if (response.result)
			{
				$("#groups #groups-list article#"+group+".group-details").remove();
				UIkit.modal("#modal-edit-group").hide(); // Hide Edit Modal
				$.growl.notice({ message: "Group has been Successfully Deleted!" }); // Success Notification
				ResetEditGroupModal(); // Reset Modal
				SelectedDevices = []; // Clear Selected Devices Array
				SelectedDevicesRoom = []; // Clear Selected Devices Rooms
				LoadGroupsLightsSection($("#lights-rooms-navigation").val());

				if ($("#groups #groups-list").find("article").length == 0)
				{
					$("#groups #groups-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
				}
			}
			else
			{
				$.growl.error({ message: "Failed to Delete <span style='color: "+$("#edit-group-color").val()+"'>"+$("#edit-group-name").val()+"</span> Group, Please Try Again !" });
			}
		})
		.fail(function()
		{
			UIkit.modal("#modal-delete-group").hide(); // Hide Modal
			$.growl.error({ message: "Failed to Delete <span style='color: "+$("#edit-group-color").val()+"'>"+$("#edit-group-name").val()+"</span> Group, Please Try Again !" });
		});
	});
});
/*=========================
		Scenes
=========================*/
/* Load Scenes into Scenes List */
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_ADMIN_SECTION") == "#scenes-btn")
	{
		DisplayScenesList();
	}

	$("#scenes-btn, #mobile-scenes-btn").click(function()
	{
		DisplayScenesList();
	});
});
/* Enable and Disable Scene */
$(function()
{
	$("#scenes-list").on("click", "article.scene-details .control-group-button", function()
	{
		var parent = $(this).parent().parent().parent().parent();
		var scene = parent.attr("id");
		var status;

		if($(this).is(":checked"))
		{
			status = "ON";
			// Change Text Color to Orange
			$(parent).find("h4").css("color", "var(--text-color)");
			// Add Box Shadow
			$(parent).addClass("uk-box-shadow-medium");
		}
		else if($(this).is(":not(:checked)"))
		{
			status = "OFF";
			// Change Text Color to Blue
			$(parent).find("h4").css("color", "var(--secondary-color)");
			// Remove Box Shadow
			$(parent).removeClass("uk-box-shadow-medium");
		}

		$.ajax
		({
			url: "../php/scene_status.php",
			type: "POST",
			dataType: "json",
			data: {scene: scene, status: status}
		})
		.done(function(response)
		{
			if (!response.result)
			{
				$.growl.error({ message: "Failed to Change Scene Status !" });
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Change Scene Status !" });
		});
	});
});
/* Load Data to Add Scene Modal */
$(function()
{
	$("#scenes #add-scene-btn").click(function()
	{
		$.ajax
		({
			url: "../php/floors.php",
			type: "POST",
			dataType: "json",
		})
		.done(function(response)
		{
			var len = response.length;
			$("#modal-add-scene #add-scene-room table").empty();

			if (len != 0)
			{
				for (var i = 0; i < len; i++)
				{
					$("#modal-add-scene #add-scene-search-floor").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
				}

				// Get Selected Option Value
				var floor = $("#add-scene-search-floor").val();
				// Empty The Rooms List
				$("#add-scene-search-room").empty();
				// Load Rooms corresponding to the selected Floor
				LoadRoomsAddSceneSection(floor);
			}
			else
			{
				$("#modal-add-scene #add-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
			}
		})
		.fail(function()
		{
			$("#modal-add-scene #add-scene-room table").empty();
			$("#modal-add-scene #add-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Floors !</th></tr>");
		});
	});

	$("#add-scene-search-floor").change(function()
	{
		// Get Selected Option Value
		var floor = $("#add-scene-search-floor").val();
		// Empty The Rooms List
		$("#add-scene-search-room").empty();
		// Load Rooms corresponding to the selected Floor
		LoadRoomsAddSceneSection(floor);
	});
});
/* Confirm Adding Scene */
$(function()
{
	var SelectedDevices = [];
	var SelectedGroups = [];

	// Select Days
	$("#modal-add-scene div.add-scene-days-work span").click(function()
	{
		if ($(this).hasClass("SELECTED"))
		{
			$(this).removeClass("SELECTED");
		}
		else
		{
			$(this).addClass("SELECTED");
		}
	});

	// Select Device
	$("#modal-add-scene #add-scene-room").off("click").on("click", "img", function()
	{
		if ($(this).hasClass("SELECTED")) // If It's Already Selected
		{
			$(this).removeClass("SELECTED");
			$(this).css("background-color", "var(--device-color)");

			for (var i = SelectedDevices.length - 1; i >= 0; i--)
			{
				if ( SelectedDevices[i] == $(this).attr("id") )
				{
					SelectedDevices.splice(i, 1);
					break;
				}
			}
		}
		else
		{
			$(this).addClass("SELECTED");
			$(this).css("background-color", "#5CB85C");

			SelectedDevices.push($(this).attr("id"));
		}
	});

	// Select Group
	$("#modal-add-scene #add-scene-group").off("click").on("click", "button", function(e)
	{
		e.preventDefault();
		var group = $(this).attr("id");

		if ($(this).hasClass("SELECTED"))
		{
			$(this).removeClass("SELECTED");
			$(this).css("background-color", "var(--primary-color)");

			// Add Group to Array
			for (var i = SelectedGroups.length - 1; i >= 0; i--)
			{
				if ( SelectedGroups[i] == group )
				{
					SelectedGroups.splice(i, 1);
					break;
				}
			}

			$("#modal-add-scene #add-scene-room img.G"+group).each(function (index, element)
			{
				if ($(element).hasClass("SELECTED"))
				{
					$(element).css("background-color", "var(--device-color)");
					$(element).removeClass("SELECTED");

					for (var i = SelectedDevices.length - 1; i >= 0; i--)
					{
						if ( SelectedDevices[i] == $(element).attr("id") )
						{
							SelectedDevices.splice(i, 1);
							break;
						}
					}
				}
			});
		}
		else
		{
			$(this).addClass("SELECTED");
			$(this).css("background-color", $(this).css("border-color"));

			SelectedGroups.push(group); // Delete Group From Array

			$("#modal-add-scene #add-scene-room img.G"+group).each(function (index, element)
			{
				if (!$(element).hasClass("SELECTED"))
				{
					SelectedDevices.push($(element).attr("id"));
					$(element).addClass("SELECTED");
					$(element).css("background-color", "#5CB85C");
				}
			});
		}
	});

	/* When Loading Between Rooms Re-Select The Already Selected Devices */
	$("#modal-add-scene #add-scene-search-floor, #modal-add-scene #add-scene-search-room").change(function()
	{
		setTimeout(function()
		{
			for (var i = 0; i < SelectedGroups.length; i++)
			{
				var group_btn = $("#modal-add-scene #add-scene-group button#"+SelectedGroups[i]);
				group_btn.addClass("SELECTED");
				group_btn.css("background-color", $(group_btn).css("border-color"));
			}

			for (var i = 0; i < SelectedDevices.length; i++)
			{
				var device = $("#modal-add-scene #add-scene-room table img#"+SelectedDevices[i]);
				device.addClass("SELECTED");
				device.css("background-color", "#5CB85C");
			}
		}, 400);
	});

	/* When Cancelling or Closing, Reset Form */
	$("#modal-add-scene button.uk-modal-close").click(function()
	{
		ResetAddSceneModal(); // Reset Modal
		SelectedDevices = []; // Clear Selected Devices Array
		SelectedGroups = []; // Clear Selected Groups Array
	});

	/* When Confirming */
	$("#add-scene-confirm-btn").click(function()
	{
		var scene = $("#add-scene-name").val(); // Get Scene Name
		var time_start = $("#add-scene-time-start").val(); // Get Scene Time Start
		var time_end = $("#add-scene-time-end").val(); // Get Scene Time End
		var working_days = "";

		$("#modal-add-scene div.add-scene-days-work span.SELECTED").each(function()
		{
			working_days += $(this).attr("id");
		});

		if (!scene)
		{
			$("#add-scene-name").css("border-color", "#F0506E");
			$("#add-scene-name-error").show();
		}
		else
		{
			$("#add-scene-name").css("border-color", "var(--secondary-color)");
			$("#add-scene-name-error").hide();
		}

		if (!time_start)
		{
			$("#add-scene-time-start").css("border-color", "#F0506E");
			$("#add-scene-time-start-error").show();
		}
		else
		{
			$("#add-scene-time-start").css("border-color", "var(--secondary-color)");
			$("#add-scene-time-start-error").hide();
		}

		if (!time_end)
		{
			$("#add-scene-time-end").css("border-color", "#F0506E");
			$("#add-scene-time-end-error").show();
		}
		else
		{
			$("#add-scene-time-end").css("border-color", "var(--secondary-color)");
			$("#add-scene-time-end-error").hide();
		}

		if (working_days == "")
		{
			$("#add-scene-days-work-error").show(); // Show Error
		}
		else
		{
			$("#add-scene-days-work-error").hide();
		}

		if (scene && time_start && time_end && working_days != "")
		{
			if (time_start.toString() > time_end.toString())
			{
				var x = time_start;
				time_start = time_end;
				time_end = x;
			}

			var SelectedDevicesJson = JSON.stringify(SelectedDevices); // Get Selected Devices

			$.ajax
			({
				url: "../php/add_scene.php",
				type: "POST",
				dataType: "json",
				data: {scene: scene, time_start: time_start, time_end: time_end, working_days: working_days, devices: SelectedDevicesJson}
			})
			.done(function(response)
			{
				var len = response.length;

				UIkit.modal("#modal-add-scene").hide(); // Hide Modal
				ResetAddSceneModal(); // Reset Modal
				SelectedDevices = []; // Clear Selected Devices Array
				SelectedGroups = []; // Clear Selected Groups Array

				if (len != 0)
				{
					$.growl.notice({ message: "Scene has been Successfully Added !" }); // Success Notification

					// Add Group Dynamically
					var id = response.id;
					var name = response.name;
					var time = response.time_start.slice(0,5) + " - " + response.time_end.slice(0,5);// Get Scene Working Time
					var days = response.days;
					var devices = response.devices;
					var shadow = "uk-box-shadow-medium";
					var bgcolor = "var(--text-color)";
					var days_routine = "";

					// Which days the scenes working on
					if (days.includes("1")) { days_routine += "<span class='working'>S</span> "; } else { days_routine += "S "; }
					if (days.includes("2")) { days_routine += "<span class='working'>M</span> "; } else { days_routine += "M "; }
					if (days.includes("3")) { days_routine += "<span class='working'>T</span> "; } else { days_routine += "T "; }
					if (days.includes("4")) { days_routine += "<span class='working'>W</span> "; } else { days_routine += "W "; }
					if (days.includes("5")) { days_routine += "<span class='working'>T</span> "; } else { days_routine += "T "; }
					if (days.includes("6")) { days_routine += "<span class='working'>F</span> "; } else { days_routine += "F "; }
					if (days.includes("7")) { days_routine += "<span class='working'>S</span>"; } else { days_routine += "S"; }

					if($("#scenes #scenes-list").find("article").length == 0)
					{
						$("#scenes #scenes-list").empty();
					}

					// Add to Scenes List in Scenes Section
					$("#scenes #scenes-list").prepend("<article id='"+id+"' class='uk-comment scene-details uk-margin-small-top uk-animation-scale-down "+shadow+"'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right' uk-grid><div class='uk-width-expand'><h4 class='uk-comment-title uk-margin-remove' style='color: "+bgcolor+";'>"+name+"</h4><div uk-grid><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top'>"+time+"</h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top uk-text-center'><div class='devices'>"+devices+" Devices</div></h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top uk-text-right'><div class='days'>"+days_routine+"</div></h6></div></div></div><div class='uk-width-auto uk-text-right uk-margin-small-right'><label class='uk-switch'><input type='checkbox' class='control-group-button' checked><div class='uk-switch-slider'></div></label></div></header></article>");console.log("ok")
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}
			})
			.fail(function()
			{
				UIkit.modal("#modal-add-scene").hide(); // Hide Modal
				ResetAddSceneModal(); // Reset Modal
				SelectedDevices = []; // Clear Selected Devices Array
				SelectedGroups = []; // Clear Selected Groups Array
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
			});
		}
	});
});
/* Load Data to Edit Scene Modal and Get Scene Details */
$(function()
{
	var SelectedDevices = [];
	var SelectedGroups = [];
	var scene;

	/* Loading Scene Details and Assign its Devices to Selected Devices Array */
	$("#scenes #scenes-list").on("click", "article.scene-details div:not(.uk-width-auto.uk-text-right.uk-margin-small-right, .uk-switch-slider)", function(e)
	{
		e.stopPropagation();

		scene = $(this).closest("article").attr("id"); // Assign Scene ID
		UIkit.modal("#modal-edit-scene").toggle(); // Show Modal

		// Get Scene Details
		$.ajax
		({
			url: "../php/scene_details.php",
			type: "POST",
			dataType: "json",
			data: {scene: scene},
		})
		.done(function(response)
		{
			var len = response.length;

			if (len != 0)
			{
				var name = response[0].name; // Get Scene Name
				var start_time = response[0].start_time.slice(0, -3); // Get Scene Start Time
				var end_time = response[0].end_time.slice(0, -3); // Get Scene End Time
				var days = response[0].days; // Get Scene Working Days
				var device = response[0].devices // Get First Device

				$("#edit-scene-name").val(name);
				$("#edit-scene-time-start").val(start_time);
				$("#edit-scene-time-end").val(end_time);

				for(var i = 0; i < days.length; i++)
					$("#modal-edit-scene div.edit-scene-days-work span#"+days.charAt(i)).addClass("SELECTED");

				// Get Scene's Devices
				if (device != null)
				{
					for (var i = 0; i < len; i++)
					{
						SelectedDevices.push(""+response[i].devices+"");
					}
				}
				else
				{
					$.growl({ title: "This Scene Has no Devices.", message: "Make Sure You Add Devices!" });
				}

				// Load Floors
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
							$("#edit-scene-search-floor").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");

						// Load Rooms
						LoadRoomsEditSceneSection($("#edit-scene-search-floor").val());

						// Color Scene's Devices
						setTimeout(function()
						{
							for (var i = 0; i < SelectedDevices.length; i++)
							{
								$("#modal-edit-scene #edit-scene-room table img#"+SelectedDevices[i]).addClass("SELECTED");
								$("#modal-edit-scene #edit-scene-room table img#"+SelectedDevices[i]).css("background-color", "#5CB85C");
							}
						}, 400);
					}
					else
					{
						$("#modal-edit-scene #edit-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
					}
				})
				.fail(function()
				{
					$("#modal-edit-scene #edit-scene-room table").empty();
					$("#modal-edit-scene #edit-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Floors !</th></tr>");
				});
			}
			else
			{
				$.growl.error({ message: "Failed to Get Selected Scene Details !" });
				ResetEditSceneModal(); // Reset Modal
				SelectedDevices = []; // Clear Selected Devices Array
				SelectedGroups = [];
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Get Selected Scene Details !" });
			ResetEditSceneModal(); // Reset Modal
			SelectedDevices = []; // Clear Selected Devices Array
			SelectedGroups = [];
		});
	});

	/* Mark the Selected Devices */
	$("#modal-edit-scene").off("click").on("click", "#edit-scene-room table img", function()
	{
		var device = $(this);
		var id = device.attr("id");

		if (device.hasClass("SELECTED")) // If It's Already Selected
		{
			device.removeClass("SELECTED");
			device.css("background-color", "var(--device-color)");

			for (var i = 0; i < SelectedDevices.length; i++) // Loop Array Search for the Item to Delete
			{
				if (SelectedDevices[i] == id)
				{
					SelectedDevices.splice(i, 1); // Delete when Found
				}
			}
		}
		else
		{
			device.addClass("SELECTED");
			device.css("background-color", "#5CB85C");
			// Add to Array
			SelectedDevices.unshift(id);
		}
	});

	/* When Changing the Floor from Select in Edit Group Section, Return Rooms corresponding to the selected Floor */
	$("#edit-scene-search-floor").change(function()
	{
		// Get Selected Option Value
		var floor = $("#edit-scene-search-floor").val();
		// Empty The Rooms List
		$("#edit-scene-search-room").empty();
		// Load Rooms corresponding to the selected Floor
		LoadRoomsEditSceneSection(floor);

		// Color Scene's Devices
		setTimeout(function()
		{
			for (var i = 0; i < SelectedDevices.length; i++)
			{
				$("#modal-edit-scene #edit-scene-room table img#"+SelectedDevices[i]).addClass("SELECTED");
				$("#modal-edit-scene #edit-scene-room table img#"+SelectedDevices[i]).css("background-color", "#5CB85C");
			}
		}, 400);
	});

	/* When Changing the Room from Select in Edit Group Section, Return Devices corresponding to the selected Room */
	$("#edit-scene-search-room").change(function()
	{
		// Get Selected Option Value
		var room = $("#edit-scene-search-room").val();
		// Load Devices corresponding to the selected Room
		DisplayDevicesEditSceneSection(room);

		// Color Scene's Devices
		setTimeout(function()
		{
			for (var i = 0; i < SelectedDevices.length; i++)
			{
				$("#modal-edit-scene #edit-scene-room table img#"+SelectedDevices[i]).addClass("SELECTED");
				$("#modal-edit-scene #edit-scene-room table img#"+SelectedDevices[i]).css("background-color", "#5CB85C");
			}
		}, 400);
	});

	/* When Cancelling or Closing, Reset Form */
	$("#modal-edit-scene button.uk-modal-close").click(function()
	{
		ResetEditSceneModal(); // Reset Modal
		SelectedDevices = []; // Clear Selected Devices Array
		SelectedGroups = [];
	});

	// Select Days
	$("#modal-edit-scene div.edit-scene-days-work span").click(function()
	{
		if ($(this).hasClass("SELECTED"))
		{
			$(this).removeClass("SELECTED");
		}
		else
		{
			$(this).addClass("SELECTED");
		}
	});

	// Select Group
	$("#modal-edit-scene #edit-scene-group").off("click").on("click", "button", function(e)
	{
		e.preventDefault();
		var group = $(this).attr("id");

		if ($(this).hasClass("SELECTED"))
		{
			$(this).removeClass("SELECTED");
			$(this).css("background-color", "var(--primary-color)");

			// Add Group to Array
			for (var i = SelectedGroups.length - 1; i >= 0; i--)
			{
				if ( SelectedGroups[i] == group )
				{
					SelectedGroups.splice(i, 1);
					break;
				}
			}

			$("#modal-edit-scene #edit-scene-room img.G"+group).each(function (index, element)
			{
				if ($(element).hasClass("SELECTED"))
				{
					$(element).css("background-color", "var(--device-color)");
					$(element).removeClass("SELECTED");

					for (var i = SelectedDevices.length - 1; i >= 0; i--)
					{
						if ( SelectedDevices[i] == $(element).attr("id") )
						{
							SelectedDevices.splice(i, 1);
							break;
						}
					}
				}
			});
		}
		else
		{
			$(this).addClass("SELECTED");
			$(this).css("background-color", $(this).css("border-color"));

			SelectedGroups.push(group); // Delete Group From Array

			$("#modal-edit-scene #edit-scene-room img.G"+group).each(function (index, element)
			{
				if (!$(element).hasClass("SELECTED"))
				{
					SelectedDevices.push($(element).attr("id"));
					$(element).addClass("SELECTED");
					$(element).css("background-color", "#5CB85C");
				}
			});
		}
	});

	/* When Confirming */
	$("#edit-scene-confirm-btn").click(function()
	{
		var scene_name = $("#edit-scene-name").val(); // Get Scene Name
		var time_start = $("#edit-scene-time-start").val(); // Get Scene Time Start
		var time_end = $("#edit-scene-time-end").val(); // Get Scene Time End
		var working_days = "";

		$("#modal-edit-scene div.edit-scene-days-work span.SELECTED").each(function()
		{
			working_days += $(this).attr("id");
		});

		if (!scene_name)
		{
			$("#edit-scene-name").css("border-color", "#F0506E");
			$("#edit-scene-name-error").show();
		}
		else
		{
			$("#edit-scene-name").css("border-color", "var(--secondary-color)");
			$("#edit-scene-name-error").hide();
		}

		if (!time_start)
		{
			$("#edit-scene-time-start").css("border-color", "#F0506E");
			$("#edit-scene-time-start-error").show();
		}
		else
		{
			$("#edit-scene-time-start").css("border-color", "var(--secondary-color)");
			$("#edit-scene-time-start-error").hide();
		}

		if (!time_end)
		{
			$("#edit-scene-time-end").css("border-color", "#F0506E");
			$("#edit-scene-time-end-error").show();
		}
		else
		{
			$("#edit-scene-time-end").css("border-color", "var(--secondary-color)");
			$("#edit-scene-time-end-error").hide();
		}

		if (working_days == "")
		{
			$("#edit-scene-days-work-error").show(); // Show Error
		}
		else
		{
			$("#edit-scene-days-work-error").hide();
		}

		if (scene_name && time_start && time_end && working_days != "")
		{
			if (time_start.toString() > time_end.toString())
			{
				var x = time_start;
				time_start = time_end;
				time_end = x;
			}

			var SelectedDevicesJson = JSON.stringify(SelectedDevices); // Get Selected Devices

			$.ajax
			({
				url: "../php/update_scene.php",
				type: "POST",
				dataType: "json",
				data: {scene: scene, name: scene_name, time_start: time_start, time_end: time_end, working_days: working_days, devices: SelectedDevicesJson}
			})
			.done(function(response)
			{
				if (response.result)
				{
					$.growl.notice({ message: "Scene has been Successfully Updated !" }); // Success Notification
					$("#scenes article#"+scene+".scene-details h4.uk-comment-title").html(scene_name);
					$("#scenes article#"+scene+".scene-details div.uk-width-1-3.uk-first-column h6.uk-comment-meta").html(time_start+" - "+time_end);
					$("#scenes article#"+scene+".scene-details h6.uk-comment-meta div.devices").html(SelectedDevices.length+" Devices");

					var days_routine = "";

					if (working_days.includes("1")) { days_routine += "<span class='working'>S</span> "; } else { days_routine += "S "; }
					if (working_days.includes("2")) { days_routine += "<span class='working'>M</span> "; } else { days_routine += "M "; }
					if (working_days.includes("3")) { days_routine += "<span class='working'>T</span> "; } else { days_routine += "T "; }
					if (working_days.includes("4")) { days_routine += "<span class='working'>W</span> "; } else { days_routine += "W "; }
					if (working_days.includes("5")) { days_routine += "<span class='working'>T</span> "; } else { days_routine += "T "; }
					if (working_days.includes("6")) { days_routine += "<span class='working'>F</span> "; } else { days_routine += "F "; }
					if (working_days.includes("7")) { days_routine += "<span class='working'>S</span>"; } else { days_routine += "S"; }

					$("#scenes article#"+scene+".scene-details div.days").html(days_routine);
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}

				UIkit.modal("#modal-edit-scene").hide(); // Hide Modal
				ResetEditSceneModal(); // Reset Modal
				SelectedDevices = []; // Clear Selected Devices Array
				SelectedGroups = []; // Clear Selected Groups Array
			})
			.fail(function()
			{
				UIkit.modal("#modal-edit-scene").hide(); // Hide Modal
				ResetEditSceneModal(); // Reset Modal
				SelectedDevices = []; // Clear Selected Devices Array
				SelectedGroups = []; // Clear Selected Groups Array
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
			});
		}
	});

	/* Delete Scene */
	$("#delete-scene-btn").click(function(e)
	{
		e.preventDefault();

		$("#modal-delete-scene h2.uk-modal-title span").html($("#edit-scene-name").val());
		$("#modal-delete-scene h2.uk-modal-title span").css("color", "var(--blue-color)");
	});

	/* Confirm Delete Scene */
	$("#delete-scene-confirm-btn").click(function()
	{
		$.ajax
		({
			url: "../php/delete_scene.php",
			type: "POST",
			dataType: "json",
			data: {scene: scene},
		})
		.done(function(response)
		{
			if (response.result)
			{
				$("#scenes #scenes-list article#"+scene+".scene-details").remove();
				UIkit.modal("#modal-edit-scene").hide(); // Hide Edit Modal
				UIkit.modal("#modal-delete-scene").hide(); // Hide Modal
				$.growl.notice({ message: "Scene has been Successfully Deleted!" }); // Success Notification
				ResetEditSceneModal(); // Reset Modal
				SelectedDevices = []; // Clear Selected Devices Array
				SelectedGroups = [];

				if ($("#scenes #scenes-list").find("article").length == 0)
				{
					$("#scenes #scenes-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Scenes Found !<br><small>Make Sure You Add Scenes...</small></th></tr></table>");
				}
			}
			else
			{
				$.growl.error({ message: "Failed to Delete <span style='color: var(--blue-color);'>"+$("#edit-scene-name").val()+"</span> Scene, Please Try Again !" });
			}
		})
		.fail(function()
		{
			UIkit.modal("#modal-delete-scene").hide(); // Hide Modal
			$.growl.error({ message: "Failed to Delete <span style='color: var(--blue-color);'>"+$("#edit-scene-name").val()+"</span> Scene, Please Try Again !" });
		});
	});
});
/*=========================
		Statistics
=========================*/
var chartInstance = null;
var chartInstance_bar = null;
/* First Chart */
var chart = document.getElementById("chart").getContext("2d"),
gradient = chart.createLinearGradient(0, 0, 0, 450);
gradient.addColorStop(0, "rgba(6, 133, 213, 0.5)");
gradient.addColorStop(0.5, "rgba(6, 133, 213, 0.25)");
gradient.addColorStop(1, "rgba(6, 133, 213, 0)");
/* Second Chart */
var chart_bar = document.getElementById("chart_bar").getContext("2d"),
gradient_bar = chart_bar.createLinearGradient(0, 0, 0, 450);
gradient_bar.addColorStop(0, "rgba(255, 162, 0, 0.5)");
gradient_bar.addColorStop(0.5, "rgba(255, 162, 0, 0.25)");
gradient_bar.addColorStop(1, "rgba(255, 162, 0, 0)");
Chart.defaults.global.defaultFontFamily = "Lato";
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_ADMIN_SECTION") == "#statistics-btn")
	{
		$("#statistics #stats-table tbody").empty();
		LoadWeeklyStats();
	}

	$("#statistics-btn, #mobile-statistics-btn, #statistics #stats-menu p#week").click(function()
	{
		$("#statistics #stats-menu p#month").removeClass("active");
		$("#statistics #stats-menu p#year").removeClass("active");
		$("#statistics #stats-menu p#week").addClass("active");

		$("#statistics #chart-title").html("Weekly Electricity Usage kWh");

		$("#statistics #today-usage").html(0);
		$("#statistics #week-usage").html(0);
		$("#statistics #today-price").html(0);
		$("#statistics #week-price").html(0);

		$("#statistics #usage-title").html("Week Usage");
		$("#statistics #price-title").html("Week Consumption Cost");

		$("#statistics #dwm").html("Day");
		$("#statistics #stats-table tbody").empty();

		LoadWeeklyStats();
	});

	$("#statistics #stats-menu p#month").click(function()
	{
		$("#statistics #stats-menu p#week").removeClass("active");
		$("#statistics #stats-menu p#year").removeClass("active");
		$("#statistics #stats-menu p#month").addClass("active");

		$("#statistics #chart-title").html("Monthly Electricity Usage kWh");

		$("#statistics #week-usage").html(0);
		$("#statistics #week-price").html(0);

		$("#statistics #usage-title").html("Month Usage");
		$("#statistics #price-title").html("Month Consumption Cost");

		$("#statistics #dwm").html("Week");
		$("#statistics #stats-table tbody").empty();

		LoadMonthlyStats();
	});

	$("#statistics #stats-menu p#year").click(function()
	{
		$("#statistics #stats-menu p#week").removeClass("active");
		$("#statistics #stats-menu p#month").removeClass("active");
		$("#statistics #stats-menu p#year").addClass("active");

		$("#statistics #chart-title").html("Yearly Electricity Usage kWh");

		$("#statistics #week-usage").html(0);
		$("#statistics #week-price").html(0);

		$("#statistics #usage-title").html("Year Usage");
		$("#statistics #price-title").html("Year Consumption Cost");
		$("#statistics #stats-table tbody").empty();

		$("#statistics #dwm").html("Month");

		LoadYearlyStats();
	});
});
/*=========================
		Cards
=========================*/
/* Load Cards into Cards List */
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_ADMIN_SECTION") == "#cards-btn")
	{
		LoadCardsSection();
	}

	$("#cards-btn, #mobile-cards-btn").click(function()
	{
		LoadCardsSection();
	});
});
/* Confirm Adding Card */
$(function()
{
	/* When Cancelling or Closing, Reset Form */
	$("#modal-add-card button.uk-modal-close").click(function()
	{
		ResetAddCardModal(); // Reset Modal
	});

 	/* When Confirming */
	$("#add-card-confirm-btn").click(function()
	{
		var card = $("#add-card-name").val(); // Get Card Name
		var ip = $("#add-card-ip").val(); // Get Card IP

		if (!card)
		{
			$("#add-card-name").css("border-color", "#F0506E");
			$("#add-card-name-error").show();
		}
		else
		{
			$("#add-card-name").css("border-color", "var(--secondary-color)");
			$("#add-card-name-error").hide();
		}

		if (!ip)
		{
			$("#add-card-ip").css("border-color", "#F0506E");
			$("#add-card-ip-error").show();
		}
		else
		{
			$("#add-card-ip").css("border-color", "var(--secondary-color)");
			$("#add-card-ip-error").hide();
		}

		if (card && ip)
		{
			$.ajax
			({
				url: "../php/add_card.php",
				type: "POST",
				dataType: "json",
				data: {card: card, ip: ip}
			})
			.done(function(response)
			{
				var len = response.length;

				UIkit.modal("#modal-add-card").hide(); // Hide Modal
				ResetAddCardModal(); // Reset Modal

				if (len != 0)
				{
					$.growl.notice({ message: "Card has been Successfully Added !" }); // Success Notification	

					if($("#cards #cards-list").find("table").length > 0)
					{
						$("#cards #cards-list table").remove();
					}

					$("#cards #cards-list").append("<article id='"+response.card+"' class='uk-comment card-details uk-margin-small-top uk-animation-scale-down uk-box-shadow-medium'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right uk-grid uk-grid-stack' uk-grid><div class='uk-width-1-1'><h4 class='uk-comment-title uk-margin-remove'>"+response.name+"</h4><h6 class='uk-comment-meta uk-margin-remove-top devices'>0 Devices</h6></div></header></article>");
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}
			})
			.fail(function()
			{
				UIkit.modal("#modal-add-card").hide(); // Hide Modal
				ResetAddCardModal(); // Reset Modal
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
			});
		}
	});
});
/* Load Data to Edit Card Modal and Get Cards Details */
$(function()
{
	var card; // Card ID
	var devices // Number of Devices Related to the Card

	/* Loading Card Details and Assign */
	$("#cards #cards-list").off("click").on("click", "article.card-details", function()
	{
		card = $(this).attr("id"); // Assign Card ID
		UIkit.modal("#modal-edit-card").toggle(); // Show Modal

		$.ajax
		({
			url: "../php/card_details.php",
			type: "POST",
			dataType: "json",
			data: {card: card},
		})
		.done(function(response)
		{
			if (response.name != null)
			{
				$("#edit-card-name").val(response.name);
				$("#edit-card-ip").val(response.ip);
				devices = response.devices;
			}
			else
			{
				$.growl.error({ message: "Failed to Get Selected Card Details !" });
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Get Selected Card Details !" });
		});
	});

	/* When Cancelling or Closing, Reset Form */
	$("#modal-edit-card button.uk-modal-close").click(function()
	{
		ResetEditCardModal(); // Reset Modal
	});

	/* When Confirming */
	$("#edit-card-confirm-btn").click(function()
	{
		var new_card_name = $("#edit-card-name").val(); // Get Card Name
		var new_card_ip = $("#edit-card-ip").val(); // Get Card IP

		if (!new_card_name)
		{
			$("#edit-card-name").css("border-color", "#F0506E");
			$("#edit-card-name-error").show();
		}
		else
		{
			$("#edit-card-name").css("border-color", "var(--secondary-color)");
			$("#edit-card-name-error").hide();
		}

		if (!new_card_ip)
		{
			$("#edit-card-ip").css("border-color", "#F0506E");
			$("#edit-card-ip-error").show();
		}
		else
		{
			$("#edit-card-ip").css("border-color", "var(--secondary-color)");
			$("#edit-card-ip-error").hide();
		}

		if (new_card_name && new_card_ip)
		{
			$.ajax
			({
				url: "../php/update_card.php",
				type: "POST",
				dataType: "json",
				data: {card: card, name: new_card_name, ip: new_card_ip}
			})
			.done(function(response)
			{
				if (response.result)
				{
					$.growl.notice({ message: "Card has been Successfully Updated !" }); // Success Notification
					$("#cards #cards-list article#"+card+" h4").html(new_card_name);
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}

				UIkit.modal("#modal-edit-card").hide(); // Hide Modal
				ResetEditCardModal(); // Reset Modal
			})
			.fail(function()
			{
				UIkit.modal("#modal-edit-card").hide(); // Hide Modal
				ResetEditCardModal(); // Reset Modal
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
			});
		}
	});

	/* Delete Card */
	$("#delete-card-btn").click(function(e)
	{
		e.preventDefault();

		$("#modal-delete-card h2.uk-modal-title span").html($("#edit-card-name").val());
		$("#modal-delete-card h5").html(devices+" Devices<br>Will be Deleted Permanently !");
	});

	/* Confirm Delete Card */
	$("#delete-card-confirm-btn").click(function()
	{
		$.ajax
		({
			url: "../php/delete_card.php",
			type: "POST",
			dataType: "json",
			data: {card: card},
		})
		.done(function(response)
		{
			UIkit.modal("#modal-delete-card").hide(); // Hide Delete Modal

			if (response.result)
			{
				$("#cards #cards-list article#"+card+".card-details").remove();
				UIkit.modal("#modal-edit-card").hide(); // Hide Edit Modal
				$.growl.notice({ message: "Card has been Successfully Deleted!" }); // Success Notification
				ResetEditCardModal(); // Reset Modal

				if ($("#cards #cards-list").find("article").length == 0)
				{
					$("#cards #cards-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Cards Found !<br><small>Make Sure You Add Cards...</small></th></tr></table>");
				}
			}
			else
			{
				$.growl.error({ message: "Failed to Delete <span style='color: var(--secondary-color)'>"+$("#edit-card-name").val()+"</span> Card, Please Try Again !" });
			}
		})
		.fail(function()
		{
			UIkit.modal("#modal-delete-card").hide(); // Hide Modal
			$.growl.error({ message: "Failed to Delete <span style='color: var(--secondary-color)'>"+$("#edit-card-name").val()+"</span> Card, Please Try Again !" });
		});
	});
});
/*=========================
		Floors
=========================*/
/* Load Floors into Floors List */
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_ADMIN_SECTION") == "#floors-btn")
	{
		DisplayFloorsListFloorsSection();
	}

	$("#floors-btn, #mobile-floors-btn").click(function()
	{
		DisplayFloorsListFloorsSection();
	});
});
/* Confirm Adding Floor */
$(function()
{
	/* When Confirming */
	$("#add-floor-confirm-btn").click(function()
	{
		var floor = $("#add-floor-name").val(); // Get Floor Name

		if (!floor)
		{
			$("#add-floor-name").css("border-color", "#F0506E");
			$("#add-floor-name-error").show();
		}
		else
		{
			$.ajax
			({
				url: "../php/add_floor.php",
				type: "POST",
				dataType: "json",
				data: {floor: floor}
			})
			.done(function(response)
			{
				var len = response.length;

				UIkit.modal("#modal-add-floor").hide(); // Hide Modal
				ResetAddFloorModal(); // Reset Modal

				if (len != 0)
				{
					$.growl.notice({ message: "Floor has been Successfully Added !" }); // Success Notification	

					if ($("#lights-floors-navigation").val() == undefined)
					{
						// Empty The Group List
						$("#floors #floors-list").empty();
					}

					$("#floors #floors-list").append("<article id='"+response.floor+"' class='uk-comment floor-details uk-margin-small-top uk-animation-scale-down uk-box-shadow-medium'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right uk-grid uk-grid-stack' uk-grid><div class='uk-width-1-1'><h4 class='uk-comment-title uk-margin-remove'>"+response.name+"</h4><div uk-grid><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top rooms'>0 Rooms</h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top devices'>0 Devices</h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top groups'>0 Groups</h6></div></div></div></header></article>");

					LoadFloorsLightsSection();
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}
			})
			.fail(function()
			{
				UIkit.modal("#modal-add-floor").hide(); // Hide Modal
				ResetAddFloorModal(); // Reset Modal
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
			});
		}
	});

	/* When Cancelling or Closing, Reset Form */
	$("#modal-add-floor button.uk-modal-close").click(function()
	{
		ResetAddFloorModal(); // Reset Modal
	});
});
/* Load Data to Edit Floor Modal and Get Floors Details */
$(function()
{
	var floor; // Floor ID
	var name; // Floor NAME

	/* Loading Floor Details and Assign */
	$("#floors #floors-list").off("click").on("click", "article.floor-details", function()
	{
		floor = $(this).attr("id"); // Assign Floor ID
		UIkit.modal("#modal-edit-floor").toggle(); // Show Modal
		$("#modal-edit-floor table").empty();

		$.ajax
		({
			url: "../php/floor_details.php",
			type: "POST",
			dataType: "json",
			data: {floor: floor},
		})
		.done(function(response)
		{
			var len = response.length;

			if (len != 0)
			{
				name = response[0].floor;
				$("#edit-floor-name").val(name);
				$("#modal-edit-floor table").append("<thead><tr><th width='33.33%'>"+response[0].rooms+" Rooms</th><th width='33.33%''>"+response[0].devices+" Devices</th><th width='33.33%''>"+response[0].groups+" Groups</th></tr></thead><tbody></tbody>");

				if (response[0].rooms != 0)
				{
					for (var i = 0; i < len; i++)
					{
						var tmp = "";
						var flag = 0;

						for (var j = 0; j < response[i].roomgroups; j++)
						{
							tmp = tmp + "<div class='uk-width-3-4'>"+response[i+j].groupname+"</div><div class='uk-width-1-4'>"+response[i+j].groupdevices+"</div>";
							flag = 1;
						}

						$("#modal-edit-floor table tbody").append("<tr><td>"+response[i].roomname+"</td><td>"+response[i].roomdevices+"</td><td><div uk-grid>"+tmp+"</div></td></tr>");

						if (flag == 1)
						{
							i = i + response[i].roomgroups - 1;
						}
					}
				}
			}
			else
			{
				$.growl.error({ message: "Failed to Get Selected Floor Details !" });
				$("#modal-edit-floor table").append("<thead><tr><th width='33.33%'>0 Rooms</th><th width='33.33%''>0 Devices</th><th width='33.33%''>0 Groups</th></tr></thead>");
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Get Selected Floor Details !" });
			$("#modal-edit-floor table").append("<thead><tr><th width='33.33%'>0 Rooms</th><th width='33.33%''>0 Devices</th><th width='33.33%''>0 Groups</th></tr></thead>");
		});
	});

	/* When Cancelling or Closing, Reset Form */
	$("#modal-edit-floor button.uk-modal-close").click(function()
	{
		ResetEditFloorModal(); // Reset Modal
	});

	/* When Confirming */
	$("#edit-floor-confirm-btn").click(function()
	{
		var new_floor_name = $("#edit-floor-name").val(); // Get Floor Name

		if (!new_floor_name)
		{
			$("#edit-floor-name").css("border-color", "#F0506E");
			$("#edit-floor-name-error").show();
		}
		else
		{
			$.ajax
			({
				url: "../php/update_floor.php",
				type: "POST",
				dataType: "json",
				data: {floor: floor, name: new_floor_name}
			})
			.done(function(response)
			{
				if (response.result)
				{
					$.growl.notice({ message: "Floor has been Successfully Updated !" }); // Success Notification
					$("#floors #floors-list article#"+floor+" h4").html(new_floor_name);
					$("#lights #lights-floors-navigation option[value='"+floor+"']").html(new_floor_name);
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}

				UIkit.modal("#modal-edit-floor").hide(); // Hide Modal
				ResetEditFloorModal(); // Reset Modal
			})
			.fail(function()
			{
				UIkit.modal("#modal-edit-floor").hide(); // Hide Modal
				ResetEditFloorModal(); // Reset Modal
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
			});
		}
	});

	/* Delete Floor */
	$("#delete-floor-btn").click(function(e)
	{
		e.preventDefault();

		$("#modal-delete-floor h2.uk-modal-title span").html($("#edit-floor-name").val());
		var rooms = $("#modal-edit-floor table thead th:nth-child(1)").text();
		var devices = $("#modal-edit-floor table thead th:nth-child(2)").text();
		var groups = $("#modal-edit-floor table thead th:nth-child(3)").text();
		$("#modal-delete-floor h5").html(rooms+", "+devices+" and "+groups+"<br>Will be Deleted Permanently !");
	});

	/* Confirm Delete Floor */
	$("#delete-floor-confirm-btn").click(function()
	{
		$.ajax
		({
			url: "../php/delete_floor.php",
			type: "POST",
			dataType: "json",
			data: {floor: floor},
		})
		.done(function(response)
		{
			UIkit.modal("#modal-delete-floor").hide(); // Hide Delete Modal

			if (response.result)
			{
				$("#floors #floors-list article#"+floor+".floor-details").remove();
				UIkit.modal("#modal-edit-floor").hide(); // Hide Edit Modal
				$.growl.notice({ message: "Floor has been Successfully Deleted!" }); // Success Notification
				ResetEditFloorModal(); // Reset Modal
				LoadFloorsLightsSection();

				if ($("#floors #floors-list").find("article").length == 0)
				{
					$("#floors #floors-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr></table>");
				}
			}
			else
			{
				$.growl.error({ message: "Failed to Delete <span style='color: var(--secondary-color)'>"+$("#edit-floor-name").val()+"</span> Floor, Please Try Again !" });
			}
		})
		.fail(function()
		{
			UIkit.modal("#modal-delete-floor").hide(); // Hide Modal
			$.growl.error({ message: "Failed to Delete <span style='color: var(--secondary-color)'>"+$("#edit-floor-name").val()+"</span> Floor, Please Try Again !" });
		});
	});
});
/*=========================
		Rooms
=========================*/
/* Load Rooms into Rooms List */
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_ADMIN_SECTION") == "#rooms-btn")
	{
		DisplayRoomsListRoomsSection();
	}

	$("#rooms-btn, #mobile-rooms-btn").click(function()
	{
		DisplayRoomsListRoomsSection();
	});
});
/* Load Data to Add Room Modal */
$(function()
{
	var width; // Room's Width
	var height; // Room's Height
	var device; // Room's Device
	var coords; // Room's Device Coords
	var SelectedDeviceType = [];
	var SelectedDevicePower = [];
	var SelectedDevicePin = [];
	var SelectedDeviceCoords = [];
	var SelectedDeviceCard = [];

	/* Load Floors & Cards */
	$("#rooms #add-room-btn").click(function()
	{
		$.ajax
		({
			url: "../php/floors.php",
			type: "POST",
			dataType: "json",
		})
		.done(function(response)
		{
			var len = response.length;

			if (len != 0)
			{
				for (var i = 0; i < len; i++)
				{
					$("#modal-add-room #add-room-search-floor").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
				}
			}
		})
		.fail(function()
		{
			$("#modal-add-room #add-room-room table").empty();
			$("#modal-add-room #add-room-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Floors !</th></tr>");
		});

		$.ajax
		({
			url: "../php/cards.php",
			type: "POST",
			dataType: "json",
		})
		.done(function(response)
		{
			var len = response.length;

			if (len != 0)
			{
				for (var i = 0; i < len; i++)
				{
					$("#modal-add-room-device #add-room-device-card").append("<option value='"+response[i].id+"'>"+response[i].name+" - "+response[i].ip+"</option>");
				}
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Load Cards!" });
		});
	});

	/* Get Room Coords */
	$("#add-room-width, #add-room-height").change(function()
	{
		width = $("#add-room-width").val();
		height = $("#add-room-height").val();

		if ( (width != "") && (height != "") )
		{
			if (parseInt(height, 10) > parseInt(width, 10))
			{
				var x = width;
				width = height;
				height = x;

				$("#add-room-width").val(width);
				$("#add-room-height").val(height);
			}

			DisplayDevicesAddRoomRoomsSection(width, height);

			SelectedDeviceType = [];
			SelectedDevicePower = [];
			SelectedDevicePin = [];
			SelectedDeviceCoords = [];
			SelectedDeviceCard = [];
		}
	});

	$("#add-room-width").change(function()
	{
		if ($("#add-room-width").val() <= 0)
		{
			$("#add-room-width").css("border-color", "F0506E");
			$("#add-room-width-error").show();
		}
		else
		{
			$("#add-room-width").css("border-color", "var(--secondary-color)");
			$("#add-room-width-error").hide();
		}
	});

	$("#add-room-height").change(function()
	{
		if ($("#add-room-height").val() <= 0)
		{
			$("#add-room-height").css("border-color", "#F0506E");
			$("#add-room-height-error").show();
		}
		else
		{
			$("#add-room-height").css("border-color", "var(--secondary-color)");
			$("#add-room-height-error").hide();
		}
	});

	/* Show Add Device Modal */
	$("#modal-add-room #add-room-room table").off("click").on("click", "img:not(.notfound, .error)", function()
	{
		device = $(this);
		UIkit.modal("#modal-add-room-device").toggle();
		coords = device.parent().parent().attr("id");

		if (SelectedDeviceCoords.includes(coords))
		{
			for (var i = 0; i < SelectedDeviceCoords.length; i++) // Loop Array Search for the Item
			{
				if (SelectedDeviceCoords[i] == coords)
				{
					$("#add-room-device-type").val(SelectedDeviceType[i]);
					$("#add-room-device-power").val(SelectedDevicePower[i]);
					$("#add-room-device-card").val(SelectedDeviceCard[i]).prop("selected", true); // Set Card Device Selected
					$("#add-room-device-pin").val(SelectedDevicePin[i]);
				}
			}
		}
	});

	/* Cancel Add Room Device */
	$("#modal-add-room-device button.uk-modal-close").click(function()
	{
		ResetAddRoomDeviceModal();
	});

	/* Remove Device */
	$("#delete-room-device-btn").click(function()
	{
		for (var i = 0; i < SelectedDeviceCoords.length; i++) // Loop Array Search for the Item to Delete
		{
			$("#modal-add-room #add-room-room table td#"+coords+" img").attr("src", "../images/icons/disabled.png");
			$("#modal-add-room #add-room-room table td#"+coords+" img").removeClass("SELECTED");

			if (SelectedDeviceCoords[i] == coords)
			{
				SelectedDeviceCoords.splice(i, 1); // Delete when Found
				SelectedDeviceType.splice(i, 1);
				SelectedDevicePower.splice(i, 1);
				SelectedDeviceCard.splice(i, 1);
				SelectedDevicePin.splice(i, 1);
			}
		}

		UIkit.modal("#modal-add-room-device").hide();
		ResetAddRoomDeviceModal(); // Reset Modal
	});

	/* Confirm Add Room Device */
	$("#add-room-device-confirm-btn").click(function()
	{
		var type = $("#add-room-device-type").val();
		var power = $("#add-room-device-power").val();
		var card = $("#add-room-device-card").val();
		var pin = $("#add-room-device-pin").val();

		if (type == "NONE")
		{
			$("#add-room-device-type").css("border-color", "#F0506E");
			$("#add-room-device-type-error").show();
		}
		else
		{
			$("#add-room-device-type").css("border-color", "var(--secondary-color)");
			$("#add-room-device-type-error").hide()
		}

		if (!power)
		{
			$("#add-room-device-power").css("border-color", "#F0506E");
			$("#add-room-device-power-error").show();
		}
		else
		{
			$("#add-room-device-power").css("border-color", "var(--secondary-color)");
			$("#add-room-device-power-error").hide();
		}

		if (card == null)
		{
			$("#add-room-device-card").css("border-color", "#F0506E");
			$("#add-room-device-card-error").show();
		}
		else
		{
			$("#add-room-device-card").css("border-color", "var(--secondary-color)");
			$("#add-room-device-card-error").hide()
		}

		if (!pin)
		{
			$("#add-room-device-pin").css("border-color", "#F0506E");
			$("#add-room-device-pin-error").show();
		}
		else
		{
			$("#add-room-device-pin").css("border-color", "var(--secondary-color)");
			$("#add-room-device-pin-error").hide();
		}

		if ( (type != "NONE") && (power) && (pin) && (card != null) )
		{
			if (!SelectedDeviceCoords.includes(coords))
			{
				SelectedDeviceCoords.push(coords);
				SelectedDeviceType.push(type);
				SelectedDevicePower.push(power);
				SelectedDeviceCard.push(card);
				SelectedDevicePin.push(pin);
				$("#modal-add-room #add-room-room table td#"+coords+" img").addClass("SELECTED");
			}
			else
			{
				for (var i = 0; i < SelectedDeviceCoords.length; i++) // Loop Array Search for the Item to Update
				{
					if (SelectedDeviceCoords[i] == coords)
					{
						SelectedDeviceType[i] = type;
						SelectedDevicePower[i] = power;
						SelectedDeviceCard[i] = card;
						SelectedDevicePin[i] = pin;
					}
				}
			}

			$("#modal-add-room #add-room-room table td#"+coords+" img").attr("src", "../images/devices/"+type+"_ON.png");

			UIkit.modal("#modal-add-room-device").hide();
			ResetAddRoomDeviceModal(); // Reset Modal
		}
	});

	/* When Cancelling or Closing, Reset Form */
	$("#modal-add-room button.uk-modal-close").click(function()
	{
		ResetAddRoomModal(); // Reset Modal
		width = "";
		height = "";
		SelectedDevicePin = [];
		SelectedDeviceType = [];
		SelectedDevicePower = [];
		SelectedDeviceCard = [];
		SelectedDeviceCoords = [];
	});

	/* Confirm Add Room */
	$("#add-room-confirm-btn").click(function()
	{
		var room_name = $("#add-room-name").val(); // Get Room's Name
		var room_floor = $("#add-room-search-floor").val(); // Get Room's Floor
		var room_width = $("#add-room-width").val(); // Get Room's Width
		var room_height = $("#add-room-height").val(); // Get Room's Height

		if (!room_name)
		{
			$("#add-room-name").css("border-color", "#F0506E");
			$("#add-room-name-error").show();
		}
		else
		{
			$("#add-room-name").css("border-color", "var(--secondary-color)");
			$("#add-room-name-error").hide();
		}

		if (room_floor == null)
		{
			$("#add-room-search-floor").css("border-color", "#F0506E");
			$("#add-room-search-floor-error").show();
		}
		else
		{
			$("#add-room-search-floor").css("border-color", "var(--secondary-color)");
			$("#add-room-search-floor-error").hide();
		}

		if (!room_width || room_width <= 0)
		{
			$("#add-room-width").css("border-color", "#F0506E");
			$("#add-room-width-error").show();
		}
		else
		{
			$("#add-room-width").css("border-color", "var(--secondary-color)");
			$("#add-room-width-error").hide();
		}

		if (!room_height || room_height <= 0)
		{
			$("#add-room-height").css("border-color", "#F0506E");
			$("#add-room-height-error").show();
		}
		else
		{
			$("#add-room-height").css("border-color", "var(--secondary-color)");
			$("#add-room-height-error").hide();
		}

		if ( (room_name) && (room_floor != null) && (room_width) && (room_width > 0) && (room_height) && (room_height > 0) )
		{
			var SelectedDeviceCoordsJson = JSON.stringify(SelectedDeviceCoords); // Get Selected Devices Coords
			var SelectedDeviceTypeJson = JSON.stringify(SelectedDeviceType); // Get Selected Devices Type
			var SelectedDevicePowerJson = JSON.stringify(SelectedDevicePower); // Get Selected Devcices Power
			var SelectedDeviceCardJson = JSON.stringify(SelectedDeviceCard); // Get Selected Devices Card
			var SelectedDevicePinJson = JSON.stringify(SelectedDevicePin); // Get Selected Devices Pin

			$.ajax
			({
				url: "../php/add_room.php",
				type: "POST",
				dataType: "json",
				data: {name: room_name, width: room_width, height: room_height, floor: room_floor, devices_coords: SelectedDeviceCoordsJson, devices_type: SelectedDeviceTypeJson, devices_power: SelectedDevicePowerJson, devices_card: SelectedDeviceCardJson, devices_pin: SelectedDevicePinJson},
			})
			.done(function(response)
			{
				var len = response.length;

				UIkit.modal("#modal-add-room").hide(); // Hide Modal
				ResetAddRoomModal(); // Reset Modal

				if (len != 0)
				{
					$.growl.notice({ message: "Room has been Successfully Added!" }); // Success Notification	

					if($("#rooms-list div#"+room_floor+".uk-section").find("table.uk-margin-small-top").length > 0)
					{
						$("#rooms-list div#"+room_floor+".uk-section table.uk-margin-small-top").remove();
					}

					// Add To Rooms Section List
					$("#rooms-list div#"+room_floor+".uk-section").append("<article id='"+response.id+"' class='uk-comment room-details uk-margin-small-top uk-animation-scale-down'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right uk-grid uk-grid-stack' uk-grid><div class='uk-width-1-1 uk-first-column'><h4 class='uk-comment-title uk-margin-remove'>"+response.name+"</h4><div uk-grid><div class='uk-width-1-2'><h6 class='uk-comment-meta uk-margin-remove-top devices'>"+response.devices+" Devices</h6></div><div class='uk-width-1-2'><h6 class='uk-comment-meta uk-margin-remove-top groups'>"+response.groups+" Groups</h6></div></div></div></header></article>");
					
					// Refresh Lights Section List
					if ($("#lights #lights-floors-navigation").val() == room_floor)
					{
						LoadRoomsLightsSection(room_floor);
					}

					if (SelectedDeviceCoords.length == 0)
					{
						$.growl({ title: "Room Added with no Devices.", message: "Make Sure You Add Devices!" });
					}
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}

				width = "";
				height = "";
				SelectedDevicePin = [];
				SelectedDeviceType = [];
				SelectedDevicePower = [];
				SelectedDeviceCard = [];
				SelectedDeviceCoords = [];
			})
			.fail(function()
			{
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				UIkit.modal("#modal-add-room").hide();
				ResetAddRoomModal();
				width = "";
				height = "";
				SelectedDevicePin = [];
				SelectedDeviceType = [];
				SelectedDevicePower = [];
				SelectedDeviceCard = [];
				SelectedDeviceCoords = [];
			});
		}
	});
});
/* Load Data to Edit Room Modal and Get Room Details */
$(function()
{
	var room; // Room ID
	var name; // Room NAME
	var width; // Room WIDTH
	var height; // Room HEIGHT
	var SelectedDeviceType = [];
	var SelectedDevicePower = [];
	var SelectedDeviceCard = [];
	var SelectedDevicePin = [];
	var SelectedDeviceCoords = [];
	var SelectedDeviceColor = [];
	var SelectedDeviceId = [];
	var device;
	var id;
	var room_floor;
	var groups = [];

	/* Loading Room Details and Assign its Devices to Selected Devices Array */
	$("#rooms #rooms-list").off("click").on("click", "article.room-details", function()
	{
		room = $(this).attr("id"); // Assign Room ID
		UIkit.modal("#modal-edit-room").toggle(); // Show Modal
		$("#modal-edit-room table").empty();
		$("#modal-edit-room #edit-room-room-groups").empty();

		$.ajax
		({
			url: "../php/room_details.php",
			type: "POST",
			dataType: "json",
			data: {room: room},
		})
		.done(function(response)
		{
			var len = response.length;

			if (len != 0)
			{
				/* Load Cards */
				$.ajax
				({
					url: "../php/cards.php",
					type: "POST",
					dataType: "json",
				})
				.done(function(response)
				{
					var len = response.length;

					if (len != 0)
					{
						for (var i = 0; i < len; i++)
						{
							$("#modal-edit-room-device #edit-room-device-card").append("<option value='"+response[i].id+"'>"+response[i].name+" - "+response[i].ip+"</option>");
						}
					}
				})
				.fail(function()
				{
					$.growl.error({ message: "Failed to Load Cards!" });
				});

				name = response[0].name;
				room_floor = response[0].floor;
				width = response[0].width;
				height = response[0].height;

				$("#edit-room-name").val(name);

				// Load Floors
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
							$("#edit-room-search-floor").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
						}

						$("#edit-room-search-floor").val(room_floor).prop("selected", true); // Set Floor Room Selected
					}
				});

				if (response[0].device != null)
				{
					for (var line = 1; line <= height; line++)
					{
						$("#modal-edit-room table#edit-room-room-devices").append("<tr id='"+line+"' class='uk-animation-scale-down uk-text-center'></tr>");

						for (var column = 1; column <= width; column++)
						{
							$("#modal-edit-room table#edit-room-room-devices tr#"+line).append("<td id='"+line+"-"+column+"'></td>");
						}
					}

				
					for (var i = 0; i < len; i++)
					{
						var bgcolor = "var(--device-color)";

						if (response[i].color != null)
						{
							bgcolor = response[i].color;
						}

						$("#modal-edit-room table#edit-room-room-devices td#"+response[i].lin+"-"+response[i].col).html("<div class='device'><img id='"+response[i].device+"' src='../images/devices/"+response[i].type+"_ON.png' style='background-color: "+bgcolor+";' width='50' height='50'></div>");

						SelectedDeviceType.push(response[i].type);
						SelectedDevicePower.push(response[i].power);
						SelectedDeviceCard.push(response[i].card);
						SelectedDevicePin.push(response[i].pin);
						SelectedDeviceCoords.push(response[i].lin+"-"+response[i].col);
						SelectedDeviceColor.push(bgcolor);
						SelectedDeviceId.push(response[i].device);
					}
				}
				else
				{
					$.growl({ title: "This Room Has no Devices.", message: "Make Sure You Add Devices!" });
					$("#modal-edit-room table#edit-room-room-devices").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Devices Found in This Room !<br><small>Make Sure You Add Devices...</small></th></tr>");
				}

				// Load Groups
				$.ajax
				({
					url: "../php/room_groups.php",
					type: "POST",
					dataType: "json",
					data: {room: room},
				})
				.done(function(response)
				{
					var len = response.length;

					if (len != 0)
					{
						for (var i = 0; i < len; i++)
						{
							if (!groups.includes(response[i].name))
							{
								groups.push(response[i].name);

								$("#modal-edit-room #edit-room-room-groups").append("<button id='"+response[i].id+"' class='uk-button uk-animation-scale-down "+response[i].status+"' style='background-color: "+response[i].color+";' disabled><span>"+response[i].name+"</span></button>");
							}
						}
					}
					else
					{
						$("#modal-edit-room #edit-room-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Room !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
					}
				})
				.fail(function()
				{
					$("#modal-edit-room #edit-room-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
				});
			}
			else
			{
				$.growl.error({ message: "Failed to Get Selected Room Details !" });
				$("#modal-edit-room table#edit-room-room-devices").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Room Details !</th></tr>");
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Get Selected Room Details !" });
			$("#modal-edit-room table#edit-room-room-devices").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Room Details !</th></tr>");
		});
	});

	/* Cancel Edit Room */
	$("#modal-edit-room button.uk-modal-close").click(function()
	{
		ResetEditRoomModal();
		width = "";
		height = "";
		room = "";
		name = "";
		device = "";
		id = "";
		SelectedDeviceType = [];
		SelectedDevicePower = [];
		SelectedDeviceCard = [];
		SelectedDevicePin = [];
		SelectedDeviceCoords = [];
		SelectedDeviceColor = [];
		SelectedDeviceId = [];
		room_floor = "";
		groups = [];
	});

	/* Show Edit Device Modal */
	$("#modal-edit-room table#edit-room-room-devices").off("click").on("click", "img:not(.notfound, .error)", function()
	{
		device = $(this);
		UIkit.modal("#modal-edit-room-device").toggle();
		id = device.attr("id");

		for (var i = 0; i < SelectedDeviceId.length; i++) // Loop Array Search for the Item to Delete
		{
			if (SelectedDeviceId[i] == id)
			{
				$("#edit-room-device-type").val(SelectedDeviceType[i]);
				$("#edit-room-device-power").val(SelectedDevicePower[i]);
				$("#edit-room-device-card").val(SelectedDeviceCard[i]);
				$("#edit-room-device-pin").val(SelectedDevicePin[i]);
			}
		}
	});

	/* Cancel Edit Room Device */
	$("#modal-edit-room-device button.uk-modal-close").click(function()
	{
		ResetEditRoomDeviceModal();
	});

	/* Confirm Edit Room Device */
	$("#edit-room-device-confirm-btn").click(function()
	{
		var type = $("#edit-room-device-type").val();
		var power = $("#edit-room-device-power").val();
		var card = $("#edit-room-device-card").val();
		var pin = $("#edit-room-device-pin").val();

		if (type == "NONE")
		{
			$("#edit-room-device-type").css("border-color", "#F0506E");
			$("#edit-room-device-type-error").show();
		}
		else
		{
			$("#edit-room-device-type").css("border-color", "var(--secondary-color)");
			$("#edit-room-device-type-error").hide()
		}

		if (!power)
		{
			$("#edit-room-device-power").css("border-color", "#F0506E");
			$("#edit-room-device-power-error").show();
		}
		else
		{
			$("#edit-room-device-power").css("border-color", "var(--secondary-color)");
			$("#edit-room-device-power-error").hide();	
		}

		if (card == null)
		{
			$("#edit-room-device-card").css("border-color", "#F0506E");
			$("#edit-room-device-card-error").show();
		}
		else
		{
			$("#edit-room-device-card").css("border-color", "var(--secondary-color)");
			$("#edit-room-device-card-error").hide()
		}

		if (!pin)
		{
			$("#edit-room-device-pin").css("border-color", "#F0506E");
			$("#edit-room-device-pin-error").show();
		}
		else
		{
			$("#edit-room-device-pin").css("border-color", "var(--secondary-color)");
			$("#edit-room-device-pin-error").hide();	
		}

		if ( (type != "NONE") && (power) && (pin) && (card != null) )
		{
			for (var i = 0; i < SelectedDeviceId.length; i++) // Loop Array Search for the Item to Delete
			{
				if (SelectedDeviceId[i] == id)
				{
					SelectedDeviceType[i] = type;
					SelectedDevicePower[i] = power;
					SelectedDeviceCard[i] = card;
					SelectedDevicePin[i] = pin;
				}
			}

			$("#modal-edit-room #edit-room-room table img#"+id).attr("src", "../images/devices/"+type+"_ON.png");

			UIkit.modal("#modal-edit-room-device").hide();
			ResetEditRoomDeviceModal(); // Reset Modal
		}
	});

	/* Confirm Edit Room */
	$("#edit-room-confirm-btn").click(function()
	{
		var room_name = $("#edit-room-name").val(); // Get Room's Name
		var new_room_floor = $("#edit-room-search-floor").val(); // Get Room's Floor

		if (!room_name)
		{
			$("#edit-room-name").css("border-color", "#F0506E");
			$("#edit-room-name-error").show();
		}
		else
		{
			$("#edit-room-name").css("border-color", "var(--secondary-color)");
			$("#edit-room-name-error").hide();
		}

		if(room_name)
		{
			var SelectedDeviceIdJson = JSON.stringify(SelectedDeviceId); // Get Selected Devices Id
			var SelectedDeviceTypeJson = JSON.stringify(SelectedDeviceType); // Get Selected Devices Type
			var SelectedDevicePowerJson = JSON.stringify(SelectedDevicePower); // Get Selected Devices Power
			var SelectedDeviceCardJson = JSON.stringify(SelectedDeviceCard); // Get Selected Devices Card
			var SelectedDevicePinJson = JSON.stringify(SelectedDevicePin); // Get Selected Devices Pin

			$.ajax
			({
				url: "../php/update_room.php",
				type: "POST",
				dataType: "json",
				data: {room: room, name: room_name, floor: new_room_floor, devices_id: SelectedDeviceIdJson, devices_type: SelectedDeviceTypeJson, devices_power: SelectedDevicePowerJson, devices_card: SelectedDeviceCardJson, devices_pin: SelectedDevicePinJson},
			})
			.done(function(response)
			{
				UIkit.modal("#modal-edit-room").hide(); // Hide Modal
				ResetEditRoomModal(); // Reset Modal

				if (response.result)
				{
					$.growl.notice({ message: "Room has been Successfully Updated !" }); // Success Notification

					if (room_floor != new_room_floor)
					{
						$("#rooms-list div#"+room_floor+".uk-section article#"+room).remove();

						if ($("#rooms-list div#"+new_room_floor+".uk-section").find("table.uk-margin-small-top").length > 0)
						{
							$("#rooms-list div#"+new_room_floor+".uk-section table.uk-margin-small-top").remove();
						}

						// Update in Rooms Section List
						$("#rooms-list div#"+new_room_floor+".uk-section").append("<article id='"+room+"' class='uk-comment room-details uk-margin-small-top uk-animation-scale-down'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right uk-grid uk-grid-stack' uk-grid><div class='uk-width-1-1 uk-first-column'><h4 class='uk-comment-title uk-margin-remove'>"+room_name+"</h4><div uk-grid><div class='uk-width-1-2'><h6 class='uk-comment-meta uk-margin-remove-top devices'>"+SelectedDeviceId.length+" Devices</h6></div><div class='uk-width-1-2'><h6 class='uk-comment-meta uk-margin-remove-top groups'>"+groups.length+" Groups</h6></div></div></div></header></article>");

						if ($("#rooms-list div#"+room_floor+".uk-section").find("article").length == 0)
						{
							$("#rooms-list div#"+room_floor+".uk-section").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found !<br><small>Make Sure You Add Rooms...</small></th></tr></table>");
						}
					}
					else
					{
						$("#rooms-list div#"+room_floor+".uk-section article#"+room+" h4").html(room_name);
					}

					// Refresh Lights Section List
					LoadFloorsLightsSection();
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}

				width = "";
				height = "";
				room = "";
				name = "";
				device = "";
				id = "";
				SelectedDeviceType = [];
				SelectedDevicePower = [];
				SelectedDeviceCard = [];
				SelectedDevicePin = [];
				SelectedDeviceCoords = [];
				SelectedDeviceColor = [];
				SelectedDeviceId = [];
				room_floor = "";
				groups = [];
			})
			.fail(function()
			{
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				UIkit.modal("#modal-edit-room").hide();
				ResetEditRoomModal();
				width = "";
				height = "";
				room = "";
				name = "";
				device = "";
				id = "";
				SelectedDeviceType = [];
				SelectedDevicePower = [];
				SelectedDeviceCard = [];
				SelectedDevicePin = [];
				SelectedDeviceCoords = [];
				SelectedDeviceColor = [];
				SelectedDeviceId = [];
				room_floor = "";
				groups = [];
			});
		}
	});

	$("#delete-room-btn").click(function(e)
	{
		e.preventDefault();

		$("#modal-delete-room h2.uk-modal-title span").html($("#edit-room-name").val());
		$("#modal-delete-room h5").html(SelectedDeviceId.length+" Devices and "+groups.length+" Groups<br>Will be Deleted Permanently !");
	});

	/* Confirm Delete Room */
	$("#delete-room-confirm-btn").click(function()
	{
		$.ajax
		({
			url: "../php/delete_room.php",
			type: "POST",
			dataType: "json",
			data: {room: room},
		})
		.done(function(response)
		{
			UIkit.modal("#modal-delete-room").hide(); // Hide Delete Modal

			if (response.result)
			{
				UIkit.modal("#modal-edit-room").hide(); // Hide Edit Modal
				$.growl.notice({ message: "Room has been Successfully Deleted!" }); // Success Notification

				$("#rooms-list div#"+room_floor+".uk-section article#"+room).remove();

				if ($("#rooms-list div#"+room_floor+".uk-section").find("article").length == 0)
				{
					$("#rooms-list div#"+room_floor+".uk-section").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found !<br><small>Make Sure You Add Rooms...</small></th></tr></table>");
				}

				if ($("#lights-floors-navigation").val() == room_floor)
				{
					LoadRoomsLightsSection(room_floor)
				}

				ResetEditRoomModal(); // Reset Modal
				width = "";
				height = "";
				room = "";
				name = "";
				device = "";
				id = "";
				SelectedDeviceType = [];
				SelectedDevicePin = [];
				SelectedDevicePower = [];
				SelectedDeviceCoords = [];
				SelectedDeviceColor = [];
				SelectedDeviceId = [];
				room_floor = "";
				groups = [];
			}
			else
			{
				$.growl.error({ message: "Failed to Delete <span style='color: var(--secondary-color)'>"+$("#edit-room-name").val()+"</span> Room, Please Try Again !" });
			}
		})
		.fail(function()
		{
			UIkit.modal("#modal-delete-room").hide(); // Hide Modal
			$.growl.error({ message: "Failed to Delete <span style='color: var(--secondary-color)'>"+$("#edit-room-name").val()+"</span> Room, Please Try Again !" });
		});
	});
});
/*=========================
		Users
=========================*/
/* Load Users into Users List */
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_ADMIN_SECTION") == "#users-btn")
	{
		DisplayUsersListUsersSection();
	}

	$("#users-btn, #mobile-users-btn").click(function()
	{
		DisplayUsersListUsersSection();
	});
});
/* Load Data to Add User Modal */
$(function()
{
	$("#users #add-user-btn").click(function()
	{
		// Load Floors
		$.ajax
		({
			url: "../php/floors.php",
			type: "POST",
			dataType: "json",
		})
		.done(function(response)
		{
			$("#modal-add-user #add-user-permissions").empty();

			var len = response.length;

			if (len != 0)
			{
				$("#modal-add-user #add-user-permissions").append("<ul id='available-permissions' class='uk-list uk-padding-small-left'></ul>")

				for (var i = 0; i < len; i++)
				{
					$("#modal-add-user #available-permissions").append("<li id='"+response[i].id+"' class='floor-permissions'><label><input class='uk-checkbox floor-permissions-input' type='checkbox'> "+response[i].name+"</label><ul class='floor-permissions-inner'></ul></li>")
				}

				// Load Rooms
				$.ajax
				({
					url: "../php/rooms_permissions_list.php",
					type: "POST",
					dataType: "json",
				})
				.done(function(response)
				{
					var len = response.length;

					if (len != 0)
					{
						for (var i = 0; i < len; i++)
						{
							if (response[i].room != null)
							{
								$("#modal-add-user li#"+response[i].floor+".floor-permissions ul.floor-permissions-inner").append("<li id='"+response[i].room+"' class='room-permissions'><label><input class='uk-checkbox room-permissions-input' type='checkbox'> "+response[i].name+"</label><ul class='room-permissions-inner'></ul></li>");
							}
						}
					}
				})
				.fail(function()
				{
					$.growl.error({ message: "Failed to Load Data !" });
					$("#modal-add-user #add-user-permissions").empty();
					$("#modal-add-user #add-user-permissions").append("<table><tr class='uk-animation-scale-down uk-text-center'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Data !</th></tr></table>");
				});
			}
			else
			{
				$("#modal-add-user #add-user-permissions").append("<table><tr class='uk-animation-scale-down uk-text-center'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>There is no Data !</th></tr></table>");
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Load Data !" });
			$("#modal-add-user #add-user-permissions").empty();
			$("#modal-add-user #add-user-permissions").append("<table><tr class='uk-animation-scale-down uk-text-center'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Data !</th></tr></table>");
		});
	});

	$("#modal-add-user #add-user-permissions").on("change", "input.floor-permissions-input", function()
	{
		var self = $(this);
		var id = self.parent().parent().attr("id");
		$("#modal-add-user li#"+id+".floor-permissions input:checkbox").prop("checked", self.prop("checked"));
	});

	$("#modal-add-user #add-user-permissions").on("change", "input.room-permissions-input", function()
	{
		var self = $(this);
		var id = self.parent().parent().attr("id");
		var floor = self.parent().parent().parent().parent().attr("id");

		$("#modal-add-user li#"+id+".room-permissions input:checkbox").prop("checked", self.prop("checked"));

		if ($("#modal-add-user li#"+floor+".floor-permissions ul.floor-permissions-inner input[type=checkbox]:checked").length != 0)
		{
			$("#modal-add-user li#"+floor+".floor-permissions input:checkbox:lt(1)").prop("checked", true);
		}
		else
		{
			$("#modal-add-user li#"+floor+".floor-permissions input:checkbox:lt(1)").prop("checked", false);
		}
	});

	var PermissionsList = [];
	var TypeList = [];

	$("#modal-add-user #add-user-confirm-btn").click(function()
	{
		var login = $("#add-user-login").val();
		var password = $("#add-user-password").val();
		var fname = $("#add-user-fname").val();
		var lname = $("#add-user-lname").val();

		if (!login)
		{
			$("#add-user-login").css("border-color", "#F0506E");
			$("#add-user-login-error").show();
		}
		else
		{
			$("#add-user-login").css("border-color", "var(--secondary-color)");
			$("#add-user-login-error").hide();
		}

		if (!password)
		{
			$("#add-user-password").css("border-color", "#F0506E");
			$("#add-user-password-error").show();
		}
		else
		{
			$("#add-user-password").css("border-color", "var(--secondary-color)");
			$("#add-user-password-error").hide();
		}

		if (!fname)
		{
			$("#add-user-fname").css("border-color", "#F0506E");
			$("#add-user-fname-error").show();
		}
		else
		{
			$("#add-user-fname").css("border-color", "var(--secondary-color)");
			$("#add-user-fname-error").hide();
		}

		if (!lname)
		{
			$("#add-user-lname").css("border-color", "#F0506E");
			$("#add-user-lname-error").show();
		}
		else
		{
			$("#add-user-lname").css("border-color", "var(--secondary-color)");
			$("#add-user-lname-error").hide();
		}

		if (login && password && fname && lname)
		{
			$("#modal-add-user #add-user-permissions input[type=checkbox]:checked").each(function()
			{
				var self = $(this).parent().parent();
				PermissionsList.push(self.attr("id"));
				
				if ($(this).hasClass("floor-permissions-input"))
				{
					TypeList.push("FLOOR");
				}
				else if ($(this).hasClass("room-permissions-input"))
				{
					TypeList.push("ROOM");
				}
			});

			var PermissionsListJson = JSON.stringify(PermissionsList)
			var TypeListJson = JSON.stringify(TypeList);

			$.ajax
			({
				url: "../php/add_user.php",
				type: "POST",
				dataType: "json",
				data: {login: login, password: password, fname: fname, lname: lname, permissions_devices: PermissionsListJson, permissions_types: TypeListJson},
			})
			.done(function(response)
			{
				var len = response.length;

				if (len != 0)
				{
					$.growl.notice({ message: "User has been Successfully Added !" }); // Success Notification

					if ($("#users #users-list table").find("tbody").length == 0)
					{
						$("#users #users-list table").empty();
						$("#users #users-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th>Login</th><th>Name</th><th>Edit</th><th>Delete</th></thead><tbody></tbody>");
					}

					$("#users #users-list table tbody").append("<tr id='"+response.user+"' class='uk-animation-scale-down uk-text-center'><td>"+response.user+"</td><td>"+response.name+"</td><td><img class='edit' src='../images/icons/edit.png' width='20' height='20'></td><td><img class='delete' src='../images/icons/remove.png' width='20' height='20'></td></tr>");
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				}

				UIkit.modal("#modal-add-user").hide();
				ResetAddUserModal();
				PermissionsList = [];
				TypeList = [];
			})
			.fail(function()
			{
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				UIkit.modal("#modal-add-user").hide();
				ResetAddUserModal();
				PermissionsList = [];
				TypeList = [];
			});
		}
	});

	/* Cancel Add User */
	$("#modal-add-user button.uk-modal-close").click(function()
	{
		UIkit.modal("#modal-add-user").hide();
		ResetAddUserModal();
		PermissionsList = [];
		TypeList = [];
	});
});
/* Load Data to Edit User Modal */
$(function()
{
	var old_login;

	$("#users #users-list table").off("click").on("click", "img.edit", function()
	{
		old_login = $(this).parent().parent().attr("id");
		
		UIkit.modal("#modal-edit-user").toggle(); // Show Modal

		// Load Floors
		$.ajax
		({
			url: "../php/floors.php",
			type: "POST",
			dataType: "json",
		})
		.done(function(response)
		{
			$("#modal-edit-user #edit-user-permissions").empty();

			var len = response.length;

			if (len != 0)
			{
				$("#modal-edit-user #edit-user-permissions").append("<ul id='available-permissions' class='uk-list uk-padding-small-left'></ul>")

				for (var i = 0; i < len; i++)
				{
					$("#modal-edit-user #available-permissions").append("<li id='"+response[i].id+"' class='floor-permissions'><label><input class='uk-checkbox floor-permissions-input' type='checkbox'> "+response[i].name+"</label><ul class='floor-permissions-inner'></ul></li>")
				}

				// Load Rooms
				$.ajax
				({
					url: "../php/rooms_permissions_list.php",
					type: "POST",
					dataType: "json",
				})
				.done(function(response)
				{
					var len = response.length;

					if (len != 0)
					{
						for (var i = 0; i < len; i++)
						{
							if (response[i].room != null)
							{
								$("#modal-edit-user li#"+response[i].floor+".floor-permissions ul.floor-permissions-inner").append("<li id='"+response[i].room+"' class='room-permissions'><label><input class='uk-checkbox room-permissions-input' type='checkbox'> "+response[i].name+"</label><ul class='room-permissions-inner'></ul></li>");
							}
						}
					}

					$.ajax
					({
						url: "../php/get_user.php",
						type: "POST",
						dataType: "json",
						data: {login: old_login},
					})
					.done(function(response)
					{
						var len = response.length;

						if (len != 0)
						{
							$("#edit-user-login").val(response[0].login);
							$("#edit-user-password").val(response[0].password);
							$("#edit-user-fname").val(response[0].fname);
							$("#edit-user-lname").val(response[0].lname);

							for (var i = 0; i < len; i++)
							{
								switch (response[i].type)
								{
									case "FLOOR":
											$("#modal-edit-user li#"+response[i].permission+".floor-permissions input.floor-permissions-input").prop("checked", true);
										break;
									case "ROOM":
											$("#modal-edit-user li#"+response[i].permission+".room-permissions input.room-permissions-input").prop("checked", true);
										break;
								}
							}
						}
						else
						{
							$.growl.error({ message: "Failed to Load Selected User Data !" });
							$("#modal-edit-user #edit-user-permissions").empty();
							$("#modal-edit-user #edit-user-permissions").append("<table><tr class='uk-animation-scale-down uk-text-center'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Data !</th></tr></table>");
						}
					})
					.fail(function()
					{
						$.growl.error({ message: "Failed to Load Selected User Data !" });
						$("#modal-edit-user #edit-user-permissions").empty();
						$("#modal-edit-user #edit-user-permissions").append("<table><tr class='uk-animation-scale-down uk-text-center'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Data !</th></tr></table>");
					});
				})
				.fail(function()
				{
					$.growl.error({ message: "Failed to Load Data !" });
					$("#modal-edit-user #edit-user-permissions").empty();
					$("#modal-edit-user #edit-user-permissions").append("<table><tr class='uk-animation-scale-down uk-text-center'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Data !</th></tr></table>");
				});
			}
			else
			{
				$("#modal-edit-user #edit-user-permissions").append("<table><tr class='uk-animation-scale-down uk-text-center'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>There is no Data !</th></tr></table>");
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Load Data !" });
			$("#modal-edit-user #edit-user-permissions").empty();
			$("#modal-edit-user #edit-user-permissions").append("<table><tr class='uk-animation-scale-down uk-text-center'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Data !</th></tr></table>");
		});
	});

	$("#modal-edit-user #edit-user-permissions").on("change", "input.floor-permissions-input", function()
	{
		var self = $(this);
		var id = self.parent().parent().attr("id");
		$("#modal-edit-user li#"+id+".floor-permissions input:checkbox").prop("checked", self.prop("checked"));
	});

	$("#modal-edit-user #edit-user-permissions").on("change", "input.room-permissions-input", function()
	{
		var self = $(this);
		var id = self.parent().parent().attr("id");
		var floor = self.parent().parent().parent().parent().attr("id");

		$("#modal-edit-user li#"+id+".room-permissions input:checkbox").prop("checked", self.prop("checked"));

		if ($("#modal-edit-user li#"+floor+".floor-permissions ul.floor-permissions-inner input[type=checkbox]:checked").length != 0)
		{
			$("#modal-edit-user li#"+floor+".floor-permissions input:checkbox:lt(1)").prop("checked", true);
		}
		else
		{
			$("#modal-edit-user li#"+floor+".floor-permissions input:checkbox:lt(1)").prop("checked", false);
		}
	});

	var PermissionsList = [];
	var TypeList = [];

	$("#modal-edit-user #edit-user-confirm-btn").click(function()
	{
		var login = $("#edit-user-login").val();
		var password = $("#edit-user-password").val();
		var fname = $("#edit-user-fname").val();
		var lname = $("#edit-user-lname").val();

		if (!login)
		{
			$("#edit-user-login").css("border-color", "#F0506E");
			$("#edit-user-login-error").show();
		}
		else
		{
			$("#edit-user-login").css("border-color", "var(--secondary-color)");
			$("#edit-user-login-error").hide();
		}

		if (!password)
		{
			$("#edit-user-password").css("border-color", "#F0506E");
			$("#edit-user-password-error").show();
		}
		else
		{
			$("#edit-user-password").css("border-color", "var(--secondary-color)");
			$("#edit-user-password-error").hide();
		}

		if (!fname)
		{
			$("#edit-user-fname").css("border-color", "#F0506E");
			$("#edit-user-fname-error").show();
		}
		else
		{
			$("#edit-user-fname").css("border-color", "var(--secondary-color)");
			$("#edit-user-fname-error").hide();
		}

		if (!lname)
		{
			$("#edit-user-lname").css("border-color", "#F0506E");
			$("#edit-user-lname-error").show();
		}
		else
		{
			$("#edit-user-lname").css("border-color", "var(--secondary-color)");
			$("#edit-user-lname-error").hide();
		}

		if (login && password && fname && lname)
		{
			$("#modal-edit-user #edit-user-permissions input[type=checkbox]:checked").each(function()
			{
				var self = $(this).parent().parent();
				PermissionsList.push(self.attr("id"));
				
				if ($(this).hasClass("floor-permissions-input"))
				{
					TypeList.push("FLOOR");
				}
				else if ($(this).hasClass("room-permissions-input"))
				{
					TypeList.push("ROOM");
				}
				else if ($(this).hasClass("group-permissions-input"))
				{
					TypeList.push("GROUP");
				}
			});

			var PermissionsListJson = JSON.stringify(PermissionsList)
			var TypeListJson = JSON.stringify(TypeList);

			$.ajax
			({
				url: "../php/update_employee.php",
				type: "POST",
				dataType: "json",
				data: {old_login: old_login, login: login, password: password, fname: fname, lname: lname, permissions_devices: PermissionsListJson, permissions_types: TypeListJson},
			})
			.done(function(response)
			{
				if (response.result)
				{
					$.growl.notice({ message: "User has been Successfully Updated !" }); // Success Notification

					$("#users #users-list tr#"+old_login).attr("id", login);
					$("#users #users-list tr#"+login+" td:first-child").html(fname+" "+lname);
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error Updating User !" });
				}

				UIkit.modal("#modal-edit-user").hide();
				ResetEditUserModal();
				PermissionsList = [];
				TypeList = [];
			})
			.fail(function()
			{
				$.growl.error({ message: "Oops, There was an Error! Please Try Again." });
				UIkit.modal("#modal-edit-user").hide();
				ResetEditUserModal();
				PermissionsList = [];
				TypeList = [];
			});
		}
	});

	/* Cancel Edit User */
	$("#modal-edit-user button.uk-modal-close").click(function()
	{
		UIkit.modal("#modal-edit-user").hide();
		ResetEditUserModal();
		PermissionsList = [];
		TypeList = [];
	});
});
/* Delete User */
$(function()
{
	var login;

	$("#users #users-list").off("click").on("click", "img.delete", function()
	{
		login = $(this).parent().parent().attr("id");
		$("#modal-delete-user h2.uk-modal-title span").html($("#users-list tr#"+login+" td:first-child").html());
		UIkit.modal("#modal-delete-user").toggle(); // Show Modal
	});

	/* Confirm Delete User */
	$("#modal-delete-user #delete-user-confirm-btn").click(function()
	{
		$.ajax
		({
			url: "../php/delete_user.php",
			type: "POST",
			dataType: "json",
			data: {login: login},
		})
		.done(function(response)
		{
			UIkit.modal("#modal-delete-user").hide(); // Hide Modal

			if (response.result)
			{
				$("#users-list tr#"+login).remove();
				$.growl.notice({ message: "User has been Successfully Deleted!" }); // Success Notification

				if ($("#users #users-list table tbody").find("tr").length == 0)
				{
					$("#users #users-list table").empty();
					$("#users #users-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem;'><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Users Found !</th></tr></thead>");
				}
			}
			else
			{
				$.growl.error({ message: "Failed to Delete the User <span style='color: var(--secondary-color)'>"+$("#users-list tr#"+login+" td:first-child").html()+"</span>, Please Try Again !" });
			}
		})
		.fail(function()
		{
			UIkit.modal("#modal-delete-user").hide(); // Hide Modal
			$.growl.error({ message: "Failed to Delete the User <span style='color: var(--secondary-color)'>"+$("#users-list tr#"+login+" td:first-child").html()+"</span>, Please Try Again !" });
		});
	});
});
/*=========================
		History
=========================*/
/* Load Users into Users List */
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_ADMIN_SECTION") == "#history-btn")
	{
		LoadHistory();
	}

	$("#history-btn, #mobile-history-btn").click(function()
	{
		LoadHistory();
	});
});
/* Load History into Website by Searching */
$(function()
{
	$("#search-history").click(function(e)
	{
		e.preventDefault();

		var start_date = $("#history-start-date").val();
		var end_date = $("#history-end-date").val();
		var start_time = $("#history-start-time").val();
		var end_time = $("#history-end-time").val();

		$.ajax
		({
			url: "../php/search_history.php",
			type: "POST",
			dataType: "json",
			data: {start_date: start_date, end_date: end_date, start_time: start_time, end_time: end_time},
		})
		.done(function(response)
		{
			// Empty The Hisotry List
			$("#history #history-list table").empty();

			var len = response.length;

			if (len != 0)
			{
				$("#history #history-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th>Login</th><th>Date</th><th>Time</th><th>History</th></thead><tbody></tbody>");

				for (var i = 0; i < len; i++)
				{
					var history = "";

					switch (response[i].type)
					{
						case "CONNECT":
								history = "<span style='color: var(--blue-color);'>"+response[i].opt+"</span> Connected";
							break;
						case "DISCONNECT":
								history = "<span style='color: var(--blue-color);'>"+response[i].opt+"</span> Disconnected";
							break;
						case "ON":
								switch (response[i].data)
								{
									case "DEVICE":
										var type = response[i].opt.slice(0, 1);
									var option = response[i].opt.slice(1, response[i].opt.length);
									var place = "";
									if (type == "R") {place = "Room"} else if (type == "G") {place = "Group"} else if (type == "S") {place = "Scene"}
									var pin = option.substring(0, option.indexOf(":"));
									var name = option.substring(option.indexOf(":")+1, option.length);

									history = "Turned on Device Pin N° <span style='color: var(--blue-color);'>"+pin+"</span> in <span style='color: var(--blue-color);'>"+name+"</span> "+place;
									break;
									case "GROUP":
										var name = response[i].opt.substring(0, response[i].opt.indexOf(":"));
										var room = response[i].opt.substring(response[i].opt.indexOf(":")+1, response[i].opt.length);

										history = "Turned on <span style='color: var(--blue-color);'>"+name+"</span> Group in <span style='color: var(--blue-color);'>"+room+"</span> Room";
									break;
									case "SCENE":
										var name = response[i].opt;

										history = "Activated <span style='color: var(--blue-color);'>"+name+"</span> Scene'>";
									break;
								}
							break;
						case "OFF":
								switch (response[i].data)
								{
									case "DEVICE":
										var type = response[i].opt.slice(0, 1);
										var option = response[i].opt.slice(1, response[i].opt.length);
										var place = "";
										if (type == "R") {place = "Room"} else if (type == "G") {place = "Group"} else if (type == "S") {place = "Scene"}
										var pin = option.substring(0, option.indexOf(":"));
										var name = option.substring(option.indexOf(":")+1, option.length);

										history = "Turned off Device Pin N° <span style='color: var(--blue-color);'>"+pin+"</span> in <span style='color: var(--blue-color);'>"+name+"</span> "+place;
									break;
									case "GROUP":
										var name = response[i].opt.substring(0, response[i].opt.indexOf(":"));
										var room = response[i].opt.substring(response[i].opt.indexOf(":")+1, response[i].opt.length);

										history = "Turned off <span style='color: var(--blue-color);'>"+name+"</span> Group in <span style='color: var(--blue-color);'>"+room+"</span> Room";
									break;
									case "SCENE":
										var name = response[i].opt;

										history = "Desactivated <span style='color: var(--blue-color);'>"+name+"</span> Scene'>";
									break;
								}
							break;
						case "ADD":
								switch (response[i].data)
								{
									case "USER":
										history = "Added New User <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "CARD":
										history = "Added New Card <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "FLOOR":
										history = "Added New Floor <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "ROOM":
										history = "Added New Room <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "GROUP":
										history = "Added New Group <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "SCENE":
										history = "Added New Scene <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
								}
							break;
						case "EDIT":
								switch (response[i].data)
								{
									case "USER":
										history = "Changed Name to <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
								}
							break;
						case "DELETE":
								switch (response[i].data)
								{
									case "USER":
										history = "Deleted User <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "CARD":
										history = "Deleted Card <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "FLOOR":
										history = "Deleted Floor <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "ROOM":
										history = "Deleted Room <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "GROUP":
										history = "Deleted Group <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
									case "SCENE":
										history = "Deleted Scene <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
									break;
								}
							break;
					}

					$("#history #history-list table tbody").append("<tr class='uk-animation-scale-down uk-text-center'><td>"+response[i].user+"</td><td>"+ConverteDateFormat(response[i].date)+"</td><td>"+response[i].time+"</td><td>"+history+"</td></tr>");
				}	
			}
			else
			{
				$("#history #history-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem;'><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No History Found !</th></tr></thead>");
			}
		})
		.fail(function()
		{
			$("#history #history-list table").empty();
			$("#history #history-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem; color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Hisotry !</th></tr></thead>");
		});
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
/*=========================
		Support
=========================*/
/* Send Message */
$(function()
{
	$("#contact-submit-btn").click(function()
	{
		var email = $("#contact-email").val();
		var message = $("#contact-message").val();

		if (!email)
		{
			$("#contact-email").css("border-color", "#F0506E");
			$("#contact-email-error").show();
		}
		else
		{
			$("#contact-email").css("border-color", "var(--secondary-color)");
			$("#contact-email-error").hide();
		}

		if (!message)
		{
			$("#contact-message").css("border-color", "#F0506E");
			$("#contact-message-error").show();
		}
		else
		{
			$("#contact-message").css("border-color", "var(--secondary-color)");
			$("#contact-message-error").hide();
		}

		// Send Message
		if (email && message)
		{
			$.ajax
			({
				url: "../php/send_message.php",
				type: "POST",
				dataType: "json",
				data: {email: email, message: message},
			})
			.done(function(response)
			{
				ResetContactForm();

				if (response.result)
				{
					$.growl.notice({ message: "Your Message has been Successfully Sent!" });
				}
				else
				{
					$.growl.error({ message: "Oops, There was an Error Sending Your Message !" });
				}
			})
			.fail(function()
			{
				$.growl.error({ message: "Oops, There was an Error Sending Your Message !" });
				ResetContactForm();
			});
				
		}
	});
});
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
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
			$("#lights #lights-room-groups").empty();
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Floor !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#lights table#lights-room-devices tbody").empty();
		$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Floors !</th></tr>");
		$("#lights #lights-room-groups").empty();
		$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
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
			setTimeout("LoadGroupsLightsSection("+room+")", 200);
		}
		else
		{
			$("#lights table#lights-room-devices tbody").empty();
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
			$("#lights #lights-room-groups").empty();
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Floor !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}

	})
	.fail(function()
	{
		$("#lights #lights-room-name").html(); // Remove Room Name if it is Displayed
		$("#lights #lights-room-devices-number").html(); // Remove Devices Number if it is Displayed
		$("#lights #lights-room table#lights-room-devices tbody").empty();
		$("#lights #lights-room table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Rooms !</th></tr>");
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
		setTimeout("LoadGroupsLightsSection("+room+")", 200);
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
				var tooltip = "Type <span>"+response[i].type+"</span><br>Watts <span>"+response[i].power+"</span><br>Card <span>"+response[i].card+"</span><br>Card IP <span>"+response[i].ip+"</span><br>Card Pin <span>"+response[i].pin+"</span>";
				$("#lights table#lights-room-devices tbody td#"+response[i].lin+"-"+response[i].col).attr("class", "device");
				$("#lights table#lights-room-devices tbody td#"+response[i].lin+"-"+response[i].col+" div").html("<img id='"+response[i].id+"' class='"+response[i].status+"' src='../images/devices/"+response[i].type+"_"+response[i].status+".png' width='50' height='50' uk-tooltip='"+tooltip+"'>");
			}
		}
		else
		{
			$("#lights #lights-room-devices-number").html("0 Devices"); // Display Number of Devices to 0
			$("#lights table#lights-room-devices tbody").empty();
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Devices Found in This Room !<br><small>Make Sure You Add Devices...</small></th></tr>");
		}
	})
	.fail(function()
	{
		$("#lights table#lights-room-devices tbody").empty();
		$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Devices !</th></tr>");
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
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Room !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#lights #lights-room-groups").empty();
		$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
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
			$("#groups #groups-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#groups #groups-list").empty();
		$("#groups #groups-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
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
						// Change Status to Opposite
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
/* Load Rooms Related to a Floor Function Add Group Modal */
function LoadRoomsAddGroupsSection(floor)
{
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
		$("#modal-add-group #add-group-room table").empty();

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				$("#add-group-search-room").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
			}

			// Get Selected Option Value
			var room = $("#add-group-search-room").val();
			// Display The Selected Room's Devices in Group Add Section
			DisplayDevicesAddGroupsSection(room);
			// Load Divces Already in Groups to the selected Room
			setTimeout("LoadReservedDevicesAddGroupsSection("+room+")", 200);
		}
		else
		{
			$("#modal-add-group #add-group-room table").empty();
			$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-add-group #add-group-room table").empty();
		$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Rooms !</th></tr>");
	});

	$("#add-group-search-room").change(function()
	{
		// Get Selected Option Value
		var room = $("#add-group-search-room").val();
		// Empty The Devices Display Room
		$("#modal-add-group #add-group-room table").empty();
		// Display The Selected Room's Devices
		DisplayDevicesAddGroupsSection(room);
		// Load Divces Already in Groups to the selected Room
		setTimeout("LoadReservedDevicesAddGroupsSection("+room+")", 200);
	});
}
/* Load Devices Related to a Room Function Add Group Modal */
function DisplayDevicesAddGroupsSection(room)
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
		var len = response.length;
		$("#modal-add-group #add-group-room table").empty();

		if (len != 0)
		{
			var width = response[0].width; // Get Room Width
			var height = response[0].height; // Get Room Height

			for (var line = 1; line <= height; line++)
			{
				$("#modal-add-group #add-group-room table").append("<tr id='"+line+"' class='uk-animation-scale-down uk-text-center'></tr>");

				for (var column = 1; column <= width; column++)
				{
					$("#modal-add-group #add-group-room table tr#"+line).append("<td id='"+line+"-"+column+"'></td>");
				}
			}


			for (var i = 0; i < len; i++)
			{
				$("#modal-add-group #add-group-room table td#"+response[i].lin+"-"+response[i].col).html("<div class='device'><img id='"+response[i].id+"' src='../images/devices/"+response[i].type+"_ON.png' style='background-color: var(--device-color);' width='50' height='50'></div>");
			}
		}
		else
		{
			$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th class='uk-text-center'><img class='notfound' src='../images/icons/notfound.png' width='45' height='45'><br><br>No Devices Found in This Room !</th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-add-group #add-group-room table").empty();
		$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='45' height='45'><br><br>Failed to Load Devices !</th></tr>");
	});
}
/* Load Divces Already in Groups to the selected Room */
function LoadReservedDevicesAddGroupsSection(room)
{
	$.ajax
	({
		url: "../php/reserved_devices.php",
		type: "POST",
		dataType: "json",
		data: {room: room}
	})
	.done(function(response)
	{
		var len = response.length;

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				$("#modal-add-group #add-group-room table img#"+response[i].id).css("background-color", response[i].color);
			}
		}
	});
}
/* Reset Add Group Modal Function */
function ResetAddGroupModal()
{
	$("#add-group-name").val(""); // Clear Group Name
	$("#add-group-name").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-group-name-error").hide(); // Hide Error
	$("#add-group-color").val("#FFA200"); // Asign Orange as Group Color
	$("#modal-add-group #add-group-room table img.SELECTED").css("background-color", "var(--device-color");
	$("#modal-add-group #add-group-room table img.SELECTED").removeClass("SELECTED"); // Reset All Devices
	$("#add-group-search-floor").empty(); // Clear Floors List
	$("#add-group-search-room").empty(); // Clear Rooms List
}
/* Load Rooms Related to a Floor Function Edit Group Modal */
function LoadRoomsEditGroupsSection(floor)
{
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
				$("#edit-group-search-room").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
			}

			// Get Selected Option Value
			var room = $("#edit-group-search-room").val();
			// Empty The Devices Display Room
			$("#modal-edit-group #edit-group-room table").empty();
			// Display The Selected Room's Devices in Group Edit Section
			DisplayDevicesEditGroupsSection(room);
		}
		else
		{
			$("#modal-edit-group #edit-group-room table").empty();
			$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
		}

	})
	.fail(function()
	{
		$("#modal-edit-group #edit-group-room table").empty();
		$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Rooms !</th></tr>");
	});

	/* When Changing Rooms Select */
	$("#edit-group-search-room").change(function()
	{
		// Get Selected Option Value
		var room = $("#edit-group-search-room").val();
		// Empty The Rooms List
		$("#modal-edit-group #edit-group-room table").empty();
		// Load Rooms corresponding to the selected Floor
		DisplayDevicesEditGroupsSection(room);
	});
}
/* Load Devices Related to a Room Function Add Group Modal */
function DisplayDevicesEditGroupsSection(room)
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
		var len = response.length;
		$("#modal-edit-group #edit-group-room table").empty();

		if (len != 0)
		{
			var width = response[0].width; // Get Room Width
			var height = response[0].height; // Get Room Height

			for (var line = 1; line <= height; line++)
			{
				$("#modal-edit-group #edit-group-room table").append("<tr id='"+line+"' class='uk-animation-scale-down uk-text-center'></tr>");

				for (var column = 1; column <= width; column++)
				{
					$("#modal-edit-group #edit-group-room table tr#"+line).append("<td id='"+line+"-"+column+"'></td>");
				}
			}

			for (var i = 0; i < len; i++)
			{
				$("#modal-edit-group #edit-group-room table td#"+response[i].lin+"-"+response[i].col).html("<div class='device'><img id='"+response[i].id+"' src='../images/devices/"+response[i].type+"_ON.png' style='background-color: var(--device-color);' width='50' height='50'></div>");
			}
		}
		else
		{
			$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th class='uk-text-center'><img class='notfound' src='../images/icons/notfound.png' width='45' height='45'><br><br>No Devices Found in This Room !</th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-edit-group #edit-group-room table").empty();
		$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='45' height='45'><br><br>Failed to Load Devices !</th></tr>");
	});
}
/* Reset Edit Group Modal Function */
function ResetEditGroupModal()
{
	$("#edit-group-name").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#edit-group-name-error").hide(); // Hide Error
	$("#modal-edit-group #edit-group-room table img.SELECTED").css("background-color", "var(--device-color"); // Reset Devices Color
	$("#modal-edit-group #edit-group-room table img.SELECTED").removeClass("SELECTED"); // Reset All Devices
	$("#edit-group-search-floor").empty(); // Clear Floors List
	$("#edit-group-search-room").empty(); // Clear Rooms List
}
/*==================================================
		Scenes Section Functions
==================================================*/
/* Display Scenes List in Scenes Section */
function DisplayScenesList()
{
	$.ajax
	({
		url: "../php/scenes.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		// Empty The Scenes List
		$("#scenes #scenes-list").empty();

		var len = response.length;

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				var id = response[i].id; // Get Scenes ID
				var name = response[i].name; // Get Scenes Name
				var time = response[i].start.slice(0,5) + " - " + response[i].stop.slice(0,5);// Get Scene Working Time
				var days = response[i].days; // Get Scenes Working Days
				var status = response[i].status; // Get Scenes Status
				var devices = response[i].devices; // Get Scenes Devices Number
				var checked = "checked";
				var shadow = "uk-box-shadow-medium";
				var bgcolor = "var(--text-color)";
				var days_routine = "";

				if (status == "OFF")
				{
					shadow = "";
					bgcolor = "var(--secondary-color)";
					checked = "";
				}

				// Which days the scenes working on
				if (days == "0")
				{
					days_routine = "S M T W T F S";
				}
				else
				{
					if (days.includes("1")) { days_routine += "<span class='working'>S</span> "; } else { days_routine += "S "; }
					if (days.includes("2")) { days_routine += "<span class='working'>M</span> "; } else { days_routine += "M "; }
					if (days.includes("3")) { days_routine += "<span class='working'>T</span> "; } else { days_routine += "T "; }
					if (days.includes("4")) { days_routine += "<span class='working'>W</span> "; } else { days_routine += "W "; }
					if (days.includes("5")) { days_routine += "<span class='working'>T</span> "; } else { days_routine += "T "; }
					if (days.includes("6")) { days_routine += "<span class='working'>F</span> "; } else { days_routine += "F "; }
					if (days.includes("7")) { days_routine += "<span class='working'>S</span>"; } else { days_routine += "S"; }
				}

				// Display Scenes
				$("#scenes #scenes-list").append("<article id='"+id+"' class='uk-comment scene-details uk-margin-small-top uk-animation-scale-down "+shadow+"'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right' uk-grid><div class='uk-width-expand'><h4 class='uk-comment-title uk-margin-remove' style='color: "+bgcolor+";'>"+name+"</h4><div uk-grid><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top'>"+time+"</h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top uk-text-center'><div class='devices'>"+devices+" Devices</div></h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top uk-text-right'><div class='days'>"+days_routine+"</div></h6></div></div></div><div class='uk-width-auto uk-text-right uk-margin-small-right'><label class='uk-switch'><input type='checkbox' class='control-group-button' "+checked+"><div class='uk-switch-slider'></div></label></div></header></article>");
			}
		}
		else
		{
			$("#scenes #scenes-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Scenes Found !<br><small>Make Sure You Add Scenes...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#scenes #scenes-list").empty();
		$("#scenes #scenes-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Scenes !</th></tr></table>");
	});
}
/* Load Rooms Related to a Floor Function Add Scene Modal */
function LoadRoomsAddSceneSection(floor)
{
	$.ajax
	({
		url: "../php/rooms.php",
		type: "POST",
		dataType: "json",
		data: {floor: floor}
	})
	.done(function(response)
	{
		/* Load Rooms Related to a Floor Function Add Scene Modal */
		var len = response.length;
		$("#modal-add-scene #add-scene-room table").empty();

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				$("#add-scene-search-room").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
			}

			// Get Selected Option Value
			var room = $("#add-scene-search-room").val();
			// Display The Selected Room's Devices in Scene Add Section
			DisplayDevicesAddSceneSection(room);
			// Load Room Groups of the selected Room
			setTimeout("LoadGroupsAddSceneSection("+room+")", 200);
		}
		else
		{
			$("#modal-add-scene #add-scene-room table").empty();
			$("#modal-add-scene #add-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-add-scene #add-scene-room table").empty();
		$("#modal-add-scene #add-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Rooms !</th></tr>");
	});

	$("#add-scene-search-room").change(function()
	{
		// Get Selected Option Value
		var room = $("#add-scene-search-room").val();
		// Empty The Devices Display Room
		$("#modal-add-scene #add-scene-room table").empty();
		// Display The Selected Room's Devices
		DisplayDevicesAddSceneSection(room);
		// Load Room Groups of the selected Room
		setTimeout("LoadGroupsAddSceneSection("+room+")", 200);
	});
}
/* Load Devices Related to a Room Function Add Scene Modal */
function DisplayDevicesAddSceneSection(room)
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
		var len = response.length;
		$("#modal-add-scene #add-scene-room table").empty();

		if (len != 0)
		{
			var width = response[0].width; // Get Room Width
			var height = response[0].height; // Get Room Height

			for (var line = 1; line <= height; line++)
			{
				$("#modal-add-scene #add-scene-room table").append("<tr id='"+line+"' class='uk-animation-scale-down uk-text-center'></tr>");

				for (var column = 1; column <= width; column++)
				{
					$("#modal-add-scene #add-scene-room table tr#"+line).append("<td id='"+line+"-"+column+"'></td>");
				}
			}


			for (var i = 0; i < len; i++)
			{
				$("#modal-add-scene #add-scene-room table td#"+response[i].lin+"-"+response[i].col).html("<div class='device'><img id='"+response[i].id+"' src='../images/devices/"+response[i].type+"_ON.png' style='background-color: var(--device-color);' width='50' height='50'></div>");
			}
		}
		else
		{
			$("#modal-add-scene #add-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th class='uk-text-center'><img class='notfound' src='../images/icons/notfound.png' width='45' height='45'><br><br>No Devices Found in This Room !</th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-add-scene #add-scene-room table").empty();
		$("#modal-add-scene #add-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='45' height='45'><br><br>Failed to Load Devices !</th></tr>");
	});
}
/* Load Room Groups of the selected Room */
function LoadGroupsAddSceneSection(room)
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

		$("#modal-add-scene #add-scene-room img").css("border-color", "var(--text-color)");

		if (len != 0)
		{
			$("#modal-add-scene #add-scene-group").empty(); // Empty Groups

			var groups = [];
			var groupsid = [];
			var bgcolor;

			for (var i = 0; i < len; i++)
			{
				$("#modal-add-scene #add-scene-room img#"+response[i].device).css("border-color", response[i].color);
				$("#modal-add-scene #add-scene-room img#"+response[i].device).addClass("G"+response[i].id);

				if (!groupsid.includes(response[i].id))
				{
					groups.push(response[i].name);
					groupsid.push(response[i].id);
					bgcolor = "var(--primary-color)";

					$("#modal-add-scene #add-scene-group").append("<button id='"+response[i].id+"' class='uk-button uk-width-small uk-animation-scale-down' style='background-color: "+bgcolor+"; border-color: "+response[i].color+"'><span>"+response[i].name+"</span></button>");
				}
			}

			groups = [];
			groupsid = [];
		}
		else
		{
			$("#modal-add-scene #add-scene-group").empty();
			$("#modal-add-scene #add-scene-group").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Room !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#modal-add-scene #add-scene-group").empty();
		$("#modal-add-scene #add-scene-group").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
	});
}
/* Reset Add Scene Modal Function */
function ResetAddSceneModal()
{
	$("#add-scene-name").val(""); // Clear Scene Name
	$("#add-scene-name").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-scene-name-error").hide(); // Hide Error

	$("#add-scene-time-start").val(""); // Clear Scene Time Start
	$("#add-scene-time-start").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-scene-time-start-error").hide(); // Hide Error

	$("#add-scene-time-end").val(""); // Clear Scene Time End
	$("#add-scene-time-end").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-scene-time-end-error").hide(); // Hide Error

	$("#modal-add-scene div.add-scene-days-work span.SELECTED").removeClass("SELECTED");

	$("#add-scene-days-work-error").hide(); // Hide Error

	$("#modal-add-scene #add-scene-room table img.SELECTED").css("background-color", "var(--device-color");
	$("#modal-add-scene #add-scene-room table img.SELECTED").removeClass("SELECTED"); // Reset All Devices

	$("#modal-add-scene #add-scene-group button.SELECTED").css("background-color", "var(--device-color");
	$("#modal-add-scene #add-scene-group button.SELECTED").removeClass("SELECTED"); // Reset All Groups

	$("#add-scene-search-floor").empty(); // Clear Floors List
	$("#add-scene-search-room").empty(); // Clear Rooms List
}
/* Load Rooms Related to a Floor Function Edit Scene Modal */
function LoadRoomsEditSceneSection(floor)
{
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
				$("#edit-scene-search-room").append("<option value='"+response[i].id+"'>"+response[i].name+"</option>");
			}

			// Get Selected Option Value
			var room = $("#edit-scene-search-room").val();
			// Empty The Devices Display Room
			$("#modal-edit-scene #edit-scene-room table").empty();
			// Display The Selected Room's Devices in Scene Edit Section
			DisplayDevicesEditSceneSection(room);
			// Load Room Groups of the selected Room
			setTimeout("LoadGroupsEditSceneSection("+room+")", 200);
		}
		else
		{
			$("#modal-edit-scene #edit-scene-room table").empty();
			$("#modal-edit-scene #edit-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
		}

	})
	.fail(function()
	{
		$("#modal-edit-scene #edit-scene-room table").empty();
		$("#modal-edit-scene #edit-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Rooms !</th></tr>");
	});

	/* When Changing Rooms Select */
	$("#edit-scene-search-room").change(function()
	{
		// Get Selected Option Value
		var room = $("#edit-scene-search-room").val();
		// Empty The Rooms List
		$("#modal-edit-scene #edit-scene-room table").empty();
		// Load Rooms corresponding to the selected Floor
		DisplayDevicesEditSceneSection(room);
		// Load Room Groups of the selected Room
		setTimeout("LoadGroupsEditSceneSection("+room+")", 200);
	});
}
/* Load Devices Related to a Room Function Add Scene Modal */
function DisplayDevicesEditSceneSection(room)
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
		var len = response.length;
		$("#modal-edit-scene #edit-scene-room table").empty();

		if (len != 0)
		{
			var width = response[0].width; // Get Room Width
			var height = response[0].height; // Get Room Height

			for (var line = 1; line <= height; line++)
			{
				$("#modal-edit-scene #edit-scene-room table").append("<tr id='"+line+"' class='uk-animation-scale-down uk-text-center'></tr>");

				for (var column = 1; column <= width; column++)
				{
					$("#modal-edit-scene #edit-scene-room table tr#"+line).append("<td id='"+line+"-"+column+"'></td>");
				}
			}

			for (var i = 0; i < len; i++)
			{
				$("#modal-edit-scene #edit-scene-room table td#"+response[i].lin+"-"+response[i].col).html("<div class='device'><img id='"+response[i].id+"' src='../images/devices/"+response[i].type+"_ON.png' style='background-color: var(--device-color);' width='50' height='50'></div>");
			}
		}
		else
		{
			$("#modal-edit-scene #edit-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th class='uk-text-center'><img class='notfound' src='../images/icons/notfound.png' width='45' height='45'><br><br>No Devices Found in This Room !</th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-edit-scene #edit-scene-room table").empty();
		$("#modal-edit-scene #edit-scene-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='45' height='45'><br><br>Failed to Load Devices !</th></tr>");
	});
}
/* Load Room Groups of the selected Room */
function LoadGroupsEditSceneSection(room)
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

		$("#modal-edit-scene #edit-scene-room img").css("border-color", "var(--text-color)");

		if (len != 0)
		{
			$("#modal-edit-scene #edit-scene-group").empty(); // Empty Groups

			var groups = [];
			var groupsid = [];
			var bgcolor;

			for (var i = 0; i < len; i++)
			{
				$("#modal-edit-scene #edit-scene-room img#"+response[i].device).css("border-color", response[i].color);
				$("#modal-edit-scene #edit-scene-room img#"+response[i].device).addClass("G"+response[i].id);

				if (!groupsid.includes(response[i].id))
				{
					groupsid.push(response[i].id);
					groups.push(response[i].name);
					bgcolor = "var(--primary-color)";

					$("#modal-edit-scene #edit-scene-group").append("<button id='"+response[i].id+"' class='uk-button uk-width-small uk-animation-scale-down' style='background-color: "+bgcolor+"; border-color: "+response[i].color+"'><span>"+response[i].name+"</span></button>");
				}
			}

			setTimeout(function()
			{

				for(var i = 0; i < groupsid.length; i++)
				{
					var breakOut = true;
					$("#modal-edit-scene #edit-scene-room table img.G"+groupsid[i]).each(function(index, value)
					{
						if (!$(this).hasClass("SELECTED"))
						{
							breakOut = false;
							return false;
						}
					});

					if (breakOut)
					{
						$("#modal-edit-scene #edit-scene-group button#"+groupsid[i]).addClass("SELECTED");
						$("#modal-edit-scene #edit-scene-group button#"+groupsid[i]).css("background-color", $("#modal-edit-scene #edit-scene-group button#"+groupsid[i]).css("border-color"));
					}
				}

				groups = [];
				groupsid = [];

			}, 400);
		}
		else
		{
			$("#modal-edit-scene #edit-scene-group").empty();
			$("#modal-edit-scene #edit-scene-group").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Groups Found in This Room !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#modal-edit-scene #edit-scene-group").empty();
		$("#modal-edit-scene #edit-scene-group").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Groups !</th></tr></table>");
	});
}
/* Reset Edit Scene Modal Function */
function ResetEditSceneModal()
{
	$("#edit-scene-name").val(""); // Clear Scene Name
	$("#edit-scene-name").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#edit-scene-name-error").hide(); // Hide Error

	$("#edit-scene-time-start").val(""); // Clear Scene Time Start
	$("#edit-scene-time-start").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#edit-scene-time-start-error").hide(); // Hide Error

	$("#edit-scene-time-end").val(""); // Clear Scene Time End
	$("#edit-scene-time-end").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#edit-scene-time-end-error").hide(); // Hide Error

	$("#modal-edit-scene div.edit-scene-days-work span.SELECTED").removeClass("SELECTED");

	$("#edit-scene-days-work-error").hide(); // Hide Error

	$("#modal-edit-scene #edit-scene-room table img.SELECTED").css("background-color", "var(--device-color");
	$("#modal-edit-scene #edit-scene-room table img.SELECTED").removeClass("SELECTED"); // Reset All Devices

	$("#modal-edit-scene #edit-scene-group button.SELECTED").css("background-color", "var(--device-color");
	$("#modal-edit-scene #edit-scene-group button.SELECTED").removeClass("SELECTED"); // Reset All Groups

	$("#edit-scene-search-floor").empty(); // Clear Floors List
	$("#edit-scene-search-room").empty(); // Clear Rooms List
}
/*==================================================
		Statistics Section Functions
==================================================*/
/* Calculate Weekly Consumption Stats */
function LoadWeeklyStats()
{
	if (chartInstance != null)
	{
		chartInstance.destroy();
	}

	if (chartInstance_bar != null)
	{
		chartInstance_bar.destroy();
	}

	/* First Chart Data */
	var data  =
	{
		labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		datasets:
		[{
			label: "kWh",
			data: [0, 0, 0, 0, 0, 0, 0],
			backgroundColor: gradient,
			borderColor: "rgba(6, 133, 213, 0.75)",
			labelText: "Creative Thinking",
			pointBackgroundColor: "rgba(6, 133, 213, 1)",
			pointHoverRadius: 4,
			pointRadius: 4,
		}],
	};
	/* Second Chart Data */
	var data_bar  =
	{
		labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		datasets:
		[{
			label: "kWh",
			data: [0, 0, 0, 0, 0, 0, 0],
			backgroundColor: gradient_bar,
			labelText: "Creative Thinking",
		}],
	};
	/* Charts Options */
	var options =
	{
		legend: {display: false},
		responsive: true,
		maintainAspectRatio: true,
		animation: {easing: "easeInOutQuad", duration: 520},
		elements: {line: {tension: 0.4}},
		layout: {padding: { left: 20, right: 10, bottom: 0, top: 0}},
		scales: {yAxes: [{ticks: {beginAtZero: true}}]},
		tooltips: {backgroundColor: "rgba(0, 0, 0, 0.7)", titleAlign: "center", bodyAlign: "center", caretPadding: 10, displayColors: false, xPadding: 40, yPadding: 10, animationEnabled: true,
			callbacks:
			{
				title: function(tooltipItems, data)
				{
					var day;

					switch (tooltipItems[0].xLabel)
					{
						case "Sun":
								day = "Sunday";
							break;
						case "Mon":
								day = "Monday";
							break;
						case "Tue":
								day = "Tuesday";
							break;
						case "Wed":
								day = "Wednesday";
							break;
						case "Thu":
								day = "Thursday";
							break;
						case "Fri":
								day = "Friday";
							break;
						case "Sat":
								day = "Saturday";
							break;
					}

					return day;
				},
				label: function(tooltipItem, data)
				{
					return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "  kWh";
				}
			}
		}
	};

	$.ajax
	({
		url: "../php/week_stats.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		var len = response.length;

		if (len != 0)
		{
			var now = new Date();
			var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			var tod = formatDate(today);
			var lastSunday = new Date(today.setDate(today.getDate()-today.getDay()));

			var sun = formatDate(lastSunday);
			var mon = formatDate(lastSunday.setDate(lastSunday.getDate() + 1));
			var tue = formatDate(lastSunday.setDate(lastSunday.getDate() + 1));
			var wed = formatDate(lastSunday.setDate(lastSunday.getDate() + 1));
			var thu = formatDate(lastSunday.setDate(lastSunday.getDate() + 1));
			var fri = formatDate(lastSunday.setDate(lastSunday.getDate() + 1));
			var sat = formatDate(lastSunday.setDate(lastSunday.getDate() + 1));

			var SundayHistoryArray = [];
			var MondayHistoryArray = [];
			var TuesdayHistoryArray = [];
			var WednesdayHistoryArray = [];
			var ThursdayHistoryArray = [];
			var FridayHistoryArray = [];
			var SaturdayHistoryArray = [];

			for (var i = 0; i < len; i++)
			{
				switch (response[i].date)
				{
					case sun:
							SundayHistoryArray.push(response[i]);
						break;
					case mon:
							MondayHistoryArray.push(response[i]);
						break;
					case tue:
							TuesdayHistoryArray.push(response[i]);
						break;
					case wed:
							WednesdayHistoryArray.push(response[i]);
						break;
					case thu:
							ThursdayHistoryArray.push(response[i]);
						break;
					case fri:
							FridayHistoryArray.push(response[i]);
						break;
					case sat:
							SaturdayHistoryArray.push(response[i]);
						break;
				}
			}

			var SundayConsumption = CalculateWattsConsumptionDay(SundayHistoryArray);
			var MondayConsumption = CalculateWattsConsumptionDay(MondayHistoryArray);
			var TuesdayConsumption = CalculateWattsConsumptionDay(TuesdayHistoryArray);
			var WednesdayConsumption = CalculateWattsConsumptionDay(WednesdayHistoryArray);
			var ThursdayConsumption = CalculateWattsConsumptionDay(ThursdayHistoryArray);
			var FridayConsumption = CalculateWattsConsumptionDay(FridayHistoryArray);
			var SaturdayConsumption = CalculateWattsConsumptionDay(SaturdayHistoryArray);
			/* First Chart Data */
			data  =
			{
				labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				datasets:
				[{
					label: "kWh",
					data: [SundayConsumption, MondayConsumption, TuesdayConsumption, WednesdayConsumption, ThursdayConsumption, FridayConsumption, SaturdayConsumption],
					backgroundColor: gradient,
					borderColor: "rgba(6, 133, 213, 0.75)",
					labelText: "Creative Thinking",
					pointBackgroundColor: "rgba(6, 133, 213, 1)",
					pointHoverRadius: 4,
					pointRadius: 4,
				}],
			};
			/* Second Chart Data */
			data_bar  =
			{
				labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				datasets:
				[{
					label: "kWh",
					data: [SundayConsumption, MondayConsumption, TuesdayConsumption, WednesdayConsumption, ThursdayConsumption, FridayConsumption, SaturdayConsumption],
					backgroundColor: gradient_bar,
					labelText: "Creative Thinking",
				}],
			};

			var today_cons = 0;
			var week_cons = SundayConsumption + MondayConsumption + TuesdayConsumption + WednesdayConsumption + ThursdayConsumption + FridayConsumption + SaturdayConsumption;
			var today_price = 0;
			var week_price = CalculateConsumptionPrice(week_cons);

			switch (tod)
			{
				case sun:
						today_cons = SundayConsumption;
						today_price = CalculateConsumptionPrice(SundayConsumption);
					break;
				case mon:
						today_cons = MondayConsumption;
						today_price = CalculateConsumptionPrice(MondayConsumption);
					break;
				case tue:
						today_cons = TuesdayConsumption;
						today_price = CalculateConsumptionPrice(TuesdayConsumption);
					break;
				case wed:
						today_cons = WednesdayConsumption;
						today_price = CalculateConsumptionPrice(WednesdayConsumption);
					break;
				case thu:
						today_cons = ThursdayConsumption;
						today_price = CalculateConsumptionPrice(ThursdayConsumption);
					break;
				case fri:
						today_cons = FridayConsumption;
						today_price = CalculateConsumptionPrice(FridayConsumption);
					break;
				case sat:
						today_cons = SaturdayConsumption;
						today_price = CalculateConsumptionPrice(SaturdayConsumption);
					break;
			}

			$("#statistics #today-usage").html(today_cons);
			$("#statistics #week-usage").html(week_cons);
			$("#statistics #today-price").html(today_price);
			$("#statistics #week-price").html(week_price);

			$("#statistics #stats-table tbody").append("<tr><td>Sunday</td><td>"+SundayConsumption+" kWh</td><td>"+CalculateConsumptionPrice(SundayConsumption)+" DT</td></tr><tr><td>Monday</td><td>"+MondayConsumption+" kWh</td><td>"+CalculateConsumptionPrice(MondayConsumption)+" DT</td></tr><tr><td>Tuesday</td><td>"+TuesdayConsumption+" kWh</td><td>"+CalculateConsumptionPrice(TuesdayConsumption)+" DT</td></tr><tr><td>Wednesday</td><td>"+WednesdayConsumption+" kWh</td><td>"+CalculateConsumptionPrice(WednesdayConsumption)+" DT</td></tr><tr><td>Thursday</td><td>"+ThursdayConsumption+" kWh</td><td>"+CalculateConsumptionPrice(ThursdayConsumption)+" DT</td></tr><tr><td>Friday</td><td>"+FridayConsumption+" kWh</td><td>"+CalculateConsumptionPrice(FridayConsumption)+" DT</td></tr><tr><td>Saturday</td><td>"+SaturdayConsumption+" kWh</td><td>"+CalculateConsumptionPrice(SaturdayConsumption)+" DT</td></tr>");
		}
		else
		{
			$("#statistics #stats-table tbody").append("<tr><td>Sunday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Monday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Tuesday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Wednesday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Thursday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Friday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Saturday</td><td>0 kWh</td><td>0 DT</td></tr>");
		}

		chartInstance = new Chart(chart, {type: "line", data: data, options: options});
		chartInstance_bar = new Chart(chart_bar, {type: "bar", data: data_bar, options: options});
	})
	.fail(function()
	{
		$.growl.error({ message: "Failed to Load Week Statistics !" });

		chartInstance = new Chart(chart, {type: "line", data: data, options: options});
		chartInstance_bar = new Chart(chart_bar, {type: "bar", data: data_bar, options: options});

		$("#statistics #stats-table tbody").append("<tr><td>Sunday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Monday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Tuesday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Wednesday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Thursday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Friday</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Saturday</td><td>0 kWh</td><td>0 DT</td></tr>");
	});
}
/* Calculate Monthly Consumption Stats */
function LoadMonthlyStats()
{
	if (chartInstance != null)
	{
		chartInstance.destroy();
	}

	if (chartInstance_bar != null)
	{
		chartInstance_bar.destroy();
	}

	/* First Chart Data */
	var data  =
	{
		labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
		datasets:
		[{
			label: "kWh",
			data: [0, 0, 0, 0],
			backgroundColor: gradient,
			borderColor: "rgba(6, 133, 213, 0.75)",
			labelText: "Creative Thinking",
			pointBackgroundColor: "rgba(6, 133, 213, 1)",
			pointHoverRadius: 4,
			pointRadius: 4,
		}],
	};
	/* Second Chart Data */
	var data_bar  =
	{
		labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
		datasets:
		[{
			label: "kWh",
			data: [0, 0, 0, 0],
			backgroundColor: gradient_bar,
			labelText: "Creative Thinking",
		}],
	};
	/* Charts Data */
	var options =
	{
		legend: {display: false},
		responsive: true,
		maintainAspectRatio: true,
		animation: {easing: "easeInOutQuad", duration: 520},
		elements: {line: {tension: 0.4}},
		layout: {padding: { left: 20, right: 10, bottom: 0, top: 0}},
		scales: {yAxes: [{ticks: {beginAtZero: true}}]},
		tooltips: {backgroundColor: "rgba(0, 0, 0, 0.7)", titleAlign: "center", bodyAlign: "center", caretPadding: 10, displayColors: false, xPadding: 40, yPadding: 10, animationEnabled: true,
			callbacks:
			{
				label: function(tooltipItem, data)
				{
					return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "  kWh";
				}
			}
		}
	};

	$.ajax
	({
		url: "../php/month_stats.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		var len = response.length;

		if (len != 0)
		{
			var FirstWeekHistoryArray = [];
			var SecondWeekHistoryArray = [];
			var ThirdWeekHistoryArray = [];
			var FourthWeekHistoryArray = [];

			for (var i = 0; i < len; i++)
			{
				var ndays = response[i].date.slice(-2);

				switch (ndays)
				{
					case "01": case "02": case "03": case "04": case "05": case "06": case "07":
							FirstWeekHistoryArray.push(response[i]);
						break;
					case "08": case "09": case "10": case "11": case "12": case "13": case "14":
							SecondWeekHistoryArray.push(response[i]);
						break;
					case "15": case "16": case "17": case "18": case "19": case "20": case "21":
							ThirdWeekHistoryArray.push(response[i]);
						break;
					default:
							FourthWeekHistoryArray.push(response[i]);
						break;
				}
			}

			var FirstWeekConsumption = CalculateWattsConsumptionWeek(FirstWeekHistoryArray);
			var SecondWeekConsumption = CalculateWattsConsumptionWeek(SecondWeekHistoryArray);
			var ThirdWeekConsumption = CalculateWattsConsumptionWeek(ThirdWeekHistoryArray);
			var FourthWeekConsumption = CalculateWattsConsumptionWeek(FourthWeekHistoryArray);
			/* First Chart Data */
			data  =
			{
				labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
				datasets:
				[{
					label: "kWh",
					data: [FirstWeekConsumption, SecondWeekConsumption, ThirdWeekConsumption, FourthWeekConsumption],
					backgroundColor: gradient,
					borderColor: "rgba(6, 133, 213, 0.75)",
					labelText: "Creative Thinking",
					pointBackgroundColor: "rgba(6, 133, 213, 1)",
					pointHoverRadius: 4,
					pointRadius: 4,
				}],
			};
			/* Second Chart Data */
			data_bar  =
			{
				labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
				datasets:
				[{
					label: "kWh",
					data: [FirstWeekConsumption, SecondWeekConsumption, ThirdWeekConsumption, FourthWeekConsumption],
					backgroundColor: gradient_bar,
					labelText: "Creative Thinking",
				}],
			};

			var month_cons = FirstWeekConsumption + SecondWeekConsumption + ThirdWeekConsumption + FourthWeekConsumption;
			var month_price = CalculateConsumptionPrice(month_cons);

			$("#statistics #week-usage").html(month_cons);
			$("#statistics #week-price").html(month_price);

			$("#statistics #stats-table tbody").append("<tr><td>Week 1</td><td>"+FirstWeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(FirstWeekConsumption)+" DT</td></tr><tr><td>Week 2</td><td>"+SecondWeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(SecondWeekConsumption)+" DT</td></tr><tr><td>Week 3</td><td>"+ThirdWeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(ThirdWeekConsumption)+" DT</td></tr><tr><td>Week 4</td><td>"+FourthWeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(FourthWeekConsumption)+" DT</td></tr>");
		}
		else
		{
			$("#statistics #stats-table tbody").append("<tr><td>Week 1</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Week 2</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Week 3</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Week 4</td><td>0 kWh</td><td>0 DT</td></tr>");
		}

		chartInstance = new Chart(chart, {type: "line", data: data, options: options});
		chartInstance_bar = new Chart(chart_bar, {type: "bar", data: data_bar, options: options});
	})
	.fail(function()
	{
		$.growl.error({ message: "Failed to Load Month Statistics !" });

		chartInstance = new Chart(chart, {type: "line", data: data, options: options});
		chartInstance_bar = new Chart(chart_bar, {type: "bar", data: data_bar, options: options});

		$("#statistics #stats-table tbody").append("<tr><td>Week 1</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Week 2</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Week 3</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>Week 4</td><td>0 kWh</td><td>0 DT</td></tr>");
	});
}
/* Calculate Yearly Consumption Stats */
function LoadYearlyStats()
{
	if (chartInstance != null)
	{
		chartInstance.destroy();
	}

	if (chartInstance_bar != null)
	{
		chartInstance_bar.destroy();
	}

	/* First Chart Data */
	var data  =
	{
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets:
		[{
			label: "kWh",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			backgroundColor: gradient,
			borderColor: "rgba(6, 133, 213, 0.75)",
			labelText: "Creative Thinking",
			pointBackgroundColor: "rgba(6, 133, 213, 1)",
			pointHoverRadius: 4,
			pointRadius: 4,
		}],
	};
	/* Second Chart Data */
	var data_bar  =
	{
		labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		datasets:
		[{
			label: "kWh",
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			backgroundColor: gradient_bar,
			labelText: "Creative Thinking",
		}],
	};
	/* Charts Options */
	var options =
	{
		legend: {display: false},
		responsive: true,
		maintainAspectRatio: true,
		animation: {easing: "easeInOutQuad", duration: 520},
		elements: {line: {tension: 0.4}},
		layout: {padding: { left: 20, right: 10, bottom: 0, top: 0}},
		scales: {yAxes: [{ticks: {beginAtZero: true}}]},
		tooltips: {backgroundColor: "rgba(0, 0, 0, 0.7)", titleAlign: "center", bodyAlign: "center", caretPadding: 10, displayColors: false, xPadding: 40, yPadding: 10, animationEnabled: true,
			callbacks:
			{
				title: function(tooltipItems, data)
				{
					var month;

					switch (tooltipItems[0].xLabel)
					{
						case "Jan":
								month = "January";
							break;
						case "Feb":
								month = "February";
							break;
						case "Mar":
								month = "March";
							break;
						case "Apr":
								month = "April";
							break;
						case "May":
								month = "May";
							break;
						case "Jun":
								month = "June";
							break;
						case "Jul":
								month = "July";
							break;
						case "Aug":
								month = "August";
							break;
						case "Sep":
								month = "September";
							break;
						case "Oct":
								month = "October";
							break;
						case "Nov":
								month = "November";
							break;
						case "Dec":
								month = "December";
							break;
					}

					return month;
				},
				label: function(tooltipItem, data)
				{
					return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + "  kWh";
				}
			}
		}
	};

	$.ajax
	({
		url: "../php/year_stats.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		var len = response.length;

		if (len != 0)
		{
			var Jan_WeekHistoryArray = [];
			var Feb_WeekHistoryArray = [];
			var Mar_WeekHistoryArray = [];
			var Apr_WeekHistoryArray = [];
			var May_WeekHistoryArray = [];
			var Jun_WeekHistoryArray = [];
			var Jul_WeekHistoryArray = [];
			var Aug_WeekHistoryArray = [];
			var Sep_WeekHistoryArray = [];
			var Oct_WeekHistoryArray = [];
			var Nov_WeekHistoryArray = [];
			var Dec_WeekHistoryArray = [];

			for (var i = 0; i < len; i++)
			{
				var nmonth = response[i].date.slice(5,7);

				switch (nmonth)
				{
					case "01":
							Jan_WeekHistoryArray.push(response[i]);
						break;
					case "02":
							Feb_WeekHistoryArray.push(response[i]);
						break;
					case "03":
							Mar_WeekHistoryArray.push(response[i]);
						break;
					case "04":
							Apr_WeekHistoryArray.push(response[i]);
						break;
					case "05":
							May_WeekHistoryArray.push(response[i]);
						break;
					case "06":
							Jun_WeekHistoryArray.push(response[i]);
						break;
					case "07":
							Jul_WeekHistoryArray.push(response[i]);
						break;
					case "08":
							Aug_WeekHistoryArray.push(response[i]);
						break;
					case "09":
							Sep_WeekHistoryArray.push(response[i]);
						break;
					case "10":
							Oct_WeekHistoryArray.push(response[i]);
						break;
					case "11":
							Nov_WeekHistoryArray.push(response[i]);
						break;
					case "12":
							Dec_WeekHistoryArray.push(response[i]);
						break;
				}
			}

			var Jan_WeekConsumption = CalculateWattsConsumptionYear(Jan_WeekHistoryArray);
			var Feb_WeekConsumption = CalculateWattsConsumptionYear(Feb_WeekHistoryArray);
			var Mar_WeekConsumption = CalculateWattsConsumptionYear(Mar_WeekHistoryArray);
			var Apr_WeekConsumption = CalculateWattsConsumptionYear(Apr_WeekHistoryArray);
			var May_WeekConsumption = CalculateWattsConsumptionYear(May_WeekHistoryArray);
			var Jun_WeekConsumption = CalculateWattsConsumptionYear(Jun_WeekHistoryArray);
			var Jul_WeekConsumption = CalculateWattsConsumptionYear(Jul_WeekHistoryArray);
			var Aug_WeekConsumption = CalculateWattsConsumptionYear(Aug_WeekHistoryArray);
			var Sep_WeekConsumption = CalculateWattsConsumptionYear(Sep_WeekHistoryArray);
			var Oct_WeekConsumption = CalculateWattsConsumptionYear(Oct_WeekHistoryArray);
			var Nov_WeekConsumption = CalculateWattsConsumptionYear(Nov_WeekHistoryArray);
			var Dec_WeekConsumption = CalculateWattsConsumptionYear(Dec_WeekHistoryArray);

			/* First Chart Data */
			data  =
			{
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets:
				[{
					label: "kWh",
					data: [Jan_WeekConsumption, Feb_WeekConsumption, Mar_WeekConsumption, Apr_WeekConsumption, May_WeekConsumption, Jun_WeekConsumption, Jul_WeekConsumption, Aug_WeekConsumption, Sep_WeekConsumption, Oct_WeekConsumption, Nov_WeekConsumption, Dec_WeekConsumption],
					backgroundColor: gradient,
					borderColor: "rgba(6, 133, 213, 0.75)",
					labelText: "Creative Thinking",
					pointBackgroundColor: "rgba(6, 133, 213, 1)",
					pointHoverRadius: 4,
					pointRadius: 4,
				}],
			};
			/* Second Chart Data */
			data_bar  =
			{
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets:
				[{
					label: "kWh",
					data: [Jan_WeekConsumption, Feb_WeekConsumption, Mar_WeekConsumption, Apr_WeekConsumption, May_WeekConsumption, Jun_WeekConsumption, Jul_WeekConsumption, Aug_WeekConsumption, Sep_WeekConsumption, Oct_WeekConsumption, Nov_WeekConsumption, Dec_WeekConsumption],
					backgroundColor: gradient_bar,
					labelText: "Creative Thinking",
				}],
			};

			var year_cons = Jan_WeekConsumption + Feb_WeekConsumption + Mar_WeekConsumption + Apr_WeekConsumption + May_WeekConsumption + Jun_WeekConsumption + Jul_WeekConsumption + Aug_WeekConsumption + Sep_WeekConsumption + Oct_WeekConsumption + Nov_WeekConsumption + Dec_WeekConsumption;
			var year_price = CalculateConsumptionPrice(year_cons);

			$("#statistics #week-usage").html(year_cons);
			$("#statistics #week-price").html(year_price);

			$("#statistics #stats-table tbody").append("<tr><td>January</td><td>"+Jan_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Jan_WeekConsumption)+" DT</td></tr><tr><td>February</td><td>"+Feb_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Feb_WeekConsumption)+" DT</td></tr><tr><td>March</td><td>"+Mar_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Mar_WeekConsumption)+" DT</td></tr><tr><td>April</td><td>"+Apr_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Apr_WeekConsumption)+" DT</td></tr><tr><td>May</td><td>"+May_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(May_WeekConsumption)+" DT</td></tr><tr><td>June</td><td>"+Jun_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Jun_WeekConsumption)+" DT</td></tr><tr><td>July</td><td>"+Jul_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Jul_WeekConsumption)+" DT</td></tr><tr><td>August</td><td>"+Aug_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Aug_WeekConsumption)+" DT</td></tr><tr><td>September</td><td>"+Sep_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Sep_WeekConsumption)+" DT</td></tr><tr><td>October</td><td>"+Oct_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Oct_WeekConsumption)+" DT</td></tr><tr><td>November</td><td>"+Nov_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Nov_WeekConsumption)+" DT</td></tr><tr><td>December</td><td>"+Dec_WeekConsumption+" kWh</td><td>"+CalculateConsumptionPrice(Dec_WeekConsumption)+" DT</td></tr>");
		}
		else
		{
			$("#statistics #stats-table tbody").append("<tr><td>January</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>February</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>March</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>April</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>May</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>June</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>July</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>August</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>September</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>October</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>November</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>December</td><td>0 kWh</td><td>0 DT</td></tr>");
		}

		chartInstance = new Chart(chart, {type: "line", data: data, options: options});
		chartInstance_bar = new Chart(chart_bar, {type: "bar", data: data_bar, options: options});
	})
	.fail(function()
	{
		$.growl.error({ message: "Failed to Load Year Statistics !" });

		chartInstance = new Chart(chart, {type: "line", data: data, options: options});
		chartInstance_bar = new Chart(chart_bar, {type: "bar", data: data_bar, options: options});

		$("#statistics #stats-table tbody").append("<tr><td>January</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>February</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>March</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>April</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>May</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>June</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>July</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>August</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>September</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>October</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>November</td><td>0 kWh</td><td>0 DT</td></tr><tr><td>December</td><td>0 kWh</td><td>0 DT</td></tr>");
	});
}
/* Calculate Watts Consumption in a Day */
function CalculateWattsConsumptionDay(ArrayHistoryDay)
{
	var len = ArrayHistoryDay.length;
	var time = 0;
	var id;
	var today = new Date(); // Get current day
	var current_time = today.toTimeString().slice(0,8); // Get current Time
	today = formatDate(today);
	var consumption = 0;

	if (len != 0)
	{
		for (var i = 0; i < len; i++)
		{
			if (ArrayHistoryDay[i] != null)
			{
				id = ArrayHistoryDay[i].id;

				switch (ArrayHistoryDay[i].type)
				{
					case "ON":
							var done = false;
							// Search for the off time to calculate the time difference
							for (var j = i + 1; j < len; j++)
							{
								if ( (ArrayHistoryDay[j].id == ArrayHistoryDay[i].id) && (ArrayHistoryDay[j].type == "OFF") ) // If off time found leave the loop
								{
									time = CalculateDifferenceinHours(ArrayHistoryDay[i].time, ArrayHistoryDay[j].time);
									done = true;
									// Delete off if found time
									ArrayHistoryDay.splice(j, 1);
									len--;
									// Leave the loop
									break; // In case the device was opened again or closed so it doesn't delete that as well
								}
							}
							// Off time not found
							if (!done)
							{
								if (today == ArrayHistoryDay[i].date) // If the day is today
								{
									time = CalculateDifferenceinHours(ArrayHistoryDay[i].time, current_time); // Calculate from time on till current time
								}
								else // If it is in the past then calculate from on time till mid night
								{
									time = CalculateDifferenceinHours(ArrayHistoryDay[i].time, "00:00:00"); // Calculate from on time till mid-night
									// Delete the reset time
									for (var j = i + 1; j < len; j++)
									{
										if ( (ArrayHistoryDay[j].id == ArrayHistoryDay[i].id) && (ArrayHistoryDay[j].type == "RESET") )
										{
											// Delete reset time
											ArrayHistoryDay.splice(j, 1);
											len--;
											// Leave the loop
											break;
										}
									}
								}
							}
						break;
					case "OFF": // For the Devices that left on yesterday or before and turned off today or reseted by the system, start counting from mid-night to the off time
							time = CalculateDifferenceinHours("00:00:00", ArrayHistoryDay[i].time); // Start counting from mid night till the off time
						break;
					case "RESET": // Reseted by the System to better calculation
							time = 24;
						break;
					default:
							// DO NOTHING I JUST JUST IN CASE
						break;
				}
				// Calculate Consumption kWh for current Day
				// E(kWh/day) = P(W) × T(h/day) / 1000(W/kW)
				consumption += (getDeviceWattsPower(id) * time) / 1000; // kWh
				ArrayHistoryDay.splice(i, 1);
				i--;
				len--;
			}
		}
	}

	return Math.round(consumption);
}
/* Calculate Watss Consumption in a Week */
function CalculateWattsConsumptionWeek(ArrayHistoryWeek)
{
	var len = ArrayHistoryWeek.length;
	var consumption = 0;
	var ArrayHistoryDay = [];

	if (len != 0)
	{
		var date_iterator = ArrayHistoryWeek[0].date;

		for (var i = 0; i < len; i++)
		{
			if (ArrayHistoryWeek[i].date == date_iterator)
			{
				ArrayHistoryDay.push(ArrayHistoryWeek[i]);

				if (i == len - 1) {consumption += CalculateWattsConsumptionDay(ArrayHistoryDay); ArrayHistoryDay = [];}
			}
			else
			{
				date_iterator = ArrayHistoryWeek[i].date;
				consumption += CalculateWattsConsumptionDay(ArrayHistoryDay);
				ArrayHistoryDay = [];
				ArrayHistoryDay.push(ArrayHistoryWeek[i]);
			}
		}
	}

	return Math.round(consumption);
}
/* Calculate Watss Consumption in a Month */
function CalculateWattsConsumptionYear(ArrayHistoryMonth)
{
	var len = ArrayHistoryMonth.length;
	var consumption = 0;
	var ArrayHistoryDay = [];

	if (len != 0)
	{
		var date_iterator = ArrayHistoryMonth[0].date;

		for (var i = 0; i < len; i++)
		{
			if (ArrayHistoryMonth[i].date == date_iterator)
			{
				ArrayHistoryDay.push(ArrayHistoryMonth[i]);

				if (i == len - 1) {consumption += CalculateWattsConsumptionDay(ArrayHistoryDay); ArrayHistoryDay = [];}
			}
			else
			{
				date_iterator = ArrayHistoryMonth[i].date;
				consumption += CalculateWattsConsumptionDay(ArrayHistoryDay);
				ArrayHistoryDay = [];
				ArrayHistoryDay.push(ArrayHistoryMonth[i]);
			}
		}
	}

	return Math.round(consumption);
}
/* Get Device's Electric Power (Watts) */
function getDeviceWattsPower(id)
{
	return $.ajax
	({
		async: false,
		url: "../php/device_power.php",
		type: "POST",
		dataType: "text",
		data: {id: id},
	}).responseText;
}
/* Calculate Consumption Price */
function CalculateConsumptionPrice(kwh)
{
	var price = 0;
	var cost = 0;

	switch (true)
	{
		case ( kwh < 200 ):
				cost = 176; // [1 - 200] kW ---> Millimes/kWh
			break;
		case ( kwh < 300 ):
				cost = 218; // [201 - 300] kW ---> Millimes/kWh
			break;
		case ( kwh < 500 ):
				cost = 341; // [301 - 500] kW ---> Millimes/kWh
			break;
		default:
				cost = 414; // [501 - ...] kW ---> Millimes/kWh
			break;
	}

	// Cost(DT/Day) = E(kWh/Day) × Cost(Millimes/kWh) / 1000(Millimes/Dt)
	price = ( kwh * cost ) / 1000; // Dt/Day

	return price;
}
/*==================================================
		Cards Section Functions
==================================================*/
/* Load Cards to Cards List */
function LoadCardsSection()
{
	$.ajax
	({
		url: "../php/cards_list.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		// Empty The Group List
		$("#cards #cards-list").empty();

		var len = response.length;

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				// Display Card
				$("#cards #cards-list").append("<article id='"+response[i].id+"' class='uk-comment card-details uk-margin-small-top uk-animation-scale-down uk-box-shadow-medium'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right uk-grid uk-grid-stack' uk-grid><div class='uk-width-1-1'><h4 class='uk-comment-title uk-margin-remove'>"+response[i].name+"</h4><div uk-grid><div class='uk-width-1-2'><h6 class='uk-comment-meta uk-margin-remove-top'>"+response[i].ip+"</h6></div><div class='uk-width-1-2'><h6 class='uk-comment-meta uk-margin-remove-top devices'>"+response[i].devices+" Devices</h6></div></div></div></header></article>");
			}
		}
		else
		{
			$("#cards #cards-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Cards Found !<br><small>Make Sure You Add Cards...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#cards #cards-list").empty();
		$("#cards #cards-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Cards !</th></tr></table>");
	});
}
/* Reset Add Card Modal Function */
function ResetAddCardModal()
{
	$("#add-card-name").val("");
	$("#add-card-ip").val("");

	$("#add-card-name").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-card-ip").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input

	$("#add-card-name-error").hide();
	$("#add-card-ip-error").hide();
}
/* Reset Edit Group Modal Function */
function ResetEditCardModal()
{
	$("#edit-card-name").val(""); // Clear Card Name
	$("#edit-card-ip").val(""); // Clear Card Name

	$("#edit-card-name").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#edit-card-ip").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input

	$("#edit-card-name-error").hide(); // Hide Error
	$("#edit-card-ip-error").hide(); // Hide Error
}
/*==================================================
		Floors Section Functions
==================================================*/
/* Display Floors List in Floors Section */
function DisplayFloorsListFloorsSection()
{
	$.ajax
	({
		url: "../php/floors_list.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		// Empty The Group List
		$("#floors #floors-list").empty();

		var len = response.length;

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				// Display Floor
				$("#floors #floors-list").append("<article id='"+response[i].id+"' class='uk-comment floor-details uk-margin-small-top uk-animation-scale-down uk-box-shadow-medium'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right uk-grid uk-grid-stack' uk-grid><div class='uk-width-1-1'><h4 class='uk-comment-title uk-margin-remove'>"+response[i].floor+"</h4><div uk-grid><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top rooms'>"+response[i].rooms+" Rooms</h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top devices'>"+response[i].devices+" Devices</h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top groups'>"+response[i].groups+" Groups</h6></div></div></div></header></article>");
			}
		}
		else
		{
			$("#floors #floors-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#floors #floors-list").empty();
		$("#floors #floors-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Floors !</th></tr></table>");
	}); 
}
/* Reset Add Floor Modal Function */
function ResetAddFloorModal()
{
	$("#add-floor-name").val(""); // Clear Floor Name
	$("#add-floor-name").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-floor-name-error").hide(); // Hide Error
}
/* Reset Edit Floor Modal Function */
function ResetEditFloorModal()
{
	$("#edit-floor-name").val("");
	$("#modal-edit-floor table").empty();
	$("#edit-floor-name").css("border-color", "var(--secondary-color)");
	$("#edit-floor-name-error").hide(); 
}
/*==================================================
		Rooms Section Functions
==================================================*/
/* Display Rooms List in Rooms Section */
function DisplayRoomsListRoomsSection()
{
	$.ajax
	({
		url: "../php/rooms_list.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		// Empty The Rooms List
		$("#rooms #rooms-list").empty();

		var len = response.length;

		if (len != 0)
		{
			for (var i = 0; i < len; i++)
			{
				var tmp = "";
				var flag = 0;

				if (response[i].rooms == 0)
				{
					tmp = "<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found !<br><small>Make Sure You Add Rooms...</small></th></tr></table>";
				}
				else
				{
					for (var j = 0; j < response[i].rooms; j++)
					{
						tmp = tmp + "<article id='"+response[i+j].roomid+"' class='uk-comment room-details uk-margin-small-top uk-animation-scale-down'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right uk-grid uk-grid-stack' uk-grid><div class='uk-width-1-1 uk-first-column'><h4 class='uk-comment-title uk-margin-remove'>"+response[i+j].room+"</h4><div uk-grid><div class='uk-width-1-2'><h6 class='uk-comment-meta uk-margin-remove-top devices'>"+response[i+j].devices+" Devices</h6></div><div class='uk-width-1-2'><h6 class='uk-comment-meta uk-margin-remove-top groups'>"+response[i+j].groups+" Groups</h6></div></div></div></header></article>";
						flag = 1;
					}
				}

				$("#rooms #rooms-list").append("<div id='"+response[i].floorid+"' class='uk-section uk-animation-scale-down'><h4 class='section-title'>"+response[i].floor+"</h4>"+tmp+"</div>");

				if (flag == 1)
				{
					i = i + response[i].rooms - 1;
				}
			}
		}
		else
		{
			$("#rooms #rooms-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Rooms Found !<br><small>Make Sure You Add Rooms...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#rooms #rooms-list").empty();
		$("#rooms #rooms-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Rooms !</th></tr></table>");
	}); 
}
/* Display Devices to Add Room Modal Function */
function DisplayDevicesAddRoomRoomsSection(width, height)
{
	$("#modal-add-room #add-room-room table").empty();

	for (var line = 1; line <= height; line++)
	{
		$("#modal-add-room #add-room-room table").append("<tr id='"+line+"' class='uk-animation-scale-down uk-text-center'></tr>");

		for (var column = 1; column <= width; column++)
		{
			$("#modal-add-room #add-room-room table tr#"+line).append("<td id='"+line+"-"+column+"'><div><img src='../images/icons/disabled.png' width='50' height='50'></div></td>");
		}
	}
}
/* Reset Add Room Modal Function */
function ResetAddRoomModal()
{
	$("#add-room-name").val(""); // Clear Room Name
	$("#add-room-width").val(""); // Clear Room Width
	$("#add-room-height").val(""); // Clear Room Height
	$("#add-room-name").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-room-search-floor").css("border-color", "var(--secondary-color)");
	$("#add-room-width").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-room-height").css("border-color", "var(--secondary-color)"); // Remove Red Border from Input
	$("#add-room-name-error").hide(); // Hide Error
	$("#add-room-search-floor-error").hide();
	$("#add-room-width-error").hide(); // Clear Room Width
	$("#add-room-height-error").hide(); // Clear Room Height
	$("#add-room-search-floor").empty(); // Empty Floors List
	$("#modal-add-room table").empty();
	$("#add-room-device-card").empty(); // Empty Cards List
}
/* Reset Add Room Device Modal Function */
function ResetAddRoomDeviceModal()
{
	$("#add-room-device-type").val($("#add-room-device-type option:first").val());
	$("#add-room-device-power").val("");
	$("#add-room-device-pin").val("");

	$("#add-room-device-type").css("border-color", "var(--secondary-color)");
	$("#add-room-device-power").css("border-color", "var(--secondary-color)");
	$("#add-room-device-card").css("border-color", "var(--secondary-color)");
	$("#add-room-device-pin").css("border-color", "var(--secondary-color)");

	$("#add-room-device-type-error").hide();
	$("#add-room-device-power-error").hide();
	$("#add-room-device-card-error").hide();
	$("#add-room-device-pin-error").hide(); 
}
/* Reset Edit Room Modal Function */
function ResetEditRoomModal()
{
	$("#edit-room-name").val("");
	$("#edit-room-search-floor").empty();
	$("#modal-edit-room #edit-room-room-devices").empty();
	$("#modal-edit-room #edit-room-room-groups").empty();
	$("#edit-room-name").css("border-color", "var(--secondary-color)");
	$("#edit-room-name-error").hide(); // Hide Error
	$("#edit-room-device-card").empty(); // Empty Cards List
}
/* Reset Edit Room Device Modal Function */
function ResetEditRoomDeviceModal()
{
	$("#edit-room-device-type").val($("#edit-room-device-type option:first").val());
	$("#edit-room-device-power").val("");
	$("#edit-room-device-pin").val("");

	$("#edit-room-device-type").css("border-color", "var(--secondary-color)");
	$("#edit-room-device-power").css("border-color", "var(--secondary-color)");
	$("#edit-room-device-card").css("border-color", "var(--secondary-color)");
	$("#edit-room-device-pin").css("border-color", "var(--secondary-color)");

	$("#edit-room-device-type-error").hide();
	$("#edit-room-device-power-error").hide();
	$("#edit-room-device-card-error").hide();
	$("#edit-room-device-pin-error").hide(); 
}
/*==================================================
		Users Section Functions
==================================================*/
/* Display Users List in Users Section */
function DisplayUsersListUsersSection()
{
	$.ajax
	({
		url: "../php/users_list.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		// Empty The Users List
		$("#users #users-list table").empty();

		var len = response.length;

		if (len != 0)
		{
			$("#users #users-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th>Login</th><th>Name</th><th>Edit</th><th>Delete</th></thead><tbody></tbody>");

			for (var i = 0; i < len; i++)
			{
				$("#users #users-list table tbody").append("<tr id='"+response[i].username+"' class='uk-animation-scale-down uk-text-center'><td>"+response[i].username+"</td><td>"+response[i].name+"</td><td><img class='edit' src='../images/icons/edit.png' width='20' height='20'></td><td><img class='delete' src='../images/icons/remove.png' width='20' height='20'></td></tr>");
			}
		}
		else
		{
			$("#users #users-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem;'><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No Users Found !</th></tr></thead>");
		}
	})
	.fail(function()
	{
		$("#users #users-list table").empty();
		$("#users #users-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem; color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Users !</th></tr></thead>");
	}); 
}
/* Reset Add User Modal Function */
function ResetAddUserModal()
{
	$("#add-user-login").val("");
	$("#add-user-password").val("");
	$("#add-user-fname").val("");
	$("#add-user-lname").val("");

	$("#add-user-login").css("border-color", "var(--secondary-color)");
	$("#add-user-password").css("border-color", "var(--secondary-color)");
	$("#add-user-fname").css("border-color", "var(--secondary-color)");
	$("#add-user-lname").css("border-color", "var(--secondary-color)");

	$("#add-user-login-error").hide();
	$("#add-user-password-error").hide();
	$("#add-user-fname-error").hide();
	$("#add-user-lname-error").hide();

	$("#modal-add-user #add-user-permissions").empty();
}
/* Reset Edit User Modal Function */
function ResetEditUserModal()
{
	$("#edit-user-login").val("");
	$("#edit-user-password").val("");
	$("#edit-user-fname").val("");
	$("#edit-user-lname").val("");

	$("#edit-user-login").css("border-color", "var(--secondary-color)");
	$("#edit-user-password").css("border-color", "var(--secondary-color)");
	$("#edit-user-fname").css("border-color", "var(--secondary-color)");
	$("#edit-user-lname").css("border-color", "var(--secondary-color)");

	$("#edit-user-login-error").hide();
	$("#edit-user-password-error").hide();
	$("#edit-user-fname-error").hide();
	$("#edit-user-lname-error").hide();

	$("#modal-edit-user #edit-user-permissions").empty();
}
/*==================================================
		Hisotry Section Functions
==================================================*/
/* Load Hisotry */
function LoadHistory()
{
	$.ajax
	({
		url: "../php/history.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		// Empty The Hisotry List
		$("#history #history-list table").empty();

		var len = response.length;

		if (len != 0)
		{
			$("#history #history-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th>Login</th><th>Date</th><th>Time</th><th>History</th></thead><tbody></tbody>");

			for (var i = 0; i < len; i++)
			{
				var history = "";

				switch (response[i].type)
				{
					case "CONNECT":
							history = "<span style='color: var(--blue-color);'>"+response[i].opt+"</span> Connected";
						break;
					case "DISCONNECT":
							history = "<span style='color: var(--blue-color);'>"+response[i].opt+"</span> Disconnected";
						break;
					case "ON":
							switch (response[i].data)
							{
								case "DEVICE":
									var type = response[i].opt.slice(0, 1);
									var option = response[i].opt.slice(1, response[i].opt.length);
									var place = "";
									if (type == "R") {place = "Room"} else if (type == "G") {place = "Group"} else if (type == "S") {place = "Scene"}
									var pin = option.substring(0, option.indexOf(":"));
									var name = option.substring(option.indexOf(":")+1, option.length);

									history = "Turned on Device Pin N° <span style='color: var(--blue-color);'>"+pin+"</span> in <span style='color: var(--blue-color);'>"+name+"</span> "+place;
								break;
								case "GROUP":
									var name = response[i].opt.substring(0, response[i].opt.indexOf(":"));
									var room = response[i].opt.substring(response[i].opt.indexOf(":")+1, response[i].opt.length);

									history = "Turned on <span style='color: var(--blue-color);'>"+name+"</span> Group in <span style='color: var(--blue-color);'>"+room+"</span> Room";
								break;
								case "SCENE":
									var name = response[i].opt;

									history = "Activated <span style='color: var(--blue-color);'>"+name+"</span> Scene'>";
								break;
							}
						break;
					case "OFF":
							switch (response[i].data)
							{
								case "DEVICE":
									var type = response[i].opt.slice(0, 1);
									var option = response[i].opt.slice(1, response[i].opt.length);
									var place = "";
									if (type == "R") {place = "Room"} else if (type == "G") {place = "Group"} else if (type == "S") {place = "Scene"}
									var pin = option.substring(0, option.indexOf(":"));
									var name = option.substring(option.indexOf(":")+1, option.length);

									history = "Turned off Device Pin N° <span style='color: var(--blue-color);'>"+pin+"</span> in <span style='color: var(--blue-color);'>"+name+"</span> "+place;
								break;
								case "GROUP":
									var name = response[i].opt.substring(0, response[i].opt.indexOf(":"));
									var room = response[i].opt.substring(response[i].opt.indexOf(":")+1, response[i].opt.length);

									history = "Turned off <span style='color: var(--blue-color);'>"+name+"</span> Group in <span style='color: var(--blue-color);'>"+room+"</span> Room";
								break;
								case "SCENE":
									var name = response[i].opt;

									history = "Desactivated <span style='color: var(--blue-color);'>"+name+"</span> Scene'>";
								break;
							}
						break;
					case "ADD":
							switch (response[i].data)
							{
								case "USER":
									history = "Added New User <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "CARD":
									history = "Added New Card <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "FLOOR":
									history = "Added New Floor <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "ROOM":
									history = "Added New Room <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "GROUP":
									history = "Added New Group <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "SCENE":
									history = "Added New Scene <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
							}
						break;
					case "EDIT":
							switch (response[i].data)
							{
								case "USER":
									history = "Changed Name to <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
							}
						break;
					case "DELETE":
							switch (response[i].data)
							{
								case "USER":
									history = "Deleted User <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "CARD":
									history = "Deleted Card <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "FLOOR":
									history = "Deleted Floor <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "ROOM":
									history = "Deleted Room <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "GROUP":
									history = "Deleted Group <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
								case "SCENE":
									history = "Deleted Scene <span style='color: var(--blue-color);'>"+response[i].opt+"</span>";
								break;
							}
						break;
				}

				$("#history #history-list table tbody").append("<tr class='uk-animation-scale-down uk-text-center'><td>"+response[i].user+"</td><td>"+ConverteDateFormat(response[i].date)+"</td><td>"+response[i].time+"</td><td>"+history+"</td></tr>");
			}
		}
		else
		{
			$("#history #history-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem;'><img class='notfound' src='../images/icons/notfound.png' width='40' height='40'><br><br>No History Found !</th></tr></thead>");
		}
	})
	.fail(function()
	{
		$("#history #history-list table").empty();
		$("#history #history-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem; color: #C0392B;'><img class='error' src='../images/icons/error.png' width='40' height='40'><br><br>Failed to Load Hisotry !</th></tr></thead>");
	});
}
/* Convert Date Format From YYYY-MM-DD to DD/MM/YYYY */
function ConverteDateFormat(date)
{
	var d = date.split(/\D/g);

	return [d[2],d[1],d[0] ].join("/");
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
/*==================================================
		Support Section Functions
==================================================*/
/* Reset Contact Form Account */
function ResetContactForm()
{
	$("#contact-email").val("");
	$("#contact-message").val("");

	$("#contact-email").css("border-color", "var(--secondary-color)");
	$("#contact-message").css("border-color", "var(--secondary-color)");

	$("#contact-email-error").hide();
	$("#contact-message-error").hide();
}
/*==================================================
				Functions
==================================================*/
/* Hide All Sections Function */
function HideAllSections()
{
	$("#lights").hide();
	$("#groups").hide();
	$("#scenes").hide();
	$("#statistics").hide();
	$("#cards").hide();
	$("#floors").hide();
	$("#rooms").hide();
	$("#users").hide();
	$("#history").hide();
	$("#settings").hide();
	$("#support").hide();

	// Remove Active Class From the Selected Section
	$("#lights-btn, #mobile-lights-btn").removeClass("active");
	$("#groups-btn, #mobile-groups-btn").removeClass("active");
	$("#scenes-btn, #mobile-scenes-btn").removeClass("active");
	$("#statistics-btn, #mobile-statistics-btn").removeClass("active");
	$("#configuration-btn, #mobile-configuration-btn").removeClass("active");
	$("#cards-btn, #mobile-cards-btn").removeClass("active");
	$("#floors-btn, #mobile-floors-btn").removeClass("active");
	$("#rooms-btn, #mobile-rooms-btn").removeClass("active");
	$("#users-btn, #mobile-users-btn").removeClass("active");
	$("#history-btn, #mobile-history-btn").removeClass("active");
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
/* String to Date */
function formatDate(date)
{
	var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();

	if (month.length < 2) month = '0' + month;

	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}
/* Calculate Difference Between Two Times In Hours */
function CalculateDifferenceinHours(time1, time2)
{
	var startDate = new Date("January 1, 1970 " + time1);
	var endDate = new Date("January 1, 1970 " + time2);

	if (startDate > endDate)
	{
		endDate = new Date("January 2, 1970 " + time2);
	}

	return Math.abs(endDate - startDate) / 36e5;
}
