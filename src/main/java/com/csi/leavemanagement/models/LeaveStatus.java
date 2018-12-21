package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="leavestatus")
public class LeaveStatus {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	@Column(name="leave_status_code")
	private String leaveStatusCode;
	
	@Column(name="leave_status_name")
	private String leaveStatusName;
	
	@Column(name="leave_status_description")
	private String leaveStatusDescription;
	
	
	public LeaveStatus() {
		
	}


	public LeaveStatus(String leaveStatusCode, String leaveStatusName, String leaveStatusDescription) {
		this.leaveStatusCode = leaveStatusCode;
		this.leaveStatusName = leaveStatusName;
		this.leaveStatusDescription = leaveStatusDescription;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getLeaveStatusCode() {
		return leaveStatusCode;
	}


	public void setLeaveStatusCode(String leaveStatusCode) {
		this.leaveStatusCode = leaveStatusCode;
	}


	public String getLeaveStatusName() {
		return leaveStatusName;
	}


	public void setLeaveStatusName(String leaveStatusName) {
		this.leaveStatusName = leaveStatusName;
	}


	public String getLeaveStatusDescription() {
		return leaveStatusDescription;
	}


	public void setLeaveStatusDescription(String leaveStatusDescription) {
		this.leaveStatusDescription = leaveStatusDescription;
	}


	@Override
	public String toString() {
		return "LeaveStatus [id=" + id + ", leaveStatusCode=" + leaveStatusCode + ", leaveStatusName=" + leaveStatusName
				+ ", leaveStatusDescription=" + leaveStatusDescription + "]";
	}
	
	
	

}
