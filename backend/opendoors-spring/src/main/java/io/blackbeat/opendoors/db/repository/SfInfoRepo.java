package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Place.SfInfo;
import io.blackbeat.opendoors.db.entity.Place.Spot;
import io.blackbeat.opendoors.db.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SfInfoRepo extends JpaRepository<SfInfo, Long> {
    SfInfo findBySfName(String sfName);

}
