alert('SceneScene1.js loaded');
var delay;
function SceneScene1() {

};

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	localDevice = null;
	delay = 4000;
};

SceneScene1.prototype.handleShow = function (data) {
	alert("SceneScene1.handleShow()");
	// this function will be called when the scene manager show this scene
	webapis.multiscreen.Device.getCurrent(function(device) {
    	
		localDevice = device;

	    device.openChannel("com.mydomain.myapp.mychannel", {name:"TVClient"}, function(channel) {
	        	
	    	localDevice.getPinCode(function(pin) {
	    		console.log("pin = " + pin.code);
	    		$( "#pincode" ).append( pin.code );
	    		setTimeout(function(){
	    		sf.scene.hide('Scene1');
	    		sf.scene.show('GameScene');
	    		sf.scene.focus('GameScene'); }, delay);
	    		
	        });

	    	channel.on("clientConnect", function(client) {
	    		console.log("new client = " + client);
	    		client.send("Welcome " + client.attributes.name);
	    		
            });
	    });
	});
};

SceneScene1.prototype.handleHide = function () {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneScene1.prototype.handleFocus = function () {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneScene1.prototype.handleBlur = function () {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneScene1.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focused
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};