package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.PersonDetails ;
import com.csi.leavemanagement.security.CurrentUser;
import com.csi.leavemanagement.security.UserPrincipal;
import com.csi.leavemanagement.services.PersonDetailService;



@RestController
@RequestMapping("/api")
@CrossOrigin
public class PersonDetailRestController {
	
	
	private PersonDetailService personDetailService;
	
	@Autowired	
	public PersonDetailRestController(PersonDetailService personDetailService) {
		this.personDetailService = personDetailService;
	}

	@RequestMapping(value="/persondetails", method=RequestMethod.GET)
    @PreAuthorize("hasAuthority('HR')")
	public List<PersonDetails> doListPersonDetailss() {
		List<PersonDetails> personDetails = this.personDetailService.findAll();
		return personDetails;
	}
	
	@RequestMapping(value="/persondetail/{id}", method=RequestMethod.GET)
    @PreAuthorize("hasAuthority('HR') or hasAuthority('Manager')")
	public PersonDetails doGetPersonDetailsById(@PathVariable("id") String emplid) {
		PersonDetails personDetail = this.personDetailService.findById(emplid);
		return personDetail;
	}
	
	
	@RequestMapping(value="/persondetail", method=RequestMethod.POST)
	@PreAuthorize("hasAuthority('HR')")
	public PersonDetails doSavePersonDetails(@RequestBody PersonDetails personDetail) {
		PersonDetails newPersonDetails = this.personDetailService.save(personDetail);
		return newPersonDetails;
	}
	
	@RequestMapping(value="/persondetail/{id}", method=RequestMethod.DELETE)
	@PreAuthorize("hasAuthority('HR')")
	public String doDeletePersonDetails(@PathVariable("id") String emplid) {
		this.personDetailService.deleteByID(emplid);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/persondetail/{id}", method=RequestMethod.PATCH)
	@PreAuthorize("hasAuthority('HR')")
	public PersonDetails doUpdatePersonDetails(@PathVariable("id") String emplid, @RequestBody PersonDetails personDetail) {
		personDetail.setEmplId(emplid);
		PersonDetails newPersonDetails = this.personDetailService.save(personDetail);
		return newPersonDetails;
	}
	
	@GetMapping("/persondetail/me")
    @PreAuthorize("hasAuthority('EMPLOYEE')")
    public PersonDetails getMyDetails(@CurrentUser UserPrincipal currentUser) {
		PersonDetails personDetail = this.personDetailService.findById(currentUser.getId());
		return personDetail;
    }
}
