package io.blackbeat.opendoors.api.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TokenDto {
    private String accessToken;
    private String refreshToken;
}
