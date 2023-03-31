package io.blackbeat.opendoors.api.request;

import lombok.Data;

@Data
public class RecommendContentDto {
    private Long spotId;
    private double spotLat;
    private double spotLng;
}
