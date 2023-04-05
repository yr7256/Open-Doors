package io.blackbeat.opendoors.db.entity;

import io.blackbeat.opendoors.db.entity.common.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DonationRecord extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private Integer donationAmount;

    @Builder
    public DonationRecord(String username, Integer donationAmount) {
        this.username = username;
        this.donationAmount = donationAmount;
    }
}
