function pageBuilder(){
	var me = this;
	var history = [];
	var away;
	var container;
	function makePage(){
		container = document.getElementById("main");
		makeTitle(container);
		UTIL.setFocused();
		setEventListeners();
	}
	me.makePage =  makePage;

	function setEventListeners(){
		window.addEventListener("focus", UTIL.setFocused);
		 document.addEventListener(UTIL.getvisibilityChangeParam(), handleVisibilityChange, false);

		document.addEventListener("storage",handleStorageEvents,false);
	}

	function makeTitle(container){
		var h2 = DOM.newElement("h2",container);
		h2.id = "app_title";
		h2.innerHTML = "I am "+UTIL.getTabId()+" @ "+Date.now();
	}
	function makeHistory(container,location){
		DOM.newElement("p",container).innerHTML = location;
	}
	me.pageLoaded = function(){
		makePage();
	}
	function handleStorageEvents(event){
		var key = event.key;
		if(key === UTIL.FOCUSED_KEY_ID){
			var value = event.newValue;
			if(value && value != UTIL.getCurrentTabId()){
				history.push(value);
				makeHistoryView(container,value);
			}
		}
	}
	function userIsAway(){
		away = Date.now();
	}
	function userIsBack(){
		makeHistory(container,(Date.now()-away).toString()+"  ms");
	}
	function handleVisibilityChange(event){
		if(document[UTIL.getVisibilityHiddenParam()]){
			userIsAway();
		}else{
			userIsBack();
		}
	}
}
var builder = new pageBuilder();
window.onpageLoaded = builder.pageLoaded();