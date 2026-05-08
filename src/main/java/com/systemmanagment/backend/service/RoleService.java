package com.systemmanagment.backend.service;

import com.systemmanagment.backend.dto.RoleDto;

import java.util.List;

public interface RoleService {

    RoleDto createRole(RoleDto roleDto);

    RoleDto getRoleById(Long roleId);

    List<RoleDto> getAllRoles();

    RoleDto updateRole(Long roleId, RoleDto updatedRole);

    void deleteRole(Long roleId);
}