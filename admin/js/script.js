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
	$("#statistics-btn, #mobile-statistics-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#statistics-btn");});
	$("#floors-btn, #mobile-floors-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#floors-btn")});
	$("#rooms-btn, #mobile-rooms-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#rooms-btn")});
	$("#users-btn, #mobile-users-btn").click(function(){localStorage.setItem("LightWays_ADMIN_SECTION", "#users-btn")});
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
					$(device).css("background-color", "var(--device-color)")
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
				$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
			}
		})
		.fail(function()
		{
			$("#modal-add-group #add-group-room table").empty();
			$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Floors !</th></tr>");
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

	/* When Changing Color, Change Selected Devices Background */
	$("#add-group-color").change(function()
	{
		$("#modal-add-group #add-group-room table img.SELECTED").css("background-color", $("#add-group-color").val());
	});

	/* When Loading Between Rooms Re-Select The Already Selected Devices */
	$("#modal-add-group #add-group-room table").bind("DOMNodeInserted DOMSubtreeModified DOMNodeRemoved", function()
	{
		setTimeout(function()
		{
			for (var i = 0; i < SelectedDevices.length; i++)
			{
				var device = $("#modal-add-group #add-group-room table img#"+SelectedDevices[i]);
				device.addClass("SELECTED");
				device.css("background-color", $("#add-group-color").val());
			}
		}, 100);
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
			$("#add-group-name").css("border", "1px solid #F0506E");
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
		group = $(this).parent().parent().attr("id"); // Assign Group ID
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
								}, 100);
							}
							else
							{
								$("#modal-edit-group #edit-group-room table").empty();
								$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
							}

						})
						.fail(function()
						{
							$("#modal-edit-group #edit-group-room table").empty();
							$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Rooms !</th></tr>");
						});

					}
					else
					{
						$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
					}
				})
				.fail(function()
				{
					$("#modal-edit-group #edit-group-room table").empty();
					$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Floors !</th></tr>");
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
	});

	/* When Changing the Room from Select in Edit Group Section, Return Devices corresponding to the selected Room */
	$("#edit-group-search-room").change(function()
	{
		// Get Selected Option Value
		var room = $("#edit-group-search-room").val();
		// Load Devices corresponding to the selected Room
		DisplayDevicesEditGroupsSection(room);
	});

	/* When Changing Color, Change Selected Devices Background */
	$("#edit-group-color").change(function()
	{
		$("#modal-edit-group #edit-group-room table img.SELECTED").css("background-color", $("#edit-group-color").val());
	});

	/* When Loading Between Rooms Re-Select The Already Selected Devices */
	$("#modal-edit-group #edit-group-room table").bind("DOMNodeInserted DOMSubtreeModified DOMNodeRemoved", function()
	{
		setTimeout(function()
		{
			for (var i = 0; i < SelectedDevices.length; i++)
			{
				var device = $("#modal-edit-group #edit-group-room table img#"+SelectedDevices[i]);
				device.addClass("SELECTED");
				device.css("background-color", $("#edit-group-color").val());
			}
		}, 100);
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
			$("#edit-group-name").css("border", "1px solid #F0506E");
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
					$("#groups #groups-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Groups Found !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
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
		Statistics
=========================*/
//
/*=========================
		Floors
=========================*/
/* Load Floors into Floors List */
$(window).on("load", function()
{
	DisplayFloorsListFloorsSection();

	$("#floors-btn, #mobile-floors-btn").click(function()
	{
		DisplayFloorsListFloorsSection();
	});
});
/* Confirm Adding Floor */
$(function()
{
	/* When Cancelling or Closing, Reset Form */
	$("#modal-add-floor button.uk-modal-close").click(function()
	{
		ResetAddFloorModal(); // Reset Modal
	});

 	/* When Confirming */
	$("#add-floor-confirm-btn").click(function()
	{
		var floor = $("#add-floor-name").val(); // Get Group Name

		if (!floor)
		{
			$("#add-floor-name").css("border", "1px solid #F0506E");
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

					$("#floors #floors-list").append("<article id='"+response.floor+"' class='uk-comment floor-details uk-margin-small-top uk-animation-scale-down uk-box-shadow-medium'><header class='uk-comment-header uk-grid-medium uk-flex-middle uk-margin-small-left uk-margin-small-right uk-grid uk-grid-stack' uk-grid><div class='uk-width-1-1'><h4 class='uk-comment-title uk-margin-remove'>"+response.name+"</h4><div uk-grid><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top rooms'>0 Rooms</h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top devices'>0 Devices</h6></div><div class='uk-width-1-3'><h6 class='uk-comment-meta uk-margin-remove-top groups'>0 Groups</h6></div></div></div></header></article>");

					$("#lights-floors-navigation").append("<option value='"+response.floor+"'>"+response.name+"</option>");
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
			$("#edit-floor-name").css("border", "1px solid #F0506E");
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
					$("#floors #floors-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr></table>");
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
	DisplayRoomsListRoomsSection();

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
	var SelectedDevicePin = [];
	var SelectedDeviceCoords = [];

	/* Load Floors */
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
			$("#modal-add-room #add-room-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Floors !</th></tr>");
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
			SelectedDevicePin = [];
			SelectedDeviceCoords = [];
		}
	});

	/* Show Add Device Modal */
	$("#modal-add-room #add-room-room table").off("click").on("click", " img", function()
	{
		device = $(this);
		UIkit.modal("#modal-add-room-device").toggle();
		coords = device.parent().parent().attr("id");

		if (SelectedDeviceCoords.includes(coords))
		{
			for (var i = 0; i < SelectedDeviceCoords.length; i++) // Loop Array Search for the Item to Delete
			{
				if (SelectedDeviceCoords[i] == coords)
				{
					$("#add-room-device-type").val(SelectedDeviceType[i]);
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
		var pin = $("#add-room-device-pin").val();

		if (type == "NONE")
		{
			$("#add-room-device-type").css("border", "1px solid #F0506E");
			$("#add-room-device-type-error").show();
		}

		if (!pin)
		{
			$("#add-room-device-pin").css("border", "1px solid #F0506E");
			$("#add-room-device-pin-error").show();
		}

		if ( (type != "NONE") && (pin) )
		{
			if (!SelectedDeviceCoords.includes(coords))
			{
				SelectedDeviceCoords.push(coords);
				SelectedDeviceType.push(type);
				SelectedDevicePin.push(pin);
				$("#modal-add-room #add-room-room table td#"+coords+" img").addClass("SELECTED");
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
			$("#add-room-name").css("border", "1px solid #F0506E");
			$("#add-room-name-error").show();
		}
		else
		{
			$("#add-room-name").css("border", "var(--secondary-color)");
			$("#add-room-name-error").hide();
		}

		if (!room_width)
		{
			$("#add-room-width").css("border", "1px solid #F0506E");
			$("#add-room-width-error").show();
		}
		else
		{
			$("#add-room-width").css("border", "var(--secondary-color)");
			$("#add-room-width-error").hide();
		}

		if (!room_height)
		{
			$("#add-room-height").css("border", "1px solid #F0506E");
			$("#add-room-height-error").show();
		}
		else
		{
			$("#add-room-height").css("border", "var(--secondary-color)");
			$("#add-room-height-error").hide();
		}

		if ( (room_name) && (room_width) && (room_height) )
		{
			var SelectedDeviceCoordsJson = JSON.stringify(SelectedDeviceCoords); // Get Selected Devices Coords
			var SelectedDeviceTypeJson = JSON.stringify(SelectedDeviceType); // Get Selected Devices Type
			var SelectedDevicePinJson = JSON.stringify(SelectedDevicePin); // Get Selected Devices Pin

			$.ajax
			({
				url: "../php/add_room.php",
				type: "POST",
				dataType: "json",
				data: {name: room_name, width: room_width, height: room_height, floor: room_floor, devices_coords: SelectedDeviceCoordsJson, devices_type: SelectedDeviceTypeJson, devices_pin: SelectedDevicePinJson},
			})
			.done(function(response)
			{
				var len = response.length;

				UIkit.modal("#modal-add-room").hide(); // Hide Modal
				ResetAddRoomModal(); // Reset Modal

				if (len != 0)
				{
					$.growl.notice({ message: "Room has been Successfully Added !" }); // Success Notification	

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
						$.growl({ title: "Group Added with no Devices.", message: "Make Sure You Add Devices!" });
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
						SelectedDevicePin.push(response[i].pin);
						SelectedDeviceCoords.push(response[i].lin+"-"+response[i].col);
						SelectedDeviceColor.push(bgcolor);
						SelectedDeviceId.push(response[i].device);
					}
				}
				else
				{
					$.growl({ title: "This Room Has no Devices.", message: "Make Sure You Add Devices!" });
					$("#modal-edit-room table#edit-room-room-devices").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Devices Found in This Room !<br><small>Make Sure You Add Devices...</small></th></tr>");
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
						$("#modal-edit-room #edit-room-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Groups Found in This Room !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
					}
				})
				.fail(function()
				{
					$("#modal-edit-room #edit-room-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Groups !</th></tr></table>");
				});
			}
			else
			{
				$.growl.error({ message: "Failed to Get Selected Room Details !" });
				$("#modal-edit-room table#edit-room-room-devices").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Room Details !</th></tr>");
			}
		})
		.fail(function()
		{
			$.growl.error({ message: "Failed to Get Selected Room Details !" });
			$("#modal-edit-room table#edit-room-room-devices").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Room Details !</th></tr>");
		});
	});

	var windom_width = $(window).width(); // Get Window Width
	/* When Charnging Window Size */
	$(window).resize(function()
	{
		if ($(window).width() != windom_width) // to Avoid on Mobile Scroll
		{
			// Get the New Window Width
			windom_width = $(window).width();

			$("#modal-edit-room table#edit-room-room-devices").empty();

			if (SelectedDeviceCoords.length != 0)
			{
				for (var line = 1; line <= height; line++)
				{
					$("#modal-edit-room table#edit-room-room-devices").append("<tr id='"+line+"' class='uk-animation-scale-down uk-text-center'></tr>");

					for (var column = 1; column <= width; column++)
					{
						$("#modal-edit-room table#edit-room-room-devices tr#"+line).append("<td id='"+line+"-"+column+"'></td>");
					}
				}

				for (var i = 0; i < SelectedDeviceCoords.length; i++)
				{
					$("#modal-edit-room table#edit-room-room-devices td#"+SelectedDeviceCoords[i]).html("<div class='device'><img id='"+SelectedDeviceId[i]+"' src='../images/devices/"+SelectedDeviceType[i]+"_ON.png' style='background-color: "+SelectedDeviceColor[i]+";' width='50' height='50'></div>");
				}
			}
			else
			{
				$("#modal-edit-room table#edit-room-room-devices").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Devices Found in This Room !<br><small>Make Sure You Add Devices...</small></th></tr>");
			}
		}
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
		SelectedDevicePin = [];
		SelectedDeviceCoords = [];
		SelectedDeviceColor = [];
		SelectedDeviceId = [];
		room_floor = "";
		groups = [];
	});

	/* Show Edit Device Modal */
	$("#modal-edit-room table#edit-room-room-devices").off("click").on("click", " img", function()
	{
		device = $(this);
		UIkit.modal("#modal-edit-room-device").toggle();
		id = device.attr("id");

		for (var i = 0; i < SelectedDeviceId.length; i++) // Loop Array Search for the Item to Delete
		{
			if (SelectedDeviceId[i] == id)
			{
				$("#edit-room-device-type").val(SelectedDeviceType[i]);
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
		var pin = $("#edit-room-device-pin").val();

		if (type == "NONE")
		{
			$("#edit-room-device-type").css("border", "1px solid #F0506E");
			$("#edit-room-device-type-error").show();
		}

		if (!pin)
		{
			$("#edit-room-device-pin").css("border", "1px solid #F0506E");
			$("#edit-room-device-pin-error").show();
		}

		if ( (type != "NONE") && (pin) )
		{
			for (var i = 0; i < SelectedDeviceId.length; i++) // Loop Array Search for the Item to Delete
			{
				if (SelectedDeviceId[i] == id)
				{
					SelectedDeviceType[i] = type;
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
			$("#edit-room-name").css("border", "1px solid #F0506E");
			$("#edit-room-name-error").show();
		}
		else
		{
			$("#edit-room-name").css("border", "var(--secondary-color)");
			$("#edit-room-name-error").hide();
		}

		if(room_name)
		{
			var SelectedDeviceIdJson = JSON.stringify(SelectedDeviceId); // Get Selected Devices Id
			var SelectedDeviceTypeJson = JSON.stringify(SelectedDeviceType); // Get Selected Devices Type
			var SelectedDevicePinJson = JSON.stringify(SelectedDevicePin); // Get Selected Devices Pin

			$.ajax
			({
				url: "../php/update_room.php",
				type: "POST",
				dataType: "json",
				data: {room: room, name: room_name, floor: new_room_floor, devices_id: SelectedDeviceIdJson, devices_type: SelectedDeviceTypeJson, devices_pin: SelectedDevicePinJson},
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
							$("#rooms-list div#"+room_floor+".uk-section").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Rooms Found !<br><small>Make Sure You Add Rooms...</small></th></tr></table>");
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
					$("#rooms-list div#"+room_floor+".uk-section").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Rooms Found !<br><small>Make Sure You Add Rooms...</small></th></tr></table>");
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
	DisplayUsersListUsersSection();

	$("#users-btn, #mobile-users-btn").click(function()
	{
		DisplayUsersListUsersSection();
	});
});
/* Load Data to Add User Modal */

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
			$("#setting-fname").css("border", "1px solid #F0506E");
			$("#setting-fname-error").show();
		}
		else
		{
			$("#setting-fname").css("border", "1px solid var(--secondary-color)");
			$("#setting-fname-error").hide();
		}

		if (!new_lname)
		{
			$("#setting-lname").css("border", "1px solid #F0506E");
			$("#setting-lname-error").show();
		}
		else
		{
			$("#setting-lname").css("border", "1px solid var(--secondary-color)");
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
					$("#setting-old-password").css("border", "1px solid #F0506E");
					$("#setting-old-password-error").show();
				}
				else
				{
					$("#setting-old-password").css("border", "1px solid var(--secondary-color)");
					$("#setting-old-password-error").hide();
				}

				if (!new_password)
				{
					$("#setting-new-password").css("border", "1px solid #F0506E");
					$("#setting-new-password-error").show();
				}
				else
				{
					$("#setting-new-password").css("border", "1px solid var(--secondary-color)");
					$("#setting-new-password-error").hide();
				}

				if (!confirm_password)
				{
					$("#setting-confirm-new-password").css("border", "1px solid #F0506E");
					$("#setting-confirm-new-password-error").show();
				}
				else
				{
					$("#setting-confirm-new-password").css("border", "1px solid var(--secondary-color)");
					$("#setting-confirm-new-password-error").hide();
				}

				/* Password Doesn't Match */
				if (new_password != confirm_password)
				{
					$("#setting-confirm-new-password").css("border", "1px solid #F0506E");
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
	$("#scenes").hide();
	$("#statistics").hide();
	$("#floors").hide();
	$("#rooms").hide();
	$("#users").hide();
	$("#settings").hide();
	$("#support").hide();

	// Remove Active Class From the Selected Section
	$("#lights-btn, #mobile-lights-btn").removeClass("active");
	$("#groups-btn, #mobile-groups-btn").removeClass("active");
	$("#scenes-btn, #mobile-scenes-btn").removeClass("active");
	$("#statistics-btn, #mobile-statistics-btn").removeClass("active");
	$("#configuration-btn, #mobile-configuration-btn").removeClass("active");
	$("#floors-btn, #mobile-floors-btn").removeClass("active");
	$("#rooms-btn, #mobile-rooms-btn").removeClass("active");
	$("#users-btn, #mobile-users-btn").removeClass("active");
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
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr>");
			$("#lights #lights-room-groups").empty();
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Groups Found in This Floor !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#lights table#lights-room-devices tbody").empty();
		$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Floors !</th></tr>");
		$("#lights #lights-room-groups").empty();
		$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Groups !</th></tr></table>");
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
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
			$("#lights #lights-room-groups").empty();
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Groups Found in This Floor !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}

	})
	.fail(function()
	{
		$("#lights #lights-room-name").html(); // Remove Room Name if it is Displayed
		$("#lights #lights-room-devices-number").html(); // Remove Devices Number if it is Displayed
		$("#lights #lights-room table#lights-room-devices tbody").empty();
		$("#lights #lights-room table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Rooms !</th></tr>");
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
				$("#lights table#lights-room-devices tbody td#"+response[i].lin+"-"+response[i].col).attr("class", "device");
				$("#lights table#lights-room-devices tbody td#"+response[i].lin+"-"+response[i].col+" div").html("<img id='"+response[i].id+"' class='"+response[i].status+"' src='../images/devices/"+response[i].type+"_"+response[i].status+".png' width='50' height='50' uk-tooltip='<center>Type "+response[i].type+"<br>Pin "+response[i].pin+"</center>'>");
			}
		}
		else
		{
			$("#lights #lights-room-devices-number").html("0 Devices"); // Display Number of Devices to 0
			$("#lights table#lights-room-devices tbody").empty();
			$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Devices Found in This Room !<br><small>Make Sure You Add Devices...</small></th></tr>");
		}
	})
	.fail(function()
	{
		$("#lights table#lights-room-devices tbody").empty();
		$("#lights table#lights-room-devices tbody").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Devices !</th></tr>");
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

		if (len != 0)
		{
			$("#lights #lights-room-groups").empty(); // Empty Groups

			var groups = [];
			var bgcolor;

			for (var i = 0; i < len; i++)
			{
				if (response[i].status == "ON")
				{
					$("#lights table#lights-room-devices tbody img#"+response[i].device+".ON").css({"background-color": "#FFCC00", "border": "2px solid "+response[i].color});
				}

				if (!groups.includes(response[i].name))
				{
					
					groups.push(response[i].name);
					bgcolor = "var(--primary-color)";

					if (response[i].status == "ON")
					{
						bgcolor = response[i].color;
					}

					$("#lights #lights-room-groups").append("<button id='"+response[i].id+"' class='uk-button uk-width-small uk-animation-scale-down "+response[i].status+"' style='background-color: "+bgcolor+"; border: 2px solid "+response[i].color+"'><span>"+response[i].name+"</span></button>");
				}
			}

			groups = [];
		}
		else
		{
			$("#lights #lights-room-groups").empty();
			$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Groups Found in This Room !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#lights #lights-room-groups").empty();
		$("#lights #lights-room-groups").append("<table><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Groups !</th></tr></table>");
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
			$("#groups #groups-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Groups Found !<br><small>Make Sure You Add Groups...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#groups #groups-list").empty();
		$("#groups #groups-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Groups !</th></tr></table>");
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
					$(device).css({"background-color": "#FFCC00", "border": "2px solid "+response[i].color});
				}
				else
				{
					$(device).css("background-color", "var(--device-color)");
					$(device).css({"background-color": "var(--device-color)", "border": "2px solid var(--text-color)"});
				}
			}
		}
		else
		{
			if (flag)
			{
				$.growl({ title: "This Group Has no Devices.", message: "Make Sure You Add Devices!" });
			}
		}
	})
	.fail(function()
	{
			$.growl.error({ message: "Failed to Change Group Status !" });
	});
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
		}
		else
		{
			$("#modal-add-group #add-group-room table").empty();
			$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-add-group #add-group-room table").empty();
		$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Rooms !</th></tr>")
	});

	$("#add-group-search-room").change(function()
	{
		// Get Selected Option Value
		var room = $("#add-group-search-room").val();
		// Empty The Devices Display Room
		$("#modal-add-group #add-group-room table").empty();
		// Display The Selected Room's Devices
		DisplayDevicesAddGroupsSection(room);
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
			$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th class='uk-text-center'><img src='../images/icons/notfound.png' width='45' height='45'><br><br>No Devices Found in This Room !</th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-add-group #add-group-room table").empty();
		$("#modal-add-group #add-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='45' height='45'><br><br>Failed to Load Devices !</th></tr>");
	});
}
/* Reset Add Group Modal Function */
function ResetAddGroupModal()
{
	$("#add-group-name").val(""); // Clear Group Name
	$("#add-group-name").css("border", "1px solid var(--secondary-color)"); // Remove Red Border from Input
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
			$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Rooms Found in This Floor !<br><small>Make Sure You Add Rooms...</small></th></tr>");
		}

	})
	.fail(function()
	{
		$("#modal-edit-group #edit-group-room table").empty();
		$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Rooms !</th></tr>");
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
			$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th class='uk-text-center'><img src='../images/icons/notfound.png' width='45' height='45'><br><br>No Devices Found in This Room !</th></tr>");
		}
	})
	.fail(function()
	{
		$("#modal-edit-group #edit-group-room table").empty();
		$("#modal-edit-group #edit-group-room table").append("<tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='45' height='45'><br><br>Failed to Load Devices !</th></tr>");
	});
}
/* Reset Edit Group Modal Function */
function ResetEditGroupModal()
{
	$("#edit-group-name").css("border", "1px solid var(--secondary-color)"); // Remove Red Border from Input
	$("#edit-group-name-error").hide(); // Hide Error
	$("#modal-edit-group #edit-group-room table img.SELECTED").css("background-color", "var(--device-color"); // Reset Devices Color
	$("#modal-edit-group #edit-group-room table img.SELECTED").removeClass("SELECTED"); // Reset All Devices
	$("#edit-group-search-floor").empty(); // Clear Floors List
	$("#edit-group-search-room").empty(); // Clear Rooms List
}
/*==================================================
		Statistics Section Functions
==================================================*/
//
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
			$("#floors #floors-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Floors Found !<br><small>Make Sure You Add Floors...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#floors #floors-list").empty();
		$("#floors #floors-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Floors !</th></tr></table>");
	}); 
}
/* Reset Add Floor Modal Function */
function ResetAddFloorModal()
{
	$("#add-floor-name").val(""); // Clear Floor Name
	$("#add-floor-name").css("border", "1px solid var(--secondary-color)");// Remove Red Border from Input
	$("#add-floor-name-error").hide(); // Hide Error
}
/* Reset Edit Floor Modal Function */
function ResetEditFloorModal()
{
	$("#edit-floor-name").val("");
	$("#modal-edit-floor table").empty();
	$("#edit-floor-name").css("border", "1px solid var(--secondary-color)");
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
					tmp = "<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Rooms Found !<br><small>Make Sure You Add Rooms...</small></th></tr></table>";
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
			$("#rooms #rooms-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Rooms Found !<br><small>Make Sure You Add Rooms...</small></th></tr></table>");
		}
	})
	.fail(function()
	{
		$("#rooms #rooms-list").empty();
		$("#rooms #rooms-list").append("<table class='uk-margin-small-top'><tr class='uk-animation-scale-down uk-text-center'><th style='color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Rooms !</th></tr></table>");
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
	$("#add-room-name").css("border", "1px solid var(--secondary-color)"); // Remove Red Border from Input
	$("#add-room-width").css("border", "1px solid var(--secondary-color)"); // Remove Red Border from Input
	$("#add-room-height").css("border", "1px solid var(--secondary-color)"); // Remove Red Border from Input
	$("#add-room-name-error").hide(); // Hide Error
	$("#add-room-width-error").hide(); // Clear Room Width
	$("#add-room-height-error").hide(); // Clear Room Height
	$("#add-room-search-floor").empty(); // Empty Floors List
	$("#modal-add-room table").empty();
}
/* Reset Add Room Device Modal Function */
function ResetAddRoomDeviceModal()
{
	$("#add-room-device-type").val($("#add-room-device-type option:first").val());
	$("#add-room-device-pin").val("");

	$("#add-room-device-type").css("border", "1px solid var(--secondary-color)");
	$("#add-room-device-pin").css("border", "1px solid var(--secondary-color)");

	$("#add-room-device-type-error").hide();
	$("#add-room-device-pin-error").hide(); 
}
/* Reset Edit Room Modal Function */
function ResetEditRoomModal()
{
	$("#edit-room-name").val("");
	$("#edit-room-search-floor").empty();
	$("#modal-edit-room #edit-room-room-devices").empty();
	$("#modal-edit-room #edit-room-room-groups").empty();
	$("#edit-room-name").css("border", "1px solid var(--secondary-color)");
	$("#edit-room-name-error").hide(); // Hide Error
}
/* Reset Edit Room Device Modal Function */
function ResetEditRoomDeviceModal()
{
	$("#edit-room-device-type").val($("#edit-room-device-type option:first").val());
	$("#edit-room-device-pin").val("");

	$("#edit-room-device-type").css("border", "1px solid var(--secondary-color)");
	$("#edit-room-device-pin").css("border", "1px solid var(--secondary-color)");

	$("#edit-room-device-type-error").hide();
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
			$("#users #users-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th>Name</th><th>Type</th></thead><tbody></tbody>");

			for (var i = 0; i < len; i++)
			{
				$("#users #users-list table tbody").append("<tr id='"+response[i].username+"' class='uk-animation-scale-down uk-text-center'><td>"+response[i].name+"</td><td>"+response[i].type+"</td></tr>");
			}
		}
		else
		{
			$("#users #users-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem;'><img src='../images/icons/notfound.png' width='50' height='50'><br><br>No Users Found !</th></tr></thead>");
		}
	})
	.fail(function()
	{
		$("#users #users-list table").empty();
		$("#users #users-list table").append("<thead><tr class='uk-animation-scale-down uk-text-center'><th style='border: 1px solid var(--secondary-color); border-radius: .25rem; color: #C0392B;'><img src='../images/icons/error.png' width='50' height='50'><br><br>Failed to Load Users !</th></tr></thead>");
	}); 
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

	$("#setting-fname").css("border", "1px solid var(--secondary-color)");
	$("#setting-lname").css("border", "1px solid var(--secondary-color)");
	$("#setting-old-password").css("border", "1px solid var(--secondary-color)");
	$("#setting-new-password").css("border", "1px solid var(--secondary-color)");
	$("#setting-confirm-new-password").css("border", "1px solid var(--secondary-color)");

	$("#setting-fname-error").hide();
	$("#setting-lname-error").hide();
	$("#setting-old-password-error").hide();
	$("#setting-new-password-error").hide();
	$("#setting-confirm-new-password-error").hide();
}