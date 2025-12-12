package com.lucasduarte.apirestful.service;

import com.lucasduarte.apirestful.model.Inscricao;
import com.lucasduarte.apirestful.repository.InscricaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class InscricaoService {

    private final InscricaoRepository inscricaoRepository;

    public Inscricao cadastrarInscricao(Inscricao inscricao) {
        return inscricaoRepository.save(inscricao);
    }

    public List<Inscricao> recuperarInscricoesPorTurma(Long idTurma) {
        return inscricaoRepository.recuperarInscricoesPorTurma(idTurma);
    }

    public void removerInscricaoPorId(Long id) {
        inscricaoRepository.deleteById(id);
    }
}
