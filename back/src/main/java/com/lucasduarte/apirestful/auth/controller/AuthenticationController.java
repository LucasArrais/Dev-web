package com.lucasduarte.apirestful.auth.controller;

import com.lucasduarte.apirestful.auth.model.Usuario;
import com.lucasduarte.apirestful.auth.repository.UsuarioRepository;
import com.lucasduarte.apirestful.auth.util.UsuarioLogin;
import com.lucasduarte.apirestful.auth.service.JwtService;
import com.lucasduarte.apirestful.auth.util.TokenResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("autenticacao")
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
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody UsuarioLogin usuarioLogin,
                                               HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(usuarioLogin.getEmail(), usuarioLogin.getSenha()));

        Usuario usuario = usuarioRepository.findByEmail(usuarioLogin.getEmail()).orElseThrow();

        String accessToken = jwtService.generateAccessToken(usuario);

        return new ResponseEntity<>(new TokenResponse(
                accessToken, usuario.getId(), usuario.getNome(), usuario.getRole().name()), HttpStatus.OK);
    }
}
