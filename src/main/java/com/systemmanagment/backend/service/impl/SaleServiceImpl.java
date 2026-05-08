package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.SaleDto;
import com.systemmanagment.backend.entity.Employee;
import com.systemmanagment.backend.entity.Sale;
import com.systemmanagment.backend.exception.ResourceNotFoundException;
import com.systemmanagment.backend.mapper.SaleMapper;
import com.systemmanagment.backend.repository.EmployeeRepository;
import com.systemmanagment.backend.repository.SaleRepository;
import com.systemmanagment.backend.service.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SaleServiceImpl implements SaleService {

    private SaleRepository saleRepository;
    private EmployeeRepository employeeRepository;

    @Override
    public SaleDto createSale(SaleDto saleDto) {

        Employee employee = null;

        if (saleDto.getEmployeeId() != null) {
            employee = employeeRepository.findById(saleDto.getEmployeeId()).orElseThrow(
                    () -> new ResourceNotFoundException("Employee does not exist with given ID: " + saleDto.getEmployeeId())
            );
        }

        Sale sale = SaleMapper.mapToSale(saleDto, employee);
        Sale savedSale = saleRepository.save(sale);

        return SaleMapper.mapToSaleDto(savedSale);
    }

    @Override
    public SaleDto getSaleById(Long saleId) {
        Sale sale = saleRepository.findById(saleId).orElseThrow(
                () -> new ResourceNotFoundException("Sale does not exist with given ID: " + saleId)
        );

        return SaleMapper.mapToSaleDto(sale);
    }

    @Override
    public List<SaleDto> getAllSales() {
        List<Sale> sales = saleRepository.findAll();

        return sales.stream()
                .map((sale) -> SaleMapper.mapToSaleDto(sale))
                .collect(Collectors.toList());
    }

    @Override
    public SaleDto updateSale(Long saleId, SaleDto updatedSale) {

        Sale sale = saleRepository.findById(saleId).orElseThrow(
                () -> new ResourceNotFoundException("Sale does not exist with given ID: " + saleId)
        );

        Employee employee = null;

        if (updatedSale.getEmployeeId() != null) {
            employee = employeeRepository.findById(updatedSale.getEmployeeId()).orElseThrow(
                    () -> new ResourceNotFoundException("Employee does not exist with given ID: " + updatedSale.getEmployeeId())
            );
        }

        sale.setDate(updatedSale.getDate());
        sale.setTotal(updatedSale.getTotal());
        sale.setEmployee(employee);

        Sale updatedSaleObj = saleRepository.save(sale);

        return SaleMapper.mapToSaleDto(updatedSaleObj);
    }

    @Override
    public void deleteSale(Long saleId) {
        Sale sale = saleRepository.findById(saleId).orElseThrow(
                () -> new ResourceNotFoundException("Sale does not exist with given ID: " + saleId)
        );

        saleRepository.deleteById(saleId);
    }
}