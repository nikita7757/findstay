package com.airbnb.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.airbnb.app.entity.Review;

@Repository
public class ReviewDao {

    @Autowired
    private SessionFactory factory;

    public Review saveReview(Review review) {

        Session session = null;

        try {

            session = factory.openSession();

            session.beginTransaction();

            session.persist(review);

            session.getTransaction().commit();

            return review;

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }

    public List<Review> getAllReviews() {

        Session session = null;

        try {

            session = factory.openSession();

            return session.createQuery(
                    "from Review",
                    Review.class)
                    .list();

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }

    public Review getReviewById(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            return session.get(Review.class, id);

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }

    public Review updateReview(Long id, Review updatedReview) {

        Session session = null;

        try {

            session = factory.openSession();

            Review review = session.get(Review.class, id);

            if (review == null) {
                return null;
            }

            review.setRating(updatedReview.getRating());
            review.setComment(updatedReview.getComment());
            review.setUser(updatedReview.getUser());
            review.setProperty(updatedReview.getProperty());

            session.beginTransaction();

            session.update(review);

            session.getTransaction().commit();

            return review;

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }

    public String deleteReview(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            Review review = session.get(Review.class, id);

            if (review == null) {
                return "Review Not Found";
            }

            session.beginTransaction();

            session.remove(review);

            session.getTransaction().commit();

            return "Review Deleted Successfully";

        } catch (Exception e) {

            e.printStackTrace();
            return "Delete Failed";

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }
}