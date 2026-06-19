package com.nevena.heartdiseasebackend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "health_assessment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HealthAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer age;

    private Integer sex;

    private Integer cp;

    private Integer trestbps;

    private Integer chol;

    private Integer fbs;

    private Integer restecg;

    private Integer thalach;

    private Integer exang;

    private Double oldpeak;

    private Integer slope;

    private Integer ca;

    private Integer thal;

    @Column(name = "predicted_class")
    private Integer predictedClass;

    private Double probability;

    @Column(name = "risk_level")
    private String riskLevel;

    private String message;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "doctor_note")
    private String doctorNote;
}