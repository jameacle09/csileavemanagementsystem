package com.csi.leavemanagement.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {
	
	void store(MultipartFile file, String targetFilePath);
	
	Stream<Path> loadAll();
	
	Path load(String filename);
	
	Resource loadAsResource(String filename);
	
	void delete(String filename);

	void init();

	void deleteAll();
}
