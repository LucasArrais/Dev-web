package com.lucasduarte.apirestful.controller;

import com.lucasduarte.apirestful.model.Inscricao;
import com.lucasduarte.apirestful.service.InscricaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("inscricoes")
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
public class InscricaoController {

    private final InscricaoService inscricaoService;

    @PostMapping
    public Inscricao cadastrarInscricao(@RequestBody Inscricao inscricao) {
        return inscricaoService.cadastrarInscricao(inscricao);
    }

    @DeleteMapping("{idInscricao}")
    public ResponseEntity<Void> removerInscricaoPorId(@PathVariable("idInscricao") Long id) {
        inscricaoService.removerInscricaoPorId(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("turma/{idTurma}")
    public List<Inscricao> recuperarInscricoesPorTurma(@PathVariable Long idTurma) {
        return inscricaoService.recuperarInscricoesPorTurma(idTurma);
    }
}