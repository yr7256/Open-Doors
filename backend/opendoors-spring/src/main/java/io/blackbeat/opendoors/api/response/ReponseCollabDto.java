package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ReponseCollabDto {
    private Spot spot;
    private List<Long> sfInfoIds = new ArrayList<>();
    private double distance;
    private String reason;
}
