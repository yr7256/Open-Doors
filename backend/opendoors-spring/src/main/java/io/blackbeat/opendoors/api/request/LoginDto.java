package io.blackbeat.opendoors.api.request;

import lombok.Data;

@Data
public class LoginDto {
    private String username;
    private String password;
}
