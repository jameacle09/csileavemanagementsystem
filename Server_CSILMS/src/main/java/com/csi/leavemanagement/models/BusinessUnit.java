package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "business_unit")
public class BusinessUnit {

	@Id
	@Column(name = "business_unit")
	private String businessUnit;
	
	@Column(name = "effdate")
	private Date effDate;
	
	@Column(name = "descr")
	private String descr;
	
	@Column(name = "status")
	private String status;

	public BusinessUnit() {
	}

	public BusinessUnit(String businessUnit, Date effDate, String descr, String status) {
		this.businessUnit = businessUnit;
		this.effDate = effDate;
		this.descr = descr;
		this.status = status;
	}

	public String getBusinessUnit() {
		return businessUnit;
	}

	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}

	public Date getEffDate() {
		return effDate;
	}

	public void setEffDate(Date effDate) {
		this.effDate = effDate;
	}

	public String getDescr() {
		return descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "BusinessUnit [businessUnit=" + businessUnit + ", effDate=" + effDate + ", descr=" + descr + ", status="
				+ status + "]";
	}
	
	
}
