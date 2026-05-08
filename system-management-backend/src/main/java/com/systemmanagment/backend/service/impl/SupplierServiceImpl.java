package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.SupplierDto;
import com.systemmanagment.backend.entity.Supplier;
import com.systemmanagment.backend.exception.ResourceNotFoundException;
import com.systemmanagment.backend.mapper.SupplierMapper;
import com.systemmanagment.backend.repository.SupplierRepository;
import com.systemmanagment.backend.service.SupplierService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private SupplierRepository supplierRepository;

    @Override
    public SupplierDto createSupplier(SupplierDto supplierDto) {
        Supplier supplier = SupplierMapper.mapToSupplier(supplierDto);
        Supplier savedSupplier = supplierRepository.save(supplier);

        return SupplierMapper.mapToSupplierDto(savedSupplier);
    }

    @Override
    public SupplierDto getSupplierById(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier does not exist with given ID: " + supplierId));

        return SupplierMapper.mapToSupplierDto(supplier);
    }

    @Override
    public List<SupplierDto> getAllSuppliers() {
        List<Supplier> suppliers = supplierRepository.findAll();

        return suppliers.stream()
                .map((supplier) -> SupplierMapper.mapToSupplierDto(supplier))
                .collect(Collectors.toList());
    }

    @Override
    public SupplierDto updateSupplier(Long supplierId, SupplierDto updatedSupplier) {
        Supplier supplier = supplierRepository.findById(supplierId).orElseThrow(
                () -> new ResourceNotFoundException("Supplier does not exist with given ID: " + supplierId)
        );

        supplier.setName(updatedSupplier.getName());

        Supplier updatedSupplierObj = supplierRepository.save(supplier);

        return SupplierMapper.mapToSupplierDto(updatedSupplierObj);
    }

    @Override
    public void deleteSupplier(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId).orElseThrow(
                () -> new ResourceNotFoundException("Supplier does not exist with given ID: " + supplierId)
        );

        supplierRepository.deleteById(supplierId);
    }
}