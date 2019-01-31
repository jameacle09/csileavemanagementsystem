package com.csi.leavemanagement.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.csi.leavemanagement.models.MessageCatalog;
import com.csi.leavemanagement.models.MessageCatalogId;

@Repository
public interface MessageCatalogRepository extends CrudRepository<MessageCatalog, MessageCatalogId> {

	List<MessageCatalog> findByIdMessageSetNbr(int messageSetNbr);
}
