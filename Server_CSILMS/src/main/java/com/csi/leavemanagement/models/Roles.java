package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

@Entity
@Table(name = "role_tbl")
public class Roles {

	@Id
	private String role;

	@Enumerated(EnumType.STRING)
	@NaturalId
	@Column(name = "role_name", length = 60)
	private RoleName roleName;

	public String getRole() {
		return role;
	}

	public RoleName getRoleName() {
		return roleName;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void setRoleName(RoleName roleName) {
		this.roleName = roleName;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {

		return "Roles [role=" + this.role + ", " + this.roleName.toString() + "]";
	}

}
