package com.lucasduarte.apirestful.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString

@Entity
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int ano;
    private int periodo;
    private String nome;


    @ManyToOne(fetch = FetchType.EAGER)
    private Professor professor;

    @ManyToOne(fetch = FetchType.EAGER)
    private Disciplina disciplina;

    public Turma(String nome, int ano, int periodo, Professor professor, Disciplina disciplina) {
        this.nome = nome;
        this.ano = ano;
        this.periodo = periodo;
        this.professor = professor;
        this.disciplina = disciplina;
    }
}
