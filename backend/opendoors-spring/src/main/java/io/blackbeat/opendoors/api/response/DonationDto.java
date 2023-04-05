package io.blackbeat.opendoors.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class DonationDto {
    private Integer donationAmountOnMonth;
    private Integer totalDonationAmount;

    @Builder
    public DonationDto(Integer donationAmountOnMonth, Integer totalDonationAmount) {
        this.donationAmountOnMonth = donationAmountOnMonth;
        this.totalDonationAmount = totalDonationAmount;
    }
}
