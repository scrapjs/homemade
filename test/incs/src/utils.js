var cssPrefix = detectCSSPrefix(),
//#if false
	pluginName = "sticky",
	className = "sticky"
//#else
	/* #put "pluginName = '" + "abc" + "'," */
	/* #put "className = '" + "def" + "'" */
//#endif


//#if false
var logDiv = document.createElement("div")
logDiv.style.position = "fixed";
logDiv.style.bottom = 0;
logDiv.style.left = 0;
document.body.appendChild(logDiv)
function log(val){
	logDiv.innerHTML = val;
}
//#endif