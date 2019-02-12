package com.csi.leavemanagement.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "login_tbl")
public class LoginDetails {

	@Id
	@Column(name = "emplid")
	private String emplId;

	@Column(name = "userid", unique = true)
	private String userId;

	@JsonIgnore
	private String password;

	@Column(name = "lockaccount")
	private int lockAccount;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "emplid"), inverseJoinColumns = @JoinColumn(name = "role"))
	private Set<Roles> roles = new HashSet<Roles>();

	public String getEmplId() {
		return emplId;
	}

	public String getUserId() {
		return userId;
	}

	public String getPassword() {
		return password;
	}

	public int getLockAccount() {
		return lockAccount;
	}

	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setLockAccount(int lockAccount) {
		this.lockAccount = lockAccount;
	}

	public Set<Roles> getRoles() {
		return roles;
	}

	public void setRoles(Set<Roles> roles) {
		this.roles = roles;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "LoginDetails [emplId=" + this.emplId + ", userId=" + this.userId + ", lockAccount=" + this.lockAccount
				+ ", " + this.roles + "]";
	}

}
