package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "person_details")
public class PersonDetails {

	@Id
	@Column(name = "emplid")
	private String emplId;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "nric_passprt")
	private String nricPassprt;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "marriage_status")
	private String marriageStatus;
	
	@Column(name = "marriage_date")
	private Date marriageDate;
	
	@Column(name = "mobile_no")
	private String mobileNo;
	
	@Column(name = "buss_email")
	private String bussEmail;
	
	@Column(name = "total_children")
	private int totalChildren;
	
	@Column(name = "marriage_cnt")
	private int marriageCnt;

	public PersonDetails() {
	}

	public PersonDetails(String emplId, String name, String nricPassprt, String gender, String marriageStatus,
			Date marriageDate, String mobileNo, String bussEmail, int totalChildren, int marriageCnt) {
		this.emplId = emplId;
		this.name = name;
		this.nricPassprt = nricPassprt;
		this.gender = gender;
		this.marriageStatus = marriageStatus;
		this.marriageDate = marriageDate;
		this.mobileNo = mobileNo;
		this.bussEmail = bussEmail;
		this.totalChildren = totalChildren;
		this.marriageCnt = marriageCnt;
	}

	public String getEmplId() {
		return emplId;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNricPassprt() {
		return nricPassprt;
	}

	public void setNricPassprt(String nricPassprt) {
		this.nricPassprt = nricPassprt;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMarriageStatus() {
		return marriageStatus;
	}

	public void setMarriageStatus(String marriageStatus) {
		this.marriageStatus = marriageStatus;
	}

	public Date getMarriageDate() {
		return marriageDate;
	}

	public void setMarriageDate(Date marriageDate) {
		this.marriageDate = marriageDate;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getBussEmail() {
		return bussEmail;
	}

	public void setBussEmail(String bussEmail) {
		this.bussEmail = bussEmail;
	}

	public int getTotalChildren() {
		return totalChildren;
	}

	public void setTotalChildren(int totalChildren) {
		this.totalChildren = totalChildren;
	}

	public int getMarriageCnt() {
		return marriageCnt;
	}

	public void setMarriageCnt(int marriageCnt) {
		this.marriageCnt = marriageCnt;
	}

	@Override
	public String toString() {
		return "PersonDetails [emplId=" + emplId + ", name=" + name + ", nricPassprt=" + nricPassprt + ", gender="
				+ gender + ", marriageStatus=" + marriageStatus + ", marriageDate=" + marriageDate + ", mobileNo="
				+ mobileNo + ", bussEmail=" + bussEmail + ", totalChildren=" + totalChildren + ", marriageCnt="
				+ marriageCnt + "]";
	}
	
	
}
