package com.csi.leavemanagement.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class AppliedLeaveId implements Serializable{
	
	@Column(name="emplid")
	private String emplid;
	
	@Column(name="effdate")
	private Date effDate;
	
	@Column(name="start_date")
	private Date startDate;
	
	@Column(name="leave_code")
	private String leaveCode;

	public AppliedLeaveId() {
		
	}

	public AppliedLeaveId(String emplid, Date effDate, Date startDate, String leaveCode) {
		this.emplid = emplid;
		this.effDate = effDate;
		this.startDate = startDate;
		this.leaveCode = leaveCode;
	}

	public String getEmplid() {
		return emplid;
	}

	public void setEmplid(String emplid) {
		this.emplid = emplid;
	}

	public Date getEffDate() {
		return effDate;
	}

	public void setEffDate(Date effDate) {
		this.effDate = effDate;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getLeaveCode() {
		return leaveCode;
	}

	public void setLeaveCode(String leaveCode) {
		this.leaveCode = leaveCode;
	}
	
	public boolean equals(Object o) {
		boolean result = false;
		
		if(o instanceof AppliedLeaveId) {
			
			Date objStartDate = ((AppliedLeaveId) o).getStartDate();
			Date objEffDate = ((AppliedLeaveId) o).getEffDate();
			String objLeaveCode = ((AppliedLeaveId) o).getLeaveCode();
			String objEmplid = ((AppliedLeaveId) o).getEmplid();
			
			result = (effDate.equals(objEffDate) && 
					startDate.equals(objStartDate) && 
					leaveCode == objLeaveCode && 
					emplid == objEmplid);			
		}
			
		return result;		
	}
	
	public int hashCode() {
		return Objects.hash(getEmplid(), getEffDate(), getStartDate(), getLeaveCode());
	}

	@Override
	public String toString() {
		return "AppliedLeaveId [emplid=" + emplid + ", effDate=" + effDate + ", startDate=" + startDate + ", leaveCode="
				+ leaveCode + "]";
	}
	
}