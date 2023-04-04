package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Static.BusStationInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusStationRepo extends JpaRepository<BusStationInfo, Long> {

}
