/**
 * 
 */
var wsUrl;
var idMatch = '1234';

var appPath = window.location.pathname.split('/')[1];
var host = window.location.hostname;
var port = "8080";

if (host == 'localhost') {
	port = '8080';
}

if (window.location.protocol == 'https:') {
	port = '8443';
	wsUrl = 'wss://' + host + ':' + port + '/' + appPath + '/monitoreo/';
} else {
	wsUrl = 'ws://' + host + ':' + port + '/' + appPath + '/monitoreo/';
}

function connect() {
	createWebSocket(wsUrl);
}

function createWebSocket(host) {
	if (!window.WebSocket) {
		var spanError = document.createElement('span');
		spanError.setAttribute('class', 'alert alert-danger');
		spanError.innerHTML = "Votre navigateur ne supporte pas les WebSockets!";
		document.body.appendChild(spanError);
		return false;
	} else {
		socket = new WebSocket(host);
		socket.onopen = function() {
			document.getElementById("mensaje-estatus").innerHTML = 'CONNECTING...';
		};
		socket.onclose = function() {
			document.getElementById("mensaje-estatus").innerHTML = 'FINISHED';
		};
		socket.onerror = function() {
			document.getElementById("mensaje-estatus").innerHTML = 'ERROR - Please refresh this page';
		};
		socket.onmessage = function(msg) {
			try {
				console.log(data);
				var obj = JSON.parse(msg.data);

				if (obj.hasOwnProperty("match")) {
					// title
					m1title.innerHTML = obj.match.title;
					// comments
					m1comments.value = obj.match.comments;
					m1comments.scrollTop = 999999;

					document.getElementById("mensaje-estatus").innerHTML = 'LIVE';
				}
				// else {
				// document.getElementById("m1-betmatchwinner-result").innerHTML
				// = obj.result;
				// }

			} catch (exception) {
				data = msg.data;
				console.log(data);
			}
		};
	}
}

var wsUri = 'ws://127.0.0.1:8080/monitoreo/monitoreo';
function testWebSocket() {

	try {
		websocket = new WebSocket(wsUri);
		websocket.onopen = function(evt) {
			onOpen(evt);
		};
	} catch (e) {
		// TODO: handle exception
		doException(e.message);
		websocket.onerror = function(evt) {
			onError(evt);
		};

	}

	// websocket.onclose = function(evt) {
	// onClose(evt)
	// };
	websocket.onmessage = function(evt) {
		// onMessage(evt);
	};
	// websocket.onerror = function(evt) {
	// onError(evt)
	// };
}

function onOpen(evt) {
	document.getElementById("mensaje-estatus").innerHTML = 'CONNECTING...';
	doSend("WebSocket rocks");
}
function onClose(evt) {
	document.getElementById("mensaje-estatus").innerHTML = 'FINISHED';
}
function onMessage(evt) {
	document.getElementById("mensaje-estatus").innerHTML = '<span style="color: blue;">RESPONSE: '
			+ evt.data + '</span>';
	// websocket.close();
}

function onError(evt) {
	document.getElementById("mensaje-estatus").innerHTML = 'ERROR - Please refresh this page';
}
function doSend(message) {
	document.getElementById("mensaje-estatus").innerHTML = "SENT: " + message;
	websocket.send(message);
}

function doException(message) {
	document.getElementById("mensaje-estatus").innerHTML = "ERROR: " + message;
	websocket.send(message);
}

function doTest() {
	document.getElementById("mensaje-estatus").innerHTML = "Entrando pizarron de monitoreo";
	// websocket.send(message);
}

$(document).ready(function() {
	window.addEventListener("load", doTest, false);
});
