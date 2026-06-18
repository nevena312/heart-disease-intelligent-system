package com.nevena.heartdiseasebackend.service;

import com.nevena.heartdiseasebackend.client.AiServiceClient;
import com.nevena.heartdiseasebackend.dto.PredictionRequestDto;
import com.nevena.heartdiseasebackend.dto.PredictionResponseDto;
import com.nevena.heartdiseasebackend.entity.HealthAssessment;
import com.nevena.heartdiseasebackend.repository.HealthAssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthAssessmentService {

    private final HealthAssessmentRepository healthAssessmentRepository;
    private final AiServiceClient aiServiceClient;

    public HealthAssessment createAssessment(PredictionRequestDto request) {

        PredictionResponseDto prediction = aiServiceClient.predict(request);

        HealthAssessment assessment = HealthAssessment.builder()
                .age(request.getAge())
                .sex(request.getSex())
                .cp(request.getCp())
                .trestbps(request.getTrestbps())
                .chol(request.getChol())
                .fbs(request.getFbs())
                .restecg(request.getRestecg())
                .thalach(request.getThalach())
                .exang(request.getExang())
                .oldpeak(request.getOldpeak())
                .slope(request.getSlope())
                .ca(request.getCa())
                .thal(request.getThal())
                .predictedClass(prediction.getPredictedClass())
                .probability(prediction.getProbability())
                .riskLevel(prediction.getRiskLevel())
                .message(prediction.getMessage())
                .createdAt(LocalDateTime.now())
                .build();

        return healthAssessmentRepository.save(assessment);
    }

    public List<HealthAssessment> getAllAssessments() {
        return healthAssessmentRepository.findAll();
    }
}