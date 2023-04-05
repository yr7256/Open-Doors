package io.blackbeat.opendoors.api.request;

import io.blackbeat.opendoors.db.entity.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class RegistDto {
    private User user;
    private List<Long> sfInfoIds = new ArrayList<>();
}
