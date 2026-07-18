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

import com.airbnb.app.Service.ReviewService;
import com.airbnb.app.entity.Review;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService service;

    @PostMapping("/add-review")
    public Review saveReview(@RequestBody Review review) {
        return service.saveReview(review);
    }

    @GetMapping("/get-all-reviews")
    public List<Review> getAllReviews() {
        return service.getAllReviews();
    }

    @GetMapping("/get-review-by-id/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return service.getReviewById(id);
    }

    @PutMapping("/update-review/{id}")
    public Review updateReview(@PathVariable Long id,
                               @RequestBody Review review) {
        return service.updateReview(id, review);
    }

    @DeleteMapping("/delete-review/{id}")
    public String deleteReview(@PathVariable Long id) {
        return service.deleteReview(id);
    }
}