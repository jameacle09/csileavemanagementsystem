package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.StaffLeaveService;
import com.csi.leavemanagement.models.StaffLeave;




@RestController
@RequestMapping("/api")
@CrossOrigin
public class StaffLeaveRestController {

	@Autowired
	private StaffLeaveService staffLeaveService;
	
	@RequestMapping(value="/staffleaves", method=RequestMethod.GET)
	public List<StaffLeave> doListStaffLeaves() {
		List<StaffLeave> staffLeaves = this.staffLeaveService.findAll();
		return staffLeaves;
	}
	
	@RequestMapping(value="/staffleave/{id}", method=RequestMethod.GET)
	public StaffLeave doGetStaffLeaveById(@PathVariable("id") int id) {
		StaffLeave staffLeave = this.staffLeaveService.findById(id);
		return staffLeave;
	}
	
	@RequestMapping(value="/staffleave", method=RequestMethod.POST)
	public StaffLeave doSaveStaffLeave(@RequestBody StaffLeave staffLeave) {
		StaffLeave newStaffLeave = this.staffLeaveService.save(staffLeave);
		return newStaffLeave;
	}
	
	@RequestMapping(value="/staffleave/{id}", method=RequestMethod.DELETE)
	public String doDeleteStaffLeave(@PathVariable("id") int id) {
		this.staffLeaveService.deleteByID(id);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/staffleave/{id}", method=RequestMethod.PATCH)
	public StaffLeave doUpdateStaffLeave(@PathVariable("id") int id, @RequestBody StaffLeave staffLeave) {
		staffLeave.setId(id);
		StaffLeave newStaffLeave = this.staffLeaveService.save(staffLeave);
		return newStaffLeave;
	}
}
