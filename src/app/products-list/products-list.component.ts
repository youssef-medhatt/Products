import { Component, inject } from '@angular/core';
import { Product } from '../types/product';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { ProductRequestsService } from '../services/product-requests.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductsCardComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  productRequest = inject(ProductRequestsService);
  products!: Product[];
  ngOnInit() {
    this.productRequest.getProducts().subscribe((data) => {
      this.products = data.products;
    });
  }
}
