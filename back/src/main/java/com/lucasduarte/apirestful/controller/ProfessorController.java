package com.lucasduarte.apirestful.controller;

import com.lucasduarte.apirestful.model.Professor;
import com.lucasduarte.apirestful.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("professores")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5178",
        "http://localhost:5179",
        "http://localhost:5180"
})
public class ProfessorController {

    private final ProfessorService professorService;

    @GetMapping
    public List<Professor> recuperarProfessores() {
        return professorService.recuperarProfessores();
    }

    @PostMapping
    public Professor cadastrarProfessor(@RequestBody Professor professor) {
        return professorService.cadastrarProfessor(professor);
    }
}