package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Static.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    Review findByUsername(String userName);
}
