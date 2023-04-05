package io.blackbeat.opendoors.api.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor(staticName = "of")
public class UserRegistDto {
    private final String resultCode;
    private final String message;
}
