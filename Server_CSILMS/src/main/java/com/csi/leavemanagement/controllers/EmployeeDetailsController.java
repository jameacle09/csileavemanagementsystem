package com.csi.leavemanagement.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.EmployeeDetails;
import com.csi.leavemanagement.security.CurrentUser;
import com.csi.leavemanagement.security.UserPrincipal;
import com.csi.leavemanagement.services.EmployeeDetailsService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class EmployeeDetailsController {
	
	private EmployeeDetailsService employeeDetailsService;

	@Autowired
	public EmployeeDetailsController(EmployeeDetailsService employeeDetailsService) {
		this.employeeDetailsService = employeeDetailsService;
	}
	
	@RequestMapping(value="/employeedetails", method=RequestMethod.GET)
	public List<EmployeeDetails> doListEmployeeDetails() {
		return this.employeeDetailsService.findAll();
	}
	
	@RequestMapping(value="/employeedetails/{emplid}", method=RequestMethod.GET)
	public EmployeeDetails doGetEmployeeDetailsById(@PathVariable("emplid") String emplId) {
		return this.employeeDetailsService.findById(emplId);
	}
	
	@RequestMapping(value="/verifyEmailExists/{email}", method=RequestMethod.GET)
	public EmployeeDetails checkEmailExists(@PathVariable("email") String email) {
		return this.employeeDetailsService.findByBusinessEmail(email);
	}
	
	@RequestMapping(value="/leaveapprovers", method=RequestMethod.GET)
	public List<EmployeeDetails> doGetAllManager() {
		return this.employeeDetailsService.findAllManagers();
	}

	@GetMapping("/employee/withoutlogin")
    @PreAuthorize("hasAuthority('HR')")
	public List<EmployeeDetails> doGetEmployeeWithoutLogin() {
		return this.employeeDetailsService.findEmplidWithoutLogin();
	}
	
	@GetMapping("/searchemployee")
	public ResponseEntity<?> doFindEmployee(@RequestParam(value="businessunit", required=false) String businessUnit,
											 @RequestParam(value="deptid", required=false) String deptId,
										 	 @RequestParam(value="marriagestatus", required=false) String marriageStatus,
											 @RequestParam(value="gender", required=false) String gender) {
		Map<String, String> responseEntityMessage = new HashMap<String, String> ();
		List<EmployeeDetails> matchingEmployees;
		if(businessUnit != null)
			matchingEmployees = this.employeeDetailsService.findByBusinessUnit(businessUnit);
		else if(deptId != null)
			matchingEmployees = this.employeeDetailsService.findByDeptId(deptId);
		else if(marriageStatus != null)
			matchingEmployees = this.employeeDetailsService.findByMarriageStatus(marriageStatus);
		else if(gender != null)
			matchingEmployees = this.employeeDetailsService.findByGender(gender);
		else {
			responseEntityMessage.put("message", "Search parameter is empty or invalid");
			return new ResponseEntity<Map<String, String>>(responseEntityMessage, HttpStatus.BAD_REQUEST);
		}
		
		if(matchingEmployees == null || matchingEmployees.size() == 0) {
			responseEntityMessage.put("matchingEmployees", "");
			responseEntityMessage.put("message","No matching employee");
			return new ResponseEntity<Map<String, String>>(responseEntityMessage, HttpStatus.OK);
		}
		
		String matchingEmployeesMsg = "";
		for(EmployeeDetails employee : matchingEmployees) {
			matchingEmployeesMsg += employee.getName() + " (" + employee.getEmplId() + ");";
		}
		
		responseEntityMessage.put("matchingEmployees", matchingEmployeesMsg);
		responseEntityMessage.put("message","Success");
		return new ResponseEntity<Map<String, String>>(responseEntityMessage, HttpStatus.OK);
	}
	
	@RequestMapping(value="/employeedetails/{mgrId}/reportee", method=RequestMethod.GET)
	public List<EmployeeDetails> doGetEmployeeDetailsByMgrId(@PathVariable("mgrId") String mgrId) {
		return this.employeeDetailsService.findByMgrId(mgrId);
	}
	
	@GetMapping("/employeedetail/me")
    @PreAuthorize("hasAuthority('EMPLOYEE')")
    public EmployeeDetails getMyDetails(@CurrentUser UserPrincipal currentUser) {
		EmployeeDetails employeeDetail = this.employeeDetailsService.findById(currentUser.getId());
		return employeeDetail;
    }
	
	@PostMapping("/addEditEmployeeDetails")
    @PreAuthorize("hasAuthority('HR')")
    public EmployeeDetails addEditEmployeeDetails(@RequestBody EmployeeDetails employeeDetails,@CurrentUser UserPrincipal currentUser) {
		return employeeDetailsService.addEditEmployeeDetails(employeeDetails, currentUser);
    }
}
