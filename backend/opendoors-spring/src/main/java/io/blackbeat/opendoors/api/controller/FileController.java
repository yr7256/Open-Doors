package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.response.FileDto;
import io.blackbeat.opendoors.service.StorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/image")
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);
    private final StorageService storageService;

    @Autowired
    public FileController(StorageService storageService){
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<FileDto> uploadImage(@RequestParam("file") MultipartFile file,
                                               @RequestParam("userName") String userName) throws IOException {
        FileDto res = new FileDto();
        try{
            String result = storageService.saveFile(file, userName);
            res.setImageLocation("/"+userName+"/"+result);
            res.setMessage("done");
            return new ResponseEntity<FileDto>(res, HttpStatus.OK);
        }catch (Exception e){
            res.setMessage("failed");
            return new ResponseEntity<FileDto>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PostMapping("/post/upload")
//    public ResponseEntity<FileDto> postImageUpload(@RequestParam("files") MultipartFile[] files,
//                                                    @RequestParam("postName")String postName) {
//        FileDto res = new FileDto();
//        List<String> results = new ArrayList<>();
//        List<String> imageLocations = new ArrayList<>();
//        try{
//            results = storageService.saveFiles(files, postName);
//            for(String result : results){
//                imageLocations.add("/"+postName+"/"+result);
//            }
//            res.setImageLocations(imageLocations);
//            res.setMessage("done");
//            return new ResponseEntity<FileDto>(res, HttpStatus.OK);
//        }catch (Exception e){
//            res.setMessage("failed");
//            return new ResponseEntity<FileDto>(res, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/display/{userName}/{fileName:.+}")
    public ResponseEntity<Resource> displayImage(@PathVariable String fileName,
                                                 @PathVariable String userName,
                                                 HttpServletRequest request) {
        // Load file as Resource
        Resource resource = storageService.loadFileAsResource(userName, fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}