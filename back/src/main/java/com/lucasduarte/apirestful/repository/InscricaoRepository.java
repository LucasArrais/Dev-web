package com.lucasduarte.apirestful.repository;

import com.lucasduarte.apirestful.model.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {

    @Query("select i from Inscricao i where i.turma.id = :id")
    List<Inscricao> recuperarInscricoesPorTurma(@Param("id") Long id);

    @Query("select count(i) > 0 from Inscricao i where i.aluno.id = :alunoId")
    boolean existsByAlunoId(@Param("alunoId") Long alunoId);
}