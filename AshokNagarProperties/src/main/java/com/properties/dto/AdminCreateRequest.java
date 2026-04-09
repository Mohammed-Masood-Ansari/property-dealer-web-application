package com.properties.dto;

import lombok.Data;

@Data
public class AdminCreateRequest {
    private String email;
    private String password;
	public AdminCreateRequest(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	public AdminCreateRequest() {
		super();
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    
    
}
