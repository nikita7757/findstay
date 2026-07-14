package com.airbnb.app.model;
import java.time.LocalDate;



public class BookingDTO {

    private Long bookingId;
    private Long propertyId;
    private Long userId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;

    public BookingDTO() {
    }

    public BookingDTO(Long bookingId, Long propertyId, Long userId,
                      LocalDate checkInDate, LocalDate checkOutDate) {
        this.bookingId = bookingId;
        this.propertyId = propertyId;
        this.userId = userId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
}
