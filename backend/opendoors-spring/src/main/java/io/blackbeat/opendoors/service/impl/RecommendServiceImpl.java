package io.blackbeat.opendoors.service.impl;

import io.blackbeat.opendoors.api.request.RecommendContentDto;
import io.blackbeat.opendoors.api.response.SpotForDjangoDto;
import io.blackbeat.opendoors.api.response.UserForContent;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.SpotRepo;
import io.blackbeat.opendoors.db.repository.UserRepo;
import io.blackbeat.opendoors.service.RecommendService;
import io.blackbeat.opendoors.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RecommendServiceImpl implements RecommendService {
    private final UserRepo userRepo;
    private final SpotRepo spotRepo;

    @Override
    public JSONObject getContentBasedData(RecommendContentDto recommendContentDto) throws JSONException {
        User temp = userRepo.findByUsername(recommendContentDto.getUsername());
        UserForContent user = new UserForContent();
        user.setUserLat(recommendContentDto.getSpotLat());
        user.setUserLng(recommendContentDto.getSpotLat());
        user.setUsername(recommendContentDto.getUsername());
        user.setId(temp.getId());
        Spot userSpot = spotRepo.findBySpotName(recommendContentDto.getSpotName());
        List<Spot> spots = spotRepo.findAllById(userSpot.getId());
        JSONObject json = new JSONObject();
        json.put("user" , user);
        json.put("userSpot" , userSpot);
        json.put("spots" , spots);

        return json;
    }
}
