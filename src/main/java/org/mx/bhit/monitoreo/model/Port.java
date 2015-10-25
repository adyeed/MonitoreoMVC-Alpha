/**
 * Port.java
 * Fecha de creaci�n: 17/10/2015, 18:51:37
 *
 * Copyright (c) 2015 Instituto Federal Electoral. Direcci�n
 * Ejecutiva del Registro Federal de Electores.
 * Perif�rico Sur 239, M�xico, D.F., C.P. 01010.
 * Todos los derechos reservados.
 *
 * Este software es informaci�n confidencial, propiedad del
 * Instituto Federal Electoral. Esta informaci�n confidencial
 * no deber� ser divulgada y solo se podr� utilizar de acuerdo
 * a los t�rminos que determine el propio Instituto.
 */

package org.mx.bhit.monitoreo.model;

import java.io.Serializable;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
public class Port implements Serializable {

	/**
	 * TODO [Agregar documentaci�n del atributo]
	 */

	private static final long serialVersionUID = 1L;

	private String puerto;
	private String nombre;
	/**
	 * @return el atributo puerto
	 */

	public String getPuerto() {
		return puerto;
	}
	/**
	 * @param puerto
	 *          parametro puerto a actualizar
	 */

	public void setPuerto(String puerto) {
		this.puerto = puerto;
	}
	/**
	 * @return el atributo nombre
	 */

	public String getNombre() {
		return nombre;
	}
	/**
	 * @param nombre
	 *          parametro nombre a actualizar
	 */

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	/**
	 * @return el atributo serialversionuid
	 */

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
