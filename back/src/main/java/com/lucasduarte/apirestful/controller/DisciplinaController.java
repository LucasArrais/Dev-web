package com.lucasduarte.apirestful.controller;

import com.lucasduarte.apirestful.model.Disciplina;
import com.lucasduarte.apirestful.service.DisciplinaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("disciplinas")
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
public class DisciplinaController {

    private final DisciplinaService disciplinaService;

    @GetMapping
    public List<Disciplina> recuperarDisciplinas() {
        return disciplinaService.recuperarDisciplinas();
    }

    @PostMapping
    public Disciplina cadastrarDisciplina(@RequestBody Disciplina disciplina) {
        return disciplinaService.cadastrarDisciplina(disciplina);
    }

    @PutMapping
    public Disciplina alterarDisciplina(@RequestBody Disciplina disciplina) {
        return disciplinaService.alterarDisciplina(disciplina);
    }

    @GetMapping("{idDisciplina}")
    public ResponseEntity<Disciplina> recuperarDisciplinaPorId(@PathVariable("idDisciplina") Long id) {
        Disciplina disciplina = disciplinaService.recuperarDisciplinaPorId(id);
        return ResponseEntity.ok(disciplina);
    }

    @DeleteMapping("{idDisciplina}")
    public ResponseEntity<Void> removerDisciplinaPorId(@PathVariable("idDisciplina") Long id) {
        disciplinaService.removerDisciplinaPorId(id);
        return ResponseEntity.ok().build();
    }
}