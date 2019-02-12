package com.csi.leavemanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.csi.leavemanagement.models.BusinessUnit;
import com.csi.leavemanagement.services.BusinessUnitService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BusinessUnitRestController {

	private BusinessUnitService businessUnitService;

	@Autowired
	public BusinessUnitRestController(BusinessUnitService businessUnitService) {
		this.businessUnitService = businessUnitService;
	}
	
	@RequestMapping(value="/businessunit", method=RequestMethod.GET)
	public List<BusinessUnit> doListBusinessUnit() {
		List<BusinessUnit> businessUnitList = this.businessUnitService.findAll();
		return businessUnitList;
	}
	
	@RequestMapping(value="/businessunit/{id}", method=RequestMethod.GET)
	public BusinessUnit doGetBusinessUnitById(@PathVariable("id") String id) {
		BusinessUnit businessUnit = this.businessUnitService.findById(id);
		return businessUnit;
	}
}
