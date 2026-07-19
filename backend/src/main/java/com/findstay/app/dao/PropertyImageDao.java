package com.findstay.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.findstay.app.entity.PropertyImage;

@Repository
public class PropertyImageDao {

    @Autowired
    private SessionFactory factory;


    // SAVE PROPERTY IMAGE
    public PropertyImage savePropertyImage(PropertyImage propertyImage) {

        Session session = null;

        try {

            session = factory.openSession();

            session.beginTransaction();

            session.persist(propertyImage);

            session.getTransaction().commit();

            return propertyImage;

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }

        }

    }


    // GET ALL PROPERTY IMAGES
    public List<PropertyImage> getAllPropertyImages() {

        Session session = null;

        try {

            session = factory.openSession();

            return session
                    .createQuery(
                            "from PropertyImage",
                            PropertyImage.class)
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


    // GET PROPERTY IMAGE BY ID
    public PropertyImage getPropertyImageById(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            return session.get(PropertyImage.class, id);

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }

        }

    }


    // GET IMAGES BY PROPERTY ID
    public List<PropertyImage> getImagesByPropertyId(Long propertyId) {

        Session session = null;

        try {

            session = factory.openSession();

            return session.createQuery(
                    "from PropertyImage where property.id = :propertyId",
                    PropertyImage.class)
                    .setParameter("propertyId", propertyId)
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


    // GET PROPERTY IMAGES BY SECTION
    public List<PropertyImage> getImagesBySection(
            Long propertyId,
            String sectionName) {

        Session session = null;

        try {

            session = factory.openSession();

            return session.createQuery(
                    "from PropertyImage "
                    + "where property.id = :propertyId "
                    + "and sectionName = :sectionName",
                    PropertyImage.class)
                    .setParameter("propertyId", propertyId)
                    .setParameter("sectionName", sectionName)
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


    // UPDATE PROPERTY IMAGE
    public PropertyImage updatePropertyImage(
            Long id,
            PropertyImage updatedImage) {

        Session session = null;

        try {

            session = factory.openSession();

            PropertyImage existingImage =
                    session.get(PropertyImage.class, id);

            if (existingImage == null) {
                return null;
            }

           
            existingImage.setImageUrl(
                    updatedImage.getImageUrl());

            existingImage.setSectionName(
                    updatedImage.getSectionName());

            existingImage.setProperty(
                    updatedImage.getProperty());

            session.beginTransaction();

            session.merge(existingImage);

            session.getTransaction().commit();

            return existingImage;

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }

        }

    }


    // DELETE PROPERTY IMAGE
    public String deletePropertyImage(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            PropertyImage image =
                    session.get(PropertyImage.class, id);

            if (image == null) {
                return "Property Image Not Found";
            }

            session.beginTransaction();

            session.remove(image);

            session.getTransaction().commit();

            return "Property Image Deleted Successfully";

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
