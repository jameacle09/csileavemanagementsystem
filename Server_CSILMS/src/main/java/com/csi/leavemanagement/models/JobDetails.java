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
@Table(name = "job_details")
public class JobDetails {
	
	@EmbeddedId 
	private JobDetailsId id;
	
	@Column(name = "join_date")
	private Date joinDate;
	
	@Column(name = "status")
	private String status;
	
	@ManyToOne
	@JoinColumn(name="business_unit")
	private BusinessUnit businessUnit;
	
	@ManyToOne
	@JoinColumn(name="dept_id")
	private Department deptId;
	
	@Column(name = "job_title")
	private String jobTitle;
	
	@Column(name = "reports_to")
	private String reportsTo;
	
	@Column(name = "report_dotted_line")
	private String reportDottedLine;
	
	@Column(name = "lastupddttm")
	private Date lastUpddTtm;
	
	@Column(name = "lastupdoprid")
	private String lastUpdoprId;

	public JobDetails() {
	}

	
	public JobDetails(JobDetailsId id, Date joinDate, String status, BusinessUnit businessUnit, Department deptId,
			String jobTitle, String reportsTo, String reportDottedLine, Date lastUpddTtm, String lastUpdoprId) {
		this.id = id;
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

	public JobDetailsId getId() {
		return id;
	}

	public void setId(JobDetailsId id) {
		this.id = id;
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

	public BusinessUnit getBusinessUnit() {
		return businessUnit;
	}

	public void setBusinessUnit(BusinessUnit businessUnit) {
		this.businessUnit = businessUnit;
	}

	public Department getDeptId() {
		return deptId;
	}

	public void setDeptId(Department deptId) {
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

	public Date getLastUpddTtm() {
		return lastUpddTtm;
	}

	public void setLastUpddTtm(Date lastUpddTtm) {
		this.lastUpddTtm = lastUpddTtm;
	}

	public String getLastUpdoprId() {
		return lastUpdoprId;
	}

	public void setLastUpdoprId(String lastUpdoprId) {
		this.lastUpdoprId = lastUpdoprId;
	}

	@Override
	public String toString() {
		return "JobDetails [id=" + id + ", joinDate=" + joinDate + ", status=" + status + ", "
				+ "businessUnit=" + businessUnit + ", deptId=" + deptId + ",  jobTitle=" + jobTitle + ", reportsTo=" + reportsTo
				+ ", reportDottedLine=" + reportDottedLine + ", lastUpddTtm=" + lastUpddTtm + ", lastUpdoprId="
				+ lastUpdoprId + "]";
	}

	
}
