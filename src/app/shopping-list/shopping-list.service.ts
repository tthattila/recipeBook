import { Ingredient } from 'app/shared/ingredient';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {

    shoppingListChanged = new Subject<Ingredient[]>();
    selectedIngredient = new Subject<number>();

    ingredients: Ingredient[] = [];

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.shoppingListChanged.next(this.ingredients.slice());
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    setIngredients(ingredients: Ingredient []) {
        this.ingredients = ingredients;
        this.shoppingListChanged.next(this.ingredients);
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    changeIngredient(index: number, editedIngredient: Ingredient) {
        this.ingredients[index] = editedIngredient;
        this.shoppingListChanged.next(this.ingredients.slice());
    }


    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.shoppingListChanged.next(this.ingredients.slice());
    }

    clearShoppingList() {
        this.ingredients = [];
        this.shoppingListChanged.next(this.ingredients);
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.shoppingListChanged.next(this.ingredients);
    }

}
