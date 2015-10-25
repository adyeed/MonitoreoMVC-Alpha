/**
 * MainFillerServiceImpl.java
 * Fecha de creación: 17/10/2015, 18:54:52
 * <p>
 * Copyright (c) 2015 Instituto Federal Electoral. Dirección
 * Ejecutiva del Registro Federal de Electores.
 * Perifírico Sur 239, México, D.F., C.P. 01010.
 * Todos los derechos reservados.
 * <p>
 * Este software es información confidencial, propiedad del
 * Instituto Federal Electoral. Esta información confidencial
 * no deberá ser divulgada y solo se podrá utilizar de acuerdo
 * a los términos que determine el propio Instituto.
 */

package org.mx.bhit.monitoreo.api.service;

import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.StringTokenizer;

import org.mx.bhit.monitoreo.api.dao.RegistroMonitoreoDAOImpl;
import org.mx.bhit.monitoreo.modelo.dto.RegistroMonitoreoDTO;
import org.mx.bhit.monitoreo.modelo.dto.VariableDTO;
import org.mx.bhit.monitoreo.util.GeneralConstants;
import org.springframework.stereotype.Service;

import com.fazecast.jSerialComm.SerialPort;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galván (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
@Service("MainFillerServiceImpl")
public class MainFillerServiceImpl implements MainFillerService {

	/*
	 * La documentación de este método se encuentra en la clase o interface que lo declara
	 * (non-Javadoc)
	 *
	 * @see org.mx.bhit.monitoreo.api.service.MainFillerService#getPorts()
	 */

	/**
	 * @param valor
	 * @return
	 */
	public static String limpiaValor(String valor) {

		String aux = null;
		String vacio = "";

		if (valor.contains(GeneralConstants.T)) {
			aux = valor.replace(GeneralConstants.T, vacio);
		} else if (valor.contains(GeneralConstants.H)) {
			aux = valor.replace(GeneralConstants.H, vacio);
		} else if (valor.contains(GeneralConstants.A)) {
			aux = valor.replace(GeneralConstants.A, vacio);
		} else if (valor.contains(GeneralConstants.B)) {
			aux = valor.replace(GeneralConstants.B, vacio);
		} else if (valor.contains(GeneralConstants.C)) {
			aux = valor.replace(GeneralConstants.C, vacio);
		}

		return aux;
	}

	@Override
	public String onFiller() {

		String response = null;

		/**
		 * Variables de la fecha del sistema
		 */
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateInstance();
		String fechaText;
		/**
		 * Variables para la hora
		 */
		Calendar calendario = new GregorianCalendar();
		int hora = 0;
		int minutos = 0;
		int segundos = 0;
		String horaText;

		// Lista de variables ambientales.
		List<VariableDTO> listVariableDTO = new ArrayList<VariableDTO>();
		VariableDTO variableDTO = null;

		// Lista de Registros ambientales.
		List<RegistroMonitoreoDTO> listMonitoreoDTO = new ArrayList<RegistroMonitoreoDTO>();
		RegistroMonitoreoDTO registroMonitoreoDTO;

		// DAO para persistencia.
		RegistroMonitoreoDAOImpl registroMonitoreoDAO;

		/**
		 * ***********************************************************************CAPA DE SERVICIO
		 * La capa de servicio es donde se ejecuta el "NEGOCIO", en este caso lo se dividen en:
		 * peticion al arduino, validacion de informacion y ersistencia de datos...
		 */
		// Simulamos la entrada del arduino
		/**
		 * Esto lo sustituyes por el registro que entra de tu arduino. LINEA
		 */
		StringBuffer inData = null;
		try {
			inData = llenadoPrincipal();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			return response = e1.getMessage();
		}

		// "##T28.40,H46.80,A57,B400,C151";
		System.out.println(inData);
		String claveDispositivo = inData.substring(0, 1);
		String registro = inData.substring(2, inData.length());

		System.out.println(registro);
		System.out.println("Clave Dispositivo : " + claveDispositivo);
		// Objeto String Tokenizer crea un arreglo en base a un toke, en este caso la coma es el
		// token
		StringTokenizer st = new StringTokenizer(registro, ",");
		// Reccorremos el string tokenizer y se llena
		while (st.hasMoreElements()) {
			String auxToken = st.nextToken();
			// se crea un objeto donde se almacenara los datos de las variables para su tratamiento
			variableDTO = new VariableDTO();
			// se evalua el contenido del token, si contiene T es temp, si contiene H es tal...
			if (auxToken.contains(GeneralConstants.T)) {
				variableDTO.setCode(GeneralConstants.T);
				variableDTO.setIdVariable(GeneralConstants.idT);
				variableDTO.setValor(limpiaValor(auxToken));
			} else if (auxToken.contains(GeneralConstants.H)) {
				variableDTO.setCode(GeneralConstants.H);
				variableDTO.setIdVariable(GeneralConstants.idH);
				variableDTO.setValor(limpiaValor(auxToken));
			} else if (auxToken.contains(GeneralConstants.A)) {
				variableDTO.setCode(GeneralConstants.A);
				variableDTO.setIdVariable(GeneralConstants.idA);
				variableDTO.setValor(limpiaValor(auxToken));
			} else if (auxToken.contains(GeneralConstants.B)) {
				variableDTO.setCode(GeneralConstants.B);
				variableDTO.setIdVariable(GeneralConstants.idB);
				variableDTO.setValor(limpiaValor(auxToken));
			} else if (auxToken.contains(GeneralConstants.C)) {
				variableDTO.setCode(GeneralConstants.C);
				variableDTO.setIdVariable(GeneralConstants.idC);
				variableDTO.setValor(limpiaValor(auxToken));
			}
			// Se agrega la variable en la lista de variables.
			listVariableDTO.add(variableDTO);
		}

		/**
		 * Nos va a servir para validar si las variables estan completas, si son 5 variables el
		 * registro viene completo si faltan, hay error en el registro.
		 */
		System.out.println(variableDTO.toString());

		int tamano = listVariableDTO.size();
		// comprobamos que la lista esta llena
		fechaText = dateFormat.format(date);

		hora = calendario.get(Calendar.HOUR_OF_DAY);
		System.out.println("HORA ----> " + hora);
		minutos = calendario.get(Calendar.MINUTE);
		segundos = calendario.get(Calendar.SECOND);

		horaText = Integer.toString(hora) + ":" + Integer.toString(minutos) + ":"
		    + Integer.toString(segundos);

		System.out.println(fechaText);
		System.out.println(horaText);

		for (int i = 0; i < tamano; i++) {
			int auxID = i + 1;
			registroMonitoreoDTO = new RegistroMonitoreoDTO();
			registroMonitoreoDTO.setIdDispositivo(auxID);
			registroMonitoreoDTO.setFecha(fechaText.replace('-', '/'));
			registroMonitoreoDTO.setHora(horaText);
			registroMonitoreoDTO.setIdDispositivo(GeneralConstants.D1);
			registroMonitoreoDTO.setVariableID(listVariableDTO.get(i).getIdVariable());
			registroMonitoreoDTO.setValor(Double.parseDouble(listVariableDTO.get(i).getValor()));
			registroMonitoreoDTO.setIdEstatus(1);

			listMonitoreoDTO.add(registroMonitoreoDTO);

			System.out.println(registroMonitoreoDTO.toString());
		}

		System.out.println("Tama�o de Registros --> " + listMonitoreoDTO);

		/**
		 * ***********************************************************************CAPA DE DATOS
		 * Aqui se realiza la persistencia a la BD.
		 */

		try {

			registroMonitoreoDAO = new RegistroMonitoreoDAOImpl();
			registroMonitoreoDAO.saveInfo(listMonitoreoDTO);
			// System.out.println("Conexion OK");
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			System.out.println("Conexion BAD");
			return response = e.getMessage();

		} // TODO [codificar el cuerpo del m�todo]
		return response;

	}// Fin de metodo;
	 // Fin de metodo;

	/**
	 * @return
	 * @throws SQLException
	 */
	@SuppressWarnings("resource")
	public static StringBuffer llenadoPrincipal() throws SQLException {

		StringBuffer linea = null;
		SerialPort[] ports = SerialPort.getCommPorts();
		int chosenPort;
		SerialPort serialPort;
		///
		OutputStream outt;
		InputStream in;

		int i = 1;

		for (SerialPort port : ports) {
			System.out.println(i++ + ": " + port.getSystemPortName());
		}

		chosenPort = 1;
		serialPort = ports[chosenPort - 1];

		// if (serialPort.openPort()) {
		serialPort.openPort();
		// Si se encontro alguna comunicacion con puerto
		serialPort.setComPortParameters(9600, 8, 1, SerialPort.NO_PARITY);
		outt = serialPort.getOutputStream();
		in = serialPort.getInputStream();

		try {

			linea = new StringBuffer();
			// Estructura de control IF, iteracion de 10 ciclos para env�o
			// de caracter a Arduino.
			// for (int k = 0; k < 1; ++k) {
			/**
			 * Se envia el token de peticion.
			 */
			outt.write('#');
			outt.close();
			// Por cada ciclo se hace la instancia de una nueva linea.
			linea = new StringBuffer();
			// Inicia el llenado de la cadena de caracteres.
			/**
			 * EL DO WHILE ESTA COMENTADO PARA EVITAR UN CICLO INFITNIVO. HACER PRUEBAS SOLO CON
			 * ARUDINO CONECTADO.
			 */
			do {

				linea.append((char) in.read());
				// System.out.println("Leyendo INFORMACION DEL ARUDINO");
				// System.out.println(linea);

				// Mientras la linea no contenga un salto de linea
				// seguira entrando informacion.
			} while (!linea.toString().contains("\n"));
			// cuando el salto de linea es encontrado se cierra el canal
			// de entrada de datos.
			in.close();
			serialPort.closePort();
			// System.out.println(linea);
			// }
		} catch (Exception e) {
			System.out
			    .println("ERROR DE COMUNICACION CON EL ARDUINO: " + serialPort.getSystemPortName());
			e.printStackTrace();
		} finally {
			try {
				outt.close();
				in.close();
				serialPort.closePort();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		// } //if end

		return linea;
	}// Fin de metodo;
}
