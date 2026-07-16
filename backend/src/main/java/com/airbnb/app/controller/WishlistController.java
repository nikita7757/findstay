package com.airbnb.app.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airbnb.app.Service.WishlistService;
import com.airbnb.app.entity.Wishlist;


@RestController
@RequestMapping("/wishlist")
@CrossOrigin(origins = {
    "http://localhost:4200",
    "https://YOUR-VERCEL-PROJECT.vercel.app"
})
public class WishlistController {


    @Autowired
    private WishlistService service;



    /*
     * ADD PROPERTY TO WISHLIST
     *
     * POST:
     *
     * /wishlist/add/3/1
     */

    @PostMapping(
        "/add/{userId}/{propertyId}"
    )
    public Wishlist addToWishlist(

        @PathVariable
        int userId,

        @PathVariable
        Long propertyId

    ) {


        return service
            .addToWishlist(
                userId,
                propertyId
            );

    }



    /*
     * GET USER WISHLIST
     *
     * GET:
     *
     * /wishlist/user/3
     */

    @GetMapping(
        "/user/{userId}"
    )
    public List<Wishlist>
        getWishlistByUserId(

            @PathVariable
            int userId

        ) {


        return service
            .getWishlistByUserId(
                userId
            );

    }



    /*
     * CHECK IF PROPERTY
     * IS SAVED
     *
     * GET:
     *
     * /wishlist/check/3/1
     */

    @GetMapping(
        "/check/{userId}/{propertyId}"
    )
    public boolean
        isPropertyWishlisted(

            @PathVariable
            int userId,

            @PathVariable
            Long propertyId

        ) {


        return service
            .isPropertyWishlisted(
                userId,
                propertyId
            );

    }



    /*
     * REMOVE FROM WISHLIST
     *
     * DELETE:
     *
     * /wishlist/remove/3/1
     */

    @DeleteMapping(
        "/remove/{userId}/{propertyId}"
    )
    public String removeFromWishlist(

        @PathVariable
        int userId,

        @PathVariable
        Long propertyId

    ) {


        return service
            .removeFromWishlist(
                userId,
                propertyId
            );

    }

}