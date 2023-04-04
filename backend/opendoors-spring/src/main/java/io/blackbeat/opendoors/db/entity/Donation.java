package io.blackbeat.opendoors.db.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String organization;
    private Integer totalDonationAmount;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "donation_id")
    private List<DonationRecord> donationRecords = new ArrayList<>();

    public void increaseTotalDonationAmount(int donationAmount){
        this.totalDonationAmount += donationAmount;
    }
}
