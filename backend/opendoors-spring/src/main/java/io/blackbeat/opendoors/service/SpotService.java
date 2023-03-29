package io.blackbeat.opendoors.service;

import io.blackbeat.opendoors.db.entity.Place.Menu;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.entity.User;

import java.util.List;

public interface SpotService {

    Spot saveSpot(Spot spot);
    SfInfo saveSfInfo(SfInfo sfInfo);
    SpotSfInfo saveSpotSfInfo(SpotSfInfo spotSfInfo);
    List<Spot> getSpotsBySfInfo(Long sfInfoId);
    void addSfInfo(String spotName , String  sfName);
    void addMenu(Menu menu , Long spotId);
    List<Spot> getSpots();
    Spot getSpotById(Long id);
    Spot getSpotByName(String spotName);

}
