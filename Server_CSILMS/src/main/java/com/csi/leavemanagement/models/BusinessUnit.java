package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="business_unit_v")
public class BusinessUnit {

	@Id 
	@Column(name="business_unit")
	private String businessUnit;
	
	@Column(name="descr")
	private String descr;

	public BusinessUnit() {
		
	}

	public BusinessUnit(String businessUnit, String descr) {
		this.businessUnit = businessUnit;
		this.descr = descr;
	}
	
	public String getBusinessUnit() {
		return businessUnit;
	}

	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}

	public String getDescr() {
		return descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

	@Override
	public String toString() {
		return "BusinessUnit [businessUnit=" + businessUnit + ", descr=" + descr + "]";
	}

}
