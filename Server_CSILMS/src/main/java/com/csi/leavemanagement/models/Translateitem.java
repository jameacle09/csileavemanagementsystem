package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="translateitem")
public class Translateitem {
	
	@EmbeddedId
	private TranslateitemId id;
	
	@Column(name="eff_status")
	private String effStatus;
	
	@Column(name="xlatlongname")
	private String xlatlongname;
	
	@Column(name="xlatshortname")
	private String xlatshortname;

	public Translateitem() {
		this.id = new TranslateitemId();
	}
	
	public Translateitem(TranslateitemId id, String effStatus, String xlatlongname, String xlatshortname) {
		this.id = id;
		this.effStatus = effStatus;
		this.xlatlongname = xlatlongname;
		this.xlatshortname = xlatshortname;
	
	}

	public TranslateitemId getId() {
		return id;
	}

	public void setId(TranslateitemId id) {
		this.id = id;
	}

	public String getEffStatus() {
		return effStatus;
	}

	public void setEffStatus(String effStatus) {
		this.effStatus = effStatus;
	}

	public String getXlatlongname() {
		return xlatlongname;
	}

	public void setXlatlongname(String xlatlongname) {
		this.xlatlongname = xlatlongname;
	}

	public String getXlatshortname() {
		return xlatshortname;
	}

	public void setXlatshortname(String xlatshortname) {
		this.xlatshortname = xlatshortname;
	}

	@Override
	public String toString() {
		return "Translateitem [id=" + id + ", effStatus=" + effStatus + ", xlatlongname=" + xlatlongname
				+ ", xlatshortname=" + xlatshortname + "]";
	}	
}
