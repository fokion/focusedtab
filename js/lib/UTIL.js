var UTIL = new function(){
	var me = this;
	me.FOCUSED_KEY_ID = "tab_focused";
	me.FOCUSED_TIME_ID = me.FOCUSED_KEY_ID+"_time";
	var TAB_ID = null;
	var GLUE = "___";
	var hiddenParam;
	var visibilityChange;
	checkVisiblitySupport();
	function getRandomAlphanumeric (size){
		var ret = [];
		var chars = "qwertyuiopasdfghjklzxcvbnm1234567890";
		var length = chars.length;
		for(var i = 0 ; i < size ; i++){
			ret.push(chars[Math.floor((Math.random() * length) + 1)]);
		}
		ret.push(Date.now());
		return ret.join("");
	}
	me.getRandomAlphanumeric = getRandomAlphanumeric;

	function initializeTabId(){
		if(TAB_ID === null){
			TAB_ID = getRandomAlphanumeric(20);
		}
		return TAB_ID;
	}

	function getTabId(){
		return initializeTabId();
	}
	me.getTabId = getTabId;

	function getGlue(){
		return GLUE;
	}
	me.getGlue = getGlue;

	function getCurrentTabId(){
		var parts = [getTabId(),getGlue(),document.location];
		return parts.join("");
	}
	me.getCurrentTabId = getCurrentTabId;
	function getCurrentTime(){
		var parts = [getTabId(),getGlue(),Date.now()];
		return parts.join("");
	}
	me.setFocused = function (){
		//TODO stingify that...
		localStorage.setItem(me.FOCUSED_KEY_ID ,getCurrentTabId());
		localStorage.setItem(me.FOCUSED_TIME_ID ,getCurrentTime());
	}
	function checkMozillaVisibility(){
		return (typeof document.mozHidden !== "undefined");
	}
	function checkMicrosoftVisibility(){
		return (typeof document.msHidden !== "undefined");
	}
	function checkWebkitVisibility(){
		return (typeof document.webkitHidden !== "undefined");
	}
	function checkVisiblitySupport(){
		 
		if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
		  hiddenParam = "hidden";
		  visibilityChange = "visibilitychange";
		} else if (checkMozillaVisibility()) {
		  hiddenParam = "mozHidden";
		  visibilityChange = "mozvisibilitychange";
		} else if (checkMicrosofrVisibility()) {
		  hiddenParam = "msHidden";
		  visibilityChange = "msvisibilitychange";
		} else if (checkWebkitVisibility()) {
		  hiddenParam = "webkitHidden";
		  visibilityChange = "webkitvisibilitychange";
		}
	
	}
	me.getVisibilityHiddenParam = function (){
		return hiddenParam;
	}
	me.getvisibilityChangeParam = function (){
		return visibilityChange;
	}
}