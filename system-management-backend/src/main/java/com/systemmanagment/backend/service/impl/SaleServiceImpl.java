package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.SaleDto;
import com.systemmanagment.backend.entity.*;
import com.systemmanagment.backend.exception.ResourceNotFoundException;
import com.systemmanagment.backend.mapper.SaleMapper;
import com.systemmanagment.backend.repository.*;
import com.systemmanagment.backend.service.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final EmployeeRepository employeeRepository;
    private final MenuItemRepository menuItemRepository;

    @Override
    @Transactional
    public SaleDto createSale(SaleDto saleDto) {
        Sale sale = SaleMapper.mapToSale(saleDto);

        Employee employee = employeeRepository.findById(saleDto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ID: " + saleDto.getEmployeeId()));
        sale.setEmployee(employee);

        if (saleDto.getSaleDetails() != null) {
            List<SaleDetail> details = saleDto.getSaleDetails().stream().map(dto -> {
                SaleDetail detail = new SaleDetail();
                MenuItem item = menuItemRepository.findById(dto.getMenuItemId())
                        .orElseThrow(() -> new ResourceNotFoundException("Platillo no encontrado ID: " + dto.getMenuItemId()));

                detail.setMenuItem(item);
                detail.setSale(sale);
                detail.setQuantity(dto.getQuantity());
                detail.setPrice(dto.getPrice());
                detail.setId(new SaleDetailId(null, item.getId()));
                return detail;
            }).collect(Collectors.toList());

            sale.setSaleDetails(details);
        }

        Sale savedSale = saleRepository.save(sale);
        return SaleMapper.mapToSaleDto(savedSale);
    }

    @Override
    public List<SaleDto> getAllSales() {
        return saleRepository.findAll().stream().map(SaleMapper::mapToSaleDto).collect(Collectors.toList());
    }

    @Override
    public SaleDto getSaleById(Long saleId) {
        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada con ID: " + saleId));
        return SaleMapper.mapToSaleDto(sale);
    }

    @Override
    @Transactional
    public SaleDto updateSale(Long saleId, SaleDto updatedSaleDto) {
        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada con ID: " + saleId));
        Employee employee = employeeRepository.findById(updatedSaleDto.getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado"));

        sale.setEmployee(employee);
        sale.setTotalAmount(updatedSaleDto.getTotalAmount());
        return SaleMapper.mapToSaleDto(saleRepository.save(sale));
    }

    @Override
    @Transactional
    public void deleteSale(Long saleId) {
        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() -> new ResourceNotFoundException("Venta no encontrada con ID: " + saleId));
        saleRepository.delete(sale);
    }
}