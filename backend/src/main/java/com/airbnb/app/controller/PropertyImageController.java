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

import com.airbnb.app.Service.PropertyImageService;
import com.airbnb.app.entity.PropertyImage;

@RestController
@RequestMapping("/property-images")
@CrossOrigin(origins = {
    "http://localhost:4200",
    "https://YOUR-VERCEL-PROJECT.vercel.app"
})
public class PropertyImageController {

    @Autowired
    private PropertyImageService service;


    @PostMapping
    public PropertyImage savePropertyImage(
            @RequestBody PropertyImage propertyImage) {

        return service.savePropertyImage(propertyImage);
    }


    @GetMapping
    public List<PropertyImage> getAllPropertyImages() {

        return service.getAllPropertyImages();
    }


    @GetMapping("/{id}")
    public PropertyImage getPropertyImageById(
            @PathVariable Long id) {

        return service.getPropertyImageById(id);
    }


    // GET IMAGES OF ONE PROPERTY

    @GetMapping("/property/{propertyId}")
    public List<PropertyImage> getImagesByPropertyId(
            @PathVariable Long propertyId) {

        return service.getImagesByPropertyId(
                propertyId
        );
    }


    @PutMapping("/{id}")
    public PropertyImage updatePropertyImage(
            @PathVariable Long id,
            @RequestBody PropertyImage propertyImage) {

        return service.updatePropertyImage(
                id,
                propertyImage
        );
    }


    @DeleteMapping("/{id}")
    public String deletePropertyImage(
            @PathVariable Long id) {

        return service.deletePropertyImage(id);
    }

}