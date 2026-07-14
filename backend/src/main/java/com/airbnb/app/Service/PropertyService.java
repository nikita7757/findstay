package com.airbnb.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airbnb.app.dao.CategoryDao;
import com.airbnb.app.dao.PropertyDao;
import com.airbnb.app.dao.UserDao;
import com.airbnb.app.entity.Category;
import com.airbnb.app.entity.Property;
import com.airbnb.app.entity.User;

@Service
public class PropertyService {

    @Autowired
    private PropertyDao dao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private CategoryDao categoryDao;


    public Property saveProperty(Property property) {

        if (property.getHost() == null) {

            System.out.println(
                "Property owner is null"
            );

            return null;
        }


        Long userId = Long.valueOf(
            property.getHost().getUserId()
        );


        User user =
            userDao.getUserById(userId);


        if (user == null) {

            System.out.println(
                "User not found: " + userId
            );

            return null;
        }


        property.setHost(user);


        if (
            property.getCategory() == null ||
            property.getCategory().getId() == null
        ) {

            System.out.println(
                "Category not selected"
            );

            return null;
        }


        Long categoryId =
            property.getCategory().getId();


        Category category =
            categoryDao.getCategoryById(
                categoryId
            );


        if (category == null) {

            System.out.println(
                "Category not found: "
                + categoryId
            );

            return null;
        }


        property.setCategory(category);


        return dao.saveProperty(
            property
        );
    }


    public List<Property> getAllProperties() {

        return dao.getAllProperties();
    }


    public Property getPropertyById(
            Long id) {

        return dao.getPropertyById(id);
    }


    public Property updateProperty(
            Long id,
            Property property) {


        if (
            property.getCategory() == null ||
            property.getCategory().getId() == null
        ) {

            System.out.println(
                "Category not selected"
            );

            return null;
        }


        Long categoryId =
            property.getCategory().getId();


        Category category =
            categoryDao.getCategoryById(
                categoryId
            );


        if (category == null) {

            System.out.println(
                "Category not found: "
                + categoryId
            );

            return null;
        }


        property.setCategory(category);


        return dao.updateProperty(
            id,
            property
        );
    }


    public String deleteProperty(
            Long id) {

        return dao.deleteProperty(id);
    }


    public List<Property> searchProperties(
            String location) {

        return dao.searchProperties(
            location
        );
    }


    public List<Property> getPropertiesByHostId(
            Long hostId) {

        return dao.getPropertiesByHostId(
            hostId
        );
    }

}