package com.lucasduarte.apirestful.repository;

import com.lucasduarte.apirestful.model.Aluno;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE) //lock para que não haja sobrescrita do aluno enquanto leitura
    @Query("select a from Aluno a where a.id = :id")
    Optional<Aluno> recuperarAlunoPorIdComLock(@Param("id") Long id);

    @Query("select a from Aluno a order by a.id") //recupera todos os alunos
    List<Aluno> recuperarAlunos();
    @Query("SELECT a FROM Aluno a WHERE a.id NOT IN " +
            "(SELECT i.aluno.id FROM Inscricao i WHERE i.turma.id = :turmaId) " +
            "ORDER BY a.nome")
    List<Aluno> findAlunosNaoInscritos(@Param("turmaId") Long turmaId);
}