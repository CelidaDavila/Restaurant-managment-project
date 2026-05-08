package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.InventoryDto;
import com.systemmanagment.backend.entity.Inventory;
import com.systemmanagment.backend.entity.Supplier;

public class InventoryMapper {

    public static InventoryDto mapToInventoryDto(Inventory inventory) {
        return new InventoryDto(
                inventory.getId(),
                inventory.getName(),
                inventory.getQuantity(),
                inventory.getSupplier() != null ? inventory.getSupplier().getId() : null,
                inventory.getSupplier() != null ? inventory.getSupplier().getName() : null
        );
    }

    public static Inventory mapToInventory(InventoryDto inventoryDto, Supplier supplier) {
        return new Inventory(
                inventoryDto.getId(),
                inventoryDto.getName(),
                inventoryDto.getQuantity(),
                supplier
        );
    }
}