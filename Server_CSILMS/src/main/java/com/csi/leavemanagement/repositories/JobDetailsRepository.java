package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.JobDetails;


@Repository
public interface JobDetailsRepository extends CrudRepository<JobDetails, String> {

}
