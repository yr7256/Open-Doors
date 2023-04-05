package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SfInfoRepo extends JpaRepository<SfInfo, Long> {
    SfInfo findBySfName(String sfName);
    Optional<SfInfo> findById(Long id);
}
