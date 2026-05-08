package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.SaleDto;
import com.systemmanagment.backend.entity.Employee;
import com.systemmanagment.backend.entity.Sale;

public class SaleMapper {

    public static SaleDto mapToSaleDto(Sale sale) {
        return new SaleDto(
                sale.getId(),
                sale.getDate(),
                sale.getTotal(),
                sale.getEmployee() != null ? sale.getEmployee().getId() : null,
                sale.getEmployee() != null
                        ? sale.getEmployee().getFirstName() + " " + sale.getEmployee().getLastName()
                        : null
        );
    }

    public static Sale mapToSale(SaleDto saleDto, Employee employee) {
        return new Sale(
                saleDto.getId(),
                saleDto.getDate(),
                saleDto.getTotal(),
                employee
        );
    }
}