package com.lucasduarte.apirestful.service;

import com.lucasduarte.apirestful.exception.EntidadeNaoEncontradaException;
import com.lucasduarte.apirestful.model.ResultadoPaginado;
import com.lucasduarte.apirestful.model.Turma;
import com.lucasduarte.apirestful.repository.TurmaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TurmaService {

    private final TurmaRepository turmaRepository;

    public List<Turma> recuperarTurmas() {
        return turmaRepository.findAll();
    }

    public Turma cadastrarTurma(Turma turma) {
        return turmaRepository.save(turma);
    }

    public Turma recuperarTurmaPorId(Long id) {
        return turmaRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Turma com id = " + id + " não encontrada."));
    }

    public void removerTurmaPorId(Long id) {
        turmaRepository.deleteById(id);
    }

    public List<Turma> recuperarTurmasPorDisciplina(Long idDisciplina) {
        return turmaRepository.findByDisciplinaId(idDisciplina);
    }

    //Paginação usando ResultadoPaginado
    public ResultadoPaginado<Turma> recuperarTurmasComPaginacao(int pagina, int tamanho) {
        Page<Turma> page = turmaRepository.findAll(PageRequest.of(pagina, tamanho));
        return new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent()
        );
    }
}
