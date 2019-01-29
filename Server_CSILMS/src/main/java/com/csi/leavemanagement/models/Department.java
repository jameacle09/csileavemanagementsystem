package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="department_tbl")
public class Department {

	@Id 
	@Column(name="department")
	private String department;

	@Column(name="dept_name")
	private String deptName;

	public Department() {
		
	}

	public Department(String department, String deptName) {
		this.department = department;
		this.deptName = deptName;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	@Override
	public String toString() {
		return "Department [department=" + department + ", deptName=" + deptName + "]";
	}
}
