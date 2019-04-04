package com.csi.leavemanagement.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.csi.leavemanagement.services.LeaveCategoryService;
import com.csi.leavemanagement.exceptions.LeaveCategoryServiceException;
import com.csi.leavemanagement.models.LeaveCategory;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LeaveCategoryRestController {

	private LeaveCategoryService leaveCategoryService;
	
	@Autowired
	public LeaveCategoryRestController(LeaveCategoryService leaveCategoryService) {
		this.leaveCategoryService = leaveCategoryService;
	}

	@RequestMapping(value="/leavecategories", method=RequestMethod.GET)
	public List<LeaveCategory> doListLeaveCategories() {
		List<LeaveCategory> leaveCategories = this.leaveCategoryService.findAll();
		return leaveCategories;
	}
	
	@RequestMapping(value="/leavecategory/{id}", method=RequestMethod.GET)
	public LeaveCategory doGetLeaveCategoryById(@PathVariable("id") String id) {
		LeaveCategory leaveCategory = this.leaveCategoryService.findById(id);
		return leaveCategory;
	}
	
	@RequestMapping(value="/leavecategory", method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('HR')")
	public ResponseEntity<?> doCreateLeaveCategory(@RequestBody LeaveCategory leaveCategory) {
		
		LeaveCategory newLeaveCategory = null;
		try {			
			newLeaveCategory = this.leaveCategoryService.create(leaveCategory);			
		} catch (LeaveCategoryServiceException e) {
			
			String errorMessage = "";
			switch(e.getExceptionCode()) {
				case LeaveCategoryServiceException.LEAVE_CATEGORY_ALREADY_EXIST:
					errorMessage = leaveCategory.getLeaveCode() + " is already defined.";
					break ;
				default :
					errorMessage = "An unknown error has occured";				
			}
			throw new ResponseStatusException(HttpStatus.CONFLICT, errorMessage);
			
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An unknown error has occured");
		}
		
		if(newLeaveCategory == null) 
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create Leave Category");
		
		return new ResponseEntity<LeaveCategory>(newLeaveCategory, HttpStatus.CREATED);
	}
	
	@RequestMapping(value="/leavecategory/{id}", method=RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('HR')")
	public String doDeleteLeaveCategory(@PathVariable("id") String id) {
		this.leaveCategoryService.deleteByID(id);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/leavecategory/{id}", method=RequestMethod.PATCH)
	@PreAuthorize("hasAuthority('HR')")
	public LeaveCategory doUpdateLeaveCategory(@PathVariable("id") String id, @RequestBody LeaveCategory leaveCategory) {
		leaveCategory.setLeaveCode(id);
		LeaveCategory newLeaveCategory = this.leaveCategoryService.save(leaveCategory);
		return newLeaveCategory;
	}
}
