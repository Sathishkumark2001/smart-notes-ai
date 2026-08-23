package com.smartnotes.dto;

import com.smartnotes.entity.Note;

import java.time.Instant;

public record NoteResponse(
        Long id,
        String title,
        String content,
        String summary,
        Instant createdAt,
        Instant updatedAt
) {
    public static NoteResponse from(Note note) {
        return new NoteResponse(
                note.getId(),
                note.getTitle(),
                note.getContent(),
                note.getSummary(),
                note.getCreatedAt(),
                note.getUpdatedAt()
        );
    }
}
