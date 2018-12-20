package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.StaffLeave;



@Repository
public interface StaffLeaveRepository extends CrudRepository<StaffLeave, Integer> {

}
