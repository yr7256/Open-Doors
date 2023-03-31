package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.User;

import java.util.List;

public class HybridForDjangoDto {
    private List<Spot> spotList;
    private List<User> userList;
    private User user;
    private double userLat;
    private double userLng;
}
