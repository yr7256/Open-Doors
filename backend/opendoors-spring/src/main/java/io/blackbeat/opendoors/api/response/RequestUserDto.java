package io.blackbeat.opendoors.api.response;

import io.blackbeat.opendoors.db.entity.DisLike;
import io.blackbeat.opendoors.db.entity.LikeSpot;
import io.blackbeat.opendoors.db.entity.Static.Review;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
public class RequestUserDto {
    private Long userId;
    private double userLat;
    private double userLng;
    private List<Long> categoryIds;
    private Collection<Review> reviews;
    private List<Long> sfInfoIds = new ArrayList<>();
    private List<LikeSpot> likeSpotList = new ArrayList<>();
    private List<DisLike> disLikeList = new ArrayList<>();
//    private List<>
}
