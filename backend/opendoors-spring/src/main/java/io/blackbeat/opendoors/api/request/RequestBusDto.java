package io.blackbeat.opendoors.api.request;

import io.blackbeat.opendoors.db.entity.Static.BusInfo;
import io.blackbeat.opendoors.db.entity.Static.BusStationInfo;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RequestBusDto {
    private double lat;
    private double lng;
    private List<BusStationInfo> busStations = new ArrayList<>();
    private List<BusInfo> buses = new ArrayList<>();
}
