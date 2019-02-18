package com.csi.leavemanagement.controllers;

import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.security.CurrentUser;
import com.csi.leavemanagement.security.UserPrincipal;
import com.csi.leavemanagement.services.LoginDetailsService;

@RestController
@RequestMapping("/api")
public class LoginDetailsController {

	@Autowired
	LoginDetailsService loginDetailsService;
	
	private static final Logger logger = LoggerFactory.getLogger(LoginDetailsController.class);

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
			return loginDetailsService.changePassword(password, newPassword, currentUser);
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
		return loginDetailsService.resetPassword(userEmplid, currentUser);
	}

}
