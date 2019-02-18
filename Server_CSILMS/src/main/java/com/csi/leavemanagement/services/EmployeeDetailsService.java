package com.csi.leavemanagement.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.models.LoginDetails;
import com.csi.leavemanagement.models.PersonDetails;
import com.csi.leavemanagement.repositories.EmployeeDetailsRepository;
import com.csi.leavemanagement.repositories.LoginDetailsRepository;
import com.csi.leavemanagement.repositories.PersonDetailsRepository;

@Service
public class EmployeeDetailsService {

	private EmployeeDetailsRepository employeeDetailRepository;
	private PersonDetailsRepository personDetailRepository;
	private LoginDetailsRepository loginDetailRepository;

	@Autowired
	public EmployeeDetailsService(EmployeeDetailsRepository employeeDetailRepository,
									PersonDetailsRepository personDetailRepository,
									LoginDetailsRepository loginDetailRepository) {
		this.employeeDetailRepository = employeeDetailRepository;
		this.personDetailRepository = personDetailRepository;
		this.loginDetailRepository = loginDetailRepository;
	}

	public List<EmployeeDetails> findAll() {
		List<EmployeeDetails> employeeDetailsList = this.employeeDetailRepository.findAll();
		return employeeDetailsList;
	}
	
	public EmployeeDetails findById(String emplId) {
		return this.employeeDetailRepository.findById(emplId).orElse(null);
	}	

	public List<EmployeeDetails> findByMgrId(String mgrId) {
		
		PersonDetails manager = this.personDetailRepository.findById(mgrId).orElse(null);
		if(manager != null) {
			List<EmployeeDetails> employeeDetailsList = this.employeeDetailRepository.findByReportsTo(manager);
			return employeeDetailsList;
		}
		
		return null;
	}
	
	public List<EmployeeDetails> findAllManagers() {
		List<EmployeeDetails> managerList = this.employeeDetailRepository.findAllManagers();
		return managerList;
	}
	
	public List<EmployeeDetails> findEmplidWithoutLogin() {
		List<LoginDetails> loginList = this.loginDetailRepository.findAll();
		List<String> emplidList = new ArrayList<String> ();
		
		for(LoginDetails loginDetail : loginList) 
			emplidList.add(loginDetail.getEmplId());
		
		List<EmployeeDetails> employeeList = this.employeeDetailRepository.findByEmplIdNotIn(emplidList);
		return employeeList;
	}
}
