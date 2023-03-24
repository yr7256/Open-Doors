package io.blackbeat.opendoors.api.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SpotForDjangoDto {
    private List<Long> spotSfInfos = new ArrayList<>();
    private Long spotId;
    private double spotLat;
    private double spotLng;
    private double reviewRating;
    private int reviewCount;
}
