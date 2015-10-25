/**
 * RegistroMonitoreoDAO.java
 * Fecha de creaci�n: 17/10/2015, 20:06:00
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

package org.mx.bhit.monitoreo.api.dao;

import java.util.List;

import org.mx.bhit.monitoreo.modelo.dto.RegistroMonitoreoDTO;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */

public interface RegistroMonitoreoDAO {

	/**
	 * @param listRegistroMonitoreoDTO
	 */
	public void saveInfo(List<RegistroMonitoreoDTO> listRegistroMonitoreoDTO);

	/**
	 * @param responseRegistroMonitoreoDTO
	 * @return
	 */
	public List<RegistroMonitoreoDTO> getRegistroMain(
	    RegistroMonitoreoDTO responseRegistroMonitoreoDTO);

}
