package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="staffprofiles")
public class StaffProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="staff_number")
	private String staffNumber;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="ic_number")
	private String icNumber;
	
	public StaffProfile() {
		
	}
	
	public StaffProfile(String staffNumber, String firstName, String lastName, String icNumber ) {
		this.staffNumber = staffNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.icNumber = icNumber;
	}
	
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStaffNumber() {
		return staffNumber;
	}
	
	public void setStaffNumber(String staffNumber) {
		this.staffNumber = staffNumber;
	}
	
	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	
	public String getLastName() {
		return lastName;
	}
	
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getIcNumber() {
		return icNumber;
	}
	
	public void setIcNumber(String icNumber) {
		this.icNumber = icNumber;
	}
	
	public String toString() {
		String result = "Staff Number: " + this.staffNumber + "\n";
		result = result + "First Name :" + this.firstName + "\n";
		result = result + "Last Name :" + this.lastName + "\n";
		result = result + "IC Number :" + this.icNumber + "\n";
		return result;
		
	}
	
}
