package com.systemmanagment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDetailDto {
    private Long menuItemId;
    private String menuItemName;
    private Integer quantity;
    private Double price;
}