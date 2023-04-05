package io.blackbeat.opendoors.api.response;

import lombok.Data;

import java.util.List;

@Data
public class RequestSpotDto {
    private double spotLat;
    private double spotLng;
    private double reviewScore;
    private int spotCategory;
    private int reviewCount;
    private List<Long> sfInfoIds;
}
