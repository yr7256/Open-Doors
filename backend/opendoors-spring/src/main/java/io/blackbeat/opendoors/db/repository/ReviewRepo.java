package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Static.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    Review findByUsername(String username);
    List<Review> findAllByUsername(String username);
    List<Review> findAllByUserId(Long userId);
    Optional<Review> findById(Long Id);
}
