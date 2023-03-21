package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpotRepo extends JpaRepository<Spot, Long> {
    Spot findBySpotName(String spotName);
}
