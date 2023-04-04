package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor(staticName = "of")
public class SpotSearchDto {
    private final String resultCode;
    private final String message;
    private final List<Spot> spots;
}
