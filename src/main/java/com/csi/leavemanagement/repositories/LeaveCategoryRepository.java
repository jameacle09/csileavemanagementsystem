package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.LeaveCategory;




@Repository
public interface LeaveCategoryRepository extends CrudRepository<LeaveCategory, Integer> {

}
