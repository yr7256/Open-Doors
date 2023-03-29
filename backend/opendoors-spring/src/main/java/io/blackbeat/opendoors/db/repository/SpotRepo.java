package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpotRepo extends JpaRepository<Spot, Long> {
    Spot findBySpotName(String spotName);
    List<Spot> findAllByUsername(String username);
    List<Spot> findAllById(Long id);
    Optional<Spot> findById(Long id);
}
