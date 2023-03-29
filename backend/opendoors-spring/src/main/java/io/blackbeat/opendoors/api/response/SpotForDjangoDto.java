package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SpotForDjangoDto {
    private List<Spot> spotList;
    private List<User> userList;
    private User user;
    private double spotLat;
    private double spotLng;
    private Long userSpotId;
}
