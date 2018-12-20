package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name="staffleaves")
public class StaffLeave {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="staff_id")
	private StaffProfile staffId;
	
	@ManyToOne
	@JoinColumn(name="leave_category_id")
	private LeaveCategory leaveCategoryId;
	
	@Column(name="available_leave")
	private int availableLeave;
	
	@Column(name="taken_leave")
	private int takenLeave;
	
	
	public StaffLeave() {
		
	}


	public StaffLeave(StaffProfile staffId, LeaveCategory leaveCategoryId, int availableLeave, int takenLeave) {
		this.staffId = staffId;
		this.leaveCategoryId = leaveCategoryId;
		this.availableLeave = availableLeave;
		this.takenLeave = takenLeave;
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


	public LeaveCategory getLeaveCategoryId() {
		return leaveCategoryId;
	}


	public void setLeaveCategoryId(LeaveCategory leaveCategoryId) {
		this.leaveCategoryId = leaveCategoryId;
	}


	public int getAvailableLeave() {
		return availableLeave;
	}


	public void setAvailableLeave(int availableLeave) {
		this.availableLeave = availableLeave;
	}


	public int getTakenLeave() {
		return takenLeave;
	}


	public void setTakenLeave(int takenLeave) {
		this.takenLeave = takenLeave;
	}


	@Override
	public String toString() {
		return "StaffLeave [id=" + id + ", staffId=" + staffId + ", leaveCategoryId=" + leaveCategoryId
				+ ", availableLeave=" + availableLeave + ", takenLeave=" + takenLeave + "]";
	}
	
	

}
