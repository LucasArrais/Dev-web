package com.lucasduarte.apirestful.repository;

import com.lucasduarte.apirestful.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TurmaRepository extends JpaRepository<Turma, Long> {
    List<Turma> findByDisciplinaId(Long disciplinaId);
}