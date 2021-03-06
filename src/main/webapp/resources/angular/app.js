(function() {

	/***************************************************************************
	 * MODULO PRINCIPAL
	 **************************************************************************/
	var app = angular.module('ambientalMonitor', [ 'ngRoute' ]);

	/***************************************************************************
	 * VARIABLES
	 **************************************************************************/
	var variablesAmbientales;
	/***************************************************************************
	 * RUTAS
	 **************************************************************************/

	// configure our routes
	app.config(function($routeProvider) {
		$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller : 'MainController'
		})
		// route for the about page
		 .when('/team', {
		 templateUrl : 'pages/team.html',
		 controller : 'TeamController'
		 })
		// route for the map page
		.when('/mapa', {
			templateUrl : 'pages/map.html',
			controller : 'MapController'
		})
		// route for the map page
		.when('/contacto', {
			templateUrl : 'pages/contacto.html',
			controller : 'ContactController'
		})
			.when('/equipo', {
			templateUrl : 'pages/equipo.html',
			controller : 'TeamController'
		});
	});

	/***************************************************************************
	 * CONTROLADORES
	 **************************************************************************/

	// Main
	app.controller('MainController', function($scope) {
		$scope.message = 'Sistema de Monitoreo Ambiental'
	});
	//
	// Team
	app.controller('TeamController', function($scope) {
		$scope.members = [
	    {"name":"Eddy Velazquez", "title":"El del Arduino",images : [ "./resources/img/eddy.jpg", "./resources/img/f.png", "./resources/img/t.png" ]},
	    {"name":"Orlando Ramos", "title":"El que programa",images : [ "./resources/img/orlando.jpg", "./resources/img/f.png", "./resources/img/t.png" ]},
	    {"name":"Yesic Luevanos","title":"El que dibuja",images : [ "./resources/img/yesic.jpg", "./resources/img/f.png", "./resources/img/t.png" ]}
	];

	});

	// Insert Record
	app.controller(	'InsertRecord',	function($scope, $interval, $http) {
		angular.element(document).ready(function() {$scope.callAtInterval = function() {
			$("#writeData").css("color","white");
			$http({
				method : 'POST',
				url : '/SpringMVC/rest/on'
					}).then(function successCallback(response) {
						if (response.status == "200") {
							$("#writeData").css("color","blue");
							$("#ReadData").css("color","white");
							variablesAmbientales = response.data;
							if (variablesAmbientales != 0) {
								var renglon = '<table class="table">'
									+ '<tr>'
									+ '<td>Variable</td>'
									+ '<td>Valor</td>'
									+ '</tr>';
									$.each(variablesAmbientales,function(i,item) {
										renglon += '<tr>'
											+ '<td id="idVar">'
											+ nombreVariable(variablesAmbientales[i].variableID)
											+ '</td>'
											+ '<td id="valor">'
											+ variablesAmbientales[i].valor
											+ '</td>'
											+ '</tr>';
											})
											renglon += '</table>';
									$("#Variables").html(renglon);
									}else{
										$("#ReadData").css("color","yellow");
										}
							}
						$("#ReadData").css("color","white");
						},function errorCallback(response)
						{console.log("rojo");
						$("#writeData").css("color","red");
						$("#ReadData").css("color","red");
						// called asynchronouslyif an error occurs or server
						// returns response with an error status.
						$scope.data = response.data;
						});
			}
		$interval(function() {	$scope.callAtInterval();}, 3000);
		});
		});

	// Get
// app .controller('GetRecordController',function($scope, $interval, $http) {
// angular.element(document).ready(function() {
// $scope.callAtInterval = function() {
// $("#readData").css("color","white");
// // AJAX
// $http({
// method : 'POST',
// url : '/SpringMVC/rest/records'})
// .then( function successCallback(response) {
// if (response.status == "200") {
// $("#readData").css("color","blue");
// console.log("Leyendo...");
// if (variablesAmbientales != 0) {
// var renglon = '<table class="table">'
// + '<tr>'
// + '<td>Variable</td>'
// + '<td>Valor</td>'
// + '</tr>';
// $.each(variablesAmbientales,function(i, item) {
// renglon += '<tr>'
// + '<td id="idVar">'
// + nombreVariable(variablesAmbientales[i].variableID)
// + ' </td>'
// + '<td id="valor">'
// + variablesAmbientales[i].valor
// + '</td>'
// + '</tr>';
// })
// renglon += '</table>';
// console.log(renglon);
// $("#Variables").html(renglon);
// } else {
// $("#readData").css("color","yellow");
// }
// }
// },function errorCallback(response) {
// $("#Variables").html("ERROR");
// console.log('ERROR ---- No hay comunicaciïón con el API.');
// $("#readData").css("color","red");
// $scope.data = response.data;
// });
// }
// $interval(function() {
// $scope.callAtInterval();
// }, 5000);
// });
// });
	// //// Fin de Get

	/**
	 * Metodo que asigna el nombre a las variables de acuerdo a su ID.
	 */
	function nombreVariable(idVariable) {

		var auxIdVariable = idVariable;
		var nombreVariable;
		if (auxIdVariable == '1') {
			nombreVariable = 'Temperatura'
		} else if (auxIdVariable == '2') {
			nombreVariable = 'Humedad'
		} else if (auxIdVariable == '3') {
			nombreVariable = 'CO'
		} else if (auxIdVariable == '4') {
			nombreVariable = 'CO2'
		} else if (auxIdVariable == '5') {
			nombreVariable = 'OOOO3'
		}
		return nombreVariable;
	}
	// Fin de m�todo.

	// CONFIGURACIONES DE FECHA
	var monthNames = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
			"Julio", "Augosto", "Septiembere", "Octubre", "Noviembre",
			"Deciembre" ];
	var date = new Date();
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	// FECHA
	// Mapa
	app.controller('MapController',	function($scope) {
	/**
	 * Configuracions de MAPA GOOGLE:
	 *
	 * @type {{zoom: number, center: google.maps.LatLng, mapTypeId: *}}
	 */
		// ESTILOS DE MAPA
			var customMapType = new google.maps.StyledMapType(
				[
				 {"featureType" : "landscape","stylers" : [ {"visibility" : "on"},
				                                            {"invert_lightness" : true},
			     {"weight" : 0.5	},
			     {"color" : "#3a8080"},
			     {"hue" : "#3bff00"}
			    ]}],
			     { name : 'Custom Style'});
			var customMapTypeId = 'custom_style';
			var EstacionIDUbicacion = {
			                           lat : 24.035546,
			                           lng : -104.649057
			                           };
			var CentralUbicacion = {
			                        lat : 24.035546,
			                        lng : -104.6484
			                        };
			// OPCIONES DEL MAPA
			var mapOptions = {
			                  zoom : 15,
			                  center : EstacionIDUbicacion,
			                  mapTypeControlOptions : {
				mapTypeIds : [ 'styled_maps' ]
				               }
			};

	/**
	 * Objeto MAPA
	 *
	 * @type {google.maps.Map}
	 */
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	/**
	 * MARCADORES
	 */
		var markerEstacionID = new google.maps.Marker({
			position : EstacionIDUbicacion,
			map : map,
			title : 'Estacion ID'
				});
		var markerCentral = new google.maps.Marker({
			position : CentralUbicacion,
			map : map,
			title : 'PC Central.!'
				});

		/**
		 * INFORMACION DE MARCADORES
		 */
	var markerEstacionIDContent = '<div id="content container-fluid">'
		+ '<div id="siteNotice">'
		+ '</div>'
		+ '<h6 id="firstHeading" class="firstHeading">Variables Ambientales</h6>'
		+ '<div class="panel panel-success">'
		+ '<div class="panel-heading"> FECHA:  '
		+ day+'/'+ monthNames[monthIndex]+'/'+year
		+ '</div>'
		+ '<div class="panel-body"><div id="Variables" class="card-content"> '
		+ '</div>' + '</div>';
		var infowindow = new google.maps.InfoWindow({
			content : markerEstacionIDContent
			});
		markerEstacionID.addListener('click', function() {
			infowindow.open(map, markerEstacionID);
			});
		map.mapTypes.set(customMapTypeId, customMapType);
		map.setMapTypeId(customMapTypeId);
		});
	// Fin de controlador MAPA.


	// Contacto
	app.controller('ContactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	});
	// Contacto

	/***************************************************************************
	 * OBJETOS JSON
	 **************************************************************************/
	// Informacion de Dispositivos.
	var cities = [ {
		city : 'Estación ITD ',
		desc : 'Serie:UPIDET, Modelo:1.0',
		lat : 24.016838,
		long : -104.651730
	} ];
	// Informacion de Dispositivos

})();