/**
 * ResgritoMonitoreoDTO.java
 * Fecha de creación: 14/10/2015, 22:33:18
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

package org.mx.bhit.monitoreo.modelo.dto;

/**
 * TODO [Agregar documentacion de la clase]
 *
 * @author Orlando Ramos Galván (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since SIIRFE 5.10
 */
public class RegistroMonitoreoDTO {

	private int idRegistro;
	private String fecha;
	private String hora;
	private int variableID;
	private double valor;
	private int idNodo;
	private int idEstatus;
	private String mensaje;

	/**
	 * @return el atributo mensaje
	 */

	public String getMensaje() {
		return mensaje;
	}
	/**
	 * @param mensaje
	 *          parametro mensaje a actualizar
	 */

	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	/**
	 * @return el atributo idRegistro
	 */

	public int getIdRegistro() {
		return idRegistro;
	}
	/**
	 * @param idRegistro
	 *          parametro idRegistro a actualizar
	 */

	public void setIdRegistro(int idRegistro) {
		this.idRegistro = idRegistro;
	}
	/**
	 * @return el atributo fecha
	 */

	public String getFecha() {
		return fecha;
	}
	/**
	 * @param fecha
	 *          parametro fecha a actualizar
	 */

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	/**
	 * @return el atributo hora
	 */

	public String getHora() {
		return hora;
	}
	/**
	 * @param hora
	 *          parametro hora a actualizar
	 */

	public void setHora(String hora) {
		this.hora = hora;
	}
	/**
	 * @return el atributo variableID
	 */

	public int getVariableID() {
		return variableID;
	}
	/**
	 * @param variableID
	 *          parametro variableID a actualizar
	 */

	public void setVariableID(int variableID) {
		this.variableID = variableID;
	}
	/**
	 * @return el atributo valor
	 */

	public double getValor() {
		return valor;
	}
	/**
	 * @param valor
	 *          parametro valor a actualizar
	 */

	public void setValor(double valor) {
		this.valor = valor;
	}
	/**
	 * @return el atributo idDispositivo
	 */

	public int getIdDispositivo() {
		return idNodo;
	}
	/**
	 * @param idDispositivo
	 *          parametro idDispositivo a actualizar
	 */

	public void setIdDispositivo(int idNodo) {
		this.idNodo = idNodo;
	}
	/**
	 * @return el atributo idEstatus
	 */

	public int getIdEstatus() {
		return idEstatus;
	}
	/**
	 * @param idEstatus
	 *          parametro idEstatus a actualizar
	 */

	public void setIdEstatus(int idEstatus) {
		this.idEstatus = idEstatus;
	}
	/*
	 * La documentación de este método se encuentra en la clase o interface que lo declara
	 * (non-Javadoc)
	 *
	 * @see java.lang.Object#toString()
	 */

	@Override
	public String toString() {
		return "RegistroMonitoreoDTO [idRegistro=" + idRegistro + ", fecha=" + fecha + ", hora="
		    + hora + ", variableID=" + variableID + ", valor=" + valor + ", idDispositivo="
		    + idNodo + ", idEstatus=" + idEstatus + "]";
	}

}
