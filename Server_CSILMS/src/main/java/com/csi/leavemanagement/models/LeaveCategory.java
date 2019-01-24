package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="leavecategory")
public class LeaveCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	
	@Column(name="leave_code")
	private String leaveCode;
	
	@Column(name="leave_name")
	private String leaveName;
	
	@Column(name="leave_description")
	private String leaveDescription;
	
	
	public LeaveCategory() {
		
	}


	public LeaveCategory(String leaveCode, String leaveName, String leaveDescription) {
		this.leaveCode = leaveCode;
		this.leaveName = leaveName;
		this.leaveDescription = leaveDescription;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getLeaveCode() {
		return leaveCode;
	}


	public void setLeaveCode(String leaveCode) {
		this.leaveCode = leaveCode;
	}


	public String getLeaveName() {
		return leaveName;
	}


	public void setLeaveName(String leaveName) {
		this.leaveName = leaveName;
	}


	public String getLeaveDescription() {
		return leaveDescription;
	}


	public void setLeaveDescription(String leaveDescription) {
		this.leaveDescription = leaveDescription;
	}


	@Override
	public String toString() {
		return "LeaveCategory [id=" + id + ", leaveCode=" + leaveCode + ", leaveName=" + leaveName
				+ ", leaveDescription=" + leaveDescription + "]";
	}
	
	

}
