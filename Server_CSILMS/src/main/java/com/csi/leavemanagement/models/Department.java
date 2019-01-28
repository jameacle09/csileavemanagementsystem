package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "department_tbl")
public class Department {
	
	@Id
	@Column(name = "dept_id")
	private String deptId;
	
	@Column(name = "effdate")
	private Date effDate;
	
	@Column(name = "dept_name")
	private String deptName;
	
	@Column(name = "status")
	private String status;

	public Department() {
	}

	public Department(String deptId, Date effDate, String deptName, String status) {
		this.deptId = deptId;
		this.effDate = effDate;
		this.deptName = deptName;
		this.status = status;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public Date getEffDate() {
		return effDate;
	}

	public void setEffDate(Date effDate) {
		this.effDate = effDate;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Department [deptId=" + deptId + ", effDate=" + effDate + ", deptName=" + deptName + ", status=" + status
				+ "]";
	}
	
	

}
