package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

   private final UserRepository userRepository;
   private final PasswordEncoder passwordEncoder;
   private final JwtService jwtService;

   public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtService jwtService) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
}

    public User registerUser(User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword())
);

return userRepository.save(user);
    }
    public String loginUser(String email, String password) {

    User user = userRepository
            .findByEmail(email)
            .orElseThrow(() ->
                new RuntimeException("User not found"));

    if (!passwordEncoder.matches(
            password,
            user.getPassword())) {

        throw new RuntimeException(
                "Invalid password");
    }

   return jwtService.generateToken(
        user.getEmail()
);
}
}
