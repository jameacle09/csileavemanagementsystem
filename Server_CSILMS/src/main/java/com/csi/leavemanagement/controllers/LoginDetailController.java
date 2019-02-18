package com.csi.leavemanagement.controllers;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.services.LoginDetailService;
import com.csi.leavemanagement.models.LoginDetails;
import com.csi.leavemanagement.security.CurrentUser;
import com.csi.leavemanagement.security.UserPrincipal;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class LoginDetailController {

	@Autowired
	private LoginDetailService loginDetailService;
	
	private static final Logger logger = LoggerFactory.getLogger(LoginDetailController.class);
	
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
	
	@PostMapping("/changePassword")
	public ResponseEntity<?> changePassword(@Valid @RequestBody Map<String, String> params,
			@CurrentUser UserPrincipal currentUser) throws Exception {
		
		if(!params.containsKey("password") || !params.containsKey("newPassword")) {
			logger.error("Bad parameters recieved by changePassword controller");
			return ResponseEntity.badRequest().build();
		}
		
		String password = params.get("password");
		String newPassword = params.get("newPassword");
		
		try {
			return loginDetailService.changePassword(password, newPassword, currentUser);
		} catch(Exception e) {
			logger.error(e.getMessage());
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PreAuthorize("hasAuthority('HR')")
	@PostMapping("/resetPassword")
	public ResponseEntity<?> resetPassword(@Valid @RequestBody Map<String, String> params,
			@CurrentUser UserPrincipal currentUser){
		if(!params.containsKey("emplid")) {
			logger.error("Bad parameters recieved by resetPassword controller");
			return ResponseEntity.badRequest().build();
		}
		
		String userEmplid = params.get("emplid");
		return loginDetailService.resetPassword(userEmplid, currentUser);
	}
}
