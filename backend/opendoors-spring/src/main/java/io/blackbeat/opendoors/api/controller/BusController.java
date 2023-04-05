package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.response.CommonDto;
import io.blackbeat.opendoors.db.entity.Static.BusInfo;
import io.blackbeat.opendoors.db.entity.Static.BusStationInfo;
import io.blackbeat.opendoors.service.BusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class BusController {
    private final BusService busService;
    @PostMapping("/bus/info/save")
    public CommonDto<Object> savebusInfo(@RequestBody BusInfo busInfo){
        try{
            busService.saveBusInfo(busInfo);
            return CommonDto.of("200" , "버스 정보 저장됨" , busInfo.getBusNumPad());
        }
        catch (Exception e){
            return CommonDto.of("400" , "내용 : " + e.getMessage() ,null);
        }
    }

    @PostMapping("/bus/stationInfo/save")
    public CommonDto<Object> saveBusStationInfo(@RequestBody BusStationInfo busStationInfo){
        try{
        busService.saveBusStationInfo(busStationInfo);
        return CommonDto.of("200" , "버스 정류장 정보 저장됨" , busStationInfo.getBusName());
        }
        catch (Exception e){
            return CommonDto.of("400" , "내용 : " + e.getMessage() ,null);
        }
    }


}
