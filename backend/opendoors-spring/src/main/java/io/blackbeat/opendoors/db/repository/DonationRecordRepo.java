package io.blackbeat.opendoors.db.repository;

import io.blackbeat.opendoors.db.entity.DonationRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationRecordRepo extends JpaRepository<DonationRecord, Integer> {
}
