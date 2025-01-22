import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../types/product';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private count = new BehaviorSubject<number>(0); // Total item count in the cart
  private productsArr = new BehaviorSubject<Product[]>([]); // Array of products in the cart

  constructor(private snackBar: MatSnackBar) {}

  getCount() {
    return this.count.asObservable();
  }

  setCount(newCount: number) {
    this.count.next(newCount);
  }

  addProduct(product: Product): boolean {
    const currentProducts = this.productsArr.getValue();
    let existingProduct = false;
    currentProducts.forEach((p) => {
      if (p.id === product.id) existingProduct = true;
    });
    console.log(currentProducts);

    if (existingProduct) {
      this.snackBar.open('Product already added!', 'Close', {
        duration: 3000, // Snackbar duration (3 seconds)
      });      return false;
    } else {
      currentProducts.push(product);
      this.productsArr.next(currentProducts);
      this.count.next(this.count.getValue() + 1);
      this.snackBar.open('Product added to the cart!', 'Close', {
        duration: 3000, // Snackbar duration (3 seconds)
      });
      return true;
    }
  }

  removeProduct(product: Product) {
    const currentProducts = this.productsArr.getValue();
    const index = currentProducts.indexOf(product);
    currentProducts.splice(index, 1);
    this.productsArr.next(currentProducts);
    this.count.next(this.count.getValue() - 1);
    this.snackBar.open('Product removed', 'Close', {
      duration: 3000, // Snackbar duration (3 seconds)
    });
  }

  modifyProductCount(product: Product, newCount: number) {
    const currentProducts = this.productsArr.getValue();
    const index = currentProducts.indexOf(product);
    currentProducts[index].count = newCount;
    this.productsArr.next(currentProducts);
  }

  getCartProducts() {
    return this.productsArr.asObservable();
  }
}
