/**
 * RegistroMonitoreo.java
 * Fecha de creaci�n: 14/10/2015, 16:14:49
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

package org.mx.bhit.monitoreo.modelo.dto;

/**
 * TODO [Objeto DTO de Variables.]
 *
 * @author Orlando Ramos Galv�n (orlandoa.ramos@outlook.com)
 * @version 1.0
 * @since MONITOREO 1.0
 */
public class VariableDTO {

	private int idVariable;
	private String valor;
	private String code;

	/**
	 * @return el atributo idVariable
	 */

	public int getIdVariable() {
		return idVariable;
	}

	/**
	 * @param idVariable
	 *          parametro idVariable a actualizar
	 */

	public void setIdVariable(int idVariable) {
		this.idVariable = idVariable;
	}

	/**
	 * @return el atributo valor
	 */

	public String getValor() {
		return valor;
	}

	/**
	 * @param valor
	 *          parametro valor a actualizar
	 */

	public void setValor(String valor) {
		this.valor = valor;
	}

	/**
	 * @return el atributo code
	 */

	public String getCode() {
		return code;
	}

	/**
	 * @param code
	 *          parametro code a actualizar
	 */

	public void setCode(String code) {
		this.code = code;
	}
	/*
	 * La documentaci�n de este m�todo se encuentra en la clase o interface que lo declara
	 * (non-Javadoc)
	 *
	 * @see java.lang.Object#toString()
	 */

	@Override
	public String toString() {
		return "VariableDTO [idVariable=" + idVariable + ", valor=" + valor + ", code=" + code
				+ "]";
	}

}
