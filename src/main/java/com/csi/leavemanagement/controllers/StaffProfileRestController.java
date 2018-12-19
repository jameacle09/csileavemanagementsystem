package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.StaffProfileService;
import com.csi.leavemanagement.models.StaffProfile ;



@RestController
@RequestMapping("/api")
@CrossOrigin
public class StaffProfileRestController {

	@Autowired
	private StaffProfileService staffProfileService;
	
	@RequestMapping(value="/staffprofiles", method=RequestMethod.GET)
	public List<StaffProfile> doListStaffProfiles() {
		List<StaffProfile> staffProfiles = this.staffProfileService.findAll();
		return staffProfiles;
	}
	
	@RequestMapping(value="/staffprofile/{id}", method=RequestMethod.GET)
	public StaffProfile doGetStaffProfileById(@PathVariable("id") int id) {
		StaffProfile staffProfile = this.staffProfileService.findById(id);
		return staffProfile;
	}
	
	@RequestMapping(value="/staffprofile", method=RequestMethod.POST)
	public StaffProfile doSaveStaffProfile(@RequestBody StaffProfile staffProfile) {
		StaffProfile newStaffProfile = this.staffProfileService.save(staffProfile);
		return newStaffProfile;
	}
	
	@RequestMapping(value="/staffprofile/{id}", method=RequestMethod.DELETE)
	public String doDeleteStaffProfile(@PathVariable("id") int id) {
		this.staffProfileService.deleteByID(id);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/staffprofile/{id}", method=RequestMethod.PATCH)
	public StaffProfile doUpdateStaffProfile(@PathVariable("id") int id, @RequestBody StaffProfile staffProfile) {
		staffProfile.setId(id);
		StaffProfile newStaffProfile = this.staffProfileService.save(staffProfile);
		return newStaffProfile;
	}
}
