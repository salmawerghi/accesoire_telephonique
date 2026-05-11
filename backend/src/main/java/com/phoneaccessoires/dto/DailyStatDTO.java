package com.phoneaccessoires.dto;

import java.math.BigDecimal;

public class DailyStatDTO {
    private String date;
    private Long commandeCount;
    private BigDecimal totalRevenue;

    public DailyStatDTO(String date, Long commandeCount, BigDecimal totalRevenue) {
        this.date = date;
        this.commandeCount = commandeCount;
        this.totalRevenue = totalRevenue;
    }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public Long getCommandeCount() { return commandeCount; }
    public void setCommandeCount(Long commandeCount) { this.commandeCount = commandeCount; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
}
