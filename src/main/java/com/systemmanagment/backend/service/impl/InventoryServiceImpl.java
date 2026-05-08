package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.InventoryDto;
import com.systemmanagment.backend.entity.Inventory;
import com.systemmanagment.backend.entity.Supplier;
import com.systemmanagment.backend.exception.ResourceNotFoundException;
import com.systemmanagment.backend.mapper.InventoryMapper;
import com.systemmanagment.backend.repository.InventoryRepository;
import com.systemmanagment.backend.repository.SupplierRepository;
import com.systemmanagment.backend.service.InventoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private InventoryRepository inventoryRepository;
    private SupplierRepository supplierRepository;

    @Override
    public InventoryDto createInventory(InventoryDto inventoryDto) {

        Supplier supplier = null;

        if (inventoryDto.getSupplierId() != null) {
            supplier = supplierRepository.findById(inventoryDto.getSupplierId()).orElseThrow(
                    () -> new ResourceNotFoundException("Supplier does not exist with given ID: " + inventoryDto.getSupplierId())
            );
        }

        Inventory inventory = InventoryMapper.mapToInventory(inventoryDto, supplier);
        Inventory savedInventory = inventoryRepository.save(inventory);

        return InventoryMapper.mapToInventoryDto(savedInventory);
    }

    @Override
    public InventoryDto getInventoryById(Long inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory does not exist with given ID: " + inventoryId));

        return InventoryMapper.mapToInventoryDto(inventory);
    }

    @Override
    public List<InventoryDto> getAllInventory() {
        List<Inventory> inventoryList = inventoryRepository.findAll();

        return inventoryList.stream()
                .map((inventory) -> InventoryMapper.mapToInventoryDto(inventory))
                .collect(Collectors.toList());
    }

    @Override
    public InventoryDto updateInventory(Long inventoryId, InventoryDto updatedInventory) {

        Inventory inventory = inventoryRepository.findById(inventoryId).orElseThrow(
                () -> new ResourceNotFoundException("Inventory does not exist with given ID: " + inventoryId)
        );

        Supplier supplier = null;

        if (updatedInventory.getSupplierId() != null) {
            supplier = supplierRepository.findById(updatedInventory.getSupplierId()).orElseThrow(
                    () -> new ResourceNotFoundException("Supplier does not exist with given ID: " + updatedInventory.getSupplierId())
            );
        }

        inventory.setName(updatedInventory.getName());
        inventory.setQuantity(updatedInventory.getQuantity());
        inventory.setSupplier(supplier);

        Inventory updatedInventoryObj = inventoryRepository.save(inventory);

        return InventoryMapper.mapToInventoryDto(updatedInventoryObj);
    }

    @Override
    public void deleteInventory(Long inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId).orElseThrow(
                () -> new ResourceNotFoundException("Inventory does not exist with given ID: " + inventoryId)
        );

        inventoryRepository.deleteById(inventoryId);
    }
}