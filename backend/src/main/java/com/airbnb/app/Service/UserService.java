package com.airbnb.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.airbnb.app.dao.UserDao;
import com.airbnb.app.entity.User;


@Service
public class UserService {

      @Autowired
        private UserDao dao;

        public User saveUser(User user) {
        return dao.saveUser(user);
    }

public User loginUser(String email, String password) {

    return dao.loginUser(email, password);

}

  public List<User> getAllUsers() {
        return dao.getAllUsers();
    }

    public User getUserById(@PathVariable Long id) {
        return dao.getUserById(id);
    }


    public String deleteUser(Long id) {
        dao.deleteUser(id);
        return "User deleted successfully";
    }


   
    public User updateUser( Long id,
                               User user) {
        return dao.updateUser(id, user);
    }
}

    
    

