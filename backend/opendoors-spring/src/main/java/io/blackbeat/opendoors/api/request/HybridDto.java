package io.blackbeat.opendoors.api.request;

import lombok.Data;

import java.util.List;

@Data
public class HybridDto {
    private String username;
    private List<Long> categoryIds;
    private double userLat;
    private double userLng;
}
