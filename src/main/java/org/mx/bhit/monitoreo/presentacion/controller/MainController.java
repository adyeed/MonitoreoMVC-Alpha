package org.mx.bhit.monitoreo.presentacion.controller;

import java.util.ArrayList;
import java.util.List;

import org.mx.bhit.monitoreo.api.service.ConsultaServiceImpl;
import org.mx.bhit.monitoreo.api.service.MainFillerServiceImpl;
import org.mx.bhit.monitoreo.modelo.dto.OnDTO;
import org.mx.bhit.monitoreo.modelo.dto.RegistroMonitoreoDTO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
@Controller
public class MainController {
	ConsultaServiceImpl consultaServiceImpl;
	MainFillerServiceImpl mainFiller;
	/**
	 * TODO [Agregar documentacion al m�todo]
	 *
	 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
	 */

	// public MainController() {
	// System.out.println("Iniciando Controlador.--->");
	// // TODO Auto-generated constructor stub
	// }

	/**
	 *
	 */
	@RequestMapping(value = "/on", method = RequestMethod.POST)
	public @ResponseBody List<RegistroMonitoreoDTO> getFillerOn() {
		List<RegistroMonitoreoDTO> regristroMaster = new ArrayList<RegistroMonitoreoDTO>();
		RegistroMonitoreoDTO registroMonitoreoDTO = new RegistroMonitoreoDTO();

		mainFiller = new MainFillerServiceImpl();
		consultaServiceImpl = new ConsultaServiceImpl();
		OnDTO onDTO = new OnDTO();

		try {
			mainFiller.onFiller();
			regristroMaster = consultaServiceImpl.getRegistro(registroMonitoreoDTO);
		} catch (Exception e) {
			regristroMaster.get(0).setMensaje("ERROR");;
			System.out.println("Error al iniciar la persistencia principal.");
			e.printStackTrace();
			return regristroMaster;

			// TODO: handle exception
		} finally {
			// System.out.println("CONTROLADOR DE REGISTROS..");
			return regristroMaster;
		}

	}

	/**
	 *
	 */
	@RequestMapping(value = "/text", method = RequestMethod.POST)
	public @ResponseBody OnDTO text() {
		mainFiller = new MainFillerServiceImpl();
		OnDTO onDTO = new OnDTO();
		try {
			onDTO.setMensaje("Registro insertado");
		} catch (Exception e) {
			onDTO.setMensaje(e.getMessage());
			System.out.println("Error al iniciar la persistencia principal.");
			e.printStackTrace();
			return onDTO;

			// TODO: handle exception
		}
		return onDTO;

	}

}