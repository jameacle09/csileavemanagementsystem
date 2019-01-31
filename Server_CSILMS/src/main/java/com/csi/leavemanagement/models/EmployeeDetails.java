package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "empl_details")
public class EmployeeDetails {
	
	@Id
	@Column(name = "emplid")
	private String emplId;
	
	@Column(name = "effdate")
	private Date effectiveDate;
	
	@Column(name = "join_date")
	private Date joinDate;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "business_unit")
	private String businessUnit;
	
	@Column(name = "dept_id")
	private String deptId;
	
	@Column(name = "job_title")
	private String jobTitle;
	
	@ManyToOne
	@JoinColumn(name = "reports_to")
	private PersonDetails reportsTo;
	
	@Column(name = "report_dotted_line")
	private String reportDottedLine;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "nric_passprt")
	private String nricPassport;
	
	@Column(name = "gender")
	private String gender;
	
	@Column(name = "marriage_status")
	private String marriageStatus;
	
	@Column(name = "marriage_date")
	private Date marriageDate;
	
	@Column(name = "mobile_no")
	private String mobileNo;
	
	@Column(name = "buss_email")
	private String businessEmail;
	
	@Column(name = "total_children")
	private int totolChildren;
	
	@Column(name = "marriage_cnt")
	private int marriageCount;

	public String getEmplId() {
		return emplId;
	}

	public Date getEffectiveDate() {
		return effectiveDate;
	}

	public Date getJoinDate() {
		return joinDate;
	}

	public String getStatus() {
		return status;
	}

	public String getBusinessUnit() {
		return businessUnit;
	}

	public String getDeptId() {
		return deptId;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public PersonDetails getReportsTo() {
		return reportsTo;
	}

	public String getReportDottedLine() {
		return reportDottedLine;
	}

	public String getName() {
		return name;
	}

	public String getNricPassport() {
		return nricPassport;
	}

	public String getGender() {
		return gender;
	}

	public String getMarriageStatus() {
		return marriageStatus;
	}

	public Date getMarriageDate() {
		return marriageDate;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public String getBusinessEmail() {
		return businessEmail;
	}

	public int getTotolChildren() {
		return totolChildren;
	}

	public int getMarriageCount() {
		return marriageCount;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public void setReportsTo(PersonDetails reportsTo) {
		this.reportsTo = reportsTo;
	}

	public void setReportDottedLine(String reportDottedLine) {
		this.reportDottedLine = reportDottedLine;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setNricPassport(String nricPassport) {
		this.nricPassport = nricPassport;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setMarriageStatus(String marriageStatus) {
		this.marriageStatus = marriageStatus;
	}

	public void setMarriageDate(Date marriageDate) {
		this.marriageDate = marriageDate;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public void setBusinessEmail(String businessEmail) {
		this.businessEmail = businessEmail;
	}

	public void setTotolChildren(int totolChildren) {
		this.totolChildren = totolChildren;
	}

	public void setMarriageCount(int marriageCount) {
		this.marriageCount = marriageCount;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "EmployeeDetails [emplId=" + emplId + ", effectiveDate=" + effectiveDate + ", joinDate=" + joinDate
				+ ", status=" + status + ", businessUnit=" + businessUnit + ", deptId=" + deptId + ", jobTitle="
				+ jobTitle + ", reportsTo=" + reportsTo + ", reportDottedLine=" + reportDottedLine + ", name=" + name
				+ ", nricPassport=" + nricPassport + ", gender=" + gender + ", marriageStatus=" + marriageStatus
				+ ", marriageDate=" + marriageDate + ", mobileNo=" + mobileNo + ", businessEmail=" + businessEmail
				+ ", totolChildren=" + totolChildren + ", marriageCount=" + marriageCount + "]";
	}
	
	

}
