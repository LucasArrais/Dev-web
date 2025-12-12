package com.lucasduarte.apirestful.auth.service;

import com.lucasduarte.apirestful.auth.model.Usuario;
import com.lucasduarte.apirestful.auth.repository.UsuarioRepository;
import com.lucasduarte.apirestful.auth.util.InfoUsuario;
import com.lucasduarte.apirestful.auth.util.Role;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public InfoUsuario cadastrarUsuario(Usuario usuario, String role) {
        if (usuarioRepository.findByEmail(usuario.getEmail()).isPresent()) {
            return new InfoUsuario(false, true, "Email já cadastrado!");
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

        try {
            Role userRole = Role.valueOf(role.toUpperCase());
            usuario.setRole(userRole);
        } catch (IllegalArgumentException e) {
            usuario.setRole(Role.USER);
        }

        usuarioRepository.save(usuario);
        return new InfoUsuario(true, false,
                "Usuário cadastrado com sucesso como " + usuario.getRole());
    }

    public List<Usuario> recuperarUsuarios() {
        return usuarioRepository.findAll();
    }
}
