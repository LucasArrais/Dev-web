package com.lucasduarte.apirestful.service;

import com.lucasduarte.apirestful.exception.EntidadeNaoEncontradaException;
import com.lucasduarte.apirestful.model.Professor;
import com.lucasduarte.apirestful.repository.ProfessorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public List<Professor> recuperarProfessores() {
        return professorRepository.recuperarProfessores();
    }

    public Professor cadastrarProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    @Transactional
    public Professor recuperarProfessorPorId(Long id) {
        Professor professor = professorRepository.recuperarProfessorPorIdComLock(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Professor com id = " + id + " não encontrado."));
        return professorRepository.save(professor);
    }

    @Transactional
    public Professor alterarProfessor(Professor professor) {
        professorRepository.recuperarProfessorPorIdComLock(professor.getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Professor com id = " + professor.getId() + " não encontrado."));
        return professorRepository.save(professor);
    }

    public void removerProfessorPorId(Long id) {
        professorRepository.deleteById(id);
    }

}
