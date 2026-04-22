package com.studentportal.backend.repository;

import com.studentportal.backend.entity.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimetableEntryRepository extends JpaRepository<TimetableEntry, Long> {
}
