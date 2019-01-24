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
	
	@Column(name="entitlement")
	private float entitlement;
	
	@Column(name="carry_forward")
	private float carryForward;
	
	@Column(name="available_leave")
	private float availableLeave;
	
	@Column(name="taken_leave")
	private float takenLeave;
	
	@Column(name="balance_leave")
	private float balanceLeave;
	
	public StaffLeave() {
		
	}


	public StaffLeave(StaffProfile staffId, LeaveCategory leaveCategoryId, float entitlement, float carryForward, float availableLeave, float takenLeave, float balanceLeave) {
		this.staffId = staffId;
		this.leaveCategoryId = leaveCategoryId;
		this.entitlement = entitlement;
		this.carryForward = carryForward;
		this.availableLeave = availableLeave;
		this.takenLeave = takenLeave;
		this.balanceLeave = balanceLeave;
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

	
	public float getEntitlement() {
		return entitlement;
	}


	public void setEntitlement(float entitlement) {
		this.entitlement = entitlement;
	}


	public float getCarryForward() {
		return carryForward;
	}


	public void setCarryForward(float carryForward) {
		this.carryForward = carryForward;
	}


	public float getAvailableLeave() {
		return availableLeave;
	}


	public void setAvailableLeave(float availableLeave) {
		this.availableLeave = availableLeave;
	}


	public float getTakenLeave() {
		return takenLeave;
	}


	public void setTakenLeave(float takenLeave) {
		this.takenLeave = takenLeave;
	}

	

	public float getBalanceLeave() {
		return balanceLeave;
	}


	public void setBalanceLeave(float balanceLeave) {
		this.balanceLeave = balanceLeave;
	}


	@Override
	public String toString() {
		return "StaffLeave [id=" + id + ", staffId=" + staffId + ", leaveCategoryId=" + leaveCategoryId
				+ ", entitlement=" + entitlement + ", carryForward=" + carryForward + ", availableLeave="
				+ availableLeave + ", takenLeave=" + takenLeave + ", balanceLeave=" + balanceLeave + "]";
	}


}
