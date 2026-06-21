package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(
            ProductService productService) {

        this.productService = productService;
    }

    @PostMapping
    public Product addProduct(
            @RequestBody Product product) {

        return productService.addProduct(product);
    }
 @GetMapping("/{id}")
public Product getProductById(
        @PathVariable String id) {

    System.out.println("ID = " + id);

    return productService.getProductById(id);
}
@PutMapping("/{id}")
public Product updateProduct(
        @PathVariable String id,
        @RequestBody Product product) {

    return productService.updateProduct(
            id,
            product
    );
}
@DeleteMapping("/{id}")
public String deleteProduct(
        @PathVariable String id) {

    return productService.deleteProduct(id);
}
    @GetMapping
    public List<Product> getAllProducts() {

        return productService.getAllProducts();
    }
}
