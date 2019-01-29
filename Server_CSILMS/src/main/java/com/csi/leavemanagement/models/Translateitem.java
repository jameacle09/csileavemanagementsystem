package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="translateitem")
public class Translateitem {

	@Column(name="fieldname")
	private String fieldname;
	
	@Column(name="fieldvalue")
	private String fieldvalue;
	
	@Column(name="eff_status")
	private String effStatus;
	
	@Column(name="xlatlongname")
	private String xlatlongname;
	
	@Column(name="xlatshortname")
	private String xlatshortname;

	public Translateitem() {
		
	}
	
	public Translateitem(String fieldname, String fieldvalue, String effStatus, String xlatlongname, String xlatshortname) {
		this.fieldname = fieldname;
		this.fieldvalue = fieldvalue;
		this.effStatus = effStatus;
		this.xlatlongname = xlatlongname;
		this.xlatshortname = xlatshortname;
	
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

	public String getEffStatus() {
		return effStatus;
	}

	public void setEffStatus(String effStatus) {
		this.effStatus = effStatus;
	}

	public String getXlatlongname() {
		return xlatlongname;
	}

	public void setXlatlongname(String xlatlongname) {
		this.xlatlongname = xlatlongname;
	}

	public String getXlatshortname() {
		return xlatshortname;
	}

	public void setXlatshortname(String xlatshortname) {
		this.xlatshortname = xlatshortname;
	}

	@Override
	public String toString() {
		return "Translateitem [fieldname=" + fieldname + ", fieldvalue=" + fieldvalue + ", effStatus=" + effStatus
				+ ", xlatlongname=" + xlatlongname + ", xlatshortname=" + xlatshortname + "]";
	}
	
	
}
