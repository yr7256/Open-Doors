package io.blackbeat.opendoors.service;


import io.blackbeat.opendoors.db.entity.Static.Review;

public interface ReviewService {
    Review saveReview(Review review);
}
