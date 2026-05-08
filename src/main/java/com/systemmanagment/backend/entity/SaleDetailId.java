package com.systemmanagment.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SaleDetailId implements Serializable {

    @Column(name = "sale_id")
    private Long saleId;

    @Column(name = "item_id")
    private Long itemId;
}