import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from "app/shared/ingredient";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {


  ingredients: Ingredient[];
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.shoppingListChanged
      .subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

}
