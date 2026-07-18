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

import com.airbnb.app.Service.CategoryService;
import com.airbnb.app.entity.Category;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @PostMapping("/add-category")
    public Category saveCategory(@RequestBody Category category) {
        return service.saveCategory(category);
    }

    @GetMapping("/get-all-categories")
    public List<Category> getAllCategories() {
        return service.getAllCategories();
    }

    @GetMapping("/get-category-by-id/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return service.getCategoryById(id);
    }

    @PutMapping("/update-category/{id}")
    public Category updateCategory(@PathVariable Long id,
                                   @RequestBody Category category) {
        return service.updateCategory(id, category);
    }

    @DeleteMapping("/delete-category/{id}")
    public String deleteCategory(@PathVariable Long id) {
        return service.deleteCategory(id);
    }
}