package com.systemmanagment.backend.controller;

import com.systemmanagment.backend.dto.SupplierDto;
import com.systemmanagment.backend.service.SupplierService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private SupplierService supplierService;

    @PostMapping
    public ResponseEntity<SupplierDto> createSupplier(@RequestBody SupplierDto supplierDto) {
        SupplierDto savedSupplier = supplierService.createSupplier(supplierDto);
        return new ResponseEntity<>(savedSupplier, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<SupplierDto> getSupplierById(@PathVariable("id") Long supplierId) {
        SupplierDto supplierDto = supplierService.getSupplierById(supplierId);
        return ResponseEntity.ok(supplierDto);
    }

    @GetMapping
    public ResponseEntity<List<SupplierDto>> getAllSuppliers() {
        List<SupplierDto> suppliers = supplierService.getAllSuppliers();
        return ResponseEntity.ok(suppliers);
    }

    @PutMapping("{id}")
    public ResponseEntity<SupplierDto> updateSupplier(@PathVariable("id") Long supplierId,
                                                      @RequestBody SupplierDto updatedSupplier) {
        SupplierDto supplierDto = supplierService.updateSupplier(supplierId, updatedSupplier);
        return ResponseEntity.ok(supplierDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable("id") Long supplierId) {
        supplierService.deleteSupplier(supplierId);
        return ResponseEntity.ok("Supplier deleted successfully!.");
    }
}