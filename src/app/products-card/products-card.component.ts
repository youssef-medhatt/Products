import { Component, inject, Input } from '@angular/core';
import { Product } from '../types/product';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.css'
})
export class ProductsCardComponent {
  @Input() product !: Product;
  cartService = inject(CartService);
  count !: number;
  constructor(private router: Router) { }
  
  ngOnInit() {
    this.cartService.getCount().subscribe((count) => {
      this.count = count;
    });
  }


  redirectToProductDetails(id: number) {
    console.log('Redirecting to product details page');
    this.router.navigate(['/products-details', id]);
  }
  addToCart(event: Event, product: Product): void {
    event.stopPropagation(); // Prevents the card's click event
    this.cartService.addProduct(product);
  }
  
  
}
