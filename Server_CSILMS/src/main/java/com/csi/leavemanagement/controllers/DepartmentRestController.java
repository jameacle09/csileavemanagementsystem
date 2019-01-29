package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.Department;
import com.csi.leavemanagement.services.DepartmentService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class DepartmentRestController {

	private DepartmentService departmentService;

	@Autowired
	public DepartmentRestController(DepartmentService departmentService) {
		this.departmentService = departmentService;
	}
	
	@RequestMapping(value="/departments", method=RequestMethod.GET)
	public List<Department> doListDepartments() {
		List<Department> departmentList = this.departmentService.findAll();
		return departmentList;
	}
	
	@RequestMapping(value="/department/{id}", method=RequestMethod.GET)
	public Department doGetDepartmentById(@PathVariable("id") String id) {
		Department department = this.departmentService.findById(id);
		return department;
	}
}
