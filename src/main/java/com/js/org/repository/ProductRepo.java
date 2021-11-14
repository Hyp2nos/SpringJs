package com.js.org.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.js.org.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long>{

}
