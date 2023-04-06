package io.blackbeat.opendoors.service;

import io.blackbeat.opendoors.db.entity.Donation;
import io.blackbeat.opendoors.db.entity.DonationRecord;
import io.blackbeat.opendoors.db.entity.Point;
import io.blackbeat.opendoors.db.entity.PointRecord;
import io.blackbeat.opendoors.db.repository.DonationRecordRepo;
import io.blackbeat.opendoors.db.repository.DonationRepo;
import io.blackbeat.opendoors.db.repository.PointRecordRepo;
import io.blackbeat.opendoors.db.repository.PointRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@RequiredArgsConstructor
@Service
public class DonationService {
    private final DonationRepo donationRepo;
    private final DonationRecordRepo donationRecordRepo;
    private final PointRepo pointRepo;
    private final PointRecordRepo pointRecordRepo;

    public Integer getTotalDonationAmount() {
        Donation donation = donationRepo.findById(1)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 모금함입니다."));

        return donation.getTotalDonationAmount();
    }

    public Integer getDonationAmountOnMonth() {
        List<DonationRecord> donationRecords = donationRecordRepo.findAll();
        String thisMonth = getThisMonth();
        int donationAmount = 0;

        // 이번달 모금액을 구함
        for (DonationRecord donationRecord : donationRecords) {
            String month = donationRecord.getCreatedAt().getMonth().toString();
            if (thisMonth.equals(month)) {
                donationAmount += donationRecord.getDonationAmount();
            }
        }

        return donationAmount;
    }

    @Transactional
    public void donate(String username, int donationAmount) {
        Donation donation = donationRepo.findById(1)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 모금함입니다."));

        // 사용자 포인트 조회
        Point point = pointRepo.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원 포인트입니다."));

        // 기부할 포인트가 사용자가 보유한 포인트 보다 큰 경우 예외를 발생
        if (donationAmount > point.getTotalPoint()) {
            throw new IllegalArgumentException("포인트가 부족합니다.");
        }

        donation.increaseTotalDonationAmount(donationAmount);
        DonationRecord donationRecord = DonationRecord.builder()
                .username(username)
                .donationAmount(donationAmount)
                .build();

        point.decreasePoint(donationAmount);
        PointRecord pointRecord = PointRecord.builder()
                .username(username)
                .source("대전종합사회복지관")
                .pointChange(-donationAmount)
                .build();

        donationRepo.save(donation);
        donationRecordRepo.save(donationRecord);
        pointRepo.save(point);
        pointRecordRepo.save(pointRecord);
    }

    public String getThisMonth() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        String thisMonth = now.getMonth().toString();
        return thisMonth;
    }
}
