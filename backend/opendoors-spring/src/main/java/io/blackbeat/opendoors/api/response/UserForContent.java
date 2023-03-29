package io.blackbeat.opendoors.api.response;

import lombok.Data;

@Data
public class UserForContent {
    private Long id;
    private String username;
    private double userLat;
    private double userLng;
}
