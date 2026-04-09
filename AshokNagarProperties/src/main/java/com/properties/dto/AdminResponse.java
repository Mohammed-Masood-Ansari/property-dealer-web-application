package com.properties.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminResponse {
    private Long id;
    private String email;
    private boolean verified;
    
    
    
    
	public AdminResponse() {
		super();
	}

	public AdminResponse(Long id, String email, boolean verified) {
		super();
		this.id = id;
		this.email = email;
		this.verified = verified;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public boolean isVerified() {
		return verified;
	}
	public void setVerified(boolean verified) {
		this.verified = verified;
	}
    
    
}
