import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../shared/models/product.model';
import { ProductsService } from '../product.service';

@Component({
  selector: 'app-product-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    CommonModule 
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'vendorId'];
  constructor(private productService: ProductsService) { }
  ngOnInit(): void {
    this.loadProducts();     
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Failed to load products', err);
      }
    });
  }
}
