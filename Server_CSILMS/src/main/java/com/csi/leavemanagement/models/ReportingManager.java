package com.csi.leavemanagement.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

@Entity
@Table(name = "empl_details")
public class ReportingManager {

	@Id
	private String reportsto;

	@Enumerated(EnumType.STRING)
	@NaturalId
	@Column(name = "reports_to", length = 10)

	public String getReportsTo() {
		return reportsto;
	}

	public void setReportsTo(String reportsto) {
		this.reportsto = reportsto;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ReportingManager [reportsto=" + this.reportsto + "]";
	}

}
