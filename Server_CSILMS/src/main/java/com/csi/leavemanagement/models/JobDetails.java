package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "job_details")
public class JobDetails {

	@Id
	@Column(name = "effdate")
	private Date effDate;
	
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
	
	@Column(name = "reports_to")
	private String reportsTo;
	
	@Column(name = "report_dotted_line")
	private String reportDottedLine;
	
	@Column(name = "lastupddttm")
	private int lastUpddTtm;
	
	@Column(name = "lastupdoprid")
	private int lastUpdoprId;

	public JobDetails() {
	}

	public JobDetails(Date effDate, Date joinDate, String status, String businessUnit, String deptId, String jobTitle,
			String reportsTo, String reportDottedLine, int lastUpddTtm, int lastUpdoprId) {
		this.effDate = effDate;
		this.joinDate = joinDate;
		this.status = status;
		this.businessUnit = businessUnit;
		this.deptId = deptId;
		this.jobTitle = jobTitle;
		this.reportsTo = reportsTo;
		this.reportDottedLine = reportDottedLine;
		this.lastUpddTtm = lastUpddTtm;
		this.lastUpdoprId = lastUpdoprId;
	}

	public Date getEffDate() {
		return effDate;
	}

	public void setEffDate(Date effDate) {
		this.effDate = effDate;
	}

	public Date getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBusinessUnit() {
		return businessUnit;
	}

	public void setBusinessUnit(String businessUnit) {
		this.businessUnit = businessUnit;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getReportsTo() {
		return reportsTo;
	}

	public void setReportsTo(String reportsTo) {
		this.reportsTo = reportsTo;
	}

	public String getReportDottedLine() {
		return reportDottedLine;
	}

	public void setReportDottedLine(String reportDottedLine) {
		this.reportDottedLine = reportDottedLine;
	}

	public int getLastUpddTtm() {
		return lastUpddTtm;
	}

	public void setLastUpddTtm(int lastUpddTtm) {
		this.lastUpddTtm = lastUpddTtm;
	}

	public int getLastUpdoprId() {
		return lastUpdoprId;
	}

	public void setLastUpdoprId(int lastUpdoprId) {
		this.lastUpdoprId = lastUpdoprId;
	}

	@Override
	public String toString() {
		return "JobDetails [effDate=" + effDate + ", joinDate=" + joinDate + ", status=" + status + ", businessUnit="
				+ businessUnit + ", deptId=" + deptId + ", jobTitle=" + jobTitle + ", reportsTo=" + reportsTo
				+ ", reportDottedLine=" + reportDottedLine + ", lastUpddTtm=" + lastUpddTtm + ", lastUpdoprId="
				+ lastUpdoprId + "]";
	}

	
	
}
