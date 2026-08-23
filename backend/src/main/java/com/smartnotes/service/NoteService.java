package com.smartnotes.service;

import com.smartnotes.dto.NoteRequest;
import com.smartnotes.dto.NoteResponse;
import com.smartnotes.entity.Note;
import com.smartnotes.entity.User;
import com.smartnotes.exception.ApiException;
import com.smartnotes.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final AiServiceClient aiServiceClient;

    public List<NoteResponse> getAllForUser(User user) {
        return noteRepository.findByOwnerOrderByUpdatedAtDesc(user)
                .stream()
                .map(NoteResponse::from)
                .toList();
    }

    public NoteResponse getOne(Long noteId, User user) {
        Note note = findOwnedNote(noteId, user);
        return NoteResponse.from(note);
    }

    public NoteResponse create(NoteRequest request, User user) {
        Note note = Note.builder()
                .title(request.title())
                .content(request.content())
                .owner(user)
                .build();

        return NoteResponse.from(noteRepository.save(note));
    }

    public NoteResponse update(Long noteId, NoteRequest request, User user) {
        Note note = findOwnedNote(noteId, user);
        note.setTitle(request.title());
        note.setContent(request.content());
        return NoteResponse.from(noteRepository.save(note));
    }

    public void delete(Long noteId, User user) {
        Note note = findOwnedNote(noteId, user);
        noteRepository.delete(note);
    }

    public NoteResponse summarize(Long noteId, User user) {
        Note note = findOwnedNote(noteId, user);

        String summary = aiServiceClient.summarize(note.getContent())
                .map(AiServiceClient.SummarizeResult::summary)
                .block(); // simple blocking call for now; fine for a single request/response flow

        note.setSummary(summary);
        return NoteResponse.from(noteRepository.save(note));
    }

    private Note findOwnedNote(Long noteId, User user) {
        return noteRepository.findByIdAndOwner(noteId, user)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Note not found"));
    }
}
