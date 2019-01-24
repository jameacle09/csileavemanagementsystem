package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="leave_entitlement")
public class LeaveEntitlement {

	@Id
	@Column(name="emplid")
	private String employeeId;
	
	@Column(name="year")
	private int year;
	
	@ManyToOne
	@Column(name="leave_code")
	private LeaveCategory leaveCode;
	
	@Column(name="carry_forward")
	private float carryForward;
	
	@Column(name="entitlement")
	private float entitlement;
	
	@Column(name="available_leave")
	private float availableLeave;
	
	@Column(name="taken_leave")
	private float takenLeave;
	
	@Column(name="balance_leave")
	private float balanceLeave;

	public LeaveEntitlement() {
		
	}
	
	public LeaveEntitlement(String employeeId, int year, LeaveCategory leaveCode, float carryForward, float entitlement,
			float availableLeave, float takenLeave, float balanceLeave) {
		this.employeeId = employeeId;
		this.year = year;
		this.leaveCode = leaveCode;
		this.carryForward = carryForward;
		this.entitlement = entitlement;
		this.availableLeave = availableLeave;
		this.takenLeave = takenLeave;
		this.balanceLeave = balanceLeave;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public LeaveCategory getLeaveCode() {
		return leaveCode;
	}

	public void setLeaveCode(LeaveCategory leaveCode) {
		this.leaveCode = leaveCode;
	}

	public float getCarryForward() {
		return carryForward;
	}

	public void setCarryForward(float carryForward) {
		this.carryForward = carryForward;
	}

	public float getEntitlement() {
		return entitlement;
	}

	public void setEntitlement(float entitlement) {
		this.entitlement = entitlement;
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
}
