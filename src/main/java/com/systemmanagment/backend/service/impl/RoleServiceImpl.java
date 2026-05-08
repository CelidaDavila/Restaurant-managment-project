package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.RoleDto;
import com.systemmanagment.backend.entity.Role;
import com.systemmanagment.backend.exception.ResourceNotFoundException;
import com.systemmanagment.backend.mapper.RoleMapper;
import com.systemmanagment.backend.repository.RoleRepository;
import com.systemmanagment.backend.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {

    private RoleRepository roleRepository;

    @Override
    public RoleDto createRole(RoleDto roleDto) {
        Role role = RoleMapper.mapToRole(roleDto);
        Role savedRole = roleRepository.save(role);

        return RoleMapper.mapToRoleDto(savedRole);
    }

    @Override
    public RoleDto getRoleById(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role does not exist with given ID: " + roleId));

        return RoleMapper.mapToRoleDto(role);
    }

    @Override
    public List<RoleDto> getAllRoles() {
        List<Role> roles = roleRepository.findAll();

        return roles.stream()
                .map((role) -> RoleMapper.mapToRoleDto(role))
                .collect(Collectors.toList());
    }

    @Override
    public RoleDto updateRole(Long roleId, RoleDto updatedRole) {
        Role role = roleRepository.findById(roleId).orElseThrow(
                () -> new ResourceNotFoundException("Role does not exist with given ID: " + roleId)
        );

        role.setName(updatedRole.getName());
        role.setSalary(updatedRole.getSalary());

        Role updatedRoleObj = roleRepository.save(role);

        return RoleMapper.mapToRoleDto(updatedRoleObj);
    }

    @Override
    public void deleteRole(Long roleId) {
        Role role = roleRepository.findById(roleId).orElseThrow(
                () -> new ResourceNotFoundException("Role does not exist with given ID: " + roleId)
        );

        roleRepository.deleteById(roleId);
    }
}