/**
 * 
 */
(function() {

	/***************************************************************************
	 * CONFIGURACIONES
	 **************************************************************************/

	// REQUIRE.JS
	requirejs
			.config({
				"baseUrl" : "resources/js/assets",
				"paths" : {
//					"app" : "resources/angular",
					"jquery" : "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
				}
			});

	// // Using requirejs
	require([ 'websocket' ], function(Chart) {

	});
	
	/***************************************************************************
	 * MODULO PRINCIPAL
	 **************************************************************************/
	var app = angular.module('ambientalMonitor', [ 'miModulo', 'ngRoute' ]);

})();
