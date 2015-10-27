/**
 * RegistroMonitoreoDAO.java
 * Fecha de creaci�n: 14/10/2015, 23:52:19
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

import org.mx.bhit.monitoreo.api.conn.UConnection;
import org.mx.bhit.monitoreo.modelo.dto.RegistroMonitoreoDTO;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
@Repository("RegistroMonitoreoDAOImpl")
public class RegistroMonitoreoDAOImpl implements RegistroMonitoreoDAO {

	/**
	 * @param conn
	 * @param registroMonitoreoDTO
	 */

	@SuppressWarnings("resource")
	@Override
	public void saveInfo(List<RegistroMonitoreoDTO> listRegistroMonitoreoDTO) {

		String sql = "insert into registro_monitoreo(fecha,hora,variable_idVariable,valor,nodo_idDispositivo,idEstatus)values(?,?,?,?,?,?)";

		Connection conn = null;

		try {
			conn = UConnection.getConnection();
			PreparedStatement statement = conn.prepareStatement(sql);

			for (int i = 0; i < listRegistroMonitoreoDTO.size(); i++) {

				statement.setString(1, listRegistroMonitoreoDTO.get(i).getFecha());
				statement.setString(2, listRegistroMonitoreoDTO.get(i).getHora());
				statement.setInt(3, listRegistroMonitoreoDTO.get(i).getVariableID());
				statement.setDouble(4, listRegistroMonitoreoDTO.get(i).getValor());
				statement.setInt(5, listRegistroMonitoreoDTO.get(i).getIdDispositivo());
				statement.setInt(6, listRegistroMonitoreoDTO.get(i).getIdEstatus());
				int rowsInserted = statement.executeUpdate();
				System.out.println(listRegistroMonitoreoDTO.get(i).getValor());

//

				if (rowsInserted > 0) {
					System.out.println(rowsInserted + " rows was inserted successfully!");

				}
			}
			// conn.close();
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR ---> ");
			e.printStackTrace();
		}

	}

	@SuppressWarnings("resource")
	@Override
	public List<RegistroMonitoreoDTO> getRegistroMain(

			RegistroMonitoreoDTO responseRegistroMonitoreoDTO) {
		List<RegistroMonitoreoDTO> registros = new ArrayList<RegistroMonitoreoDTO>();
		Connection conn = null;

		try {

			System.out.println("Entrando a generar consulta.");
			conn = UConnection.getConnection();
			String query = "select * from registro_monitoreo order by idregistro DESC limit 5";

			System.out.println(query);
			// create the java statement
			PreparedStatement st = conn.prepareStatement(query);

			// execute the query, and get a java resultset
			ResultSet rs = st.executeQuery();

			while (rs.next()) {

				responseRegistroMonitoreoDTO = new RegistroMonitoreoDTO();

				int idRegistro = rs.getInt("idRegistro");
				String fecha = rs.getString("fecha");
				String hora = rs.getString("hora");
				int idVariable = rs.getInt("variable_idVariable");
				double valor = rs.getDouble("valor");
				int nodo_idDispositivo = rs.getInt("nodo_idDispositivo");
				int idEstatus = rs.getInt("idEstatus");

				responseRegistroMonitoreoDTO.setIdRegistro(idRegistro);
				responseRegistroMonitoreoDTO.setFecha(fecha);
				responseRegistroMonitoreoDTO.setHora(hora);
				responseRegistroMonitoreoDTO.setVariableID(idVariable);
				responseRegistroMonitoreoDTO.setValor(valor);
				responseRegistroMonitoreoDTO.setIdDispositivo(nodo_idDispositivo);
				responseRegistroMonitoreoDTO.setIdEstatus(idEstatus);

				registros.add(responseRegistroMonitoreoDTO);
				// print the results
				// System.out.format("%s, %s, %s, %s, %s,%s, %s\n", idRegistro, fecha, hora,
				// idVariable,
				// valor, nodo_idDispositivo, idEstatus);
			}

			st.close();

			System.out.println("Conexion Creada de forma correcta");
			responseRegistroMonitoreoDTO.setMensaje("Conexion Creada de forma correcta");
			registros.add(responseRegistroMonitoreoDTO);

		} catch (Exception e) {
			try {
				conn.close();
			} catch (Exception e2) {
				// TODO: handle exception
			}
			e.printStackTrace();
			System.out.println("Error al crear la conexion.");
			responseRegistroMonitoreoDTO.setMensaje("Error al crear la conexi�n");
			// TODO: handle exception
		}
		return registros;
	}

}
