package com.properties.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.properties.dto.BookingRequest;
import com.properties.model.Booking;
import com.properties.model.BookingStatus;
import com.properties.repository.BookingRepository;
import com.properties.service.BookingService;

import jakarta.validation.constraints.Email;

@RestController
@RequestMapping("/bookings")
public class PublicBookingController {

    private final BookingService bookingService;

    public PublicBookingController(BookingService bookingService, BookingRepository bookingRepo) {
        this.bookingService = bookingService;
		this.bookingRepo = bookingRepo;
    }

    // 🔓 CREATE BOOKING (USER)
//    @PostMapping
//    public List<Booking> create(@RequestBody BookingRequest request) {
//        return bookingService.getAllBookings();
//    }
    private final BookingRepository bookingRepo;
    
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest req) {

        Booking booking = new Booking();

        booking.setUserId(req.getUserId());
        booking.setName(req.getName());
        booking.setEmail(req.getEmail());
        booking.setPhone(req.getPhone());

        booking.setPropertyId(req.getPropertyId());
        booking.setPropertyTitle(req.getPropertyTitle());
        booking.setPropertyImage(req.getPropertyImage());

        booking.setVisitDate(req.getVisitDate());
        booking.setVisitTime(req.getVisitTime());
        
        booking.setMessage(req.getMessage());
        booking.setStatus(BookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());

        return ResponseEntity.ok(bookingRepo.save(booking));
    }
    
    
    
    
    // 🔓 USER BOOKINGS
    @GetMapping("/user/{email}")
    public List<Booking> userBookings(@PathVariable String email) {
    	return bookingRepo.findByEmail(email);
    }
    
    // Delete Bookings 
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        bookingRepo.deleteById(id);
        return ResponseEntity.ok("Booking cancelled");
    }

}
