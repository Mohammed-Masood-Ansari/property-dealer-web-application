package com.properties.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminResponse {
    private Long id;
    private String email;
    private boolean verified;
}
