package com.findstay.app.model;


public class PropertyDTO {

    private Long id;
    private String title;
    private String location;
    private Double pricePerNight;

    public PropertyDTO() {
    }

    public PropertyDTO(Long id, String title, String location, Double pricePerNight) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.pricePerNight = pricePerNight;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(Double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }
}
