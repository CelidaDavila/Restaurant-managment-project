package com.systemmanagment.backend.controller;

import com.systemmanagment.backend.dto.SaleDetailDto;
import com.systemmanagment.backend.service.SaleDetailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/sale-details")
public class SaleDetailController {

    private SaleDetailService saleDetailService;

    @PostMapping
    public ResponseEntity<SaleDetailDto> createSaleDetail(@RequestBody SaleDetailDto saleDetailDto) {
        SaleDetailDto savedSaleDetail = saleDetailService.createSaleDetail(saleDetailDto);
        return new ResponseEntity<>(savedSaleDetail, HttpStatus.CREATED);
    }

    @GetMapping("{saleId}/{itemId}")
    public ResponseEntity<SaleDetailDto> getSaleDetailById(@PathVariable("saleId") Long saleId,
                                                           @PathVariable("itemId") Long itemId) {
        SaleDetailDto saleDetailDto = saleDetailService.getSaleDetailById(saleId, itemId);
        return ResponseEntity.ok(saleDetailDto);
    }

    @GetMapping
    public ResponseEntity<List<SaleDetailDto>> getAllSaleDetails() {
        List<SaleDetailDto> saleDetails = saleDetailService.getAllSaleDetails();
        return ResponseEntity.ok(saleDetails);
    }

    @PutMapping("{saleId}/{itemId}")
    public ResponseEntity<SaleDetailDto> updateSaleDetail(@PathVariable("saleId") Long saleId,
                                                          @PathVariable("itemId") Long itemId,
                                                          @RequestBody SaleDetailDto updatedSaleDetail) {
        SaleDetailDto saleDetailDto = saleDetailService.updateSaleDetail(saleId, itemId, updatedSaleDetail);
        return ResponseEntity.ok(saleDetailDto);
    }

    @DeleteMapping("{saleId}/{itemId}")
    public ResponseEntity<String> deleteSaleDetail(@PathVariable("saleId") Long saleId,
                                                   @PathVariable("itemId") Long itemId) {
        saleDetailService.deleteSaleDetail(saleId, itemId);
        return ResponseEntity.ok("Sale detail deleted successfully!.");
    }
}