package com.nevena.heartdiseasebackend.controller;

import com.nevena.heartdiseasebackend.dto.PredictionRequestDto;
import com.nevena.heartdiseasebackend.entity.HealthAssessment;
import com.nevena.heartdiseasebackend.service.HealthAssessmentService;
import com.nevena.heartdiseasebackend.dto.DoctorNoteRequestDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class HealthAssessmentController {

    private final HealthAssessmentService healthAssessmentService;

    @PostMapping
    public HealthAssessment createAssessment(@Valid @RequestBody PredictionRequestDto request) {
        return healthAssessmentService.createAssessment(request);
    }

    @GetMapping
    public List<HealthAssessment> getAllAssessments() {
        return healthAssessmentService.getAllAssessments();
    }

    @PatchMapping("/{id}/note")
    public HealthAssessment updateDoctorNote(
            @PathVariable Long id,
            @Valid @RequestBody DoctorNoteRequestDto request
    ) {
        return healthAssessmentService.updateDoctorNote(id, request.getDoctorNote());
    }
}