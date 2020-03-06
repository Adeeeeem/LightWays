/*==================================================
				Preloader
==================================================*/
$(window).on("load", function()
{
	$("#status").fadeOut();
	$("#preloader").delay(350).fadeOut("slow");
});
/*==================================================
				Theme
==================================================*/
$(window).on("load", function()
{
	if (localStorage.getItem("LightWays_THEME") == null){localStorage.setItem("LightWays_THEME", "LIGHT");}

	if(localStorage.getItem("LightWays_THEME") == "DARK")
	{
		$(document.body).css("--primary-color", "#252729");
		$(document.body).css("--secondary-color", "#B7B2A8");
		$(document.body).css("--body-color", "#202223");
		$(document.body).css("--text-color", "#D6D3CD");
		$(document.body).css("--input-color", "#181A1B");
	}
	else
	{
		$(document.body).css("--primary-color", "#D2D2EC");
		$(document.body).css("--secondary-color", "#A1A5BE");
		$(document.body).css("--body-color", "#E7E7E4");
		$(document.body).css("--text-color", "#333333");
		$(document.body).css("--input-color", "#FFFFFF");
	}
});