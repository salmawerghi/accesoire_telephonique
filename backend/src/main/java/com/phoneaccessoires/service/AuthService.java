package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.AuthRequest;
import com.phoneaccessoires.dto.AuthResponse;
import com.phoneaccessoires.dto.RegisterRequest;
import com.phoneaccessoires.entity.Utilisateur;
import com.phoneaccessoires.repository.UtilisateurRepository;
import com.phoneaccessoires.security.JwtService;
import com.phoneaccessoires.security.Role;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UtilisateurRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UtilisateurRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse register(RegisterRequest request) {
        Utilisateur user = Utilisateur.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CLIENT)
                .build();
        repository.save(user);
        var extraClaims = new java.util.HashMap<String, Object>();
        extraClaims.put("role", user.getRole().name());
        String jwtToken = jwtService.generateToken(extraClaims, user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        Utilisateur user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var extraClaims = new java.util.HashMap<String, Object>();
        extraClaims.put("role", user.getRole().name());
        String jwtToken = jwtService.generateToken(extraClaims, user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
}
