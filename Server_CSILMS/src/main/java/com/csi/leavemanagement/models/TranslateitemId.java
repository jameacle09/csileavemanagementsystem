package com.csi.leavemanagement.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class TranslateitemId implements Serializable {

	@Column(name="fieldname")
	private String fieldname;
	
	@Column(name="fieldvalue")
	private String fieldvalue;
		
	public TranslateitemId() {
		
	}
	
	public TranslateitemId(String fieldname, String fieldvalue) {
		this.fieldname = fieldname;
		this.fieldvalue = fieldvalue;
	}

	public String getFieldname() {
		return fieldname;
	}

	public void setFieldname(String fieldname) {
		this.fieldname = fieldname;
	}

	public String getFieldvalue() {
		return fieldvalue;
	}

	public void setFieldvalue(String fieldvalue) {
		this.fieldvalue = fieldvalue;
	}

	@Override
	public int hashCode() {
		return Objects.hash(getFieldname(), getFieldvalue());
	}	
	
	@Override
	public boolean equals(Object obj) {
		boolean result = false;
		
		if(obj instanceof TranslateitemId) {
			String objFieldname = ((TranslateitemId) obj).getFieldname();
			String objFieldvalue = ((TranslateitemId) obj).getFieldvalue();
			
			result = (fieldname == objFieldname &&
					fieldvalue == objFieldvalue);
					
		}		
		return result;
	}

	@Override
	public String toString() {
		return "TranslateitemId [fieldname=" + fieldname + ", fieldvalue=" + fieldvalue + "]";
	}
	
	
}
