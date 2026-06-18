package com.nevena.heartdiseasebackend.client;

import com.nevena.heartdiseasebackend.dto.PredictionRequestDto;
import com.nevena.heartdiseasebackend.dto.PredictionResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class AiServiceClient {

    private final RestClient restClient;
    private final String aiServiceUrl;

    public AiServiceClient(
            RestClient.Builder restClientBuilder,
            @Value("${ai.service.url}") String aiServiceUrl
    ) {
        this.restClient = restClientBuilder.build();
        this.aiServiceUrl = aiServiceUrl;
    }

    public PredictionResponseDto predict(PredictionRequestDto request) {
        return restClient.post()
                .uri(aiServiceUrl + "/predict")
                .body(request)
                .retrieve()
                .body(PredictionResponseDto.class);
    }
}