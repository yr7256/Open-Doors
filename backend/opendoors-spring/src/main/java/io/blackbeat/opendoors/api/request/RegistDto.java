package io.blackbeat.opendoors.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RegistDto {

    private User user;
    private List<Long> sfInfoIds = new ArrayList<>();
}
