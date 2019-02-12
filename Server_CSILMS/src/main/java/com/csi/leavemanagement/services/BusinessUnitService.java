package com.csi.leavemanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csi.leavemanagement.models.BusinessUnit;
import com.csi.leavemanagement.repositories.BusinessUnitRepository;

@Service
public class BusinessUnitService {

	private BusinessUnitRepository businessUnitRepository;

	@Autowired
	public BusinessUnitService(BusinessUnitRepository businessUnitRepository) {
		this.businessUnitRepository = businessUnitRepository;
	}
	
	public List<BusinessUnit> findAll() {
		List<BusinessUnit> businessUnitList = (List<BusinessUnit>) this.businessUnitRepository.findAll();
		return businessUnitList;
	}
	
	public BusinessUnit findById(String businessUnit) {
		return this.businessUnitRepository.findById(businessUnit).orElse(null);
	}
}
