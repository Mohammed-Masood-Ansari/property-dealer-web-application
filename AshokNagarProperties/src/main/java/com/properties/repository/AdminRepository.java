package com.properties.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.properties.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);
    boolean existsByEmail(String email);
}
