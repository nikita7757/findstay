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

import com.airbnb.app.Service.UserService;
import com.airbnb.app.entity.User;
import com.airbnb.app.model.LoginRequestDTO;


@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService service;


  // Register User
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return service.saveUser(user);
    }

        /*  "findstay-backend.onrender.com/users/login-user" */
    // Login User
        @PostMapping("/login")
        public User loginUser(
                @RequestBody LoginRequestDTO loginRequest) {

            return service.loginUser(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );
        }
    @GetMapping("/get-all-user")
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

       @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return service.getUserById(id);
    }

      @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return "User deleted successfully";
    }


    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,
                              @RequestBody User user) {
        return service.updateUser(id, user);
    }
}
