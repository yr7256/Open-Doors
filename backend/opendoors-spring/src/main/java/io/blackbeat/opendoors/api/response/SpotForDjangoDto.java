package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class SpotForDjangoDto {
    private Collection<Spot> spotList = new ArrayList<>();
    private double spotLat;
    private double spotLng;
    private Spot userSpot;
    private Long userSpotId;
}
