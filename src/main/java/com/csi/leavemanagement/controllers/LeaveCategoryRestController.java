package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.LeaveCategoryService;
import com.csi.leavemanagement.models.LeaveCategory;




@RestController
@RequestMapping("/api")
@CrossOrigin
public class LeaveCategoryRestController {

	@Autowired
	private LeaveCategoryService leaveCategoryService;
	
	@RequestMapping(value="/leavecategories", method=RequestMethod.GET)
	public List<LeaveCategory> doListLeaveCategories() {
		List<LeaveCategory> leaveCategories = this.leaveCategoryService.findAll();
		return leaveCategories;
	}
	
	@RequestMapping(value="/leavecategory/{id}", method=RequestMethod.GET)
	public LeaveCategory doGetLeaveCategoryById(@PathVariable("id") int id) {
		LeaveCategory leaveCategory = this.leaveCategoryService.findById(id);
		return leaveCategory;
	}
	
	@RequestMapping(value="/leavecategory", method=RequestMethod.POST)
	public LeaveCategory doSaveLeaveCategory(@RequestBody LeaveCategory leaveCategory) {
		LeaveCategory newLeaveCategory = this.leaveCategoryService.save(leaveCategory);
		return newLeaveCategory;
	}
	
	@RequestMapping(value="/leavecategory/{id}", method=RequestMethod.DELETE)
	public String doDeleteLeaveCategory(@PathVariable("id") int id) {
		this.leaveCategoryService.deleteByID(id);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/leavecategory/{id}", method=RequestMethod.PATCH)
	public LeaveCategory doUpdateLeaveCategory(@PathVariable("id") int id, @RequestBody LeaveCategory leaveCategory) {
		leaveCategory.setId(id);
		LeaveCategory newLeaveCategory = this.leaveCategoryService.save(leaveCategory);
		return newLeaveCategory;
	}
}
