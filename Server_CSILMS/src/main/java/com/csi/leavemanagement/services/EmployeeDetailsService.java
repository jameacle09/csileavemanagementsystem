package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.models.PersonDetails;
import com.csi.leavemanagement.repositories.EmployeeDetailsRepository;
import com.csi.leavemanagement.repositories.PersonDetailsRepository;

@Service
public class EmployeeDetailsService {

	private EmployeeDetailsRepository employeeDetailRepository;
	private PersonDetailsRepository personDetailRepository;

	@Autowired
	public EmployeeDetailsService(EmployeeDetailsRepository employeeDetailRepository,
									PersonDetailsRepository personDetailRepository) {
		this.employeeDetailRepository = employeeDetailRepository;
		this.personDetailRepository = personDetailRepository;
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
}
