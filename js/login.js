/* If user is already connected take him to Home Page */
$(window).on("load", function()
{
	$.ajax
	({
		url: "php/session.php",
		type: "POST",
		dataType: "json",
	})
	.done(function(response)
	{
		switch (response.result)
		{
			case "User": // User
				window.location.href="user/";
			break;

			case "Admin": //  Admin
				window.location.href="admin/";
			break;
		}
	});
});
/* When Clicking on Login Button */
$(function()
{
	$("#login-btn").click(function(e)
	{
		e.preventDefault(); // Prevent From Loading the Page

		var username = $("#login-username").val(); // Get Username Value
		var password = $("#login-password").val(); // Get Password Value

		if (!username)
		{
			$("#login-username").css("border", "1px solid #F32013");
			$("#login-username-error").show();
		}
		else
		{
			$("#login-username").css("border", "1px solid var(--secondary-color)");
			$("#login-username-error").hide();
		}

		if (!password)
		{
			$("#login-password").css("border", "1px solid #F32013");
			$("#login-password-error").show();
		}
		else
		{
			$("#login-password").css("border", "1px solid var(--secondary-color)");
			$("#login-password-error").hide();
		}

		$.ajax
		({
			url: "php/login.php",
			type: "POST",
			dataType: "json",
			data: {username: username, password: password},
		})
		.done(function(response)
		{
			switch (response.result)
				{
					case "Error": // Error
						ResetLoginForm();
						$.growl.error({ message: "Oops, There was an Error!" });
						$("#login-username").css("border", "1px solid #F32013");
						$("#login-password").css("border", "1px solid #F32013");
					break;

					case "Empty": // Empty
						$.growl.error({ message: "Please fill in the required fields !" });
					break;

					case "NotFound": // User Not Found
						ResetLoginForm();
						$.growl.error({ message: "Sorry, we couldn't find an account with that username. Please try again !" });
						$("#login-username").css("border", "1px solid #F32013");
						$("#login-password").css("border", "1px solid #F32013");
						$("#wrong-username-error").show();
					break;

					case "Wrong": // Wrong Password
						ResetLoginForm();
						$.growl.error({ message: "Sorry, that password doesn't match your username." });
						$("#login-password").css("border", "1px solid #F32013");
						$("#wrong-password-error").show();
					break;

					case "User": // Normal User
						window.location.href="user/";
						localStorage.setItem("LightWays_SECTION", "#lights-btn"); // Reset Saved Tabs
					break;

					case "Admin": // Admin
						window.location.href="admin/";
						localStorage.setItem("LightWays_ADMIN_SECTION", "#lights-btn"); // Reset Saved Tabs
					break;
				}
		})
		.fail(function()
		{
			ResetLoginForm();
			$.growl.error({ message: "Oops, There was an Error!" });
			$("#login-username").css("border", "1px solid #F32013");
			$("#login-password").css("border", "1px solid #F32013");
		});
	});
});
/* Reset Login Form */
function ResetLoginForm()
{
	$("#login-username").css("border", "none");
	$("#login-username-error").hide();
	$("#login-password").css("border", "none");
	$("#login-password-error").hide();
	$("#wrong-username-error").hide();
	$("#wrong-password-error").hide();
}