/**
 * ResponseDispositivosDTO.java
 * Fecha de creaci�n: 18/10/2015, 0:41:58
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

package org.mx.bhit.monitoreo.modelo.dto;

import java.util.List;

import org.mx.bhit.monitoreo.model.Port;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
public class ResponseDispositivosDTO {

	private List<Port> puertos;
	/**
	 * @return el atributo mensaje
	 */

	public String getMensaje() {
		return mensaje;
	}

	/**
	 * @param mensaje
	 *          parametro mensaje a actualizar
	 */

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}

	private String mensaje;

	/**
	 * @return el atributo dispositivos
	 */

	public List<Port> getDispositivos() {
		return puertos;
	}

	/**
	 * @param dispositivos
	 *          parametro dispositivos a actualizar
	 */

	public void setDispositivos(List<Port> dispositivos) {
		this.puertos = dispositivos;
	}

}
