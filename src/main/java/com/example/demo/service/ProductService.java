package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(
            ProductRepository productRepository) {

        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(String id) {
    return productRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Product not found"));
}
public Product updateProduct(
        String id,
        Product updatedProduct) {

    Product product =
            productRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("Product not found"));

    product.setName(updatedProduct.getName());
    product.setDescription(updatedProduct.getDescription());
    product.setPrice(updatedProduct.getPrice());
    product.setStock(updatedProduct.getStock());

    return productRepository.save(product);
}
public String deleteProduct(String id) {

    productRepository.deleteById(id);

    return "Product Deleted";
}

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
