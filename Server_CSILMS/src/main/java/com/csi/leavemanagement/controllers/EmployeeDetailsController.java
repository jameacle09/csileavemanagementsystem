package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.EmployeeDetails;
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
}
