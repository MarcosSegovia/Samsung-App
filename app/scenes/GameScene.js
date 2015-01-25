alert('SceneGameScene.js loaded');
var cardComes;
var table;
var cardsTable;

function SceneGameScene() {
	
};

SceneGameScene.prototype.initialize = function () {
	alert("SceneGameScene.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	
	cardComes = false;
	table = new Array();
	cardsTable = 0;
	playerTurn=0;
	
	
	/*for(var i=0; i<numPlayers; i++)
	{
		playersApp[i]['color'] = colors[i];
	}*/
	
};

SceneGameScene.prototype.handleShow = function () {
	alert("SceneGameScene.handleShow()");
	// this function will be called when the scene manager show this scene
	
	
	$( "#example" ).append( "Handing out cards..." );
	
	//Pintamos los jugadores
	for(var i=0; i<numPlayers; i++)
	{
		$( ".wrapperPlayers" ).append('<div id="player'+i+'" class="playerTemplate"> <img height="68" width="50" src="images/'+playersApp[i]['colour']+'.png"> <div>');
	}
	
	//Repartimos 8 cartas a cada jugador y las borramos de nuestra Pool
	for(var j=0; j<numPlayers; j++)
	{
		//8 cartas
		for(var k=0; k<8; k++)
		{
			var card = chooseRandomCardFromPool();
			console.log('CARTA RECIBIDA: '+card['number']);
			console.log('CARTA RECIBIDA: '+card['colour']);
			
			//Montamos nuestro string json y lo enviamos al usuario via mensaje.
			
			
			sendCardToPlayer(card['number'], card['colour'], playersApp[j]['idClient']);
		}
	}
	$("#example").fadeOut("slow");
	
	actualChannel.on("message", function(msg, sender)
	{
		var message = JSON.parse(msg);
		
		if(message.text == "WIN")
		{
			$( ".gameScenario" ).append('<p id="victory"><b><font size="8" color="red">PLAYER '+(parseFloat(playerTurn)+parseFloat(1))+' WON!</font></b></p>');
		}
		if(message.text=="EndTurn")
		{
			if(message.card)
			{
				var card = chooseRandomCardFromPool();
				if(!card)
				{
					console.log('No more cards on pool !');
				}
				else
				{
					sendCardToPlayer(card['number'], card['colour'], playersApp[playerTurn]['idClient']);
				}
			}
			removeBorderActualPlayer();
			
			if(playerTurn==numPlayers-1)
			{
				playerTurn=0;
			}
			else
			{
				playerTurn++;
			}
			
			sendNextPlayer();
			setBorderActualPlayer();
		}
		//Nos avisa el usuario del dispositivo, que va a enviar una carta.
		if(message.text=="Card")
		{
			//Guardamos la carta en nuestra array de la mesa.
			table[cardsTable] = new Array();
			table[cardsTable]['number'] = message.number;
			table[cardsTable]['colour'] = message.colour;
			cardsTable++;
			//Emviamos la carta a la mesa.
			placeCard(message.number, message.colour);
		}
		
	});
	
	//Carta aleatoria para empezar el juego.
	var startingCard = chooseRandomCardFromPool();
	//Añadimos la carta a la array de la mesa y a la mostramos en la mesa.
	table[cardsTable] = new Array();
	table[cardsTable]['number'] = startingCard['number'];
	table[cardsTable]['colour'] = startingCard['colour'];
	cardsTable++;
	placeCard(startingCard['number'], startingCard['colour']);
	setBorderActualPlayer();
	sendNextPlayer();
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





function sendNextPlayer()
{
	var string1 = {
			type: "Information",
			text: "Player "+(playerTurn+1)+" turn."
	};
	//Enviamos a todos los jugadores info sobre de quién es el turno.
	actualChannel.send(JSON.stringify(string1), "broadcast");
	//Damos turno al jugador en cuestión.
	var string2 = {
			text: "Go"
	};
	actualChannel.send(JSON.stringify(string2), playersApp[playerTurn]['idClient']);
	
	//Enviamos al usuario todo el tablero.
	for(var i=0; i<cardsTable;i++)
	{
		var string3 = {
				text: "Table",
				number: table[i]['number'],
				colour: table[i]['colour']
		};
		actualChannel.send(JSON.stringify(string3), playersApp[playerTurn]['idClient']);
	}
}


function sendCardToPlayer(number, colour, idPlayer)
{
	var string = {
			text: "Card",
			number: number,
			colour:  colour
		};
	
	actualChannel.send(JSON.stringify(string), idPlayer);
}

function setBorderActualPlayer()
{
	$('#player'+playerTurn+'').css('border-style', 'solid');
	$('#player'+playerTurn+'').css('border-color', 'yellow');
}

function removeBorderActualPlayer()
{
	$('#player'+playerTurn+'').css('border-style', '');
	$('#player'+playerTurn+'').css('border-color', '');
}

function chooseRandomCardFromPool()
{
	//Hacemos un random para todos los posibles numeros
	var stacks = 0;
	var number = Math.floor((Math.random() *52));
	while(true)
	{
		if(cardsApp[number]['delivered']==false)
		{
			cardsApp[number]['delivered']=true;
			var card = new Array();
			card['number'] = cardsApp[number]['number'];
			card['colour'] = cardsApp[number]['colour'];
			return card;
		}
		else
		{
			if(number==51)
			{
				number=0;
			}
			else
			{
				number++;
			}
		}
		
		if(stacks>60)
		{
			return 0;
		}
		else
		{
			stacks++;
		}
		
	}
}

//Enviamos la carta y nos muestra el tablero reordenado.
function placeCard(number, colour)
{
	if ($('#wrapper'+colour+'Cards').is(':empty'))
	{
		$('#wrapper'+colour+'Cards').append('<img id="'+number+'" height="94" width="65" src="images/cards/'+colour+number+'.png">');
	}
	else
	{
		var little=false;
		var big=false;
		$( "#wrapper"+colour+"Cards img" ).each(function( index ) 
		{
	    	if($(this).attr('id') < parseFloat(number))
			{
	    		if(!big)
    			{
	    			big=true;
    			}
	    		
	    		if(big&&little || parseFloat(index)+parseFloat(1) == $( "#wrapper"+colour+"Cards img" ).length)
    			{
		    		$(this).after('<img id="'+number+'" height="94" width="65" src="images/cards/'+colour+number+'.png">');
		    		return false;
    			}
	    		
	    				
			}
	    	else
			{
	    		if(!little)
    			{
	    			little=true;
    			}
	    		
	    		if(big&&little || index==0)
    			{
		    		$(this).before('<img id="'+number+'" height="94" width="65" src="images/cards/'+colour+number+'.png">');
		    		return false;
    			}
	    		
			}
		});
	}
}
