/**
 * RegistroMonitoreoDAO.java
 * Fecha de creación: 17/10/2015, 20:06:00
 *
 * Copyright (c) 2015 Instituto Federal Electoral. Dirección
 * Ejecutiva del Registro Federal de Electores.
 * Periférico Sur 239, México, D.F., C.P. 01010.
 * Todos los derechos reservados.
 *
 * Este software es información confidencial, propiedad del
 * Instituto Federal Electoral. Esta información confidencial
 * no deberá ser divulgada y solo se podrá utilizar de acuerdo
 * a los términos que determine el propio Instituto.
 */

package org.mx.bhit.monitoreo.api.dao;

import java.util.List;

import org.mx.bhit.monitoreo.modelo.dto.RegistroMonitoreoDTO;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galván (orlandoa.ramos@outlook.com)
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
