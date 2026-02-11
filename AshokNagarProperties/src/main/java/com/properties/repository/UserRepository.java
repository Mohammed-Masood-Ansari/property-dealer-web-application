package com.properties.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.properties.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByDest(String dest);
    Optional<User> findByEmail(String email);
    Optional<User> findByRefreshToken(String refreshToken);
    Optional<User> findByPhone(String phone);

}
