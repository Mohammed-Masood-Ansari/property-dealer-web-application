package com.properties.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.properties.model.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    Page<Property> findByFeaturedTrue(Pageable pageable);

    Page<Property> findByLocationContainingIgnoreCaseAndPriceBetween(
            String location,
            Long minPrice,
            Long maxPrice,
            Pageable pageable
    );

    Page<Property> findByType(String type, Pageable pageable);
}
