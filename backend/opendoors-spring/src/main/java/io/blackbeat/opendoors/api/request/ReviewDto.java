package io.blackbeat.opendoors.api.request;

import io.blackbeat.opendoors.db.entity.User;
import lombok.Data;

@Data
public class ReviewDto {
    private Long spotId;
    private String username;
    private double reviewScore;
    private String reviewContent;
}
