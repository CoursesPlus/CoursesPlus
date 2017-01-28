var file = "";
if (navigator.userAgent.indexOf("Chrome") > -1 || navigator.userAgent.indexOf("Firefox") > -1) {
	file = "chrome";
} else if (navigator.userAgent.indexOf("Safari") > -1) {
	file = "safari";
}/* else if (navigator.userAgent.indexOf("Firefox") > -1) {
	file = "firefox";
}*/
document.write('<script type="text/javascript" src="../js/cpal.' + file + '.js"></scr' + 'ipt>');