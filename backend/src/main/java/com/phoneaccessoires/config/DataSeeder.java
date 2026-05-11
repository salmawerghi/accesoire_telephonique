package com.phoneaccessoires.config;

import com.phoneaccessoires.entity.Utilisateur;
import com.phoneaccessoires.repository.UtilisateurRepository;
import com.phoneaccessoires.security.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UtilisateurRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    public DataSeeder(UtilisateurRepository userRepository, PasswordEncoder passwordEncoder, JdbcTemplate jdbcTemplate) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.execute("SELECT setval('marques_id_seq', (SELECT coalesce(MAX(id), 1) FROM marques));");
            jdbcTemplate.execute("SELECT setval('categories_id_seq', (SELECT coalesce(MAX(id), 1) FROM categories));");
            jdbcTemplate.execute("SELECT setval('accessoires_id_seq', (SELECT coalesce(MAX(id), 1) FROM accessoires));");
            jdbcTemplate.execute("SELECT setval('utilisateurs_id_seq', (SELECT coalesce(MAX(id), 1) FROM utilisateurs));");
        } catch (Exception e) {
            // Ignore if not postgres or table missing
        }

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
