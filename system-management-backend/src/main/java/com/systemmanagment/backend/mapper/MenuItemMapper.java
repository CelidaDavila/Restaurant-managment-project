package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.MenuItemDto;
import com.systemmanagment.backend.entity.MenuItem;

public class MenuItemMapper {
    public static MenuItemDto mapToMenuItemDto(MenuItem menuItem) {
        return new MenuItemDto(
                menuItem.getId(),
                menuItem.getName(),
                menuItem.getPrice(),
                menuItem.getDescription()
        );
    }

    public static MenuItem mapToMenuItem(MenuItemDto menuItemDto) {
        return new MenuItem(
                menuItemDto.getId(),
                menuItemDto.getName(),
                menuItemDto.getPrice(),
                menuItemDto.getDescription()
        );
    }
}