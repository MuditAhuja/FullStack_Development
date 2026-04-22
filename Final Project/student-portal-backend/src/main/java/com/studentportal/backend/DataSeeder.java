package com.studentportal.backend;

import com.studentportal.backend.entity.Role;
import com.studentportal.backend.entity.User;
import com.studentportal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setStudentId("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setName("Portal Admin");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);

            User student = new User();
            student.setStudentId("S12345");
            student.setPassword(passwordEncoder.encode("password123"));
            student.setName("Student");
            student.setRole(Role.STUDENT);
            userRepository.save(student);
        }
    }
}
