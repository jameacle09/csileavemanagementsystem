package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name="applied_leave")
public class AppliedLeave {

	@EmbeddedId 
	private AppliedLeaveId id;
	
	@MapsId("emplid")
	@ManyToOne
	@JoinColumn(name="emplid")
	private EmployeeDetails employeeDetails;
	
	@MapsId("leaveCode")
	@ManyToOne
	@JoinColumn(name="leave_code")
	private LeaveCategory leaveCategory;
	
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

	@Column(name="approver")
	private String approver;	

	@Column(name="approved_date")
	private Date approvedDate;

	@Column(name="attachment")
	private String attachment;

	public AppliedLeave() {
	}

	public AppliedLeave(AppliedLeaveId id, EmployeeDetails employeeDetails, LeaveCategory leaveCategory, Date endDate, String halfDay,
			float leaveDuration, String leaveStatus, String reason, String approver, Date approvedDate,
			String attachment) {
		this.id = id;
		this.employeeDetails = employeeDetails;
		this.leaveCategory = leaveCategory;
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
	
	public EmployeeDetails getEmployeeDetails() {
		return employeeDetails;
	}

	public void setEmployeeDetails(EmployeeDetails employeeDetails) {
		this.employeeDetails = employeeDetails;
	}

	public LeaveCategory getLeaveCategory() {
		return leaveCategory;
	}

	public void setLeaveCategory(LeaveCategory leaveCategory) {
		this.leaveCategory = leaveCategory;
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
		return "AppliedLeave [id=" + id + ", employeeDetails=" + employeeDetails + ", leaveCategory=" + leaveCategory + ", endDate=" + endDate + ", halfDay="
				+ halfDay + ", leaveDuration=" + leaveDuration + ", leaveStatus=" + leaveStatus + ", reason=" + reason
				+ ", approver=" + approver + ", approvedDate=" + approvedDate + ", attachment=" + attachment + "]";
	}
}