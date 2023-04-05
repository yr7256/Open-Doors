package io.blackbeat.opendoors.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.blackbeat.opendoors.api.request.RecommendCollabDto;
import io.blackbeat.opendoors.api.request.RecommendContentDto;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public interface RecommendService {
    JSONObject getContentBasedData(RecommendContentDto recommendContentDto) throws JSONException, JsonProcessingException;
//    JSONObject getCollabData()
    JSONObject getHybridData(RecommendCollabDto recommendCollabDto) throws JsonProcessingException, JSONException;
}
