/**
 * ConsultaPortController.java
 * Fecha de creaci�n: 17/10/2015, 21:13:36
 * <p>
 * Copyright (c) 2015 Instituto Federal Electoral. Direcci�n
 * Ejecutiva del Registro Federal de Electores.
 * Perif�rico Sur 239, M�xico, D.F., C.P. 01010.
 * Todos los derechos reservados.
 * <p>
 * Este software es informaci�n confidencial, propiedad del
 * Instituto Federal Electoral. Esta informaci�n confidencial
 * no deber� ser divulgada y solo se podr� utilizar de acuerdo
 * a los t�rminos que determine el propio Instituto.
 */

package org.mx.bhit.monitoreo.presentacion.controller;

import org.mx.bhit.monitoreo.api.service.ConsultaServiceImpl;
import org.mx.bhit.monitoreo.model.Port;
import org.mx.bhit.monitoreo.modelo.dto.RegistroMonitoreoDTO;
import org.mx.bhit.monitoreo.modelo.dto.ResponseDispositivosDTO;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
@Controller
public class ConsultaController {

	ConsultaServiceImpl consultaServiceImpl;

	/**
	 * TODO [Agregar documentacion al m�todo]
	 *
	 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
	 */

	public ConsultaController() {
		// TODO Auto-generated constructor stub
		System.out.println("!");
	}

	/**
	 * @return
	 *
	 */
	@SuppressWarnings("finally")
	@RequestMapping(value = "/ports", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	ResponseDispositivosDTO getPorts() {
		ResponseDispositivosDTO responseDispositivosDTO = new ResponseDispositivosDTO();
		List<Port> dispositivos = new ArrayList<Port>();
		consultaServiceImpl = new ConsultaServiceImpl();
		try {

			dispositivos = consultaServiceImpl.getPorts();
			responseDispositivosDTO.setDispositivos(dispositivos);
		} catch (Exception e) {

			Port auxPort = new Port();
			auxPort.setNombre("none");
			auxPort.setPuerto("NON0");
			dispositivos.add(auxPort);

			responseDispositivosDTO.setMensaje("OK");

			e.printStackTrace();
			System.out.println("Error al iniciar la persistencia principal.");
			responseDispositivosDTO.setMensaje("BAD 1");
			return responseDispositivosDTO;
			// TODO: handle exception
		} finally {
			// System.out.println("Error en el Servicio de busqueda de dispositivos.");
			responseDispositivosDTO.setMensaje("finally");
			return responseDispositivosDTO;
		}

	}

	/**
	 * @return
	 *
	 */
	@SuppressWarnings("finally")
	@RequestMapping(value = "/registros", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public
	@ResponseBody
	List<RegistroMonitoreoDTO> getRegistro() {

		List<RegistroMonitoreoDTO> regristroMaster = new ArrayList<RegistroMonitoreoDTO>();
		RegistroMonitoreoDTO registroMonitoreoDTO = new RegistroMonitoreoDTO();

		try {
			consultaServiceImpl = new ConsultaServiceImpl();
			regristroMaster = consultaServiceImpl.getRegistro(registroMonitoreoDTO);
		} catch (Exception e) {

			e.printStackTrace();
			System.out.println("Error al extraer informaci�n dela nube." + e.getMessage());
			registroMonitoreoDTO.setMensaje("Error al extraer informaci�n dela nube");
			regristroMaster.add(registroMonitoreoDTO);
			// TODO: handle exception
		} finally {
			// System.out.println("CONTROLADOR DE REGISTROS..");
			return regristroMaster;
		}

	}

}
