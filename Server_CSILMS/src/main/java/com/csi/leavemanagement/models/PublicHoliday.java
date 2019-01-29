package com.csi.leavemanagement.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="public_holiday")

public class PublicHoliday {
	
	@Column(name="date")
	private Date holidayDate;
	
	@Column(name="day")
	private String holidayDay;
	
	@Column(name="public_holiday_desc")
	private String holidayDesc;
	
	@Column(name="public_holiday_state")
	private String holidayState;

	public PublicHoliday() {
		
	}
	
	public PublicHoliday(Date holidayDate, String holidayDay, String holidayDesc, String holidayState) {
		this.holidayDate = holidayDate;
		this.holidayDay = holidayDay;
		this.holidayDesc = holidayDesc;
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

	public String getHolidayDesc() {
		return holidayDesc;
	}

	public void setHolidayDesc(String holidayDesc) {
		this.holidayDesc = holidayDesc;
	}

	public String getHolidayState() {
		return holidayState;
	}

	public void setHolidayState(String holidayState) {
		this.holidayState = holidayState;
	}

	@Override
	public String toString() {
		return "PublicHoliday [holidayDate=" + holidayDate + ", holidayDay=" + holidayDay + ", holidayDesc="
				+ holidayDesc + ", holidayState=" + holidayState + "]";
	}
	
}
