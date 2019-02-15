package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.LoginDetailService;
import com.csi.leavemanagement.models.LoginDetails;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginDetailController {

	private LoginDetailService loginDetailService;
	
	@Autowired
	public LoginDetailController(LoginDetailService loginDetailService) {
		this.loginDetailService = loginDetailService;
	}

	@RequestMapping(value="/logindetails", method=RequestMethod.GET)
	public List<LoginDetails> doListLoginDetails() {
		List<LoginDetails> loginDetails = this.loginDetailService.findAll();
		return loginDetails;
	}
	
	@RequestMapping(value="/logindetail/{emplId}", method=RequestMethod.GET)
	public LoginDetails doGetLoginDetailsById(@PathVariable("emplId") String emplId) {
		LoginDetails loginDetail = this.loginDetailService.findByEmplId(emplId);
		return loginDetail;
	}
	
	@RequestMapping(value="/logindetail", method=RequestMethod.POST)
	public LoginDetails doSaveLoginDetails(@RequestBody LoginDetails loginDetail) {
		LoginDetails newLoginDetails = this.loginDetailService.save(loginDetail);
		return newLoginDetails;
	}
	
	@RequestMapping(value="/logindetail/{emplId}", method=RequestMethod.DELETE)
	public String doDeleteLoginDetails(@PathVariable("emplId") String emplId) {
		this.loginDetailService.deleteByEmplId(emplId);
		return "Successfully Deleted";
	}
	
	@RequestMapping(value="/logindetail/{emplId}", method=RequestMethod.PATCH)
	public LoginDetails doUpdateLoginDetails(@PathVariable("emplId") String emplId, @RequestBody LoginDetails loginDetail) {
		loginDetail.setEmplId(emplId);
		LoginDetails newLoginDetails = this.loginDetailService.save(loginDetail);
		return newLoginDetails;
	}
}
