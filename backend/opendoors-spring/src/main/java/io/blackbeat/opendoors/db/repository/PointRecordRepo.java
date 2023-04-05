package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.PointRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointRecordRepo extends JpaRepository<PointRecord, Integer> {
    List<PointRecord> findByUsername(String username);
}
