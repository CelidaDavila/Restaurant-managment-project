package com.systemmanagment.backend.controller;

import com.systemmanagment.backend.dto.SaleDto;
import com.systemmanagment.backend.service.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private SaleService saleService;

    @PostMapping
    public ResponseEntity<SaleDto> createSale(@RequestBody SaleDto saleDto) {
        SaleDto savedSale = saleService.createSale(saleDto);
        return new ResponseEntity<>(savedSale, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<SaleDto> getSaleById(@PathVariable("id") Long saleId) {
        SaleDto saleDto = saleService.getSaleById(saleId);
        return ResponseEntity.ok(saleDto);
    }

    @GetMapping
    public ResponseEntity<List<SaleDto>> getAllSales() {
        List<SaleDto> sales = saleService.getAllSales();
        return ResponseEntity.ok(sales);
    }

    @PutMapping("{id}")
    public ResponseEntity<SaleDto> updateSale(@PathVariable("id") Long saleId,
                                              @RequestBody SaleDto updatedSale) {
        SaleDto saleDto = saleService.updateSale(saleId, updatedSale);
        return ResponseEntity.ok(saleDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSale(@PathVariable("id") Long saleId) {
        saleService.deleteSale(saleId);
        return ResponseEntity.ok("Sale deleted successfully!.");
    }
}