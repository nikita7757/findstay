package com.findstay.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.findstay.app.dao.CategoryDao;
import com.findstay.app.entity.Category;

@Service
public class CategoryService {

    @Autowired
    private CategoryDao dao;

    public Category saveCategory(Category category) {
        return dao.saveCategory(category);
    }

    public List<Category> getAllCategories() {
        return dao.getAllCategories();
    }

    public Category getCategoryById(Long id) {
        return dao.getCategoryById(id);
    }

    public Category updateCategory(Long id, Category category) {
        return dao.updateCategory(id, category);
    }

    public String deleteCategory(Long id) {
        return dao.deleteCategory(id);
    }
}
