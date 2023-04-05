package io.blackbeat.opendoors.api.request;

import lombok.Data;

import java.util.List;

@Data
public class RecommendCollabDto {
    private String username;
    private List<Long> spotCategory;
    private double userLat;
    private double userLng;
}
