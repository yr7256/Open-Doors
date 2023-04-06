package io.blackbeat.opendoors.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {
    private String uploadDir;

    public String getUploadDir() {
        String os = System.getProperty("os.name").toLowerCase();
        uploadDir = os.contains("win") ? "C:\\workspace\\B205\\S08P22B205\\backend\\opendoors-spring\\images" : "/src/img/";
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        String os = System.getProperty("os.name").toLowerCase();
        uploadDir = os.contains("win") ? this.uploadDir : "/src/img/";
        this.uploadDir = uploadDir;
    }
}