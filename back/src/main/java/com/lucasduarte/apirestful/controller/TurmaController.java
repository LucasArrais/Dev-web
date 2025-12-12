package com.lucasduarte.apirestful.controller;

import com.lucasduarte.apirestful.model.ResultadoPaginado;
import com.lucasduarte.apirestful.model.Turma;
import com.lucasduarte.apirestful.service.TurmaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("turmas")
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
public class TurmaController {

    private final TurmaService turmaService;

    @GetMapping
    public List<Turma> recuperarTurmas() {
        return turmaService.recuperarTurmas();
    }

    @GetMapping("paginacao")
    public ResultadoPaginado<Turma> recuperarTurmasComPaginacao(
            @RequestParam(name = "pagina", defaultValue = "0") int pagina,
            @RequestParam(name = "tamanho", defaultValue = "10") int tamanho
    ) {
        return turmaService.recuperarTurmasComPaginacao(pagina, tamanho);
    }

    @PostMapping
    public Turma cadastrarTurma(@RequestBody Turma turma) {
        return turmaService.cadastrarTurma(turma);
    }

    @GetMapping("{idTurma}")
    public ResponseEntity<Turma> recuperarTurmaPorId(@PathVariable("idTurma") Long id) {
        Turma turma = turmaService.recuperarTurmaPorId(id);
        return ResponseEntity.ok(turma);
    }

    @DeleteMapping("{idTurma}")
    public ResponseEntity<Void> removerTurmaPorId(@PathVariable("idTurma") Long id) {
        turmaService.removerTurmaPorId(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("disciplina/{idDisciplina}")
    public List<Turma> recuperarTurmasPorDisciplina(@PathVariable("idDisciplina") Long idDisciplina) {
        return turmaService.recuperarTurmasPorDisciplina(idDisciplina);
    }
}
