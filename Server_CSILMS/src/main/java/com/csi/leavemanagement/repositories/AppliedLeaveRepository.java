package com.csi.leavemanagement.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.AppliedLeave;
import com.csi.leavemanagement.models.AppliedLeaveId;

@Repository
public interface AppliedLeaveRepository extends CrudRepository<AppliedLeave, AppliedLeaveId> {

	// Retrieve all applied leave of an Employee
	List<AppliedLeave> findByIdEmplid(String emplid);
	
	// Retrieve all applied leave for a specific period (all employees)
	List<AppliedLeave> findByIdStartDateBetween(Date startDate, Date endDate);
	
	// Retrieve applied leave of an Employee for a specific period (all leave types)
	List<AppliedLeave> findByIdEmplidAndIdStartDateBetween(String emplid, Date startDate, Date endDate);
	
	// Count number of applied leave of a specific leave type, for an employee, for the specified period
	long countByIdEmplidAndIdLeaveCodeAndIdStartDateBetween(String emplid, String leaveCode, Date startDate, Date endDate);
	
	// Retrieve applied leave of a specific leave type, for an employee, for a specific period
	List<AppliedLeave> findByIdEmplidAndIdLeaveCodeAndIdStartDateBetween(String emplid, String leaveCode, Date startDate, Date endDate);
	
	// Count number of applied leave of a specific leave code, for an employee
	long countByIdEmplidAndIdLeaveCode(String emplid, String leaveCode);
	
	// Retrieve applied leave of a specific leave code, for an employee
	List<AppliedLeave> findByIdEmplidAndIdLeaveCode(String emplid, String leaveCode);

	// Count number of applied leave of a specific leave status, for an employee
	//long countByIdEmplidAndLeaveStatus(String emplid, String leaveStatus);
	
	// Retrieve applied leave of a specific leave status, for an employee
	List<AppliedLeave> findByIdEmplidAndLeaveStatus(String emplid, String leaveStatus);	

	// Retrieve applied leave of a specific leave status, for an employee, for a specific period
	List<AppliedLeave> findByIdEmplidAndLeaveStatusAndIdStartDateBetween(String emplid, 
																	 	 String leaveStatus, 
																	  	 Date startDate, 
																		 Date endDate);	

	// Count number of applied leave of a specific leave code and leave status, for an employee
	//long countByIdEmplidAndIdLeaveCodeAndLeaveStatus(String emplid, String leaveCode, String leaveStatus);
	
	// Retrieve applied leave of a specific leave code and leave status, for an employee
	List<AppliedLeave> findByIdEmplidAndIdLeaveCodeAndLeaveStatus(String emplid, String leaveCode, String leaveStatus);	

	// Retrieve applied leave of a specific leave type and leave status, for an employee, for a specific period
	List<AppliedLeave> findByIdEmplidAndIdLeaveCodeAndLeaveStatusAndIdStartDateBetween(String emplid, 
																					   String leaveCode, 
																					   String leaveStatus, 
																					   Date startDate, 
																					   Date endDate);

	// Count number of applied leave by Approver ID and Leave Status
	long countByApproverAndLeaveStatus(String approver, String leaveStatus);
	
	// Retrieve applied leave by Approver ID and Leave Status
	List<AppliedLeave> findByApproverAndLeaveStatus(String approver, String leaveStatus);

	// Count number of applied leave by Approver ID and Leave Status
	long countByApproverAndLeaveStatusIn(String approver, List<String> leaveStatus);
	
	// Retrieve applied leave by Approver ID and Leave Status
	List<AppliedLeave> findByApproverAndLeaveStatusIn(String approver, List<String> leaveStatus);
	
	/*
	 * METHODS for retrieving by List of Employee ID
	 */
	
	// Count number of applied leave of a specific leave type, for a List of Employee 
	long countByIdEmplidInAndIdLeaveCode(List<String> emplid, String leaveCode);
	
	// Retrieve applied leave of a specific leave type, for a List of Employee 
	List<AppliedLeave> findByIdEmplidInAndIdLeaveCode(List<String> emplid, String leaveCode);
	
	// Count number of applied leave of a specific leave status, for a List of Employee 
	long countByIdEmplidInAndLeaveStatus(List<String> emplid, String leaveStatus);
	
	// Retrieve applied leave of a specific leave status, for a List of Employee 
	List<AppliedLeave> findByIdEmplidInAndLeaveStatus(List<String> emplid, String leaveStatus);
	
	// Retrieve applied leave for a List of Employee (e.g. manager retrieve list of leave from reporting line)
	List<AppliedLeave> findByIdEmplidInAndIdStartDateBetween(List<String> emplid, Date startDate, Date endDate);
	
	// Count number of applied leave for a List of Employee, with a given status (e.g. count number of pending approval leave)
	long countByIdEmplidInAndLeaveStatusAndIdStartDateBetween(List<String> emplid, String leaveStatus, Date startDate, Date endDate);
	
	// Retrieve applied leave for a List of Employee, with a given status (e.g. retrieve list of pending approval leave)
	List<AppliedLeave> findByIdEmplidInAndLeaveStatusAndIdStartDateBetween(List<String> emplid, String leaveStatus, Date startDate, Date endDate);
}
