package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.response.PointDto;
import io.blackbeat.opendoors.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/point")
public class PointController {
    private final PointService pointService;

    @GetMapping
    public ResponseEntity<PointDto> getPointRecords(@AuthenticationPrincipal String username) {
        System.out.println(username);
        return ResponseEntity.ok().body(pointService.getPointRecords(username));
    }
}
