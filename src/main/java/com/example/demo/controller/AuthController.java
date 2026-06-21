package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userService.registerUser(user);
    }
   @PostMapping("/login")
public LoginResponse login(
        @RequestBody LoginRequest request) {

    String token = userService.loginUser(
            request.getEmail(),
            request.getPassword()
    );

    return new LoginResponse(token);

}
}