package com.systemmanagment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleDetailDto {
    private Long saleId;
    private Long itemId;
    private String itemName;
    private Integer quantity;
    private Double subtotal;
}