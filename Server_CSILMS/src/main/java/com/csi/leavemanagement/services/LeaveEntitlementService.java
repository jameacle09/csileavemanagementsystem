package com.csi.leavemanagement.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.models.LeaveEntitlement;
import com.csi.leavemanagement.models.LeaveEntitlementId;
import com.csi.leavemanagement.repositories.LeaveEntitlementRepository;

@Service
public class LeaveEntitlementService {

	private LeaveEntitlementRepository leaveEntitlementRepository;
	private EmployeeDetailsService employeeDetailsService;

	@Autowired
	public LeaveEntitlementService(LeaveEntitlementRepository leaveEntitlementRepository,
									EmployeeDetailsService employeeDetailsService) {
		this.leaveEntitlementRepository = leaveEntitlementRepository;
		this.employeeDetailsService = employeeDetailsService;
	}
	
	public List<LeaveEntitlement> findAll() {
		List<LeaveEntitlement> leaveEntitlementList = (List<LeaveEntitlement>)this.leaveEntitlementRepository.findAll();
		return leaveEntitlementList;
	}
	
	public LeaveEntitlement save(LeaveEntitlement newLeaveEntitlement) {
		return this.leaveEntitlementRepository.save(newLeaveEntitlement);
	}
	
	public LeaveEntitlement findById(String emplid, int year, String leaveCode) {		
		LeaveEntitlementId id = new LeaveEntitlementId(emplid, year, leaveCode);
		return leaveEntitlementRepository.findById(id).orElse(null);
	}
	
	public boolean deleteById(String emplid, int year, String leaveCode) {		
		LeaveEntitlementId id = new LeaveEntitlementId(emplid, year, leaveCode);
		leaveEntitlementRepository.deleteById(id);
		
		// Check if the ID is deleted, return true if ID NOT found.
		return !(leaveEntitlementRepository.existsById(id));
	}
	
	public List<LeaveEntitlement> findByManager(String manager) {
		ArrayList<String> emplIdList = new ArrayList<String>();
		
		// Retrieve the list of employee reporting under Manager ID
		List<EmployeeDetails> empList= this.employeeDetailsService.findByMgrId(manager);
		for(EmployeeDetails emp : empList){
			emplIdList.add(emp.getEmplId());
		}

		return leaveEntitlementRepository.findByIdEmplidIn(emplIdList);
	} 

	public List<LeaveEntitlement> findByEmplidYear(String emplid, int year) {		
		return leaveEntitlementRepository.findByIdEmplidAndIdYear(emplid, year);
	}

	public List<LeaveEntitlement> findByEmplidLeaveCode(String emplid, String leaveCode) {		
		return leaveEntitlementRepository.findByIdEmplidAndIdLeaveCode(emplid, leaveCode);
	}

	public List<LeaveEntitlement> findByEmplid(String emplid) {		
		return leaveEntitlementRepository.findByIdEmplid(emplid);
	}
	
	public List<LeaveEntitlement> findByYear(int year) {	
		return leaveEntitlementRepository.findByIdYear(year);
	}
}
