package io.blackbeat.opendoors.service.impl;

import io.blackbeat.opendoors.db.entity.Static.BusInfo;
import io.blackbeat.opendoors.db.entity.Static.BusStationInfo;
import io.blackbeat.opendoors.db.repository.BusRepo;
import io.blackbeat.opendoors.db.repository.BusStationRepo;
import io.blackbeat.opendoors.service.BusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BusServiceImpl implements BusService {
    private final BusRepo busRepo;
    private final BusStationRepo busStationRepo;

    @Override
    public JSONObject saveBusInfo(BusInfo busInfo) {
        busRepo.save(busInfo);
        return null;
    }

    @Override
    public JSONObject saveBusStationInfo(BusStationInfo busStationInfo) {
        busStationRepo.save(busStationInfo);
        return null;
    }

    @Override
    public List<BusInfo> getBusInfos() {
        return busRepo.findAll();
    }

    @Override
    public List<BusStationInfo> getBusStationInfos() {
        return busStationRepo.findAll();
    }


}
