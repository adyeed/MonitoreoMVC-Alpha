/**
 * 
 */
// creamos primero nuestro modulo
var modulo = angular.module("miModulo", []);

modulo.factory("$miFactoria", function() {
	return {
		saludo : function() {
			return "Hola desde otro modulo";
		}
	};
});
