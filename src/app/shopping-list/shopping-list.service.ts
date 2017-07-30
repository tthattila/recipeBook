import { Ingredient } from "app/shared/ingredient";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ShoppingListService {

    shoppingListChanged = new Subject<Ingredient[]>();

    ingredients: Ingredient[] = [];

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.shoppingListChanged.next(this.ingredients.slice());
    }

    getIngredients() {
        return this.ingredients.slice();
    }


    addIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.shoppingListChanged.next(this.ingredients.slice());
    }
}
