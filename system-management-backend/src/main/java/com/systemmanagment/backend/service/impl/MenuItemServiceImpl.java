package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.MenuItemDto;
import com.systemmanagment.backend.entity.MenuItem;
import com.systemmanagment.backend.exception.ResourceNotFoundException;
import com.systemmanagment.backend.mapper.MenuItemMapper;
import com.systemmanagment.backend.repository.MenuItemRepository;
import com.systemmanagment.backend.service.MenuItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MenuItemServiceImpl implements MenuItemService {

    private MenuItemRepository menuItemRepository;

    @Override
    public MenuItemDto createMenuItem(MenuItemDto menuItemDto) {
        MenuItem menuItem = MenuItemMapper.mapToMenuItem(menuItemDto);
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);

        return MenuItemMapper.mapToMenuItemDto(savedMenuItem);
    }

    @Override
    public MenuItemDto getMenuItemById(Long menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item does not exist with given ID: " + menuItemId));

        return MenuItemMapper.mapToMenuItemDto(menuItem);
    }

    @Override
    public List<MenuItemDto> getAllMenuItems() {
        List<MenuItem> menuItems = menuItemRepository.findAll();

        return menuItems.stream()
                .map((menuItem) -> MenuItemMapper.mapToMenuItemDto(menuItem))
                .collect(Collectors.toList());
    }

    @Override
    public MenuItemDto updateMenuItem(Long menuItemId, MenuItemDto updatedMenuItem) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId).orElseThrow(
                () -> new ResourceNotFoundException("Menu item does not exist with given ID: " + menuItemId)
        );

        menuItem.setName(updatedMenuItem.getName());
        menuItem.setPrice(updatedMenuItem.getPrice());
        menuItem.setDescription(updatedMenuItem.getDescription());

        MenuItem updatedMenuItemObj = menuItemRepository.save(menuItem);

        return MenuItemMapper.mapToMenuItemDto(updatedMenuItemObj);
    }

    @Override
    public void deleteMenuItem(Long menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId).orElseThrow(
                () -> new ResourceNotFoundException("Menu item does not exist with given ID: " + menuItemId)
        );

        menuItemRepository.deleteById(menuItemId);
    }
}