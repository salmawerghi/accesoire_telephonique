package com.phoneaccessoires.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class CommandeRequestDTO {

    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "L'adresse est obligatoire")
    private String adresse;

    @NotBlank(message = "La ville est obligatoire")
    private String ville;

    @NotBlank(message = "Le téléphone est obligatoire")
    private String telephone;

    @NotBlank(message = "La méthode de paiement est obligatoire")
    private String methodPaiement;

    @NotEmpty(message = "La commande doit contenir au moins un article")
    private List<LigneCommandeRequestDTO> lignes;

    public CommandeRequestDTO() {}

    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getAdresse() { return adresse; }
    public void setAdresse(String adresse) { this.adresse = adresse; }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getMethodPaiement() { return methodPaiement; }
    public void setMethodPaiement(String methodPaiement) { this.methodPaiement = methodPaiement; }

    public List<LigneCommandeRequestDTO> getLignes() { return lignes; }
    public void setLignes(List<LigneCommandeRequestDTO> lignes) { this.lignes = lignes; }
}
