package com.csi.leavemanagement.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class JobDetailsId implements Serializable{
	
	@Column(name="emplid")
	private String emplid;
	
	@Column(name="effdate")
	private Date effDate;
	

	public JobDetailsId() {
		
	}
	
	public JobDetailsId(String emplid, Date effDate) {
		this.emplid = emplid;
		this.effDate = effDate;
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

	public boolean equals(Object o) {
		boolean result = false;
		
		if(o instanceof JobDetailsId) {
			
			Date objEffDate = ((AppliedLeaveId) o).getEffDate();
			String objEmplid = ((AppliedLeaveId) o).getEmplid();
			
			result = (effDate.equals(objEffDate) && 
					emplid == objEmplid);			
		}
			
		return result;		
	}
	
	public int hashCode() {
		return Objects.hash(getEmplid(), getEffDate());
	}

	@Override
	public String toString() {
		return "JobDetailsId [emplid=" + emplid + ", effDate=" + effDate + "]";
	}
	
}