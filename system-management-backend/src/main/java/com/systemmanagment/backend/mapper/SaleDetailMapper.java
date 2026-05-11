package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.SaleDetailDto;
import com.systemmanagment.backend.entity.SaleDetail;

public class SaleDetailMapper {

    public static SaleDetailDto mapToSaleDetailDto(SaleDetail saleDetail) {
        if (saleDetail == null) return null;

        return new SaleDetailDto(
                saleDetail.getMenuItem().getId(),
                saleDetail.getMenuItem().getName(),
                saleDetail.getQuantity(),
                saleDetail.getPrice()
        );
    }
}