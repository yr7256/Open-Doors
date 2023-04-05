package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Place.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepo  extends JpaRepository<Menu, Long> {
//    List<Menu> findAllBySpotId(Long spotId);
}
