package com.studentportal.backend.controller;

import com.studentportal.backend.entity.Announcement;
import com.studentportal.backend.entity.Result;
import com.studentportal.backend.entity.TimetableEntry;
import com.studentportal.backend.entity.User;
import com.studentportal.backend.repository.AnnouncementRepository;
import com.studentportal.backend.repository.ResultRepository;
import com.studentportal.backend.repository.TimetableEntryRepository;
import com.studentportal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private TimetableEntryRepository timetableEntryRepository;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/results")
    public ResponseEntity<List<Result>> getResults(Authentication authentication) {
        User user = userRepository.findByStudentId(authentication.getName()).orElseThrow();
        return ResponseEntity.ok(resultRepository.findByStudentId(user.getId()));
    }

    @GetMapping("/announcements")
    public ResponseEntity<List<Announcement>> getAnnouncements() {
        return ResponseEntity.ok(announcementRepository.findAllByOrderByCreatedAtDesc());
    }

    @GetMapping("/timetable")
    public ResponseEntity<List<TimetableEntry>> getTimetable() {
        return ResponseEntity.ok(timetableEntryRepository.findAll());
    }
}
