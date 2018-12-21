package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.LeaveStatusService;
import com.csi.leavemanagement.models.LeaveStatus;




@RestController
@RequestMapping("/api")
@CrossOrigin
public class LeaveStatusRestController {

	@Autowired
	private LeaveStatusService leaveStatusService;
	
	@RequestMapping(value="/leavestatuss", method=RequestMethod.GET)
	public List<LeaveStatus> doListLeaveCategories() {
		List<LeaveStatus> leaveStatuss = this.leaveStatusService.findAll();
		return leaveStatuss;
	}
	
	@RequestMapping(value="/leavestatus/{id}", method=RequestMethod.GET)
	public LeaveStatus doGetLeaveStatusById(@PathVariable("id") int id) {
		LeaveStatus leaveStatus = this.leaveStatusService.findById(id);
		return leaveStatus;
	}
	
	@RequestMapping(value="/leavestatus", method=RequestMethod.POST)
	public LeaveStatus doSaveLeaveStatus(@RequestBody LeaveStatus leaveStatus) {
		LeaveStatus newLeaveStatus = this.leaveStatusService.save(leaveStatus);
		return newLeaveStatus;
	}
	
	@RequestMapping(value="/leavestatus/{id}", method=RequestMethod.DELETE)
	public String doDeleteLeaveStatus(@PathVariable("id") int id) {
		this.leaveStatusService.deleteByID(id);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/leavestatus/{id}", method=RequestMethod.PATCH)
	public LeaveStatus doUpdateLeaveStatus(@PathVariable("id") int id, @RequestBody LeaveStatus leaveStatus) {
		leaveStatus.setId(id);
		LeaveStatus newLeaveStatus = this.leaveStatusService.save(leaveStatus);
		return newLeaveStatus;
	}
}
