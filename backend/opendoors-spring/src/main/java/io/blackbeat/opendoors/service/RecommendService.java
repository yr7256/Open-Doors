package io.blackbeat.opendoors.service;

import io.blackbeat.opendoors.api.request.RecommendContentDto;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;

public interface RecommendService {
    JSONObject getContentBasedData(RecommendContentDto recommendContentDto) throws JSONException;
//    JSONObject getCollabData()
}
