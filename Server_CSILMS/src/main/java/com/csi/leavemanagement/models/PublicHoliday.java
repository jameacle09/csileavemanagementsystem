package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="public_holiday")
public class PublicHoliday {
	
	@Id
	@Column(name="date")
	private Date holidayDate;
	
	@Column(name="day")
	private String holidayDay;
	
	@Column(name="public_holiday_descr")
	private String holidayDescr;
	
	@Column(name="public_holiday_state")
	private String holidayState;

	public PublicHoliday() {
		
	}
	
	public PublicHoliday(Date holidayDate, String holidayDay, String holidayDescr, String holidayState) {
		this.holidayDate = holidayDate;
		this.holidayDay = holidayDay;
		this.holidayDescr = holidayDescr;
		this.holidayState = holidayState;		
	}

	public Date getHolidayDate() {
		return holidayDate;
	}

	public void setHolidayDate(Date holidayDate) {
		this.holidayDate = holidayDate;
	}

	public String getHolidayDay() {
		return holidayDay;
	}

	public void setHolidayDay(String holidayDay) {
		this.holidayDay = holidayDay;
	}

	public String getHolidayDescr() {
		return holidayDescr;
	}

	public void setHolidayDescr(String holidayDescr) {
		this.holidayDescr = holidayDescr;
	}

	public String getHolidayState() {
		return holidayState;
	}

	public void setHolidayState(String holidayState) {
		this.holidayState = holidayState;
	}

	@Override
	public String toString() {
		return "PublicHoliday [holidayDate=" + holidayDate + ", holidayDay=" + holidayDay + ", holidayDescr="
				+ holidayDescr + ", holidayState=" + holidayState + "]";
	}
	
}
