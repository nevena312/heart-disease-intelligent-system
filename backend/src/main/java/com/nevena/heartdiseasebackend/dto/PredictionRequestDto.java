package com.nevena.heartdiseasebackend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PredictionRequestDto {

    @NotNull
    @Min(1)
    @Max(120)
    private Integer age;

    @NotNull
    @Min(0)
    @Max(1)
    private Integer sex;

    @NotNull
    @Min(0)
    @Max(3)
    private Integer cp;

    @NotNull
    @Min(50)
    @Max(250)
    private Integer trestbps;

    @NotNull
    @Min(50)
    @Max(700)
    private Integer chol;

    @NotNull
    @Min(0)
    @Max(1)
    private Integer fbs;

    @NotNull
    @Min(0)
    @Max(2)
    private Integer restecg;

    @NotNull
    @Min(50)
    @Max(250)
    private Integer thalach;

    @NotNull
    @Min(0)
    @Max(1)
    private Integer exang;

    @NotNull
    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private Double oldpeak;

    @NotNull
    @Min(0)
    @Max(2)
    private Integer slope;

    @NotNull
    @Min(0)
    @Max(3)
    private Integer ca;

    @NotNull
    @Min(0)
    @Max(2)
    private Integer thal;
}