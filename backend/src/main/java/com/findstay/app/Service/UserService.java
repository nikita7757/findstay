package com.findstay.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.findstay.app.dao.UserDao;
import com.findstay.app.entity.User;
import com.findstay.app.model.UserDTO;


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

    public User register(UserDTO userDTO) {

    User user = new User();

    user.setName(userDTO.getName());
    user.setEmail(userDTO.getEmail());
    user.setPassword(userDTO.getPassword());

    return dao.saveUser(user);
}
}

    
    

