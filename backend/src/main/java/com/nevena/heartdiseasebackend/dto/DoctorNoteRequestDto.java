package com.nevena.heartdiseasebackend.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DoctorNoteRequestDto {

    @Size(max = 1000, message = "Doctor note must be at most 1000 characters.")
    private String doctorNote;
}