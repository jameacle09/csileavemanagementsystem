package com.csi.leavemanagement.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class LeaveEntitlementId implements Serializable {
	
	@Column(name="emplid")
	private String emplid;
		
	@Column(name="year")
	private int year;
	
	@Column(name="leave_code")
	private String leaveCode;

	public LeaveEntitlementId() {
		
	}

	public LeaveEntitlementId(String emplid, int year, String leaveCode) {
		this.emplid = emplid;
		this.year = year;
		this.leaveCode = leaveCode;
	}

	public String getEmplid() {
		return emplid;
	}

	public void setEmplid(String emplid) {
		this.emplid = emplid;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getLeaveCode() {
		return leaveCode;
	}

	public void setLeaveCode(String leaveCode) {
		this.leaveCode = leaveCode;
	}

	@Override
	public int hashCode() {
		return Objects.hash(getEmplid(), getYear(), getLeaveCode());
	}

	@Override
	public boolean equals(Object obj) {
		boolean result = false;
		
		if(obj instanceof LeaveEntitlementId) {
			
			int objYear = ((LeaveEntitlementId) obj).getYear();
			String objLeaveCode = ((LeaveEntitlementId) obj).getLeaveCode();
			String objEmplid = ((LeaveEntitlementId) obj).getEmplid();
			
			result = (year == objYear && 
					leaveCode == objLeaveCode && 
					emplid == objEmplid);			
		}
			
		return result;		
	}

	@Override
	public String toString() {
		return "LeaveEntitlementId [emplid=" + emplid + ", year=" + year + ", leaveCode=" + leaveCode + "]";
	}
	
}