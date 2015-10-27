/**
 * PortDAOImpl.java
 * Fecha de creaci�n: 17/10/2015, 21:29:11
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

package org.mx.bhit.monitoreo.api.dao;

import com.fazecast.jSerialComm.SerialPort;
import org.mx.bhit.monitoreo.model.Port;

import java.util.ArrayList;
import java.util.List;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
public class PortDAOImpl implements PortDAO {

	/*
	 * La documentaci�n de este m�todo se encuentra en la clase o interface que lo declara
	 * (non-Javadoc)
	 *
	 * @see org.mx.bhit.monitoreo.api.dao.PortDAO#getPorts()
	 */

	@SuppressWarnings({"null", "unused", "finally"})
	@Override
	public List<Port> getPorts() {

		List<Port> dispositivos = null;
		Port auxPort;
		SerialPort[] ports;

		try {
			ports = SerialPort.getCommPorts();
			for (SerialPort port : ports) {
				auxPort = new Port();
				String nom = port.getDescriptivePortName();
				String com = port.getSystemPortName();

				auxPort.setNombre(nom);
				auxPort.setPuerto(com);

				if (auxPort != null) {
					dispositivos = new ArrayList<Port>();
					dispositivos.add(auxPort);
				} else {
					auxPort = new Port();
					auxPort.setNombre("none");
					auxPort.setPuerto("NON0");
					dispositivos.add(auxPort);
				}
			}

		} catch (Exception e) {
			// TODO: handle exception+
			e.printStackTrace();
			System.out.println("No hay dispositivos conectados.");
			return dispositivos;
		} finally {
			System.out.println("Salimos de la consulta de puertos.");
			return dispositivos;
		}

	}

}
