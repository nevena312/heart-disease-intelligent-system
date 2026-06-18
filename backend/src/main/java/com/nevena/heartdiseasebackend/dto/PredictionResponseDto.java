package com.nevena.heartdiseasebackend.dto;

import lombok.Data;

@Data
public class PredictionResponseDto {

    private Integer predictedClass;

    private Double probability;

    private String riskLevel;

    private String message;
}