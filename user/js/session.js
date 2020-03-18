/*==================================================
				Session
==================================================*/
// If User tries to access Admin page without login in, it will redirect him to the first page
$(window).on("load", function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../php/session.php",
	})
	.done(function(response)
	{
		switch (response.result)
		{
			case "Error": //  Error
				window.location.href = "../";
			break;

			case "Admin": // Admin
				window.location.href = "../admin/";
			break;
		}
	});
});
/*==================================================
				Logout
==================================================*/
// Logout Button
$(function ()
{
	$("#logout-btn, #mobile-logout-btn").click(function()
	{
		$.ajax
		({
			type: "POST",
			url: "../php/logout.php",
		})
		.always(function()
		{
			localStorage.setItem("LightWays_SECTION", "#lights-btn"); // Reset Saved Tabs
			window.location.href="../"; // Exit to Login Page
		});
	});
});