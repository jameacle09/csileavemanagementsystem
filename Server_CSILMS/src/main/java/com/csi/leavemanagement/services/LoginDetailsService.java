package com.csi.leavemanagement.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.models.LoginDetails;
import com.csi.leavemanagement.repositories.LoginDetailsRepository;
import com.csi.leavemanagement.security.UserPrincipal;

@Service
public class LoginDetailsService {

	@Autowired
	private LoginDetailsRepository loginDetailsRepository;
	
	@Autowired
	EmployeeDetailsService employeeDetailsService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final Logger logger = LoggerFactory.getLogger(LoginDetailsService.class);

	public ResponseEntity<?> changePassword(String password, String newPassword, UserPrincipal currentUser)
			throws Exception {
		Optional<LoginDetails> loginDetails = loginDetailsRepository
				.findByUserIdAndLockAccount(currentUser.getUsername(), 0);
		LoginDetails loginDetail = loginDetails
				.orElseThrow(() -> new Exception("User not found with Username " + currentUser.getUsername()));
		Map<String, String> mapResponse = new HashMap<String, String>();

		if (passwordEncoder.matches(password, loginDetail.getPassword())) {
			loginDetail.setPassword(passwordEncoder.encode(newPassword));
			loginDetailsRepository.save(loginDetail);
			logger.info("User {} has successfully change new password", currentUser.getId());
			mapResponse.put("message", "SUCCESS");
			return ResponseEntity.ok(mapResponse);
		} else {
			logger.info("User {} has failed to change new password due to invalid current password",
					currentUser.getId());
			mapResponse.put("message", "FAILED");
			return ResponseEntity.ok(mapResponse);
		}
	}
	
	public ResponseEntity<?> resetPassword(String emplId, UserPrincipal currentUser){
		Map<String, String> mapResponse = new HashMap<String, String>();
		EmployeeDetails employee = employeeDetailsService.findById(emplId);
		LoginDetails empLogin = loginDetailsRepository.findByEmplId(emplId).get();
		
		empLogin.setPassword(passwordEncoder.encode(employee.getNricPassport()));
		loginDetailsRepository.save(empLogin);
		
		logger.info("User {} has successfully reset password for User {}", currentUser.getId(),  empLogin.getEmplId());
		mapResponse.put("message", "The password is successfully reset");
		return ResponseEntity.ok(mapResponse);
	}

}
