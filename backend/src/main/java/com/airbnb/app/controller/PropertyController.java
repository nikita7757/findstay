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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.airbnb.app.Service.PropertyService;
import com.airbnb.app.entity.Property;


@RestController
@RequestMapping("/properties")
@CrossOrigin(origins = {
    "http://localhost:4200",
    "https://YOUR-VERCEL-PROJECT.vercel.app"
})
public class PropertyController {


    @Autowired
    private PropertyService service;


    @PostMapping("/add-property")
    public Property saveProperty(
            @RequestBody Property property) {

        return service.saveProperty(property);
    }


    @GetMapping("/all")
    public List<Property> getAllProperties() {

        return service.getAllProperties();
    }


    // SEARCH BY LOCATION
    @GetMapping("/search/location")
    public List<Property> searchProperties(
            @RequestParam String location) {

        System.out.println(
                "Searching Location: " + location
        );

        return service.searchProperties(location);
    }


    // GET PROPERTIES OF A HOST
    @GetMapping("/host/{hostId}")
    public List<Property> getPropertiesByHostId(
            @PathVariable Long hostId) {

        return service.getPropertiesByHostId(hostId);
    }


    // GET PROPERTY BY ID
    @GetMapping("/{id}")
    public Property getPropertyById(
            @PathVariable Long id) {

        return service.getPropertyById(id);
    }


    @PutMapping("/{id}")
    public Property updateProperty(
            @PathVariable Long id,
            @RequestBody Property property) {

        return service.updateProperty(
                id,
                property
        );
    }


    @DeleteMapping("/{id}")
    public String deleteProperty(
            @PathVariable Long id) {

        return service.deleteProperty(id);
    }

}