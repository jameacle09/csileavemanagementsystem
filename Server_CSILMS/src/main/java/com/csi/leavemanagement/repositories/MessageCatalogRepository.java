package com.csi.leavemanagement.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.MessageCatalog;

@Repository
public interface MessageCatalogRepository extends CrudRepository<MessageCatalog, Integer> {

}
