package com.systemmanagment.backend.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class SaleDetailId implements Serializable {
    private Long saleId;
    private Long menuItemId;

    // Es obligatorio implementar equals y hashCode para llaves compuestas
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SaleDetailId that = (SaleDetailId) o;
        return Objects.equals(saleId, that.saleId) && Objects.equals(menuItemId, that.menuItemId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(saleId, menuItemId);
    }
}