package com.findstay.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.findstay.app.entity.Property;

@Repository
public class PropertyDao {

    @Autowired
    private SessionFactory factory;

    
    public Property saveProperty(Property property) {

        Session session = null;

        try {

            session = factory.openSession();

            session.beginTransaction();

            session.persist(property);

            session.getTransaction().commit();

            return property;

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }

    public List<Property> getAllProperties() {

        Session session = null;

        try {

            session = factory.openSession();

            return session.createQuery(
                    "from Property",
                    Property.class)
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

    public Property getPropertyById(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            return session.get(Property.class, id);

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }

    public Property updateProperty(
        Long id,
        Property updatedProperty) {

    Session session = null;

    try {

        session = factory.openSession();

        Property property =
            session.get(
                Property.class,
                id
            );


        if (property == null) {

            return null;
        }


        session.beginTransaction();


        property.setTitle(
            updatedProperty.getTitle()
        );

        property.setDescription(
            updatedProperty.getDescription()
        );

        property.setLocation(
            updatedProperty.getLocation()
        );

        property.setPricePerNight(
            updatedProperty.getPricePerNight()
        );

        property.setBedrooms(
            updatedProperty.getBedrooms()
        );

        property.setBathrooms(
            updatedProperty.getBathrooms()
        );

        property.setAvailable(
            updatedProperty.isAvailable()
        );

        property.setCategory(
            updatedProperty.getCategory()
        );


        session.merge(property);


        session.getTransaction().commit();


        return property;

    } catch (Exception e) {

        e.printStackTrace();

        return null;

    } finally {

        if (session != null) {

            session.close();
        }
    }
}

    public String deleteProperty(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            Property property =
                    session.get(Property.class, id);

            if (property == null) {
                return "Property Not Found";
            }

            session.beginTransaction();

            session.remove(property);

            session.getTransaction().commit();

            return "Property Deleted Successfully";

        } catch (Exception e) {

            e.printStackTrace();

            return "Delete Failed";

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }
public List<Property> searchProperties(String location) {

    Session session = null;

    try {

        session = factory.openSession();

        return session.createQuery(
                "from Property where lower(location) like lower(:location)",
                Property.class)
                .setParameter("location", "%" + location + "%")
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
public List<Property> getPropertiesByHostId(Long hostId) {

    Session session = null;

    try {

        session = factory.openSession();

        return session.createQuery(
                "from Property where host.userId = :hostId",
                Property.class)
                .setParameter("hostId", hostId)
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
