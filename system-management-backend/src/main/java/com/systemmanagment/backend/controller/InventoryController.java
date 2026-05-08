package com.systemmanagment.backend.controller;

import com.systemmanagment.backend.dto.InventoryDto;
import com.systemmanagment.backend.service.InventoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<InventoryDto> createInventory(@RequestBody InventoryDto inventoryDto) {
        InventoryDto savedInventory = inventoryService.createInventory(inventoryDto);
        return new ResponseEntity<>(savedInventory, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<InventoryDto> getInventoryById(@PathVariable("id") Long inventoryId) {
        InventoryDto inventoryDto = inventoryService.getInventoryById(inventoryId);
        return ResponseEntity.ok(inventoryDto);
    }

    @GetMapping
    public ResponseEntity<List<InventoryDto>> getAllInventory() {
        List<InventoryDto> inventoryList = inventoryService.getAllInventory();
        return ResponseEntity.ok(inventoryList);
    }

    @PutMapping("{id}")
    public ResponseEntity<InventoryDto> updateInventory(@PathVariable("id") Long inventoryId,
                                                        @RequestBody InventoryDto updatedInventory) {
        InventoryDto inventoryDto = inventoryService.updateInventory(inventoryId, updatedInventory);
        return ResponseEntity.ok(inventoryDto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteInventory(@PathVariable("id") Long inventoryId) {
        inventoryService.deleteInventory(inventoryId);
        return ResponseEntity.ok("Inventory deleted successfully!.");
    }
}