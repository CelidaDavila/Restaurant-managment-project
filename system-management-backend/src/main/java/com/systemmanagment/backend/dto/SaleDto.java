package com.systemmanagment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDto {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private LocalDateTime saleDate;
    private Double totalAmount;
    private List<SaleDetailDto> saleDetails;
}