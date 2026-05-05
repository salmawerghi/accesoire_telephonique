package com.phoneaccessoires.entity;

import com.phoneaccessoires.security.Role;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "utilisateurs")
public class Utilisateur implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    public Utilisateur() {}

    public Utilisateur(Long id, String nom, String prenom, String email, String password, Role role) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public static UtilisateurBuilder builder() {
        return new UtilisateurBuilder();
    }

    public static class UtilisateurBuilder {
        private Long id;
        private String nom;
        private String prenom;
        private String email;
        private String password;
        private Role role;

        public UtilisateurBuilder id(Long id) { this.id = id; return this; }
        public UtilisateurBuilder nom(String nom) { this.nom = nom; return this; }
        public UtilisateurBuilder prenom(String prenom) { this.prenom = prenom; return this; }
        public UtilisateurBuilder email(String email) { this.email = email; return this; }
        public UtilisateurBuilder password(String password) { this.password = password; return this; }
        public UtilisateurBuilder role(Role role) { this.role = role; return this; }

        public Utilisateur build() {
            return new Utilisateur(id, nom, prenom, email, password, role);
        }
    }
}
