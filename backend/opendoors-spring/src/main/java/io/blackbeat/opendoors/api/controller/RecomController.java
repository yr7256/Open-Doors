package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.request.RecommendContentDto;
import io.blackbeat.opendoors.api.request.SpotDto;
import io.blackbeat.opendoors.api.response.SpotForDjangoDto;
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
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    private final RecommendService recommendService;
    @GetMapping("/recommend")
    public JSONObject getRecommendation(@RequestBody RecommendContentDto recommendContentDto) throws Exception{
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        JSONObject json = recommendService.getContentBasedData(recommendContentDto);
//        HttpEntity<String> request = new HttpEntity<>(json.toString(), headers);
//        ResponseEntity<String> response = restTemplate.postForEntity("http://192.168.31.17:8081/post_test/", request, String.class);

        // Return the response from Django to the client
        return json;
    }
}



