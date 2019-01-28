package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.PersonDetailService;
import com.csi.leavemanagement.models.PersonDetails ;



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
	public List<PersonDetails> doListPersonDetailss() {
		List<PersonDetails> personDetails = this.personDetailService.findAll();
		return personDetails;
	}
	
	@RequestMapping(value="/persondetail/{emplid}", method=RequestMethod.GET)
	public PersonDetails doGetPersonDetailsById(@PathVariable("id") String emplid) {
		PersonDetails personDetail = this.personDetailService.findById(emplid);
		return personDetail;
	}
	
	
	@RequestMapping(value="/persondetail", method=RequestMethod.POST)
	public PersonDetails doSavePersonDetails(@RequestBody PersonDetails personDetail) {
		PersonDetails newPersonDetails = this.personDetailService.save(personDetail);
		return newPersonDetails;
	}
	
	@RequestMapping(value="/persondetail/{emplid}", method=RequestMethod.DELETE)
	public String doDeletePersonDetails(@PathVariable("id") String emplid) {
		this.personDetailService.deleteByID(emplid);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/persondetail/{emplid}", method=RequestMethod.PATCH)
	public PersonDetails doUpdatePersonDetails(@PathVariable("id") String emplid, @RequestBody PersonDetails personDetail) {
		personDetail.setEmplId(emplid);
		PersonDetails newPersonDetails = this.personDetailService.save(personDetail);
		return newPersonDetails;
	}
}
