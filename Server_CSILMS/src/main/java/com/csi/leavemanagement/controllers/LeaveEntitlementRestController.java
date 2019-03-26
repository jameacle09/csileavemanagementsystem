package com.csi.leavemanagement.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.LeaveEntitlement;
import com.csi.leavemanagement.security.CurrentUser;
import com.csi.leavemanagement.security.UserPrincipal;
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
	@PreAuthorize("hasAuthority('HR')")
	public List<LeaveEntitlement> doListLeaveEntitlement() {
		List<LeaveEntitlement> leaveEntitlements = this.leaveEntitlementService.findAll();
		return leaveEntitlements;
	}
	
	@RequestMapping(value="/leaveentitlement/me", method=RequestMethod.GET)
    @PreAuthorize("hasAuthority('EMPLOYEE')")
	public List<LeaveEntitlement> doGetMyLeaveEntitlement(@CurrentUser UserPrincipal currentUser,  
														@RequestParam(value="year", required=false) Integer year,
														@RequestParam(value="leavecode", required=false) String leaveCode) {

		String emplid = currentUser.getId();
		
		List<LeaveEntitlement> leaveEntitlement = null;
		if(year != null && leaveCode != null) {
			
			LeaveEntitlement leaveEntitlementResult = this.leaveEntitlementService.findById(emplid, year, leaveCode);
			if (leaveEntitlementResult != null) {
				
				leaveEntitlement = new ArrayList<LeaveEntitlement>();
				leaveEntitlement.add(leaveEntitlementResult);
			}		
		} else if(year != null && leaveCode == null) 
			leaveEntitlement = this.leaveEntitlementService.findByEmplidYear(emplid, year);
		
		else if(year == null && leaveCode != null) 
			leaveEntitlement = this.leaveEntitlementService.findByEmplidLeaveCode(emplid, leaveCode);
			
		else 
			leaveEntitlement = this.leaveEntitlementService.findByEmplid(emplid);
		
		return leaveEntitlement;
	}


	@RequestMapping(value="/leaveentitlement/me/{year}", method=RequestMethod.GET)
    @PreAuthorize("hasAuthority('EMPLOYEE')")
	public List<LeaveEntitlement> doGetMyLeaveEntitlementByIdYear(@CurrentUser UserPrincipal currentUser,  
													  @PathVariable("year") int year) {
		
		String emplid = currentUser.getId();
		List<LeaveEntitlement> leaveEntitlements = this.leaveEntitlementService.findByEmplidYear(emplid, year);
		return leaveEntitlements;
	}
	

	@RequestMapping(value="/leaveentitlement/me/{year}/{leavecode}", method=RequestMethod.GET)
    @PreAuthorize("hasAuthority('EMPLOYEE')")
	public LeaveEntitlement doGetMyLeaveEntitlementById(@CurrentUser UserPrincipal currentUser,  
													  @PathVariable("year") int year,
													  @PathVariable("leavecode") String leaveCode) {
		
		String emplid = currentUser.getId();
		LeaveEntitlement leaveEntitlement = this.leaveEntitlementService.findById(emplid, year, leaveCode);
		return leaveEntitlement;
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}", method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('HR') or hasAuthority('Manager')")
	public List<LeaveEntitlement> doGetLeaveEntitlement(@PathVariable("emplid") String emplid,  
														@RequestParam(value="year", required=false) Integer year,
														@RequestParam(value="leavecode", required=false) String leaveCode) {

		List<LeaveEntitlement> leaveEntitlement = null;
		if(year != null && leaveCode != null) {
			
			LeaveEntitlement leaveEntitlementResult = this.leaveEntitlementService.findById(emplid, year, leaveCode);
			if (leaveEntitlementResult != null) {
				
				leaveEntitlement = new ArrayList<LeaveEntitlement>();
				leaveEntitlement.add(leaveEntitlementResult);
			}		
		} else if(year != null && leaveCode == null) 
			leaveEntitlement = this.leaveEntitlementService.findByEmplidYear(emplid, year);
		
		else if(year == null && leaveCode != null) 
			leaveEntitlement = this.leaveEntitlementService.findByEmplidLeaveCode(emplid, leaveCode);
			
		else 
			leaveEntitlement = this.leaveEntitlementService.findByEmplid(emplid);
		
		return leaveEntitlement;
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}/{year}/{leavecode}", method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('HR') or hasAuthority('Manager')")
	public LeaveEntitlement doGetLeaveEntitlementById(@PathVariable("emplid") String emplid,  
													  @PathVariable("year") int year,
													  @PathVariable("leavecode") String leaveCode) {
		
		LeaveEntitlement leaveEntitlement = this.leaveEntitlementService.findById(emplid, year, leaveCode);
		return leaveEntitlement;
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}/{year}", method=RequestMethod.GET)
	@PreAuthorize("hasAuthority('HR') or hasAuthority('Manager')")
	public List<LeaveEntitlement> doGetLeaveEntitlementByEmplidAndYear(@PathVariable("emplid") String emplid,  
																       @PathVariable("year") int year) {
		
		List<LeaveEntitlement> leaveEntitlements = this.leaveEntitlementService.findByEmplidYear(emplid, year);
		return leaveEntitlements;
	}
	
	@RequestMapping(value="/leaveentitlement", method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('HR')")
	public LeaveEntitlement doSaveLeaveEntitlement(@RequestBody LeaveEntitlement leaveEntitlement) {
		
		LeaveEntitlement leaveEntitlementCheck = this.leaveEntitlementService.findById(leaveEntitlement.getId().getEmplid(), 
																						leaveEntitlement.getId().getYear(), 
																						leaveEntitlement.getId().getLeaveCode());
		// If there's existing Leave Entitlement
		if(leaveEntitlementCheck != null)
			return null;
		
		LeaveEntitlement newLeaveEntitlement = this.leaveEntitlementService.save(leaveEntitlement);
		return newLeaveEntitlement;
	}

	@RequestMapping(value="/leaveentitlement/bulk", method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('HR')")
	public int doSaveLeaveEntitlementArray(@RequestBody LeaveEntitlement[] leaveEntitlementArray) {
		
		int successCount = 0;
		for(LeaveEntitlement leaveEntitlement : leaveEntitlementArray) {
			
			if( this.leaveEntitlementService.save(leaveEntitlement) != null)
				successCount ++;			
		}
		return successCount;
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}", method=RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('HR')")
	public String doDeleteLeaveEntitlementById(@PathVariable("emplid") String emplid,  
											   @RequestParam("year") int year,
											   @RequestParam("leavecode") String leaveCode) {
		
		boolean result = this.leaveEntitlementService.deleteById(emplid, year, leaveCode);
		if(!result)
			return "Unable to Delete Leave Entitlement";
		
		return "Successfully Deleted Leave Entitlement";
	}
	
	@RequestMapping(value="/leaveentitlement/{emplid}/{year}/{leavecode}", method=RequestMethod.PATCH)
	@PreAuthorize("hasAuthority('HR')")
	public LeaveEntitlement doUpdateLeaveEntitlementById(@PathVariable("emplid") String emplid,  
														 @PathVariable("year") int year,
														 @PathVariable("leavecode") String leaveCode,
													     @RequestBody LeaveEntitlement leaveEntitlement) {
		
		LeaveEntitlement newLeaveEntitlement = this.leaveEntitlementService.save(leaveEntitlement);
		return newLeaveEntitlement;
	}	
}
