package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.RoleDto;
import com.systemmanagment.backend.entity.Role;

public class RoleMapper {

    public static RoleDto mapToRoleDto(Role role) {
        return new RoleDto(
                role.getId(),
                role.getName(),
                role.getSalary()
        );
    }

    public static Role mapToRole(RoleDto roleDto) {
        return new Role(
                roleDto.getId(),
                roleDto.getName(),
                roleDto.getSalary()
        );
    }
}
