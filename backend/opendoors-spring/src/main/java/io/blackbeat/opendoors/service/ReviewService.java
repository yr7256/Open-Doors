package io.blackbeat.opendoors.service;


import io.blackbeat.opendoors.db.entity.Static.Review;

import java.util.List;

public interface ReviewService {
    Review saveReview(Review review);
    List<Review> findReviewByName(String username);
    List<Review> findReviewByUserId(Long userId);
    Review findReviewById(Long id);

}
