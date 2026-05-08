package com.systemmanagment.backend.repository;

import com.systemmanagment.backend.entity.SaleDetail;
import com.systemmanagment.backend.entity.SaleDetailId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleDetailRepository extends JpaRepository<SaleDetail, SaleDetailId> {

}