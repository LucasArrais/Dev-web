package com.lucasduarte.apirestful.controller;

import com.lucasduarte.apirestful.model.Aluno;
import com.lucasduarte.apirestful.model.AlunoDTO;
import com.lucasduarte.apirestful.model.ResultadoPaginado;
import com.lucasduarte.apirestful.service.AlunoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("alunos")
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
public class AlunoController {

    private final AlunoService alunoService;

    @GetMapping("/paginacao")
    public ResultadoPaginado<AlunoDTO> recuperarAlunosComPaginacao(
            @RequestParam int pagina,
            @RequestParam int tamanho
    ) {
        return alunoService.recuperarAlunosComPaginacao(pagina, tamanho);
    }

    @GetMapping
    public List<Aluno> recuperarAlunos() {
        return alunoService.recuperarAlunos();
    }

    @GetMapping("/{idAluno}")
    public ResponseEntity<Aluno> recuperarAlunoPorId(@PathVariable("idAluno") Long id) {
        Aluno aluno = alunoService.recuperarAlunoPorId(id);
        return ResponseEntity.ok(aluno);
    }

    @GetMapping("/nao-inscritos/{idTurma}")
    public List<Aluno> recuperarAlunosNaoInscritos(@PathVariable("idTurma") Long idTurma) {
        return alunoService.recuperarAlunosNaoInscritos(idTurma);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Aluno cadastrarAluno(@Valid @RequestBody Aluno aluno) {
        return alunoService.cadastrarAluno(aluno);
    }

    @PutMapping
    public Aluno alterarAluno(@Valid @RequestBody Aluno aluno) {
        return alunoService.alterarAluno(aluno);
    }

    @DeleteMapping("/{idAluno}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> removerAlunoPorId(@PathVariable("idAluno") Long id) {
        alunoService.removerAlunoPorId(id);
        return ResponseEntity.ok().build();
    }
}
