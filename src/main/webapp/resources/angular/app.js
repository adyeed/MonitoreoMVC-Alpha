(function () {

	/***************************************************************************
	 * MODULO PRINCIPAL
	 **************************************************************************/
	var app = angular.module ( 'ambientalMonitor' , [ 'ngRoute' ] );

	/***************************************************************************
	 * VARIABLES
	 **************************************************************************/
	var variablesAmbientales;
	/***************************************************************************
	 * RUTAS
	 **************************************************************************/

		// configure our routes
	app.config ( function ( $routeProvider ) {
		$routeProvider

			// route for the home page
			.when ( '/' , {
			templateUrl : 'pages/home.html' ,
			controller  : 'MainController'
		} )

			// route for the about page
			// .when('/monitoreo', {
			// templateUrl : 'pages/charts.html',
			// controller : 'MonitoreoController'
			// })
			// route for the map page
			.when ( '/mapa' , {
			templateUrl : 'pages/map.html' ,
			controller  : 'GetRecordController'
		} )
			// route for the map page
			.when ( '/contacto' , {
			templateUrl : 'pages/contacto.html' ,
			controller  : 'ContactController'
		} ).when ( '/equipo' , {
			templateUrl : 'pages/equipo.html' ,
			controller  : 'TeamController'
		} );
	} );

	/***************************************************************************
	 * CONTROLADORES
	 **************************************************************************/

		// Main
	app.controller ( 'MainController' , function ( $scope ) {
		$scope.message = 'Sistema de Monitoreo Ambiental'
	} );

	// Insert Record
	app.controller ( 'InsertRecord' , function ( $scope , $interval , $http ) {
		angular.element ( document ).ready ( function () {

			$scope.callAtInterval = function () {
				$ ( "#writeData" ).css ( "color" , "white" );
				// console.log("INCIA PETICION");
				$http ( {
					method : 'POST' ,
					url    : '/SpringMVC/rest/on'
				} ).then ( function successCallback ( response ) {
					if ( response.status == "200" ) {
						console.log ( "azul" );
						$ ( "#writeData" ).css ( "color" , "blue" );
						// console.log(response.data.mensaje);
						if ( response.data.mensaje == "ERROR" ) {
							$ ( "#writeData" ).css ( "color" , "yellow" );
							// console.log("amarillo");
						}
					}
					// console.log("FIN DE PETICION");
					$scope.data = response.data.mensaje;
				} , function errorCallback ( response ) {
					console.log ( "rojo" );
					$ ( "#writeData" ).css ( "color" , "red" );
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.data = response.data;
				} );

			}

			$interval ( function () {
				$scope.callAtInterval ();
			} , 3109 );

		} );
	} );
	// ///////// Fin Insert

	// Get
	app.controller ( 'GetRecordController' , function ( $scope , $interval , $http ) {
		angular.element ( document ).ready ( function () {

			$scope.callAtInterval = function () {
				// /// Proceso
				$ ( "#readData" ).css ( "color" , "white" );
				console.log ( "Leyendo..." );
				$ ( "#proceso" ).html ( "Proceso de peticion" );
				// //////////////////////////////////////////
				// AJAX
				$http ( {
					method : 'POST' ,
					url    : '/SpringMVC/rest/on'
				} ).then ( function successCallback ( response ) {

					if ( response.status == "200" ) {
						$ ( "#readData" ).css ( "color" , "blue" );
						variablesAmbientales = angular.fromJson ( response.data );
						console.log ( variablesAmbientales.length );
						if ( variablesAmbientales != 0 ) {
							var renglon =
								    '<table class="table">' +
								    '   <tr>' +
								    '<td>Variable</td>' +
								    '<td>Valor</td>' +
								    '</tr>' +
								    '<tr>' +
								    '<td id="idVarTemp">Var1 </td>' +
								    '<td id="valorTemp">' + variablesAmbientales[ 0 ].valor + '</td>' +
								    '</tr>' +
								    '<tr>' +
								    '<td id="idVarTemp">Var2 </td>' +
								    '<td id="valorTemp">' + variablesAmbientales[ 1 ].valor + '</td>' +
								    '</tr>' +
								    '<tr>' +
								    '<td id="idVarTemp">Var3 </td>' +
								    '<td id="valorTemp">' + variablesAmbientales[ 2 ].valor + '</td>' +
								    '</tr>' +
								    '<tr>' +
								    '<td id="idVarTemp">Var4 </td>' +
								    '<td id="valorTemp">' + variablesAmbientales[ 3 ].valor + '</td>' +
								    '</tr>' +
								    '<tr>' +
								    '<td id="idVarTemp">Var5 </td>' +
								    '<td id="valorTemp">' + variablesAmbientales[ 4 ].valor + '</td>' +
								    '</tr>' +
								    '</table>';
							$ ( "#Variables" ).html ( renglon );

						} else {
							$ ( "#readData" ).css ( "color" , "yellow" );
							//$ ( "#Variables" ).html ( variablesAmbientales.length );
						}
					}
					$scope.data = response.data.mensaje;
				} , function errorCallback ( response ) {
					$ ( "#Variables" ).html ( "ERROR" );
					console.log ( 'ERROR ---- No hay comunicaci�n con el API.' );
					$ ( "#readData" ).css ( "color" , "red" );
					$scope.data = response.data;
				} );
			}

			$interval ( function () {
				$scope.callAtInterval ();
			} , 5000 );

		} );
	} );
	// ////// Fin de Get


	/**
	 * FECHA
	 */
	var monthNames = [
		"January" , "February" , "March" ,
		"April" , "May" , "June" , "July" ,
		"August" , "September" , "October" ,
		"November" , "December"
	];
	var date       = new Date ();
	var day        = date.getDate ();
	var monthIndex = date.getMonth ();
	var year       = date.getFullYear ();
	// Mapa
	app.controller ( 'MapController' , function ( $scope ) {


		/**
		 * Configuracions de MAPA GOOGLE:
		 *
		 * @type {{zoom: number, center: google.maps.LatLng, mapTypeId: *}}
		 */
		var customMapType = new google.maps.StyledMapType (
			[
				{
					"featureType" : "landscape" ,
					"stylers"     : [
						{ "visibility" : "on" } ,
						{ "invert_lightness" : true } ,
						{ "weight" : 0.5 } ,
						{ "color" : "#3a8080" } ,
						{ "hue" : "#3bff00" }
					]
				}
			]
			, {
				name : 'Custom Style'
			} );

		var customMapTypeId = 'custom_style';

		var EstacionIDUbicacion = { lat : 24.035546 , lng : - 104.649057 };
		var CentralUbicacion    = { lat : 24.035546 , lng : - 104.6484 };

		// Opciones
		var mapOptions = {
			zoom                  : 15 ,
			center                : EstacionIDUbicacion ,
			mapTypeControlOptions : {
				mapTypeIds : [ 'styled_maps' ]
			}
		};

		/**
		 * Objeto MAPA
		 *
		 * @type {google.maps.Map}
		 */
		var map = new google.maps.Map ( document.getElementById ( 'map' ) ,
			mapOptions );

		/**
		 * MARCADORES
		 */

		var markerEstacionID = new google.maps.Marker ( {
			position : EstacionIDUbicacion ,
			map      : map ,
			title    : 'Estacion ID'
		} );

		var markerCentral = new google.maps.Marker ( {
			position : CentralUbicacion ,
			map      : map ,
			title    : 'PC Central.!'
		} );

		/**
		 * INFORMACION DE MARCADORES
		 */
		var markerEstacionIDContent = '<div id="content">' +
			'<div id="siteNotice">' +
			'</div>' +
			'<h6 id="firstHeading" class="firstHeading">Variables Ambientales</h6>' +
			'<div class="panel panel-success">' +
				<!-- Default panel contents -->
			'<div class="panel-heading"> FECHA:  ' + day + '/' + monthNames[ monthIndex ] + '/' + year + '</div>' +
			'<div class="panel-body"><div id="Variables" class="card-content"> ' +
			'</div>' +
			'</div>';

		var infowindow = new google.maps.InfoWindow ( {
			content : markerEstacionIDContent
		} );

		markerEstacionID.addListener ( 'click' , function () {
			infowindow.open ( map , markerEstacionID );
		} );


		map.mapTypes.set ( customMapTypeId , customMapType );
		map.setMapTypeId ( customMapTypeId );
	} );

	// Contacto
	app.controller ( 'ContactController' , function ( $scope ) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	} );
	// Contacto

	/***************************************************************************
	 * OBJETOS JSON
	 **************************************************************************/
	    // Informacion de Dispositivos.
	var cities = [ {
		city : 'Dispositivo ARDUINO-00X1' ,
		desc : 'Serie: 343675, Modelo: AFDF34' ,
		lat  : 24.016838 ,
		long : - 104.651730
	} ];
	// Informacion de Dispositivos

}) ();