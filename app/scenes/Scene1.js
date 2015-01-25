alert('SceneScene1.js loaded');

function SceneScene1() {

};

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	localDevice = null;
	actualChannel = null;
	numPlayers=0;
	numColour=0;
	colours = ["black", "blue", "green", "red"];
	
};

SceneScene1.prototype.handleShow = function (data) {
	alert("SceneScene1.handleShow()");
	// this function will be called when the scene manager show this scene
	webapis.multiscreen.Device.getCurrent(function(device) {
    	
		
		localDevice = device;
		updatePinCode();
		connectToChannel();
	    
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
			
			var message = {
	            type:"app",
	            text: "Start"
	        };
			//Avisamos a todos los usuarios
			actualChannel.send(JSON.stringify(message), "broadcast");
			
			//Cambiamos de Escena.
			sf.scene.hide('Scene1');
    		sf.scene.show('GameScene');
    		sf.scene.focus('GameScene');
			break;
		default:
			alert("handle default key event, key code(" + keyCode + ")");
			break;
	}
};

connectToChannel = function(){
	
	localDevice.openChannel("com.samsung.multiscreen.rubikapp", {name:"TVClient"}, onConnect, function(error) {
        console.log("device.openChannel() Error : ", error);
        App.updateConnectionStatus("error: channel");            
    });
};

onConnect = function(channel)
{
	console.log("Channel Open Successfuly.");
	actualChannel = channel;
	
	channel.on("clientConnect", function(client) {
		console.log("new client = " + client);
		playersApp[numPlayers] = new Array();
		playersApp[numPlayers]['idClient'] = client.id;
		console.log(playersApp[numPlayers]['idClient']);
		playersApp[numPlayers]['colour'] = colours[numColour];
		playersApp[numPlayers]['points'] = 0;
		
		var message = {
            type:"welcome",
            text: "Welcome "+client.attributes.name+"!"
        };

        client.send(JSON.stringify(message), true);
        
        message = {
                type:"welcome",
                text: "Colour",
                colour: playersApp[numPlayers]['colour']
            };

        client.send(JSON.stringify(message), true);
		console.log(client.attributes.name+" connected to the cannel.");
		numPlayers++;
		numColour++;
		
    });
};

updatePinCode = function()
{
	localDevice.getPinCode(onPinCodeUpdate, function(error) {
        console.error("device.getPinCode() Error : ", error);
    });
};

onPinCodeUpdate = function(pin)
{
	console.log("App.onPinCodeUpdate", arguments);
	$( "#pincode" ).html( pin.code );
	
	// Update the PIN every time it expires
    setTimeout(updatePinCode, pin.ttl*1000 );
};

