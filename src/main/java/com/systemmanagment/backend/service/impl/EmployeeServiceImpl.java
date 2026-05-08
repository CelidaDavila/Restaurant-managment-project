package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.EmployeeDto;
import com.systemmanagment.backend.entity.Employee;
import com.systemmanagment.backend.entity.Role;
import com.systemmanagment.backend.exception.ResourceNotFoundException;
import com.systemmanagment.backend.mapper.EmployeeMapper;
import com.systemmanagment.backend.repository.EmployeeRepository;
import com.systemmanagment.backend.repository.RoleRepository;
import com.systemmanagment.backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private RoleRepository roleRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Role role = roleRepository.findById(employeeDto.getRoleId()).orElseThrow(
                () -> new ResourceNotFoundException("Role does not exist with given ID: " + employeeDto.getRoleId())
        );

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto, role);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given ID: " + employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream()
                .map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee does not exist with given ID: " + employeeId)
        );

        Role role = roleRepository.findById(updatedEmployee.getRoleId()).orElseThrow(
                () -> new ResourceNotFoundException("Role does not exist with given ID: " + updatedEmployee.getRoleId())
        );

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setRole(role);

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee does not exist with given ID: " + employeeId)
        );

        employeeRepository.deleteById(employeeId);
    }
}