package com.airbnb.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airbnb.app.dao.PropertyDao;
import com.airbnb.app.dao.PropertyImageDao;
import com.airbnb.app.entity.Property;
import com.airbnb.app.entity.PropertyImage;

@Service
public class PropertyImageService {

    @Autowired
    private PropertyImageDao dao;

    @Autowired
    private PropertyDao propertyDao;


    public PropertyImage savePropertyImage(
            PropertyImage propertyImage) {

        if (propertyImage.getProperty() == null ||
            propertyImage.getProperty().getId() == null) {

            System.out.println(
                "Property ID missing for image"
            );

            return null;
        }

        Long propertyId =
                propertyImage
                .getProperty()
                .getId();

        System.out.println(
            "Image Property ID: " + propertyId
        );

        Property property =
                propertyDao.getPropertyById(
                    propertyId
                );

        if (property == null) {

            System.out.println(
                "Property not found: " + propertyId
            );

            return null;
        }

        propertyImage.setProperty(property);

        return dao.savePropertyImage(
            propertyImage
        );
    }


    public List<PropertyImage> getAllPropertyImages() {

        return dao.getAllPropertyImages();
    }


    public PropertyImage getPropertyImageById(Long id) {

        return dao.getPropertyImageById(id);
    }


    public PropertyImage updatePropertyImage(
            Long id,
            PropertyImage propertyImage) {

        return dao.updatePropertyImage(
            id,
            propertyImage
        );
    }


    public String deletePropertyImage(Long id) {

        return dao.deletePropertyImage(id);
    }

    public List<PropertyImage> getImagesByPropertyId(
        Long propertyId) {

    return dao.getImagesByPropertyId(
            propertyId
    );
}
}