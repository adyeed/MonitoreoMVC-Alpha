/**
 * QueryService.java
 * Fecha de creaci?n: 17/10/2015, 21:19:59
 * <p>
 * Copyright (c) 2015 Instituto Federal Electoral. Direcci?n
 * Ejecutiva del Registro Federal de Electores.
 * Perif?rico Sur 239, M?xico, D.F., C.P. 01010.
 * Todos los derechos reservados.
 * <p>
 * Este software es informaci?n confidencial, propiedad del
 * Instituto Federal Electoral. Esta informaci?n confidencial
 * no deber? ser divulgada y solo se podr? utilizar de acuerdo
 * a los t?rminos que determine el propio Instituto.
 */

package org.mx.bhit.monitoreo.api.service;

import org.mx.bhit.monitoreo.model.Port;
import org.mx.bhit.monitoreo.modelo.dto.RegistroMonitoreoDTO;

import java.util.List;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv?n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
public interface ConsultaService {

	/**
	 * @return
	 */
	public List<Port> getPorts();

	/**
	 * @return
	 */
	public List<RegistroMonitoreoDTO> getRegistro(
			RegistroMonitoreoDTO resposneRegistroMonitoreoDTO);

}
