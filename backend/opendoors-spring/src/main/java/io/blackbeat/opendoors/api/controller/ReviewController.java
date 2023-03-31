package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.request.ReviewDto;
import io.blackbeat.opendoors.api.request.SpotDto;
import io.blackbeat.opendoors.api.response.CommonDto;
import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import io.blackbeat.opendoors.db.entity.Resource.Image;
import io.blackbeat.opendoors.db.entity.Static.Review;
import io.blackbeat.opendoors.db.entity.User;
import io.blackbeat.opendoors.db.repository.ReviewRepo;
import io.blackbeat.opendoors.db.repository.SpotRepo;
import io.blackbeat.opendoors.db.repository.UserRepo;
import io.blackbeat.opendoors.service.ReviewService;
import io.blackbeat.opendoors.service.SpotService;
import io.blackbeat.opendoors.service.StorageService;
import io.blackbeat.opendoors.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class ReviewController {
    private final ReviewService reviewService;
    private final SpotService spotService;
    private final UserService userService;
    private final StorageService storageService;
    private final SpotRepo spotRepo;
    private final UserRepo userRepo;
    @PostMapping("review/save")
    public CommonDto<Object> saveReview(@RequestPart ReviewDto reviewDto , @RequestPart(value = "reviewImages" ,required = false) List<MultipartFile> images) {

        Review review = new Review();
        review.setReviewScore(reviewDto.getReviewScore());
        review.setReviewContent(reviewDto.getReviewContent());
        review.setSpotId(reviewDto.getSpotId());
        review.setUsername(reviewDto.getUsername());
        review.setUserId(userRepo.findByUsername(reviewDto.getUsername()).getId());

        Spot spot = spotRepo.findById(review.getSpotId()).orElseThrow();
        spot.getReviews().add(review);
        if(spot.getReviewCount() == 0){
            spot.setReviewScore(review.getReviewScore());
            spot.setReviewCount(1);
        }
        else{
        double reviewScore = spot.getReviewScore();
        int reviewCount = spot.getReviewCount();
        spot.setReviewScore( Math.round(((reviewScore * reviewCount + review.getReviewScore()) / (reviewCount + 1)) * 10 ) / 10.0);
        spot.setReviewCount(reviewCount + 1);
        }

        User user = userRepo.findByUsername(reviewDto.getUsername());
        user.getReviews().add(review);
        try {
            List<String> imageLocations = new ArrayList<>();
            String postName = user.getUsername();
            List<String> results  = storageService.saveFiles(images, postName);
            for (String result : results) {
                imageLocations.add("/" + postName + "/" + result);
                Image img = new Image();
                img.setPathName("/" + postName + "/" + result);
                review.getImages().add(img);
            }
            reviewService.saveReview(review);
            spotService.saveSpot(spot);
            userService.saveUser(user);
            return CommonDto.of("200", "리뷰등록이 성공적으로 완료되었습니다.", review.getUsername() + review.getSpotId() + review.getReviewContent());
        } catch (Exception e) {
            return CommonDto.of("400", "내용 : " + e.getMessage(), null);
        }
    }
}
