package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.LeaveDetailService;
import com.csi.leavemanagement.models.LeaveDetail;




@RestController
@RequestMapping("/api")
@CrossOrigin
public class LeaveDetailRestController {

	@Autowired
	private LeaveDetailService leaveDetailService;
	
	@RequestMapping(value="/leavedetails", method=RequestMethod.GET)
	public List<LeaveDetail> doListLeaveCategories() {
		List<LeaveDetail> leaveDetails = this.leaveDetailService.findAll();
		return leaveDetails;
	}
	
	@RequestMapping(value="/leavedetail/{id}", method=RequestMethod.GET)
	public LeaveDetail doGetLeaveDetailById(@PathVariable("id") int id) {
		LeaveDetail leaveDetail = this.leaveDetailService.findById(id);
		return leaveDetail;
	}
	
	@RequestMapping(value="/leavedetail", method=RequestMethod.POST)
	public LeaveDetail doSaveLeaveDetail(@RequestBody LeaveDetail leaveDetail) {
		LeaveDetail newLeaveDetail = this.leaveDetailService.save(leaveDetail);
		return newLeaveDetail;
	}
	
	@RequestMapping(value="/leavedetail/{id}", method=RequestMethod.DELETE)
	public String doDeleteLeaveDetail(@PathVariable("id") int id) {
		this.leaveDetailService.deleteByID(id);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/leavedetail/{id}", method=RequestMethod.PATCH)
	public LeaveDetail doUpdateLeaveDetail(@PathVariable("id") int id, @RequestBody LeaveDetail leaveDetail) {
		leaveDetail.setId(id);
		LeaveDetail newLeaveDetail = this.leaveDetailService.save(leaveDetail);
		return newLeaveDetail;
	}
}
