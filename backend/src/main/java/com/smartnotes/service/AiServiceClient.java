package com.smartnotes.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

/**
 * Talks to the Python (FastAPI + LangChain) AI service.
 * Kept intentionally thin — Spring Boot's job is orchestration, not AI logic.
 */
@Service
@RequiredArgsConstructor
public class AiServiceClient {

    private final WebClient aiServiceWebClient;

    public record SummarizeResult(String summary) {}

    public Mono<SummarizeResult> summarize(String noteContent) {
        return aiServiceWebClient.post()
                .uri("/summarize")
                .bodyValue(Map.of("text", noteContent))
                .retrieve()
                .bodyToMono(SummarizeResult.class);
    }
}
