package com.systemmanagment.backend.service.impl;

import com.systemmanagment.backend.dto.EmployeeDto;
import com.systemmanagment.backend.entity.Employee;
import com.systemmanagment.backend.mapper.EmployeeMapper;
import com.systemmanagment.backend.repository.EmployeeRepository;
import com.systemmanagment.backend.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
}
