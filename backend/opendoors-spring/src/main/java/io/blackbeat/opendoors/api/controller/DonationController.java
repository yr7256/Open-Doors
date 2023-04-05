package io.blackbeat.opendoors.api.controller;

import io.blackbeat.opendoors.api.response.DonationDto;
import io.blackbeat.opendoors.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/donation")
public class DonationController {
    private final DonationService donationService;

    @GetMapping
    public ResponseEntity<DonationDto> getDonationAmount() {
        DonationDto donationDto = DonationDto.builder()
                .totalDonationAmount(donationService.getTotalDonationAmount())
                .donationAmountOnMonth(donationService.getDonationAmountOnMonth())
                .build();
        return ResponseEntity.ok().body(donationDto);
    }

    @PutMapping
    public ResponseEntity<?> donate(@AuthenticationPrincipal String username,
                                    @RequestBody Map<String, Integer> map) {
        donationService.donate(username, map.get("donationAmount"));
        return ResponseEntity.ok().build();
    }
}
