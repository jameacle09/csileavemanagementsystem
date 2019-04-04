package com.csi.leavemanagement.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.csi.leavemanagement.exceptions.PublicHolidayServiceException;
import com.csi.leavemanagement.models.PublicHoliday;
import com.csi.leavemanagement.services.PublicHolidayService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class PublicHolidayRestController {
    
	private PublicHolidayService publicHolidayService;

    @Autowired
    public PublicHolidayRestController(PublicHolidayService publicHolidayService) {
        this.publicHolidayService = publicHolidayService;
    }
    
    @RequestMapping(value="/publicholidays", method=RequestMethod.GET)
    public List<PublicHoliday> doListPublicHolidays() {
        List<PublicHoliday> publicHolidayList = this.publicHolidayService.findAll();
        return publicHolidayList;
    }
    
    @RequestMapping(value="/publicholiday/{id}", method=RequestMethod.GET)
    public PublicHoliday doGetPublicHolidayById(@PathVariable("id") String idStr) {
        Date id = null;
                
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
            
            id = sdf.parse(idStr);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        PublicHoliday publicHoliday = this.publicHolidayService.findById(id);
        return publicHoliday;
    }
    
    @RequestMapping(value="/publicholiday", method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('HR')")
    public ResponseEntity<?> doCreatePublicHoliday(@RequestBody PublicHoliday publicHoliday) {
    	
        PublicHoliday newPublicHoliday = null;        
		try {			
			newPublicHoliday = this.publicHolidayService.create(publicHoliday);			
		} catch (PublicHolidayServiceException e) {
			
			String errorMessage = "";
			switch(e.getExceptionCode()) {
				case PublicHolidayServiceException.PUBLIC_HOLIDAY_ALREADY_EXIST:
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					String holidayDate = sdf.format(publicHoliday.getHolidayDate());
					errorMessage = holidayDate + " is already a Public Holiday";
					break;
					
				case PublicHolidayServiceException.PUBLIC_HOLIDAY_INVALID_DATE:
					errorMessage = "Date specified is invalid";
					break;
					
				default:
					errorMessage = "An unknown error has occured";
			}
			throw new ResponseStatusException(HttpStatus.CONFLICT, errorMessage);
			
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unknown error has occured");
		}
		
		if(newPublicHoliday == null) 
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create Public Holiday");
		
        return new ResponseEntity<PublicHoliday>(newPublicHoliday, HttpStatus.CREATED);
    }
    
    @RequestMapping(value="/publicholiday/{id}", method=RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('HR')")
    public String doDeletePublicHoliday(@PathVariable("id") String idStr) {
    	Date id = null;
        
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
            
            id = sdf.parse(idStr);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        this.publicHolidayService.deleteByID(id);
        return "Successfully Deleted";
    }
    
    /*@RequestMapping(value="/publicholiday/{id}", method=RequestMethod.PATCH)
    public PublicHoliday doUpdatePublicHoliday(@PathVariable("id") Date id,
                                                @RequestBody PublicHoliday publicHoliday) {
        publicHoliday.setHolidayDate(id);
        PublicHoliday newPublicHoliday = this.publicHolidayService.save(publicHoliday);
        return newPublicHoliday;
    }*/
    
    @RequestMapping(value="/publicholiday/{id}", method=RequestMethod.PATCH)
	@PreAuthorize("hasAuthority('HR')")
    public PublicHoliday doUpdatePublicHoliday(@PathVariable("id") String idStr,
                                                @RequestBody PublicHoliday publicHoliday) {
        
        Date id = null;
        
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
            
            id = sdf.parse(idStr);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        publicHoliday.setHolidayDate(id);
        PublicHoliday newPublicHoliday = this.publicHolidayService.save(publicHoliday);
        return newPublicHoliday;
    }
}
