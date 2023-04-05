package io.blackbeat.opendoors.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.blackbeat.opendoors.api.request.RecommendCollabDto;
import io.blackbeat.opendoors.api.request.RecommendContentDto;
import io.blackbeat.opendoors.api.response.RequestUserDto;
import io.blackbeat.opendoors.api.response.ResponseSpotDto;
import io.blackbeat.opendoors.api.response.SfinfoIdsDto;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.SpotRepo;
import io.blackbeat.opendoors.db.repository.UserRepo;
import io.blackbeat.opendoors.service.RecommendService;
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
    public JSONObject getContentBasedData(RecommendContentDto recommendContentDto) throws JSONException, JsonProcessingException {
        Spot userSpot = spotRepo.findById(recommendContentDto.getSpotId()).orElseThrow();
        List<Spot> spots = spotRepo.findAll();
        List<ResponseSpotDto> resultSpot  = new ArrayList<>();
        ResponseSpotDto userSpotDto = new ResponseSpotDto();
        for(int i =0; i< spots.size(); i++){
            if(spots.get(i).getId() == userSpot.getId()){
                userSpotDto.setSpotLng(userSpot.getSpotLng());
                userSpotDto.setSpotLat(userSpot.getSpotLat());
                userSpotDto.setSpotId(userSpot.getId());
                userSpotDto.setReviewScore(userSpot.getReviewScore());
                userSpotDto.setReviewCount(userSpot.getReviewCount());
                List<Long> ids = new ArrayList<>();
                for(SpotSfInfo sfInfo : spots.get(i).getSpotSfInfos()){
                    ids.add(sfInfo.getSfInfo().getId());
                }
                userSpotDto.setSpotCategory(userSpot.getSpotCategory());
                userSpotDto.setSfInfoIds(ids);
                continue;
            }
            ResponseSpotDto temp = new ResponseSpotDto();
            temp.setSpotLat(spots.get(i).getSpotLat());
            temp.setSpotLng(spots.get(i).getSpotLng());
            temp.setSpotId(spots.get(i).getId());
            temp.setReviewScore(spots.get(i).getReviewScore());
            temp.setReviewCount(spots.get(i).getReviewCount());
            temp.setSpotCategory(spots.get(i).getSpotCategory());
            List<Long> ids = new ArrayList<>();
            for(SpotSfInfo sfInfo : spots.get(i).getSpotSfInfos()){
                ids.add(sfInfo.getSfInfo().getId());
            }
            temp.setSfInfoIds(ids);
            resultSpot.add(temp);

        }
        JSONObject json = new JSONObject();
        ObjectMapper objectMapper = new ObjectMapper();
        String userSpotJson = objectMapper.writeValueAsString(userSpotDto).replaceAll("\\\\", "");
        String resultJson = objectMapper.writeValueAsString(resultSpot).replaceAll("\\\\", "");
        json.put("userSpot" , userSpotJson);
        json.put("spots" , resultJson);
        return json;
    }

    @Override
    public JSONObject getHybridData(RecommendCollabDto recommendCollabDto) throws JsonProcessingException, JSONException {
        User user = userRepo.findByUsername(recommendCollabDto.getUsername());
        List<Spot> spots = spotRepo.findAll();
        List<User> users = userRepo.findAll();
        List<Long> categoryIds = recommendCollabDto.getSpotCategory();
        List<ResponseSpotDto> resultSpot  = new ArrayList<>();
        List<RequestUserDto> resultUsers = new ArrayList<>();
        RequestUserDto requestUserDto = new RequestUserDto();
        for(int i =0; i< users.size(); i++){
            if(users.get(i).getUsername().equals(recommendCollabDto.getUsername())){
                requestUserDto.setUserId(users.get(i).getId());
                requestUserDto.setUserLat(recommendCollabDto.getUserLat());
                requestUserDto.setUserLng(recommendCollabDto.getUserLng());
                requestUserDto.setCategoryIds(categoryIds);
                requestUserDto.setReviews(user.getReviews());
                for(SfInfo sfInfo : user.getSfInfoIds()){
                    requestUserDto.getSfInfoIds().add(sfInfo.getId());
                }
                continue;
            }

            RequestUserDto temp = new RequestUserDto();
            temp.setUserId(users.get(i).getId());
            temp.setReviews(users.get(i).getReviews());
            for(SfInfo sfInfo : users.get(i).getSfInfoIds()){
                temp.getSfInfoIds().add(sfInfo.getId());
            }

            resultUsers.add(temp);
        }


        for(int i =0; i< spots.size(); i++){
            ResponseSpotDto temp = new ResponseSpotDto();
            temp.setSpotLat(spots.get(i).getSpotLat());
            temp.setSpotLng(spots.get(i).getSpotLng());
            temp.setSpotId(spots.get(i).getId());
            temp.setReviewScore(spots.get(i).getReviewScore());
            temp.setReviewCount(spots.get(i).getReviewCount());
            temp.setSpotCategory(spots.get(i).getSpotCategory());
            List<Long> ids = new ArrayList<>();
            for(SpotSfInfo sfInfo : spots.get(i).getSpotSfInfos()){
                ids.add(sfInfo.getSfInfo().getId());
            }
            temp.setSfInfoIds(ids);
            resultSpot.add(temp);

        }
        JSONObject json = new JSONObject();
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(requestUserDto).replaceAll("\\\\", "");
        String usersJson  = objectMapper.writeValueAsString(resultUsers).replaceAll("\\\\", "");
        String resultJson = objectMapper.writeValueAsString(resultSpot).replaceAll("\\\\", "");
        json.put("user" , userJson);
        json.put("users" , usersJson);
        json.put("spots" , resultJson);
        System.out.println(json);
        return json;
    }
}
