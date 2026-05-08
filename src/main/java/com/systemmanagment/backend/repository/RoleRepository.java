package com.systemmanagment.backend.repository;

import com.systemmanagment.backend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

}