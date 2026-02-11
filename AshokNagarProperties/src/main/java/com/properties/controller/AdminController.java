package com.properties.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.properties.dto.AdminCreateRequest;
import com.properties.dto.AdminLoginRequest;
import com.properties.dto.AdminResponse;
import com.properties.dto.AdminUpdateRequest;
import com.properties.dto.AuthResponse;
import com.properties.model.Booking;
import com.properties.model.BookingStatus;
import com.properties.model.User;
import com.properties.repository.BookingRepository;
import com.properties.service.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    private BookingRepository bookingRepo;
    
    // 🔐 CREATE ADMIN (TEMP / SUPER ADMIN ONLY)
    @PostMapping("/create")
    public ResponseEntity<AdminResponse> createAdmin(
            @RequestBody AdminCreateRequest request
    ) {
        return ResponseEntity.ok(adminService.createAdmin(request));
    }
    
    @PutMapping("/approve/{id}")
    public void approve(@PathVariable Long id) {
        Booking b = bookingRepo.findById(id).orElseThrow();
        b.setStatus(BookingStatus.APPROVED);
        bookingRepo.save(b);
    }

    @PutMapping("/reject/{id}")
    public void reject(@PathVariable Long id) {
        Booking b = bookingRepo.findById(id).orElseThrow();
        b.setStatus(BookingStatus.REJECTED);
        bookingRepo.save(b);
    }
    
    // 🔓 ADMIN LOGIN
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AdminLoginRequest request) {
        return adminService.login(request);
    }

    // 🔐 UPDATE ADMIN (EMAIL / PASSWORD)
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAdmin(
            @PathVariable Long id,
            @RequestBody AdminUpdateRequest req
    ) {
        adminService.updateAdmin(id, req);
        return ResponseEntity.ok("Admin updated successfully");
    }

    /* ---------- USERS ---------- */

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<User> getUsers() {
        return adminService.getAllUsers();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
    }


    /* ---------- IMAGE UPLOAD ---------- */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/upload")
    public List<String> upload(
            @RequestParam("file") MultipartFile[] files
    ) {
        return adminService.uploadImages(files);
    }

}
