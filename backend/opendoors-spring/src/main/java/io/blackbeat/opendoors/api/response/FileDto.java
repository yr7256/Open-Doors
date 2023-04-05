package io.blackbeat.opendoors.api.response;

import lombok.Data;

import java.util.List;

@Data
public class FileDto {
    private String message;
    private String imageLocation;
    private List<String> imageLocations;
}