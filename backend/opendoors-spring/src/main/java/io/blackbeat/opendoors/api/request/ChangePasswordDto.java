package io.blackbeat.opendoors.api.request;

import lombok.Data;

@Data
public class ChangePasswordDto {
    private String beforePassword;
    private String newPassword;
}
