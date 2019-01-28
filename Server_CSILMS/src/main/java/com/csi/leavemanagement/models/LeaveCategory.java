package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="leave_category")
public class LeaveCategory {

	@Id
	@Column(name="leave_code")
	private String leaveCode;
	
	@Column(name="leave_descr")
	private String leaveDescr;
	
	@Column(name="entitlement")
	private int entitlement;
	
	@Column(name="status")
	private String status;
	
	public LeaveCategory() {		
	}

	public LeaveCategory(String leaveCode, String leaveDescr, int entitlement, String status) {
		this.leaveCode = leaveCode;
		this.leaveDescr = leaveDescr;
		this.entitlement = entitlement;
		this.status = status;
	}

	public String getLeaveCode() {
		return leaveCode;
	}

	public void setLeaveCode(String leaveCode) {
		this.leaveCode = leaveCode;
	}

	public String getLeaveDescr() {
		return leaveDescr;
	}

	public void setLeaveDescr(String leaveDescr) {
		this.leaveDescr = leaveDescr;
	}

	public int getEntitlement() {
		return entitlement;
	}

	public void setEntitlement(int entitlement) {
		this.entitlement = entitlement;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "LeaveCategory [leaveCode=" + leaveCode + ", leaveDescr=" + leaveDescr + ", entitlement=" + entitlement
				+ ", status=" + status + "]";
	}
}
