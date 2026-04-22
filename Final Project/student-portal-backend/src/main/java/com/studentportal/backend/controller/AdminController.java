package com.studentportal.backend.controller;

import com.studentportal.backend.entity.Announcement;
import com.studentportal.backend.entity.Result;
import com.studentportal.backend.entity.Role;
import com.studentportal.backend.entity.User;
import com.studentportal.backend.repository.AnnouncementRepository;
import com.studentportal.backend.repository.ResultRepository;
import com.studentportal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/announcements")
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        return ResponseEntity.ok(announcementRepository.save(announcement));
    }

    @PostMapping("/students")
    public ResponseEntity<User> createStudent(@RequestBody User student) {
        student.setRole(Role.STUDENT);
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return ResponseEntity.ok(userRepository.save(student));
    }

    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        return ResponseEntity.ok(userRepository.findAll().stream().filter(u -> u.getRole() == Role.STUDENT).toList());
    }

    @PostMapping("/students/{studentId}/results")
    public ResponseEntity<Result> addResult(@PathVariable Long studentId, @RequestBody Result result) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        result.setStudent(student);
        return ResponseEntity.ok(resultRepository.save(result));
    }
}
