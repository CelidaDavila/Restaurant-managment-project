package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.SaleDetailDto;
import com.systemmanagment.backend.entity.MenuItem;
import com.systemmanagment.backend.entity.SaleDetail;
import com.systemmanagment.backend.entity.SaleDetailId;
import com.systemmanagment.backend.exception.ResourceNotFoundException;
import com.systemmanagment.backend.mapper.SaleDetailMapper;
import com.systemmanagment.backend.repository.MenuItemRepository;
import com.systemmanagment.backend.repository.SaleDetailRepository;
import com.systemmanagment.backend.repository.SaleRepository;
import com.systemmanagment.backend.service.SaleDetailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SaleDetailServiceImpl implements SaleDetailService {

    private SaleDetailRepository saleDetailRepository;
    private SaleRepository saleRepository;
    private MenuItemRepository menuItemRepository;

    @Override
    public List<SaleDetailDto> getAllSaleDetails() {
        List<SaleDetail> saleDetails = saleDetailRepository.findAll();
        return saleDetails.stream()
                .map(SaleDetailMapper::mapToSaleDetailDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SaleDetailDto createSaleDetail(SaleDetailDto saleDetailDto) {
        SaleDetail saleDetail = new SaleDetail();

        MenuItem menuItem = menuItemRepository.findById(saleDetailDto.getMenuItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Platillo no encontrado"));

        saleDetail.setMenuItem(menuItem);
        saleDetail.setQuantity(saleDetailDto.getQuantity());
        saleDetail.setPrice(saleDetailDto.getPrice());

        saleDetail.setId(new SaleDetailId(null, menuItem.getId()));

        SaleDetail savedDetail = saleDetailRepository.save(saleDetail);
        return SaleDetailMapper.mapToSaleDetailDto(savedDetail);
    }

    @Override
    public SaleDetailDto getSaleDetailById(Long saleId, Long menuItemId) {
        SaleDetailId id = new SaleDetailId(saleId, menuItemId);

        SaleDetail saleDetail = saleDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Detalle de venta no encontrado con SaleID: " + saleId + " y MenuItemID: " + menuItemId));

        return SaleDetailMapper.mapToSaleDetailDto(saleDetail);
    }

    @Override
    @Transactional
    public SaleDetailDto updateSaleDetail(Long saleId, Long menuItemId, SaleDetailDto updatedSaleDetailDto) {
        SaleDetailId id = new SaleDetailId(saleId, menuItemId);

        SaleDetail saleDetail = saleDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Detalle de venta no encontrado"));

        saleDetail.setQuantity(updatedSaleDetailDto.getQuantity());
        saleDetail.setPrice(updatedSaleDetailDto.getPrice());

        SaleDetail updatedDetail = saleDetailRepository.save(saleDetail);
        return SaleDetailMapper.mapToSaleDetailDto(updatedDetail);
    }

    @Override
    @Transactional
    public void deleteSaleDetail(Long saleId, Long menuItemId) {
        SaleDetailId id = new SaleDetailId(saleId, menuItemId);

        SaleDetail saleDetail = saleDetailRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Detalle de venta no encontrado"));

        saleDetailRepository.delete(saleDetail);
    }
}