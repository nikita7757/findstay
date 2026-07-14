package com.airbnb.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airbnb.app.dao.WishlistDao;
import com.airbnb.app.entity.Wishlist;


@Service
public class WishlistService {

    @Autowired
    private WishlistDao dao;

    public Wishlist addToWishlist(
            int userId,
            Long propertyId) {

        return dao.addToWishlist(
                userId,
                propertyId
        );
    }

    public List<Wishlist> getWishlistByUserId(
            int userId) {

        return dao.getWishlistByUserId(
                userId
        );
    }

    public boolean isPropertyWishlisted(
            int userId,
            Long propertyId) {

        return dao.isPropertyWishlisted(
                userId,
                propertyId
        );
    }

    public String removeFromWishlist(
            int userId,
            Long propertyId) {

        return dao.removeFromWishlist(
                userId,
                propertyId
        );
    }
}