package com.systemmanagment.backend.repository;

import com.systemmanagment.backend.entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

}