alert('SceneGameScene.js loaded');

function SceneGameScene() {

};

SceneGameScene.prototype.initialize = function () {
	alert("SceneGameScene.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called

};

SceneGameScene.prototype.handleShow = function (data) {
	alert("SceneGameScene.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneGameScene.prototype.handleHide = function () {
	alert("SceneGameScene.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneGameScene.prototype.handleFocus = function () {
	alert("SceneGameScene.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneGameScene.prototype.handleBlur = function () {
	alert("SceneGameScene.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneGameScene.prototype.handleKeyDown = function (keyCode) {
	alert("SceneGameScene.handleKeyDown(" + keyCode + ")");
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