package com.lucasduarte.apirestful.repository;

import com.lucasduarte.apirestful.model.Professor;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE) //lock para que não haja sobrescrita do professor enquanto leitura
    @Query("select p from Professor p where p.id = :id")
    Optional<Professor> recuperarProfessorPorIdComLock(@Param("id") Long id);

    @Query("select p from Professor p order by p.id") //recupera todos os professores
    List<Professor> recuperarProfessores();

}
