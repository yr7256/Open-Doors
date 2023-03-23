package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.request.SpotDto;
import io.blackbeat.opendoors.api.response.CommonDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class ReviewController {
    @PostMapping("save/review")
    public CommonDto<Object> saveReview(@RequestBody  spotDto) {

    }

}
