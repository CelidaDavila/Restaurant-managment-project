package com.systemmanagment.backend.service;

import com.systemmanagment.backend.dto.SupplierDto;

import java.util.List;

public interface SupplierService {

    SupplierDto createSupplier(SupplierDto supplierDto);

    SupplierDto getSupplierById(Long supplierId);

    List<SupplierDto> getAllSuppliers();

    SupplierDto updateSupplier(Long supplierId, SupplierDto updatedSupplier);

    void deleteSupplier(Long supplierId);
}