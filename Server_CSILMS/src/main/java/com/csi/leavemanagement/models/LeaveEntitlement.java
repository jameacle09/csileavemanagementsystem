package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name="leave_entitlement")
public class LeaveEntitlement {

	@EmbeddedId
	private LeaveEntitlementId id;
	
	@MapsId("leaveCode")
	@ManyToOne
	@JoinColumn(name="leave_code")
	private LeaveCategory leaveCategory;
	
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
		this.id = new LeaveEntitlementId();
	}
	
	public LeaveEntitlement(LeaveEntitlementId id, LeaveCategory leaveCategory, float carryForward, float entitlement, float availableLeave,
			float takenLeave, float balanceLeave) {
		this.id = id;
		this.leaveCategory = leaveCategory;
		this.carryForward = carryForward;
		this.entitlement = entitlement;
		this.availableLeave = availableLeave;
		this.takenLeave = takenLeave;
		this.balanceLeave = balanceLeave;
	}

	public LeaveEntitlementId getId() {
		return id;
	}

	public void setId(LeaveEntitlementId id) {
		this.id = id;
	}
	
	public LeaveCategory getLeaveCategory() {
		return leaveCategory;
	}

	public void setLeaveCategory(LeaveCategory leaveCategory) {
		this.leaveCategory = leaveCategory;
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

	@Override
	public String toString() {
		return "LeaveEntitlement [id=" + id + ", leaveCategory=" + leaveCategory + ", carryForward=" + carryForward
				+ ", entitlement=" + entitlement + ", availableLeave=" + availableLeave + ", takenLeave=" + takenLeave
				+ ", balanceLeave=" + balanceLeave + "]";
	}
}