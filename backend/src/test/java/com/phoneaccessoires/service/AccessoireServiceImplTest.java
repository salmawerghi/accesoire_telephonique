package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.AccessoireDTO;
import com.phoneaccessoires.dto.AccessoireResponseDTO;
import com.phoneaccessoires.entity.Accessoire;
import com.phoneaccessoires.exception.ResourceNotFoundException;
import com.phoneaccessoires.repository.AccessoireRepository;
import com.phoneaccessoires.repository.CategorieRepository;
import com.phoneaccessoires.repository.MarqueRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AccessoireServiceImplTest {

    @Mock
    private AccessoireRepository accessoireRepository;

    @Mock
    private CategorieRepository categorieRepository;

    @Mock
    private MarqueRepository marqueRepository;

    @InjectMocks
    private AccessoireServiceImpl accessoireService;

    private Accessoire accessoire;
    private AccessoireDTO accessoireDTO;

    @BeforeEach
    void setUp() {
        accessoire = new Accessoire();
        accessoire.setId(1L);
        accessoire.setNom("Coque iPhone 14");
        accessoire.setPrix(BigDecimal.valueOf(19.99));
        accessoire.setStock(50);

        accessoireDTO = new AccessoireDTO();
        accessoireDTO.setNom("Coque iPhone 14");
        accessoireDTO.setPrix(BigDecimal.valueOf(19.99));
        accessoireDTO.setStock(50);
    }

    @Test
    void testFindAll() {
        Page<Accessoire> page = new PageImpl<>(List.of(accessoire));
        when(accessoireRepository.findAll(any(Pageable.class))).thenReturn(page);

        Page<AccessoireResponseDTO> result = accessoireService.findAll(Pageable.unpaged());

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Coque iPhone 14", result.getContent().get(0).getNom());
    }

    @Test
    void testFindById_Found() {
        when(accessoireRepository.findById(1L)).thenReturn(Optional.of(accessoire));

        AccessoireResponseDTO result = accessoireService.findById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Coque iPhone 14", result.getNom());
    }

    @Test
    void testFindById_NotFound() {
        when(accessoireRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> accessoireService.findById(2L));
    }

    @Test
    void testCreate() {
        when(accessoireRepository.save(any(Accessoire.class))).thenReturn(accessoire);

        AccessoireResponseDTO result = accessoireService.create(accessoireDTO);

        assertNotNull(result);
        assertEquals("Coque iPhone 14", result.getNom());
        verify(accessoireRepository, times(1)).save(any(Accessoire.class));
    }
}
