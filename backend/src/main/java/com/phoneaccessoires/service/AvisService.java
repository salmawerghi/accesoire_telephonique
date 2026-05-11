package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.AvisDTO;
import java.util.List;

public interface AvisService {
    AvisDTO create(AvisDTO dto);
    List<AvisDTO> getByAccessoireId(Long accessoireId);
}
