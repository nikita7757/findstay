package com.airbnb.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import com.airbnb.app.entity.Booking;
import com.airbnb.app.entity.Property;
import com.airbnb.app.entity.User;

@Repository
@RequestMapping("/bookings")

public class BookingDao {

    @Autowired
    private SessionFactory factory;

    public Booking saveBooking(Booking booking) {

    Session session = null;

    try {

        session = factory.openSession();

        session.beginTransaction();


        if (
    booking.getUser() == null ||
    booking.getUser().getUserId() <= 0
        ) {

            throw new RuntimeException(
                "User ID is required"
            );

        }


        if (
            booking.getProperty() == null ||
            booking.getProperty().getId() == null
        ) {

            throw new RuntimeException(
                "Property ID is required"
            );

        }


        User user = session.get(
            User.class,
            booking.getUser().getUserId()
        );


        Property property = session.get(
            Property.class,
            booking.getProperty().getId()
        );


        if (user == null) {

            throw new RuntimeException(
                "User not found"
            );

        }


        if (property == null) {

            throw new RuntimeException(
                "Property not found"
            );

        }


        booking.setUser(user);

        booking.setProperty(property);

        booking.setStatus("CONFIRMED");


        session.persist(booking);


        session.getTransaction().commit();


        return booking;

    } catch (Exception e) {

        if (
            session != null &&
            session.getTransaction().isActive()
        ) {

            session.getTransaction().rollback();

        }


        e.printStackTrace();

        return null;

    } finally {

        if (session != null) {

            session.close();

        }

    }

}

    public List<Booking> getAllBookings() {

        Session session = null;

        try {

            session = factory.openSession();

            return session.createQuery(
                    "from Booking",
                    Booking.class)
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
    public List<Booking> getBookingsByUserId(
        int userId) {

    Session session = null;

    try {

        session = factory.openSession();

        return session.createQuery(
                "from Booking where user.userId = :userId order by id desc",
                Booking.class
            )
            .setParameter("userId", userId)
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
    public Booking getBookingById(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            return session.get(Booking.class, id);

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }

    public String deleteBooking(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            Booking booking = session.get(Booking.class, id);

            if (booking == null) {
                return "Booking Not Found";
            }

            session.beginTransaction();

            session.remove(booking);

            session.getTransaction().commit();

            return "Booking Deleted Successfully";

        } catch (Exception e) {

            e.printStackTrace();
            return "Delete Failed";

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }
    public Booking updateBooking(Long id, Booking updatedBooking) {

    Session session = null;

    try {

        session = factory.openSession();

        Booking booking = session.get(Booking.class, id);

        if (booking == null) {
            return null;
        }

        booking.setCheckInDate(updatedBooking.getCheckInDate());
        booking.setCheckOutDate(updatedBooking.getCheckOutDate());
        booking.setGuests(updatedBooking.getGuests());
        booking.setTotalPrice(updatedBooking.getTotalPrice());
        booking.setStatus(updatedBooking.getStatus());

        booking.setUser(updatedBooking.getUser());
        booking.setProperty(updatedBooking.getProperty());

        session.beginTransaction();

        session.update(booking);

        session.getTransaction().commit();

        return booking;

    } catch (Exception e) {

        e.printStackTrace();
        return null;

    } finally {

        if (session != null) {
            session.close();
        }
    }
    }

    public List<Object[]> getPopularDestinations() {

    Session session = null;

    try {

        session = factory.openSession();

        return session.createQuery(
            "select b.property.location, count(b.id) " +
            "from Booking b " +
            "group by b.property.location " +
            "order by count(b.id) desc",
            Object[].class
        )
        .setMaxResults(4)
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

public List<Object[]> getPopularProperties() {

    Session session = null;

    try {

        session = factory.openSession();

        return session.createQuery(
            """
            select b.property.id,
                   b.property.title,
                   b.property.location,
                   count(b.id)
            from Booking b
            group by b.property.id,
                     b.property.title,
                     b.property.location
            order by count(b.id) desc
            """,
            Object[].class
        )
        .setMaxResults(4)
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
}