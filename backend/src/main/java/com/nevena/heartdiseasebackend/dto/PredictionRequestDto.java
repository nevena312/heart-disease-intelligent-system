package com.nevena.heartdiseasebackend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PredictionRequestDto {

    @NotNull(message = "Age is required.")
    @Min(value = 1, message = "Age must be at least 1.")
    @Max(value = 120, message = "Age must be at most 120.")
    private Integer age;

    @NotNull(message = "Sex is required.")
    @Min(value = 0, message = "Sex must be 0 (Female) or 1 (Male).")
    @Max(value = 1, message = "Sex must be 0 (Female) or 1 (Male).")
    private Integer sex;

    @NotNull(message = "Chest pain type is required.")
    @Min(value = 0, message = "Chest pain type must be between 0 and 3.")
    @Max(value = 3, message = "Chest pain type must be between 0 and 3.")
    private Integer cp;

    @NotNull(message = "Resting blood pressure is required.")
    @Min(value = 50, message = "Resting blood pressure must be at least 50.")
    @Max(value = 250, message = "Resting blood pressure must be at most 250.")
    private Integer trestbps;

    @NotNull(message = "Cholesterol is required.")
    @Min(value = 50, message = "Cholesterol must be at least 50.")
    @Max(value = 700, message = "Cholesterol must be at most 700.")
    private Integer chol;

    @NotNull(message = "Fasting blood sugar indicator is required.")
    @Min(value = 0, message = "Fasting blood sugar must be 0 or 1.")
    @Max(value = 1, message = "Fasting blood sugar must be 0 or 1.")
    private Integer fbs;

    @NotNull(message = "Resting ECG result is required.")
    @Min(value = 0, message = "Resting ECG must be between 0 and 2.")
    @Max(value = 2, message = "Resting ECG must be between 0 and 2.")
    private Integer restecg;

    @NotNull(message = "Maximum heart rate is required.")
    @Min(value = 50, message = "Maximum heart rate must be at least 50.")
    @Max(value = 250, message = "Maximum heart rate must be at most 250.")
    private Integer thalach;

    @NotNull(message = "Exercise induced angina is required.")
    @Min(value = 0, message = "Exercise induced angina must be 0 or 1.")
    @Max(value = 1, message = "Exercise induced angina must be 0 or 1.")
    private Integer exang;

    @NotNull(message = "Oldpeak is required.")
    @DecimalMin(value = "0.0", message = "Oldpeak must be at least 0.")
    @DecimalMax(value = "10.0", message = "Oldpeak must be at most 10.")
    private Double oldpeak;

    @NotNull(message = "Slope is required.")
    @Min(value = 0, message = "Slope must be between 0 and 2.")
    @Max(value = 2, message = "Slope must be between 0 and 2.")
    private Integer slope;

    @NotNull(message = "Number of major vessels is required.")
    @Min(value = 0, message = "Number of major vessels must be between 0 and 3.")
    @Max(value = 3, message = "Number of major vessels must be between 0 and 3.")
    private Integer ca;

    @NotNull(message = "Thal value is required.")
    @Min(value = 0, message = "Thal must be between 0 and 2.")
    @Max(value = 2, message = "Thal must be between 0 and 2.")
    private Integer thal;
}