package com.systemmanagment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaleDto {
    private Long id;
    private LocalDate date;
    private Double total;
    private Long employeeId;
    private String employeeName;
}