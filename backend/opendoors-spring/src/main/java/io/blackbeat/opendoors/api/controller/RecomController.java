package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.request.RecommendCollabDto;
import io.blackbeat.opendoors.api.request.RecommendContentDto;
import io.blackbeat.opendoors.api.request.SpotDto;
import io.blackbeat.opendoors.api.response.ReponseCollabDto;
import io.blackbeat.opendoors.api.response.ReponseItemBasedDto;
import io.blackbeat.opendoors.api.response.SpotForDjangoDto;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.SpotRepo;
import io.blackbeat.opendoors.db.repository.UserRepo;
import io.blackbeat.opendoors.service.RecommendService;
import io.blackbeat.opendoors.service.SpotService;
import io.blackbeat.opendoors.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class RecomController {
    private RestTemplate restTemplate = new RestTemplate();
    private final RecommendService recommendService;
    private final SpotService spotService;
    @PostMapping("/recommend")
    public List<ReponseItemBasedDto> getRecommendation(@RequestBody RecommendContentDto recommendContentDto) throws Exception{
        System.out.println("추천 진입");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        JSONObject json = recommendService.getContentBasedData(recommendContentDto);
        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity("http://j8b205.p.ssafy.io:5000/recom/content_based", request, String.class);
        String responseBody = response.getBody();
        JSONArray jsonArray = new JSONArray(responseBody);
        List<ReponseItemBasedDto> reponseItemBasedDtos = new ArrayList<>();
        for (int i = 0; i < jsonArray.length(); i++) {
            ReponseItemBasedDto reponseItemBasedDto = new ReponseItemBasedDto();
            JSONArray innerArray = jsonArray.getJSONArray(i);
            Long spotId = innerArray.getLong(0);
            double distance = innerArray.getDouble(1);
            Spot spot  = spotService.getSpotById(spotId);
            reponseItemBasedDto.setSpot(spotService.getSpotById(spotId));
            reponseItemBasedDto.setDistance(distance);
            for(SpotSfInfo sfInfo : spot.getSpotSfInfos()){
                reponseItemBasedDto.getSfIndoIds().add(sfInfo.getSfInfo().getId());
            }
            reponseItemBasedDtos.add(reponseItemBasedDto);

        }
        return reponseItemBasedDtos;
    }

    @PostMapping("/hybrid")
    public List<ReponseCollabDto> getRecommendationHybrid(@RequestBody RecommendCollabDto recommendCollabDto) throws Exception{
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        JSONObject json = recommendService.getHybridData(recommendCollabDto);
        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity("http://j8b205.p.ssafy.io:5000/recom/hybrid", request, String.class);
        JSONArray jsonArray = new JSONArray(response.getBody());
        List<ReponseCollabDto> reponseCollabDtos = new ArrayList<>();
        for (int i = 0; i < jsonArray.length(); i++) {
            ReponseCollabDto reponseCollabDto = new ReponseCollabDto();
            JSONArray nestedArray = jsonArray.getJSONArray(i);
            Long spotId = nestedArray.getJSONArray(0).getLong(1);
            double distance = nestedArray.getDouble(1);
            String reason = nestedArray.getString(2);
            // use the extracted values as needed
            Spot spot = spotService.getSpotById(spotId);
            reponseCollabDto.setSpot(spotService.getSpotById(spotId));
            reponseCollabDto.setDistance(distance);
            reponseCollabDto.setReason(reason);
            for(SpotSfInfo sfInfo : spot.getSpotSfInfos()){
                reponseCollabDto.getSfInfoIds().add(sfInfo.getSfInfo().getId());
            }
            reponseCollabDtos.add(reponseCollabDto);
        }


        return reponseCollabDtos;
    }
}



