package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.Department;

@Repository
public interface DepartmentRepository extends CrudRepository<Department, String> {
	
}
