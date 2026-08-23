package com.smartnotes.dto;

public record AuthResponse(
        String token,
        String name,
        String email
) {}
