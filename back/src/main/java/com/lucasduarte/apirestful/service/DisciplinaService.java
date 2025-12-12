package com.lucasduarte.apirestful.service;

import com.lucasduarte.apirestful.exception.EntidadeNaoEncontradaException;
import com.lucasduarte.apirestful.model.Disciplina;
import com.lucasduarte.apirestful.repository.DisciplinaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DisciplinaService {

    private final DisciplinaRepository disciplinaRepository;

    public List<Disciplina> recuperarDisciplinas() {
        return disciplinaRepository.findAll();
    }

    public Disciplina cadastrarDisciplina(Disciplina professor) {
        return disciplinaRepository.save(professor);
    }

    public Disciplina recuperarDisciplinaPorId(Long id) {
        Disciplina professor = disciplinaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Disciplina com id = " + id + " não encontrado."));
        return disciplinaRepository.save(professor);
    }

    public Disciplina alterarDisciplina(Disciplina professor) {
        disciplinaRepository.findById(professor.getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Disciplina com id = " + professor.getId() + " não encontrado."));
        return disciplinaRepository.save(professor);
    }

    public void removerDisciplinaPorId(Long id) {
        disciplinaRepository.deleteById(id);
    }

}
