package com.csi.leavemanagement.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.AppliedLeave;
import com.csi.leavemanagement.models.AppliedLeaveId;
import com.csi.leavemanagement.repositories.AppliedLeaveRepository;

@Service
public class AppliedLeaveService {

	private AppliedLeaveRepository appliedLeaveRepository;

	@Autowired
	public AppliedLeaveService(AppliedLeaveRepository appliedLeaveRepository) {
		this.appliedLeaveRepository = appliedLeaveRepository;
	}
	
	public List<AppliedLeave> findAll() {
		List<AppliedLeave> appliedLeaveList = (List<AppliedLeave>)this.appliedLeaveRepository.findAll();
		return appliedLeaveList;
	}
	
	public AppliedLeave save(AppliedLeave newAppliedLeave) {
		return this.appliedLeaveRepository.save(newAppliedLeave);
	}
	
	public AppliedLeave findById(AppliedLeaveId id) {		
		return this.appliedLeaveRepository.findById(id).orElse(null);
	}

	public boolean deleteById(String emplid, Date effDate, Date startDate, String leaveCode) {		
		AppliedLeaveId id = new AppliedLeaveId(emplid, effDate, startDate, leaveCode);
		this.appliedLeaveRepository.deleteById(id);
		
		// Check if the ID is deleted, return true if ID NOT found.
		return !(this.appliedLeaveRepository.existsById(id));
	}
	
	public List<AppliedLeave> findByEmplid(String emplid) {		
		return appliedLeaveRepository.findByIdEmplid(emplid);
	}
	
	public List<AppliedLeave> findLeaveBetweenDates(Date startDate, Date endDate) {
		return appliedLeaveRepository.findByIdStartDateBetween(startDate, endDate);		
	}
	
	public List<AppliedLeave> findByEmplidBetweenDates(String emplid, Date startDate, Date endDate) {
		return appliedLeaveRepository.findByIdEmplidAndIdStartDateBetween(emplid, startDate, endDate);		
	}
	
	public long countByEmplidAndLeaveCode(String emplid, String leaveCode) {
		return appliedLeaveRepository.countByIdEmplidAndIdLeaveCode(emplid, leaveCode);
	}
	
	public List<AppliedLeave> findByEmplidAndLeaveCode(String emplid, String leaveCode) {
		return appliedLeaveRepository.findByIdEmplidAndIdLeaveCode(emplid, leaveCode);		
	}

	public List<AppliedLeave> findByEmplidAndLeaveCodeBetweenDates(String emplid, String leaveCode, Date startDate, Date endDate) {
		return appliedLeaveRepository.findByIdEmplidAndIdLeaveCodeAndIdStartDateBetween(emplid, leaveCode, startDate, endDate);		
	}
	
	public List<AppliedLeave> findByEmplidAndLeaveStatus(String emplid, String leaveStatus) {
		return appliedLeaveRepository.findByIdEmplidAndLeaveStatus(emplid, leaveStatus);		
	}

	public List<AppliedLeave> findByEmplidAndLeaveStatusBetweenDates(String emplid, String leaveStatus, Date startDate, Date endDate) {
		return appliedLeaveRepository.findByIdEmplidAndLeaveStatusAndIdStartDateBetween(emplid, leaveStatus, startDate, endDate);		
	}
	
	public List<AppliedLeave> findByEmplidAndLeaveCodeAndLeaveStatus(String emplid, String leaveCode, String leaveStatus) {
		return appliedLeaveRepository.findByIdEmplidAndIdLeaveCodeAndLeaveStatus(emplid, leaveCode, leaveStatus);		
	}

	public List<AppliedLeave> findByEmplidAndLeaveCodeAndLeaveStatusAndBetweenDate(String emplid, 
																	 String leaveCode, 
																	 String leaveStatus, 
																	 Date startDate, 
																	 Date endDate) {
		return appliedLeaveRepository.
				findByIdEmplidAndIdLeaveCodeAndLeaveStatusAndIdStartDateBetween
				(emplid, leaveCode, leaveStatus, startDate, endDate);		
	}
		
	/*
	 * METHODS for retrieving manager's reportee
	 */
	
	// Count number of applied leave for all employee under a manager, with a given leave code
	public long countByManagerReporteeAndLeaveCode(String mgrlid, String leaveCode) {

		ArrayList<String> emplList = (ArrayList<String>) findAllReportee(mgrlid);
		
		if(emplList.size() == 0)
			return 0;
		
		return appliedLeaveRepository.countByIdEmplidInAndIdLeaveCode(emplList, leaveCode);
	}
	
	// Retrieve number of applied leave for all employee under a manager, with a given leave code
	public List<AppliedLeave> findByManagerReporteeAndLeaveCode(String mgrlid, String leaveCode) {

		ArrayList<String> emplList = (ArrayList<String>) findAllReportee(mgrlid);
		
		if(emplList.size() == 0)
			return null;
		
		return appliedLeaveRepository.findByIdEmplidInAndIdLeaveCode(emplList, leaveCode);
	}
	
	// Count number of applied leave for all employee under a manager, with a given status
	public long countByManagerReporteeAndStatus(String mgrlid, String leaveStatus) {
		
		ArrayList<String> emplList = (ArrayList<String>) findAllReportee(mgrlid);
		
		if(emplList.size() == 0)
			return 0;
		
		return appliedLeaveRepository.countByIdEmplidInAndLeaveStatus(emplList, leaveStatus);
	}

	// Retrieve applied leave for all employee under a manager, with a given status
	public List<AppliedLeave> findByManagerReporteeAndStatus(String mgrlid, String leaveStatus) {
		
		ArrayList<String> emplList = (ArrayList<String>) findAllReportee(mgrlid);
		
		if(emplList.size() == 0)
			return null;
		
		return appliedLeaveRepository.findByIdEmplidInAndLeaveStatus(emplList, leaveStatus);
	}
		
	// Retrieve applied leave for all employee under a manager, for a given period of time
	public List<AppliedLeave> findByManagerReporteeBetweenDates(String mgrlid, Date startDate, Date endDate) {
		
		ArrayList<String> emplList = (ArrayList<String>) findAllReportee(mgrlid);
		
		if(emplList.size() == 0)
			return null;
		
		return appliedLeaveRepository.findByIdEmplidInAndIdStartDateBetween(emplList, startDate, endDate);
	}

	private List<String> findAllReportee(String mgrlid) {
		ArrayList<String> emplList = new ArrayList<String>();
		
		// Retrieve the list of employee reporting under Manager ID
		
		return emplList;
	}
}
