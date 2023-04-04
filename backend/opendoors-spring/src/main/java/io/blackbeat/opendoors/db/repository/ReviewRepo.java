package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Static.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    Review findByUsername(String userName);
    List<Review> findAllByUsername(String userName);
}
