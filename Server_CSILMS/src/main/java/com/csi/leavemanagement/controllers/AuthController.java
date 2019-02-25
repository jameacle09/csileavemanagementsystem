package com.csi.leavemanagement.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.LoginDetails;
import com.csi.leavemanagement.models.LoginRequest;
import com.csi.leavemanagement.repositories.LoginDetailsRepository;
import com.csi.leavemanagement.security.CurrentUser;
import com.csi.leavemanagement.security.JwtAuthenticationResponse;
import com.csi.leavemanagement.security.JwtTokenProvider;
import com.csi.leavemanagement.security.UserPrincipal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	LoginDetailsRepository loginDetailsRepository;

	@Autowired
	JwtTokenProvider tokenProvider;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		LoginDetails loginDetails = loginDetailsRepository.findByUserIdAndLockAccount(loginRequest.getEmail(), 0)
				.orElse(null);
		
		if(loginDetails == null) {
			Map<String, String> mapResponse = new HashMap<String, String>();
			mapResponse.put("message", "LOCKED");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mapResponse);
		}

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	@GetMapping("/user/me")
	@PreAuthorize("hasAuthority('EMPLOYEE')")
	public LoginDetails getCurrentUser(@CurrentUser UserPrincipal currentUser) {
		Optional<LoginDetails> loginDetails = loginDetailsRepository.findByEmplId(currentUser.getId());

		return loginDetails.get();
	}

}
