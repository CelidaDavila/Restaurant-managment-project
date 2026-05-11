package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.SaleDto;
import com.systemmanagment.backend.entity.Sale;
import java.util.stream.Collectors;

public class SaleMapper {

    public static SaleDto mapToSaleDto(Sale sale) {
        if (sale == null) return null;

        return new SaleDto(
                sale.getId(),
                sale.getEmployee() != null ? sale.getEmployee().getId() : null,
                sale.getEmployee() != null ? sale.getEmployee().getFirstName() + " " + sale.getEmployee().getLastName() : "Unknown",
                sale.getSaleDate(),
                sale.getTotalAmount(),
                sale.getSaleDetails() != null ? sale.getSaleDetails().stream()
                                                .map(SaleDetailMapper::mapToSaleDetailDto)
                                                .collect(Collectors.toList()) : null
        );
    }

    public static Sale mapToSale(SaleDto saleDto) {
        if (saleDto == null) return null;

        Sale sale = new Sale();
        sale.setId(saleDto.getId());

        if (saleDto.getSaleDate() != null) {
            sale.setSaleDate(saleDto.getSaleDate());
        }

        sale.setTotalAmount(saleDto.getTotalAmount());
        return sale;
    }
}