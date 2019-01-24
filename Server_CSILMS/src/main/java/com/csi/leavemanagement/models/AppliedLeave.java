package com.csi.leavemanagement.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="applied_leave")
public class AppliedLeave {

	@EmbeddedId 
	private AppliedLeaveId id;

	@Column(name="end_date")
	private Date endDate;

	@Column(name="half_day")
	private String halfDay;

	@Column(name="leave_duration")
	private float leaveDuration;

	@Column(name="leave_status")
	private String leaveStatus;

	@Column(name="reason")
	private String reason;

	@ManyToOne
	@JoinColumn(name="approver")
	private String approver;	

	@Column(name="approved_date")
	private Date approvedDate;

	@Column(name="attachment")
	private String attachment;

	public AppliedLeave() {
	}

	public AppliedLeave(AppliedLeaveId id, Date endDate, String halfDay, float leaveDuration, String leaveStatus,
			String reason, String approver, Date approvedDate, String attachment) {
		this.id = id;
		this.endDate = endDate;
		this.halfDay = halfDay;
		this.leaveDuration = leaveDuration;
		this.leaveStatus = leaveStatus;
		this.reason = reason;
		this.approver = approver;
		this.approvedDate = approvedDate;
		this.attachment = attachment;
	}

	public AppliedLeaveId getId() {
		return id;
	}

	public void setId(AppliedLeaveId id) {
		this.id = id;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getHalfDay() {
		return halfDay;
	}

	public void setHalfDay(String halfDay) {
		this.halfDay = halfDay;
	}

	public float getLeaveDuration() {
		return leaveDuration;
	}

	public void setLeaveDuration(float leaveDuration) {
		this.leaveDuration = leaveDuration;
	}

	public String getLeaveStatus() {
		return leaveStatus;
	}

	public void setLeaveStatus(String leaveStatus) {
		this.leaveStatus = leaveStatus;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getApprover() {
		return approver;
	}

	public void setApprover(String approver) {
		this.approver = approver;
	}

	public Date getApprovedDate() {
		return approvedDate;
	}

	public void setApprovedDate(Date approvedDate) {
		this.approvedDate = approvedDate;
	}

	public String getAttachment() {
		return attachment;
	}

	public void setAttachment(String attachment) {
		this.attachment = attachment;
	}

	@Override
	public String toString() {
		return "AppliedLeave [id=" + id + ", endDate=" + endDate + ", halfDay=" + halfDay + ", leaveDuration="
				+ leaveDuration + ", leaveStatus=" + leaveStatus + ", reason=" + reason + ", approver=" + approver
				+ ", approvedDate=" + approvedDate + ", attachment=" + attachment + "]";
	}
	
}

@Embeddable
class AppliedLeaveId implements Serializable{
	
	@ManyToOne
	@JoinColumn(name="emplid")
	private String emplid;
	
	@Column(name="effdate")
	private Date effDate;
	
	@Column(name="start_date")
	private Date startDate;
	
	@ManyToOne
	@JoinColumn(name="leave_code")
	private LeaveCategory leaveCode;

	public AppliedLeaveId() {
	}

	public AppliedLeaveId(String emplid, Date effDate, Date startDate, LeaveCategory leaveCode) {
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

	public LeaveCategory getLeaveCode() {
		return leaveCode;
	}

	public void setLeaveCode(LeaveCategory leaveCode) {
		this.leaveCode = leaveCode;
	}
	
	public boolean equals(Object o) {
		boolean result = false;
		
		if(o instanceof AppliedLeaveId) {
			
			Date objStartDate = ((AppliedLeaveId) o).getStartDate();
			Date objEffDate = ((AppliedLeaveId) o).getEffDate();
			String objLeaveCode = ((AppliedLeaveId) o).getLeaveCode().getLeaveCode();
			String objEmplid = ((AppliedLeaveId) o).getEmplid();
			
			result = (effDate.equals(objEffDate) && 
					startDate.equals(objStartDate) && 
					leaveCode.getLeaveCode() == objLeaveCode && 
					emplid == objEmplid);			
		}
			
		return result;		
	}
	
	public int hashCode() {
		return Objects.hash(getEmplid(), getEffDate(), getStartDate(), getLeaveCode().getLeaveCode());
	}

	@Override
	public String toString() {
		return "AppliedLeaveId [emplid=" + emplid + ", effDate=" + effDate + ", startDate=" + startDate + ", leaveCode="
				+ leaveCode + "]";
	}
	
}