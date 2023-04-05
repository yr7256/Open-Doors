package io.blackbeat.opendoors.api.request;

import lombok.Data;

@Data
public class BusStationDto {
    private int busId;
    private String busName;
    private double busLat;
    private double busLng;
}
