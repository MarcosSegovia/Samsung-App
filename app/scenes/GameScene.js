alert('SceneGameScene.js loaded');
var cardComes;


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
	
	
	/*for(var i=0; i<numPlayers; i++)
	{
		playersApp[i]['color'] = colors[i];
	}*/
	
};

SceneGameScene.prototype.handleShow = function (channelSent) {
	alert("SceneGameScene.handleShow()");
	// this function will be called when the scene manager show this scene
	
	actualChannel = channelSent;
	
	$( "#example" ).append( "Handing out cards..." );
	
	//Pintamos los jugadores
	for(var i=0; i<numPlayers; i++)
	{
		$( ".wrapperPlayers" ).append('<div class="playerTemplate"> <img height="68" width="50" src="images/j'+(i+1)+'.png"> <div>');
		
	}
	
	console.log('Longitud Array Cartas mazo: '+cardsApp.length);
	
	//Repartimos 8 cartas a cada jugador y las borramos de nuestra Pool
	for(var j=0; j<2; j++)
	{
		//8 cartas
		for(var k=0; k<8; k++)
		{
			var card = chooseRandomCardFromPool();
			console.log('CARTA RECIBIDA: '+card['number']);
			console.log('CARTA RECIBIDA: '+card['colour']);
			//string ={"number": card[0]['number'], "colour": card[0]['colour']};
			//sendCardToPlayer(card, playersApp[j]['idClient']);
		}
	}
	$("#example").fadeOut("slow");
	
	var cards=[];
	cards[0]=[];
	cards[0]['number'] = 10;
	cards[0]['colour'] = 'red';
	cards[1]=[];
	cards[1]['number'] = 3;
	cards[1]['colour'] = 'black';
	cards[2]=[];
	cards[2]['number'] = 4;
	cards[2]['colour'] = 'red';
	cards[3]=[];
	cards[3]['number'] = 7;
	cards[3]['colour'] = 'green';
	cards[4]=[];
	cards[4]['number'] = 6;
	cards[4]['colour'] = 'blue';
	cards[5]=[];
	cards[5]['number'] = 9;
	cards[5]['colour'] = 'blue';
	cards[6]=[];
	cards[6]['number'] = 1;
	cards[6]['colour'] = 'blue';
	cards[7]=[];
	cards[7]['number'] = 2;
	cards[7]['colour'] = 'red';
	cards[8]=[];
	cards[8]['number'] = 1;
	cards[8]['colour'] = 'red';
	cards[9]=[];
	cards[9]['number'] = 3;
	cards[9]['colour'] = 'red';
	cards[10]=[];
	cards[10]['number'] = 8;
	cards[10]['colour'] = 'red';
	cards[11]=[];
	cards[11]['number'] = 9;
	cards[11]['colour'] = 'red';
	cards[12]=[];
	cards[12]['number'] = 12;
	cards[12]['colour'] = 'red';
	cards[13]=[];
	cards[13]['number'] = 5;
	cards[13]['colour'] = 'red';
	cards[14]=[];
	cards[14]['number'] = 6;
	cards[14]['colour'] = 'red';
	cards[15]=[];
	cards[15]['number'] = 7;
	cards[15]['colour'] = 'red';
	cards[16]=[];
	cards[16]['number'] = 13;
	cards[16]['colour'] = 'red';
	cards[17]=[];
	cards[17]['number'] = 11;
	cards[17]['colour'] = 'red';
	placeCard(cards[0]['number'], cards[0]['colour']);
	placeCard(cards[1]['number'], cards[1]['colour']);
	placeCard(cards[2]['number'], cards[2]['colour']);
	placeCard(cards[3]['number'], cards[3]['colour']);
	placeCard(cards[4]['number'], cards[4]['colour']);
	placeCard(cards[5]['number'], cards[5]['colour']);
	placeCard(cards[6]['number'], cards[6]['colour']);
	placeCard(cards[7]['number'], cards[7]['colour']);
	placeCard(cards[8]['number'], cards[8]['colour']);
	placeCard(cards[9]['number'], cards[9]['colour']);
	placeCard(cards[10]['number'], cards[10]['colour']);
	placeCard(cards[11]['number'], cards[11]['colour']);
	placeCard(cards[12]['number'], cards[12]['colour']);
	placeCard(cards[13]['number'], cards[13]['colour']);
	placeCard(cards[14]['number'], cards[14]['colour']);
	placeCard(cards[15]['number'], cards[15]['colour']);
	placeCard(cards[16]['number'], cards[16]['colour']);
	placeCard(cards[17]['number'], cards[17]['colour']);
	
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


/*actualChannel.on("message", function(msg, sender)
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
	
	
	
});*/

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
	var number = Math.floor((Math.random() *52));
	while(true)
	{
		console.log(number);
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
	    	if($(this).attr('id')<number)
			{
	    		if(!big)
    			{
	    			big=true;
    			}
	    		
	    		if(big&&little || index+1==$( "#wrapper"+colour+"Cards img" ).length)
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
