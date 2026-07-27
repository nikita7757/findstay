package com.findstay.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.findstay.app.Service.UserService;
import com.findstay.app.entity.User;
import com.findstay.app.model.LoginRequestDTO;
import com.findstay.app.model.UserDTO;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService service;


  // Register User
   
    @PostMapping("/register")
public ResponseEntity<?> register(@Valid @RequestBody UserDTO userDTO) {
    return ResponseEntity.ok(service.register(userDTO));
}

        /*  "findstay-backend.onrender.com/users/login-user" */
    // Login User
     

        @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {

    if (loginRequest.getEmail() == null || loginRequest.getEmail().isBlank()) {
        return ResponseEntity.badRequest().body("Email is required");
    }

    if (loginRequest.getPassword() == null || loginRequest.getPassword().isBlank()) {
        return ResponseEntity.badRequest().body("Password is required");
    }

    User user = service.loginUser(
            loginRequest.getEmail(),
            loginRequest.getPassword());

    if (user == null) {
        return ResponseEntity.badRequest().body("Invalid email or password");
    }

    return ResponseEntity.ok(user);
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
