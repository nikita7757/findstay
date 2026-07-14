package com.airbnb.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.airbnb.app.entity.User;



@Repository
public class UserDao {
    
    @Autowired
    private SessionFactory factory;

    
    
    public User saveUser(User user) {
        Session session = null;
         try {

            session = factory.openSession();

            session.beginTransaction();

            session.save(user);

            session.getTransaction().commit();

            return user;

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }
   public User loginUser(String email, String password) {

    Session session = null;

    try {

        session = factory.openSession();

        User user = session.createQuery(
                "from User where email = :email",
                User.class)
                .setParameter("email", email)
                .uniqueResult();

        if (user != null &&
                user.getPassword().equals(password)) {

            return user;
        }

        return null;

    } catch (Exception e) {

        e.printStackTrace();

        return null;

    } finally {

        if (session != null) {
            session.close();
        }
    }
}

      public List<User> getAllUsers() {
        Session session = null;

        try {

            session = factory.openSession();

            return session.createQuery("from User", User.class).list();

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }

  public User getUserById(Long id) {

    Session session = null;

    try {

        session = factory.openSession();

        User user = session.get(User.class, id);

        return user;

    } catch (Exception e) {

        e.printStackTrace();
        return null;

    } finally {

        if (session != null) {
            session.close();
        }
    }
    }
    public String deleteUser(Long id) {

    Session session = null;

    try {

        session = factory.openSession();

        User user = session.get(User.class, id);

        if (user == null) {
            return "User Not Found";
        }

        session.beginTransaction();

        session.delete(user);

        session.getTransaction().commit();

        return "User Deleted Successfully";

    } catch (Exception e) {

        e.printStackTrace();

        return "Delete Failed";

    } finally {

        if (session != null) {
            session.close();
        }
    }
    }

    public User updateUser(Long id, User updatedUser) {

    Session session = null;

    try {

        session = factory.openSession();

        User existingUser = session.get(User.class, id);

        if (existingUser == null) {
            return null;
        }

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
  

        session.beginTransaction();

        session.update(existingUser);

        session.getTransaction().commit();

        return existingUser;

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