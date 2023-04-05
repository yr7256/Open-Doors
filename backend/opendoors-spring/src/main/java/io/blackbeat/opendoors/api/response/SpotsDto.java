package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@RequiredArgsConstructor(staticName = "of")
public class SpotsDto {
    private final String resultCode;
    private final String message;
    private final List<Spot> spots;
    private final List<File> resources;
}
