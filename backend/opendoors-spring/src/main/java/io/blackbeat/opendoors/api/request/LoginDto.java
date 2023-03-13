package io.blackbeat.opendoors.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class LoginDto {
    @NotNull
    private String username;

    @NotNull
    private String password;

}
