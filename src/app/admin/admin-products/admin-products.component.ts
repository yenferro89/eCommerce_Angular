import { Product } from './../../model/model-product';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  
  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll()
    .subscribe((products: Product[]) => {
      this.filteredProducts = this.products = products;
    });
  }

  filter(query: string) {
    this.filteredProducts = query
    ? this.products.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    : this.products;
}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
