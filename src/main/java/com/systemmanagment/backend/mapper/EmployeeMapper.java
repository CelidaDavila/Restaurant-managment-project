package com.systemmanagment.backend.mapper;

import com.systemmanagment.backend.dto.EmployeeDto;
import com.systemmanagment.backend.entity.Employee;
import com.systemmanagment.backend.entity.Role;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getRole().getId(),
                employee.getRole().getName()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto, Role role) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                role
        );
    }
}