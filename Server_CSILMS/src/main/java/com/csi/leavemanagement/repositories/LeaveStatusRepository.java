package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.LeaveStatus;




@Repository
public interface LeaveStatusRepository extends CrudRepository<LeaveStatus, Integer> {

}
