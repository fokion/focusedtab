var DOM = new function(){
	var me = this;
	function newElement(type , parent){
		var elem = document.createElement(type);
	    if (parent) {
	      parent.appendChild(elem);
	    }
	    return elem;
    }
    me.newElement = newElement;
}