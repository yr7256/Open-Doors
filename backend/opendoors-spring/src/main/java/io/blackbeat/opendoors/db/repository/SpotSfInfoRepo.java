package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Place.SpotSfInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpotSfInfoRepo extends JpaRepository<SpotSfInfo, Long> {
    public List<Spot> findBySfInfoId(Long sfInfoId);
}