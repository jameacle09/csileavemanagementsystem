package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="leavedetails")
public class LeaveDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="staff_id")
	private StaffProfile staffId;
	
	@ManyToOne
	@JoinColumn(name="leave_category_id")
	private LeaveCategory leaveCategory;
	
	@Column(name="start_date")
	private Date startDate;
	
	@Column(name="end_date")
	private Date endDate;
	
	@Column(name="leave_duration")
	private float leaveDuration;
	
	@Column(name="leave_reason")
	private String leaveReason;
	
	@ManyToOne
	@JoinColumn(name="leave_status_id")
	private LeaveStatus leaveStatusId;
	
	public LeaveDetail() {
		
	}

	public LeaveDetail(StaffProfile staffId, LeaveCategory leaveCategory, Date startDate, Date endDate,
			float leaveDuration, String leaveReason, LeaveStatus leaveStatusId) {
		this.staffId = staffId;
		this.leaveCategory = leaveCategory;
		this.startDate = startDate;
		this.endDate = endDate;
		this.leaveDuration = leaveDuration;
		this.leaveReason = leaveReason;
		this.leaveStatusId = leaveStatusId;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public StaffProfile getStaffId() {
		return staffId;
	}

	public void setStaffId(StaffProfile staffId) {
		this.staffId = staffId;
	}

	public LeaveCategory getLeaveCategory() {
		return leaveCategory;
	}

	public void setLeaveCategory(LeaveCategory leaveCategory) {
		this.leaveCategory = leaveCategory;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public float getLeaveDuration() {
		return leaveDuration;
	}

	public void setLeaveDuration(float leaveDuration) {
		this.leaveDuration = leaveDuration;
	}

	public String getLeaveReason() {
		return leaveReason;
	}

	public void setLeaveReason(String leaveReason) {
		this.leaveReason = leaveReason;
	}

	public LeaveStatus getLeaveStatusId() {
		return leaveStatusId;
	}

	public void setLeaveStatusId(LeaveStatus leaveStatusId) {
		this.leaveStatusId = leaveStatusId;
	}

	@Override
	public String toString() {
		return "LeaveDetail [id=" + id + ", staffId=" + staffId + ", leaveCategory=" + leaveCategory + ", startDate="
				+ startDate + ", endDate=" + endDate + ", leaveDuration=" + leaveDuration + ", leaveReason="
				+ leaveReason + ", leaveStatusId=" + leaveStatusId + "]";
	}

}
