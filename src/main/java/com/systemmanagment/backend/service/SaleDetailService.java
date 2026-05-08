package com.systemmanagment.backend.service;

import com.systemmanagment.backend.dto.SaleDetailDto;

import java.util.List;

public interface SaleDetailService {

    SaleDetailDto createSaleDetail(SaleDetailDto saleDetailDto);

    SaleDetailDto getSaleDetailById(Long saleId, Long itemId);

    List<SaleDetailDto> getAllSaleDetails();

    SaleDetailDto updateSaleDetail(Long saleId, Long itemId, SaleDetailDto updatedSaleDetail);

    void deleteSaleDetail(Long saleId, Long itemId);
}