package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.repositories.EmployeeDetailsRepository;

@Service
public class EmployeeDetailsService {

	private EmployeeDetailsRepository employeeDetailRepository;

	@Autowired
	public EmployeeDetailsService(EmployeeDetailsRepository employeeDetailRepository) {
		this.employeeDetailRepository = employeeDetailRepository;
	}

	public List<EmployeeDetails> findAll() {
		List<EmployeeDetails> employeeDetailsList = this.employeeDetailRepository.findAll();
		return employeeDetailsList;
	}
	
	public EmployeeDetails findById(String emplId) {
		return this.employeeDetailRepository.findById(emplId).orElse(null);
	}	
}
