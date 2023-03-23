package io.blackbeat.opendoors.api.request;

import com.sun.istack.NotNull;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class SpotDto {

    private Spot spot;
    private List<SfInfo> sfInfos = new ArrayList<>();
}
