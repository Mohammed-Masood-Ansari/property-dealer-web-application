package com.properties.dto;

import lombok.Data;

@Data
public class AdminCreateRequest {
    private String email;
    private String password;
}
