package com.systemmanagment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryDto {
    private Long id;
    private String name;
    private Integer quantity;
    private Long supplierId;
    private String supplierName;
}