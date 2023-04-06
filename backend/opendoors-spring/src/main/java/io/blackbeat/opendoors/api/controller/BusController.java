package io.blackbeat.opendoors.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.blackbeat.opendoors.api.request.RequestBusDto;
import io.blackbeat.opendoors.api.response.CommonDto;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Static.BusInfo;
import io.blackbeat.opendoors.db.entity.Static.BusStationInfo;
import io.blackbeat.opendoors.service.BusService;
import io.blackbeat.opendoors.service.SpotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.websocket.server.PathParam;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class BusController {
    private final BusService busService;
    private final SpotService spotService;
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


    @GetMapping(value = "/bus/busInfo/{spotId}")
    public String saveBusStationInfo(@PathVariable Long spotId) throws JsonProcessingException, JSONException {
        System.out.println("추천 진입");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Spot spot = spotService.getSpotById(spotId);
        ObjectMapper objectMapper = new ObjectMapper();
        RequestBusDto requestBusDto = new RequestBusDto();
        requestBusDto.setBusStations(busService.getBusStationInfos());
        requestBusDto.setBuses(busService.getBusInfos());
        requestBusDto.setLat(spot.getSpotLat());
        requestBusDto.setLng(spot.getSpotLng());

        JSONObject json = new JSONObject();
        RestTemplate restTemplate = new RestTemplate();
        String bus = objectMapper.writeValueAsString(requestBusDto.getBuses()).replaceAll("\\\\", "");
        String busStation = objectMapper.writeValueAsString(requestBusDto.getBusStations()).replaceAll("\\\\", "");
        String lat = objectMapper.writeValueAsString(requestBusDto.getLat()).replaceAll("\\\\", "");
        String lng = objectMapper.writeValueAsString(requestBusDto.getLng()).replaceAll("\\\\", "");
        json.put("buses" , bus);
        json.put("busStations" , busStation);
        json.put("lat" , lat);
        json.put("lng" , lng);


        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity("http://j8b205.p.ssafy.io:5000/recom/busInfo", request, String.class);
        String responseBody = response.getBody();
        return responseBody;


    }

    @GetMapping("/bus/user/busInfo")
    public String getUSerBusStationInfo(@RequestParam("userLat") String userLat ,  @RequestParam("userLng") String userLng) throws JsonProcessingException, JSONException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ObjectMapper objectMapper = new ObjectMapper();
        RequestBusDto requestBusDto = new RequestBusDto();
        requestBusDto.setBusStations(busService.getBusStationInfos());
        requestBusDto.setBuses(busService.getBusInfos());

        JSONObject json = new JSONObject();
        RestTemplate restTemplate = new RestTemplate();
        String bus = objectMapper.writeValueAsString(requestBusDto.getBuses()).replaceAll("\\\\", "");
        String busStation = objectMapper.writeValueAsString(requestBusDto.getBusStations()).replaceAll("\\\\", "");
        String lat = objectMapper.writeValueAsString(userLat).replaceAll("\\\\", "");
        String lng = objectMapper.writeValueAsString(userLng).replaceAll("\\\\", "");
        json.put("buses" , bus);
        json.put("busStations" , busStation);
        json.put("lat" , lat);
        json.put("lng" , lng);


        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity("http://j8b205.p.ssafy.io:5000/recom/busInfo", request, String.class);
        String responseBody = response.getBody();
        return responseBody;


    }
}
