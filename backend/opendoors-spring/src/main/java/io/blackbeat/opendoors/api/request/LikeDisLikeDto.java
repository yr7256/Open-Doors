package io.blackbeat.opendoors.api.request;

import lombok.Data;

@Data
public class LikeDisLikeDto {
    private String username;
    private Long SpotId;
    private boolean isLikeOrDisLike;
}
