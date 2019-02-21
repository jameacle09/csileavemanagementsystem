package com.csi.leavemanagement.storage;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.csi.leavemanagement.security.CurrentUser;
import com.csi.leavemanagement.security.UserPrincipal;

@RestController
@RequestMapping("/api/attachment")
public class FileUploadController {
	
	private final StorageService storageService;
	
	@Autowired
	public FileUploadController(StorageService storageService) {
		this.storageService = storageService;
	}
			
	@GetMapping("/files/{filename:.+}")
    @ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
		
		Resource file = storageService.loadAsResource(filename);
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
				"attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}
	
	@PostMapping("/uploadfile")
	public ResponseEntity<?> handleFileUpload(@RequestPart("file") MultipartFile file,
									@CurrentUser UserPrincipal currentUser) throws IOException {

		String fileExtension = getExtensionByStringHandling(file.getOriginalFilename()).orElse("");
				
		SimpleDateFormat sdf = new SimpleDateFormat("yyyymmddhhmmss");

		String newFilename = currentUser.getId() + "_" + sdf.format(new Date()) + "." + fileExtension;
		Map<String, String> responseEntityMessage = new HashMap<String, String> ();
		responseEntityMessage.put("file", newFilename);
		
		storageService.store(file, newFilename);
		return new ResponseEntity<Map<String, String>>(responseEntityMessage, HttpStatus.OK );	
	}
	
	private Optional<String> getExtensionByStringHandling(String filename) {
	    return Optional.ofNullable(filename)
	      .filter(f -> f.contains("."))
	      .map(f -> f.substring(filename.lastIndexOf(".") + 1));
	}
		
	@RequestMapping(value="/deletefile/{filename}", method=RequestMethod.DELETE)
	public ResponseEntity<?> handleFileDelete(@PathVariable("filename") String filename) {
		
		storageService.delete(filename);
		
		Map<String, String> responseEntityMessage = new HashMap<String, String> ();
		responseEntityMessage.put("message", "done");
		return new ResponseEntity<Map<String, String>>(responseEntityMessage, HttpStatus.OK );	
	}
	
	@ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
		
		Map<String, String> responseEntityMessage = new HashMap<String, String> ();
		responseEntityMessage.put("message", exc.getMessage());
        return new ResponseEntity<Map<String, String>>(responseEntityMessage, HttpStatus.NOT_FOUND );
    }
}
