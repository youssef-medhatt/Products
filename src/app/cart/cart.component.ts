import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductRequestsService } from '../services/product-requests.service';
import { Product } from '../types/product';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart = inject(CartService);
  productsArr: Product[] = [];
  totalPrice: number = 0;
  count: number = 0;
  ngOnInit() {
    this.cart.getCartProducts().subscribe((res) => {
      res.forEach((product) => { if (product.count === undefined) product.count = 1 })
      this.productsArr = res;
      this.totalPrice = 0;
      this.productsArr.forEach((product) => {
        if (product.count !== undefined) {
          this.totalPrice += product.count * product.price;
        }
      })
      
    });
    this.cart.getCount().subscribe((res) => this.count = res);
  }
  add(product: Product) {
    if (product.count !== undefined && product.count< product.stock) {
      this.cart.modifyProductCount(product, product.count + 1);
    }
     
  }
  sub(product : Product) {
    if (product.count !== undefined && product.count >1) {
      this.cart.modifyProductCount(product, product.count - 1);
    }
  }
  removeItem(product: Product) {
    this.cart.removeProduct(product);
  }
}
