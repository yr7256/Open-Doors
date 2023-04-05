package io.blackbeat.opendoors.api.response;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class SfinfoIdsDto {
    private List<Long> ids  = new ArrayList<>();
}
