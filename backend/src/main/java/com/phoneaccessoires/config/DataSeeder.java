package com.phoneaccessoires.config;

import com.phoneaccessoires.entity.Utilisateur;
import com.phoneaccessoires.repository.UtilisateurRepository;
import com.phoneaccessoires.security.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UtilisateurRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UtilisateurRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@techstore.com").isEmpty()) {
            Utilisateur admin = Utilisateur.builder()
                    .nom("Admin")
                    .prenom("Super")
                    .email("admin@techstore.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
        }
    }
}
