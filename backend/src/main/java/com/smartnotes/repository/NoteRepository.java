package com.smartnotes.repository;

import com.smartnotes.entity.Note;
import com.smartnotes.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByOwnerOrderByUpdatedAtDesc(User owner);
    Optional<Note> findByIdAndOwner(Long id, User owner);
}
