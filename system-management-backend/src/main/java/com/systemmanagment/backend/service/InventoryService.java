package com.systemmanagment.backend.service;

import com.systemmanagment.backend.dto.InventoryDto;

import java.util.List;

public interface InventoryService {

    InventoryDto createInventory(InventoryDto inventoryDto);

    InventoryDto getInventoryById(Long inventoryId);

    List<InventoryDto> getAllInventory();

    InventoryDto updateInventory(Long inventoryId, InventoryDto updatedInventory);

    void deleteInventory(Long inventoryId);
}