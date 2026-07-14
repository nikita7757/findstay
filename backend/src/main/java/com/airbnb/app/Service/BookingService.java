package com.airbnb.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airbnb.app.dao.BookingDao;
import com.airbnb.app.entity.Booking;

@Service
public class BookingService {

    @Autowired
    private BookingDao dao;

    public Booking saveBooking(Booking booking) {
        return dao.saveBooking(booking);
    }

    public List<Booking> getAllBookings() {
        return dao.getAllBookings();
    }
    public List<Booking> getBookingsByUserId(
        int userId) {

    return dao.getBookingsByUserId(
        userId
    );

}
    public Booking getBookingById(Long id) {
        return dao.getBookingById(id);
    }

    public String deleteBooking(Long id) {
        return dao.deleteBooking(id);
    }
    public Booking updateBooking(Long id, Booking booking) {
    return dao.updateBooking(id, booking);
    }

    public List<Object[]> getPopularDestinations() {

    return dao.getPopularDestinations();

}

public List<Object[]> getPopularProperties() {

    return dao.getPopularProperties();

}

}