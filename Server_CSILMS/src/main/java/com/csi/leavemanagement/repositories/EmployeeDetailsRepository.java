package com.csi.leavemanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csi.leavemanagement.models.EmployeeDetails;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails, String>{
	EmployeeDetails findByEmplId(String emplId);

}
