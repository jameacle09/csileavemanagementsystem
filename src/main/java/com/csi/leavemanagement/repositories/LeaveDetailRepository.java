package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.LeaveDetail;




@Repository
public interface LeaveDetailRepository extends CrudRepository<LeaveDetail, Integer> {

}
