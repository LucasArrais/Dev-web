package com.lucasduarte.apirestful.service;

import com.lucasduarte.apirestful.exception.EntidadeNaoEncontradaException;
import com.lucasduarte.apirestful.exception.OperacaoNaoPermitidaException;
import com.lucasduarte.apirestful.model.Aluno;
import com.lucasduarte.apirestful.model.AlunoDTO;
import com.lucasduarte.apirestful.model.ResultadoPaginado;
import com.lucasduarte.apirestful.repository.AlunoRepository;
import com.lucasduarte.apirestful.repository.InscricaoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final InscricaoRepository inscricaoRepository;

    public List<Aluno> recuperarAlunos() {
        return alunoRepository.recuperarAlunos();
    }

    @Transactional
    public Aluno recuperarAlunoPorId(Long id) {
        Aluno aluno = alunoRepository.recuperarAlunoPorIdComLock(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Aluno com id = " + id + " não encontrado."));
        return alunoRepository.save(aluno);
    }

    public Aluno cadastrarAluno(Aluno aluno) {
        return alunoRepository.save(aluno);
    }

    @Transactional
    public Aluno alterarAluno(Aluno aluno) {
        Aluno alunoExistente = alunoRepository.findById(aluno.getId())
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Aluno com id = " + aluno.getId() + " não encontrado."));
        alunoExistente.setNome(aluno.getNome());
        alunoExistente.setEmail(aluno.getEmail());
        alunoExistente.setTelefone(aluno.getTelefone());

        return alunoRepository.save(alunoExistente);
    }

    @Transactional
    public void removerAlunoPorId(Long id) {
        // Verifica se aluno existe
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Aluno com id = " + id + " não encontrado."));

        boolean temInscricoes = inscricaoRepository.existsByAlunoId(id);
        if (temInscricoes) {
            throw new OperacaoNaoPermitidaException(
                    "Não é possível remover o aluno '" + aluno.getNome() +
                            "' porque ele está inscrito em uma ou mais turmas. " +
                            "Remova as inscrições primeiro."
            );
        }

        alunoRepository.deleteById(id);
    }

    //recupera alunos não inscritos em uma turma
    public List<Aluno> recuperarAlunosNaoInscritos(Long idTurma) {
        return alunoRepository.findAlunosNaoInscritos(idTurma);
    }

    //recupera alunos com paginação usando ResultadoPaginado
    public ResultadoPaginado<AlunoDTO> recuperarAlunosComPaginacao(int pagina, int tamanho) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        var page = alunoRepository.findAll(pageable);

        List<AlunoDTO> alunosDto = page.getContent().stream()
                .map(aluno -> new AlunoDTO(aluno.getId(), aluno.getNome(), aluno.getEmail()))
                .collect(Collectors.toList());

        return new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                alunosDto
        );
    }
}