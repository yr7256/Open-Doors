package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PointRepo extends JpaRepository<Point, Integer> {
    Optional<Point> findByUsername(String username);
}
