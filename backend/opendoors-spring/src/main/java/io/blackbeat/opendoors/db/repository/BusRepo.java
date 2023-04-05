package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Static.BusInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepo extends JpaRepository<BusInfo, Long> {
}
