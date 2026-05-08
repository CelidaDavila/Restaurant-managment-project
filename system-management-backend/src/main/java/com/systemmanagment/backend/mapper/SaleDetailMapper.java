package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.SaleDetailDto;
import com.systemmanagment.backend.entity.MenuItem;
import com.systemmanagment.backend.entity.Sale;
import com.systemmanagment.backend.entity.SaleDetail;
import com.systemmanagment.backend.entity.SaleDetailId;

public class SaleDetailMapper {

    public static SaleDetailDto mapToSaleDetailDto(SaleDetail saleDetail) {
        return new SaleDetailDto(
                saleDetail.getSale().getId(),
                saleDetail.getMenuItem().getId(),
                saleDetail.getMenuItem().getName(),
                saleDetail.getQuantity(),
                saleDetail.getSubtotal()
        );
    }

    public static SaleDetail mapToSaleDetail(SaleDetailDto saleDetailDto, Sale sale, MenuItem menuItem) {
        SaleDetailId saleDetailId = new SaleDetailId(
                saleDetailDto.getSaleId(),
                saleDetailDto.getItemId()
        );

        return new SaleDetail(
                saleDetailId,
                sale,
                menuItem,
                saleDetailDto.getQuantity(),
                saleDetailDto.getSubtotal()
        );
    }
}