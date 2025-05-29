import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../../shared/models/product.model';

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
  displayedColumns: string[] = ['id', 'name', 'price', 'vendorId'];
  constructor() { }
  ngOnInit(): void {
    this.loadProducts();     
  }

  loadProducts(): void {
      const productsData = [
        { id: 1, name: 'Product 1', price: 100, vendorId: 1 },
        { id: 2, name: 'Product 2', price: 200, vendorId: 1  },
        { id: 3, name: 'Product 3', price: 300, vendorId: 1  }
      ]
      this.products = productsData;
  }
}
