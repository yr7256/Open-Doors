package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import lombok.Data;

@Data
public class ReponseCollabDto {
    private Spot spot;
    private double distance;
    private String reason;
}
