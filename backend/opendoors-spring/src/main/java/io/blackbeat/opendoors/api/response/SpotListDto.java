package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@RequiredArgsConstructor(staticName = "of")
public class SpotListDto{
    private final String resultCode;
    private final String message;
    private final Collection<Spot> resultList;
}
