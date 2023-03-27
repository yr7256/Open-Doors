package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.request.SpotDto;
import io.blackbeat.opendoors.api.response.SpotForDjangoDto;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.service.SpotService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class RecomController {
    private RestTemplate restTemplate = new RestTemplate();
    private final SpotService spotService;

    @GetMapping("/recommend")
    public ResponseEntity<String> getRecommendation() throws Exception{
        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);
        List<Spot> spots = spotService.getSpots();
        // Create the JSON data to be sent to Django
        JSONObject json = new JSONObject();
        List<SpotForDjangoDto> sfddList = new ArrayList<>();
        for(Spot s : spots){
            SpotForDjangoDto temp = new SpotForDjangoDto();
            for(SpotSfInfo spsf : s.getSpotSfInfos()){
                temp.getSpotSfInfos().add(spsf.getId());
            }
            temp.setSpotId(s.getId());
            temp.setSpotLat(s.getSpotLat());
            temp.setSpotLng(s.getSpotLng());
            temp.setReviewCount(s.getReviewCount());
            temp.setReviewRating(s.getReviewScore());
            sfddList.add(temp);
        }
        json.put("spot" , sfddList);

        // Create the HTTP request to send to Django
        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity("http://192.168.31.17:5000/post_test/", request, String.class);

        // Return the response from Django to the client
        return response;
    }
}



