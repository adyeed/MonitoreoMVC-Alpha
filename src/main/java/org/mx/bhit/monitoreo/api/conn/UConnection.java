package org.mx.bhit.monitoreo.api.conn;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ResourceBundle;

public class UConnection {

	private static Connection con = null; // objeto de conexion

	/**
	 * @return
	 */
	public static Connection getConnection() {

		try {

			if (con == null) {
				// System.out.println("uconnection null");
				// System.out.println("Obteniendo Conexion");
				Runtime.getRuntime().addShutdownHook(new Hook());
				ResourceBundle rb = ResourceBundle.getBundle("application");
				String driver = rb.getString("driver");
				String url = rb.getString("url");
				String password = rb.getString("password");
				String usuario = rb.getString("usuario");
				Class.forName(driver);
				con = DriverManager.getConnection(url, usuario, password);
				System.out.println("conexion correcta");
			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("error al crear la conexion a base de datos", e);
		}
		return con;
	}

	static class Hook extends Thread {

		@Override
		public void run() {

			try {
				con.close();
				con = null;
				System.out.println("hook");
			} catch (Exception e) {

				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

	}

}
