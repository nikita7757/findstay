package com.airbnb.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airbnb.app.Service.BookingService;
import com.airbnb.app.entity.Booking;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = {
    "http://localhost:4200",
    "https://findstay.vercel.app"
})

public class BookingController {

    @Autowired
    private BookingService service;

    @PostMapping("/create-booking")
    public Booking saveBooking(@RequestBody Booking booking) {
        return service.saveBooking(booking);
    }


    @GetMapping("/get-all-bookings")
    public List<Booking> getAllBookings() {
        return service.getAllBookings();
    }

    @GetMapping("/get-booking-by-id/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return service.getBookingById(id);
    }

    @GetMapping("/user/{userId}")
public List<Booking> getBookingsByUserId(
        @PathVariable int userId) {

    return service.getBookingsByUserId(
        userId
    );

}
@GetMapping("/popular-destinations")
public List<Object[]> getPopularDestinations() {

    return service.getPopularDestinations();

}

    @PutMapping("/update-booking/{id}")
    public Booking updateBooking(@PathVariable Long id,
                             @RequestBody Booking booking) {
    return service.updateBooking(id, booking);
}

    @DeleteMapping("/cancel-booking/{id}")
    public String deleteBooking(@PathVariable Long id) {
        return service.deleteBooking(id);
    }

    @GetMapping("/popular-properties")
public List<Object[]> getPopularProperties() {

    return service.getPopularProperties();

}

}