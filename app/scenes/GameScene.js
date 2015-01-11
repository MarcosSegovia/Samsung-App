alert('SceneGameScene.js loaded');
var cardComes;
var cardsApp = [];

function SceneGameScene() {
	
};

SceneGameScene.prototype.initialize = function () {
	alert("SceneGameScene.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	var colors = ["black", "blue", "green", "red"];
	cardComes=false;
	playerTurn=0;
	
	
	for(var i=0; i<numPlayers; i++)
	{
		playersApp[i]['color'] = colors[i];
	}
	
	parseJson();
};

SceneGameScene.prototype.handleShow = function (data) {
	alert("SceneGameScene.handleShow()");
	// this function will be called when the scene manager show this scene
	
	$( "#example" ).append( "Handing out cards..." );
	
	//Pintamos los jugadores
	for(var i=0; i<1; i++)
	{
		$( ".wrapperPlayers" ).append('<div class="playerTemplate"> <img height="68" width="50" src="images/j'+(i+1)+'.png"> <div>');
		
	}
	
	console.log(cardsApp.length);
	
	//Repartimos 8 cartas a cada jugador y las borramos de nuestra Pool
	for(var j=0; j<2; j++)
	{
		//8 cartas
		for(var k=0; k<8; k++)
		{
			//card = chooseRandomCardFromPool();
			console.log("Cojones pasa aqui !");
			//string ={"number": card[0]['number'], "colour": card[0]['colour']};
			//sendCardToPlayer(card, playersApp[j]['idClient']);
		}
	}
	$("#example").fadeOut("slow");
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

actualChannel.on("message", function(msg, sender)
{
	if(msg=="Pass")
	{
		if(playerTurn==numPlayers-1)
		{
			playerTurn=0;
		}
		else
		{
			playerTurn++;
		}
		sendNextPlayer();
	}
	else
	{	
		//Hemos sido avisados previamente, leemos la carta que nos envía el player actual.
		if(cardComes)
		{
			cardComes=false;
			
			//Chicha
			
		}
		else
		{
			//Nos avisa el usuario del dispositivo, que va a enviar una carta.
			if(msg=="Card")
			{
				cardComes=true;
			}
		}
		
	}
	
	
	
});


function parseJson()
{
	$.getJSON( "../Samsung-App/webservices/cards.json", function( data ) {


	    var numCard=0;

	    $.each( data.cards, function( key, val ) {
	    	cardsApp[numCard] = [];
	    	cardsApp[numCard]['number']= val.number;
	    	cardsApp[numCard]['colour']= val.colour;
	    	cardsApp[numCard]['delivered']= val.delivered;
	        numCard++;
	    });
	    
	    //console.log(cardsApp.length);
	    console.log('Cards loaded succesfuly.');
	});
}

/*
function sendNextPlayer();
{
	//Enviamos a todos los jugadores info sobre de quién es el turno.
	actualChannel.send("Player "+(playerTurn+1)+" turn.", "broadcast");
	//Damos turno al jugador en cuestión.
	actualChannel.send("Go", playersApp[playerTurn]['idClient']);
}

function sendCardToPlayer(stringCard, idPlayer)
{
	actualChannel.send('Card', idPlayer);
	actualChannel.send(stringCard, idPlayer);
}
*/
function chooseRandomCardFromPool()
{
	//Hacemos un random para todos los posibles numeros
	var number = Math.floor((Math.random() *52) + 1);
	console.log(cardsApp[0]['delivered']);
	while(true)
	{
		console.log("COOOOOO: "+cardsApp[number]['delivered']);
		if(cardsApp[number]['delivered']==false)
		{
			cardsApp[number]['delivered']=true;
			return cardsApp[number];
		}
		else
		{
			number++;
		}
	}	
}

function placeCard(card)
{
	
	//$( "#wrapper"+card[0][]+"Cards" ).append('<img height="68" width="50" src="images/cards/.png">');
}
