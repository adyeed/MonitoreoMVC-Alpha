/*
 * QueryServiceImpl.java
 * Fecha de creaci�n: 17/10/2015, 21:21:03
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

package org.mx.bhit.monitoreo.api.service;

import org.mx.bhit.monitoreo.api.dao.PortDAO;
import org.mx.bhit.monitoreo.api.dao.PortDAOImpl;
import org.mx.bhit.monitoreo.api.dao.RegistroMonitoreoDAOImpl;
import org.mx.bhit.monitoreo.model.Port;
import org.mx.bhit.monitoreo.modelo.dto.RegistroMonitoreoDTO;

import java.util.List;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
public class ConsultaServiceImpl implements ConsultaService {

	PortDAO portDAO;

	/*
	 * La documentaci�n de este m�todo se encuentra en la clase o interface que lo declara
	 * (non-Javadoc)
	 *
	 * @see org.mx.bhit.monitoreo.api.service.QueryService#getPorts()
	 */

	@Override
	public List<Port> getPorts() {
		portDAO = new PortDAOImpl();
		return portDAO.getPorts();
		// TODO [codificar el cuerpo del m�todo]

	}

	/*
	 * La documentaci�n de este m�todo se encuentra en la clase o interface que lo declara
	 * (non-Javadoc)
	 *
	 * @see org.mx.bhit.monitoreo.api.service.ConsultaService#getRegistro()
	 */

	@Override
	public List<RegistroMonitoreoDTO> getRegistro(
			RegistroMonitoreoDTO responseRegistroMonitoreoDTO) {
		RegistroMonitoreoDAOImpl registroMonitoreoDAO = new RegistroMonitoreoDAOImpl();
		return registroMonitoreoDAO.getRegistroMain(responseRegistroMonitoreoDTO);
		// TODO [codificar el cuerpo del m�todo]

	}

}
