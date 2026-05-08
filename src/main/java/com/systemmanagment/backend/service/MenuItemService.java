package com.systemmanagment.backend.service;

import com.systemmanagment.backend.dto.MenuItemDto;

import java.util.List;

public interface MenuItemService {

    MenuItemDto createMenuItem(MenuItemDto menuItemDto);

    MenuItemDto getMenuItemById(Long menuItemId);

    List<MenuItemDto> getAllMenuItems();

    MenuItemDto updateMenuItem(Long menuItemId, MenuItemDto updatedMenuItem);

    void deleteMenuItem(Long menuItemId);
}