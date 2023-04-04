package io.blackbeat.opendoors.service;

import io.blackbeat.opendoors.api.response.PointDto;
import io.blackbeat.opendoors.db.entity.Point;
import io.blackbeat.opendoors.db.repository.PointRecordRepo;
import io.blackbeat.opendoors.db.repository.PointRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class PointService {
    private final PointRepo pointRepo;
    private final PointRecordRepo pointRecordRepo;

    public Map<String, Integer> getPoint(String username) {
        Point point = pointRepo.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        Map<String, Integer> response = new HashMap<>();
        response.put("totalPoint", point.getTotalPoint());
        return response;
    }

    public PointDto getPointRecords(String username) {
        Point point = pointRepo.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        point.setPointRecords(pointRecordRepo.findByUsername(username));

        return new PointDto(point);
    }
}
