package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.LeaveEntitlement;
import com.csi.leavemanagement.services.LeaveEntitlementService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LeaveEntitlementRestController {
	
	private LeaveEntitlementService leaveEntitlementService;
	
	@Autowired
	public LeaveEntitlementRestController(LeaveEntitlementService leaveEntitlementService) {
		this.leaveEntitlementService = leaveEntitlementService;
	}

	@RequestMapping(value="/leaveentitlements", method=RequestMethod.GET)
	public List<LeaveEntitlement> doListLeaveEntitlement() {
		List<LeaveEntitlement> leaveEntitlements = this.leaveEntitlementService.findAll();
		return leaveEntitlements;
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}/{year}/{leavecode}", method=RequestMethod.GET)
	public LeaveEntitlement doGetLeaveEntitlementById(@PathVariable("emplid") String emplid,  
													  @PathVariable("year") int year,
													  @PathVariable("leavecode") String leaveCode) {
		
		LeaveEntitlement leaveEntitlement = this.leaveEntitlementService.findById(emplid, year, leaveCode);
		return leaveEntitlement;
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}/{year}", method=RequestMethod.GET)
	public List<LeaveEntitlement> doGetLeaveEntitlementByEmplidAndYear(@PathVariable("emplid") String emplid,  
																       @PathVariable("year") int year) {
		
		List<LeaveEntitlement> leaveEntitlements = this.leaveEntitlementService.findByEmplidYear(emplid, year);
		return leaveEntitlements;
	}
	
	@RequestMapping(value="/leaveentitlement", method=RequestMethod.POST)
	public LeaveEntitlement doSaveLeaveEntitlement(@RequestBody LeaveEntitlement leaveEntitlement) {
		LeaveEntitlement newLeaveEntitlement = this.leaveEntitlementService.save(leaveEntitlement);
		return newLeaveEntitlement;
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}", method=RequestMethod.DELETE)
	public String doDeleteLeaveEntitlementById(@PathVariable("emplid") String emplid,  
											   @RequestParam("year") int year,
											   @RequestParam("leavecode") String leaveCode) {
		
		boolean result = this.leaveEntitlementService.deleteById(emplid, year, leaveCode);
		if(!result)
			return "Unable to Delete Leave Entitlement";
		
		return "Successfully Deleted Leave Entitlement";
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}", method=RequestMethod.PATCH)
	public LeaveEntitlement doUpdateLeaveEntitlementById(@PathVariable("emplid") String emplid,  
												    	 @RequestParam("year") int year,
													     @RequestParam("leavecode") String leaveCode,
													     @RequestBody LeaveEntitlement leaveEntitlement) {
		
		LeaveEntitlement newLeaveEntitlement = this.leaveEntitlementService.save(leaveEntitlement);
		return newLeaveEntitlement;
	}	
}
