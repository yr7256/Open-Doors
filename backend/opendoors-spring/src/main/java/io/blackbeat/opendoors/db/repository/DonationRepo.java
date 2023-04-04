package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRepo extends JpaRepository<Donation, Integer> {
}
