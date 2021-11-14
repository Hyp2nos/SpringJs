package com.js.org.coontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.js.org.model.Product;
import com.js.org.repository.ProductRepo;

@RestController
@CrossOrigin("*")
public class ProductController {

	@Autowired
	ProductRepo productRepo;
	
	@GetMapping("/productList")
	public List<Product> getProductList(){
		return productRepo.findAll();
	}
	
	@GetMapping("/product")
	public Optional<Product> getProductById(@RequestParam Long id){
		return productRepo.findById(id);
	}
	
	@PostMapping("/product")
	public Product saveProduct(@RequestBody Product product) {
		return productRepo.save(product);
	}
	
	@DeleteMapping("/product")
	public void deleteProduct(@RequestParam Long id) {
		productRepo.deleteById(id);
	}
}
