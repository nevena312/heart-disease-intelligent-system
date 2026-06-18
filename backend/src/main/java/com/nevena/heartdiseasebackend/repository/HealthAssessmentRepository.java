package com.nevena.heartdiseasebackend.repository;

import com.nevena.heartdiseasebackend.entity.HealthAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthAssessmentRepository
        extends JpaRepository<HealthAssessment, Long> {
}