package com.airbnb.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airbnb.app.dao.ReviewDao;
import com.airbnb.app.entity.Review;

@Service
public class ReviewService {

    @Autowired
    private ReviewDao dao;

    public Review saveReview(Review review) {
        return dao.saveReview(review);
    }

    public List<Review> getAllReviews() {
        return dao.getAllReviews();
    }

    public Review getReviewById(Long id) {
        return dao.getReviewById(id);
    }

    public Review updateReview(Long id, Review review) {
        return dao.updateReview(id, review);
    }

    public String deleteReview(Long id) {
        return dao.deleteReview(id);
    }
}