package com.properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.properties.repository")
@EntityScan(basePackages = "com.properties.model")

public class AshokNagarPropertiesApplication {

	public static void main(String[] args) {
		SpringApplication.run(AshokNagarPropertiesApplication.class, args);
	}

}
