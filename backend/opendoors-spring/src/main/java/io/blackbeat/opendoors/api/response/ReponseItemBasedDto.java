package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import lombok.Data;

@Data
public class ReponseItemBasedDto {
    private Spot spot;
    private double distance;
}
