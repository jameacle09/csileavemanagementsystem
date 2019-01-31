package com.csi.leavemanagement.repositories;

import java.util.Date;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.PublicHoliday;

@Repository
public interface PublicHolidayRepository extends CrudRepository<PublicHoliday, Date> {

}
