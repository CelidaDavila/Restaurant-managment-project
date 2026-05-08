package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.SaleDetailDto;
import com.systemmanagment.backend.entity.MenuItem;
import com.systemmanagment.backend.entity.Sale;
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

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SaleDetailServiceImpl implements SaleDetailService {

    private SaleDetailRepository saleDetailRepository;
    private SaleRepository saleRepository;
    private MenuItemRepository menuItemRepository;

    @Override
    public SaleDetailDto createSaleDetail(SaleDetailDto saleDetailDto) {

        Sale sale = saleRepository.findById(saleDetailDto.getSaleId()).orElseThrow(
                () -> new ResourceNotFoundException("Sale does not exist with given ID: " + saleDetailDto.getSaleId())
        );

        MenuItem menuItem = menuItemRepository.findById(saleDetailDto.getItemId()).orElseThrow(
                () -> new ResourceNotFoundException("Menu item does not exist with given ID: " + saleDetailDto.getItemId())
        );

        SaleDetail saleDetail = SaleDetailMapper.mapToSaleDetail(saleDetailDto, sale, menuItem);
        SaleDetail savedSaleDetail = saleDetailRepository.save(saleDetail);

        return SaleDetailMapper.mapToSaleDetailDto(savedSaleDetail);
    }

    @Override
    public SaleDetailDto getSaleDetailById(Long saleId, Long itemId) {

        SaleDetailId saleDetailId = new SaleDetailId(saleId, itemId);

        SaleDetail saleDetail = saleDetailRepository.findById(saleDetailId).orElseThrow(
                () -> new ResourceNotFoundException("Sale detail does not exist with sale ID: " + saleId + " and item ID: " + itemId)
        );

        return SaleDetailMapper.mapToSaleDetailDto(saleDetail);
    }

    @Override
    public List<SaleDetailDto> getAllSaleDetails() {
        List<SaleDetail> saleDetails = saleDetailRepository.findAll();

        return saleDetails.stream()
                .map((saleDetail) -> SaleDetailMapper.mapToSaleDetailDto(saleDetail))
                .collect(Collectors.toList());
    }

    @Override
    public SaleDetailDto updateSaleDetail(Long saleId, Long itemId, SaleDetailDto updatedSaleDetail) {

        SaleDetailId saleDetailId = new SaleDetailId(saleId, itemId);

        SaleDetail saleDetail = saleDetailRepository.findById(saleDetailId).orElseThrow(
                () -> new ResourceNotFoundException("Sale detail does not exist with sale ID: " + saleId + " and item ID: " + itemId)
        );

        saleDetail.setQuantity(updatedSaleDetail.getQuantity());
        saleDetail.setSubtotal(updatedSaleDetail.getSubtotal());

        SaleDetail updatedSaleDetailObj = saleDetailRepository.save(saleDetail);

        return SaleDetailMapper.mapToSaleDetailDto(updatedSaleDetailObj);
    }

    @Override
    public void deleteSaleDetail(Long saleId, Long itemId) {

        SaleDetailId saleDetailId = new SaleDetailId(saleId, itemId);

        SaleDetail saleDetail = saleDetailRepository.findById(saleDetailId).orElseThrow(
                () -> new ResourceNotFoundException("Sale detail does not exist with sale ID: " + saleId + " and item ID: " + itemId)
        );

        saleDetailRepository.deleteById(saleDetailId);
    }
}