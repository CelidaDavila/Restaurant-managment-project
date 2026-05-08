package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.SupplierDto;
import com.systemmanagment.backend.entity.Supplier;

public class SupplierMapper {

    public static SupplierDto mapToSupplierDto(Supplier supplier) {
        return new SupplierDto(
                supplier.getId(),
                supplier.getName()
        );
    }

    public static Supplier mapToSupplier(SupplierDto supplierDto) {
        return new Supplier(
                supplierDto.getId(),
                supplierDto.getName()
        );
    }
}