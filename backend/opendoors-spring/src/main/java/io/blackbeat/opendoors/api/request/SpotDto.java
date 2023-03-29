package io.blackbeat.opendoors.api.request;

import com.sun.istack.NotNull;
import io.blackbeat.opendoors.api.response.FileDto;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class SpotDto {

    private Spot spot;
    private List<Long> sfInfos = new ArrayList<>();
    private List<MultipartFile> spotImages = new ArrayList<>();
}
