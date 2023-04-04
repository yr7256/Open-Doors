package io.blackbeat.opendoors.service;

import io.blackbeat.opendoors.db.entity.Static.BusInfo;
import io.blackbeat.opendoors.db.entity.Static.BusStationInfo;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public interface BusService {
    JSONObject saveBusInfo(BusInfo busInfo);
    JSONObject saveBusStationInfo(BusStationInfo busStationInfo);
}
