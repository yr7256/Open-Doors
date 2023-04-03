package io.blackbeat.opendoors.api.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class ResponseReview {
    private Long spotId;
    private String username;
    private double reviewScore;
    private String reviewContent;
    private Collection<Long> sfInfoIds = new ArrayList<>();
}
