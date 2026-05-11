package com.phoneaccessoires.service;

import com.phoneaccessoires.dto.CommandeRequestDTO;
import com.phoneaccessoires.dto.CommandeResponseDTO;
import com.phoneaccessoires.dto.DailyStatDTO;

import java.util.List;

public interface CommandeService {
    CommandeResponseDTO create(CommandeRequestDTO dto);
    List<CommandeResponseDTO> findAll();
    List<DailyStatDTO> getDailyStats();
}
