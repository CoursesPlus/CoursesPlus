var file = "";
if (navigator.userAgent.indexOf("Chrome") > -1) {
	file = "chrome";
} else if (navigator.userAgent.indexOf("Safari") > -1) {
	file = "safari";
}
document.write('<script type="text/javascript" src="../js/cpal.' + file + '.js"></scr' + 'ipt>');