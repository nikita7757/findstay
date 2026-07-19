package com.findstay.app.dao;


import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.findstay.app.entity.Property;
import com.findstay.app.entity.User;
import com.findstay.app.entity.Wishlist;


@Repository
public class WishlistDao {


    @Autowired
    private SessionFactory factory;



    /*
     * ADD PROPERTY TO WISHLIST
     */

    public Wishlist addToWishlist(
        int userId,
        Long propertyId
    ) {


        Session session = null;


        try {


            session =
                factory.openSession();


            session.beginTransaction();



            User user =
                session.get(
                    User.class,
                    userId
                );


            Property property =
                session.get(
                    Property.class,
                    propertyId
                );



            if (
                user == null ||
                property == null
            ) {


                session
                    .getTransaction()
                    .rollback();


                return null;

            }



            /*
             * CHECK IF PROPERTY
             * IS ALREADY SAVED
             */

            Wishlist existingWishlist =

                session.createQuery(

                    "from Wishlist "
                    + "where user.userId = :userId "
                    + "and property.id = :propertyId",

                    Wishlist.class

                )

                .setParameter(
                    "userId",
                    userId
                )

                .setParameter(
                    "propertyId",
                    propertyId
                )

                .uniqueResult();



            if (
                existingWishlist != null
            ) {


                session
                    .getTransaction()
                    .commit();


                return existingWishlist;

            }



            Wishlist wishlist =
                new Wishlist();


            wishlist.setUser(
                user
            );


            wishlist.setProperty(
                property
            );


            session.persist(
                wishlist
            );


            session
                .getTransaction()
                .commit();


            return wishlist;


        } catch (
            Exception e
        ) {


            e.printStackTrace();


            if (
                session != null &&
                session
                    .getTransaction()
                    .isActive()
            ) {

                session
                    .getTransaction()
                    .rollback();

            }


            return null;


        } finally {


            if (
                session != null
            ) {

                session.close();

            }

        }

    }



    /*
     * GET ALL WISHLIST ITEMS
     * OF A USER
     */

    public List<Wishlist>
        getWishlistByUserId(
            int userId
        ) {


        Session session = null;


        try {


            session =
                factory.openSession();


            return session
                .createQuery(

                    "from Wishlist "
                    + "where user.userId = :userId "
                    + "order by id desc",

                    Wishlist.class

                )

                .setParameter(
                    "userId",
                    userId
                )

                .list();


        } catch (
            Exception e
        ) {


            e.printStackTrace();


            return null;


        } finally {


            if (
                session != null
            ) {

                session.close();

            }

        }

    }



    /*
     * CHECK IF PROPERTY
     * EXISTS IN WISHLIST
     */

    public boolean isPropertyWishlisted(
        int userId,
        Long propertyId
    ) {


        Session session = null;


        try {


            session =
                factory.openSession();


            Long count =

                session.createQuery(

                    "select count(w.id) "
                    + "from Wishlist w "
                    + "where w.user.userId = :userId "
                    + "and w.property.id = :propertyId",

                    Long.class

                )

                .setParameter(
                    "userId",
                    userId
                )

                .setParameter(
                    "propertyId",
                    propertyId
                )

                .uniqueResult();


            return (
                count != null &&
                count > 0
            );


        } catch (
            Exception e
        ) {


            e.printStackTrace();


            return false;


        } finally {


            if (
                session != null
            ) {

                session.close();

            }

        }

    }



    /*
     * REMOVE PROPERTY
     * FROM WISHLIST
     */

    public String removeFromWishlist(
        int userId,
        Long propertyId
    ) {


        Session session = null;


        try {


            session =
                factory.openSession();


            session.beginTransaction();



            Wishlist wishlist =

                session.createQuery(

                    "from Wishlist "
                    + "where user.userId = :userId "
                    + "and property.id = :propertyId",

                    Wishlist.class

                )

                .setParameter(
                    "userId",
                    userId
                )

                .setParameter(
                    "propertyId",
                    propertyId
                )

                .uniqueResult();



            if (
                wishlist == null
            ) {


                session
                    .getTransaction()
                    .rollback();


                return
                    "Wishlist Item Not Found";

            }



            session.remove(
                wishlist
            );


            session
                .getTransaction()
                .commit();


            return
                "Property Removed From Wishlist";


        } catch (
            Exception e
        ) {


            e.printStackTrace();


            if (
                session != null &&
                session
                    .getTransaction()
                    .isActive()
            ) {

                session
                    .getTransaction()
                    .rollback();

            }


            return
                "Failed To Remove Property";


        } finally {


            if (
                session != null
            ) {

                session.close();

            }

        }

    }

}
