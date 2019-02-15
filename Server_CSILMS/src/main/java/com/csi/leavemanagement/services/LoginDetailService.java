package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.LoginDetails;
import com.csi.leavemanagement.repositories.LoginDetailsRepository;

@Service
public class LoginDetailService {

	private LoginDetailsRepository loginDetailRepository;
	
	@Autowired
	public LoginDetailService(LoginDetailsRepository loginDetailRepository) {
		this.loginDetailRepository = loginDetailRepository;
	}
	
	public List<LoginDetails> findAll() {
		List<LoginDetails> loginDetails = (List<LoginDetails>)this.loginDetailRepository.findAll();
		return loginDetails;
	}
	
	public LoginDetails save(LoginDetails loginDetail) {
		return this.loginDetailRepository.save(loginDetail);
	}
	
	public LoginDetails findByEmplId(String emplId) {
		LoginDetails loginDetail = this.loginDetailRepository.findByEmplId(emplId).orElse(null);
		return loginDetail;		
	}
	
	public void deleteByEmplId(String emplId) {
		this.loginDetailRepository.deleteByEmplId(emplId);		
	}
}
