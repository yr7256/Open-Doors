package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.Point;
import io.blackbeat.opendoors.db.entity.PointRecord;
import lombok.Getter;

import java.util.List;

@Getter
public class PointDto {
    private Integer totalPoint;
    private List<PointRecord> pointRecords;

    public PointDto(Point point) {
        this.totalPoint = point.getTotalPoint();
        this.pointRecords = point.getPointRecords();
    }
}
