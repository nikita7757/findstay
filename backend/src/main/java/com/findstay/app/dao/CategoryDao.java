package com.findstay.app.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.findstay.app.entity.Category;

@Repository
public class CategoryDao {

    @Autowired
    private SessionFactory factory;


    public Category saveCategory(Category category) {

        Session session = null;

        try {

            session = factory.openSession();

            session.beginTransaction();

            session.persist(category);

            session.getTransaction().commit();

            return category;

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }


    public List<Category> getAllCategories() {

        Session session = null;

        try {

            session = factory.openSession();

            return session
                    .createQuery(
                            "from Category",
                            Category.class
                    )
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


    public Category getCategoryById(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            return session.get(
                    Category.class,
                    id
            );

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }


    public Category updateCategory(
            Long id,
            Category updatedCategory) {

        Session session = null;

        try {

            session = factory.openSession();

            Category category =
                    session.get(
                            Category.class,
                            id
                    );

            if (category == null) {

                return null;
            }

            session.beginTransaction();

            category.setTitle(
                    updatedCategory.getTitle()
            );

            category.setDescription(
                    updatedCategory.getDescription()
            );

            session.merge(category);

            session.getTransaction().commit();

            return category;

        } catch (Exception e) {

            e.printStackTrace();

            return null;

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }


    public String deleteCategory(Long id) {

        Session session = null;

        try {

            session = factory.openSession();

            Category category =
                    session.get(
                            Category.class,
                            id
                    );

            if (category == null) {

                return "Category Not Found";
            }

            session.beginTransaction();

            session.remove(category);

            session.getTransaction().commit();

            return "Category Deleted Successfully";

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
