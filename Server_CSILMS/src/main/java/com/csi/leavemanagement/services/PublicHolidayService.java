package com.csi.leavemanagement.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.exceptions.PublicHolidayServiceException;
import com.csi.leavemanagement.models.PublicHoliday;
import com.csi.leavemanagement.repositories.PublicHolidayRepository;

@Service
public class PublicHolidayService {

	private PublicHolidayRepository publicHolidayRepository;
	
	@Autowired
	public PublicHolidayService(PublicHolidayRepository publicHolidayRepository) {
		this.publicHolidayRepository = publicHolidayRepository;
	}
	
	public List<PublicHoliday> findAll() {
		List<PublicHoliday> publicHolidayList = (List<PublicHoliday>) this.publicHolidayRepository.findAll();
		return publicHolidayList;
	}
	
	public PublicHoliday create(PublicHoliday publicHoliday) throws PublicHolidayServiceException {
    	
    	PublicHoliday publicHolidayCheck = this.findById(publicHoliday.getHolidayDate());
    	if(publicHolidayCheck != null)
    		throw new PublicHolidayServiceException(PublicHolidayServiceException.PUBLIC_HOLIDAY_ALREADY_EXIST);
    	
		return this.publicHolidayRepository.save(publicHoliday);
	}
	
	public PublicHoliday save(PublicHoliday publicHoliday) {
		return this.publicHolidayRepository.save(publicHoliday);
	}
	
	public PublicHoliday findById(Date id) {
		PublicHoliday publicHoliday = this.publicHolidayRepository.findById(id).orElse(null);
		return publicHoliday;		
	}
	
	public void deleteByID(Date id) {
		this.publicHolidayRepository.deleteById(id);		
	}
}

