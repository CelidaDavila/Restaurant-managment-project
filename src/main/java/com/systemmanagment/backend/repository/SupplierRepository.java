package com.systemmanagment.backend.repository;

import com.systemmanagment.backend.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

}