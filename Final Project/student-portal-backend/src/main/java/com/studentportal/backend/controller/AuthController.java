package com.studentportal.backend.controller;

import com.studentportal.backend.dto.AuthRequest;
import com.studentportal.backend.dto.AuthResponse;
import com.studentportal.backend.entity.User;
import com.studentportal.backend.repository.UserRepository;
import com.studentportal.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getStudentId(), authRequest.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getStudentId());
        final String jwt = jwtUtil.generateToken(userDetails);
        
        User user = userRepository.findByStudentId(authRequest.getStudentId()).orElseThrow();

        return ResponseEntity.ok(new AuthResponse(jwt, user.getRole().name(), user.getName()));
    }
}
