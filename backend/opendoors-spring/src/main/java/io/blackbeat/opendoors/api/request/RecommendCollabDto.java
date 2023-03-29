package io.blackbeat.opendoors.api.request;

import lombok.Data;

@Data
public class RecommendCollabDto {
    private String username;
    private String spotName;
    private double spotLat;
    private double spotLng;
}
