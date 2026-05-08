package com.systemmanagment.backend.service;

import com.systemmanagment.backend.dto.SaleDto;

import java.util.List;

public interface SaleService {

    SaleDto createSale(SaleDto saleDto);

    SaleDto getSaleById(Long saleId);

    List<SaleDto> getAllSales();

    SaleDto updateSale(Long saleId, SaleDto updatedSale);

    void deleteSale(Long saleId);
}