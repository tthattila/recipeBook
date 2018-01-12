import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from 'app/recipes/recipe.service';
import { Recipe } from 'app/recipes/recipe.model';
import 'rxjs/Rx';
import { AuthenticationService } from 'app/auth/authentication.service';
import { Ingredient } from 'app/shared/ingredient';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import * as firebase from 'firebase';

/* a http methodok observable-ekkel térnek vissza => getnél pl így lehet a visszatérési értéket kinyerni, vagy
csak simán logolni a művelet eredményét */

@Injectable()
export class DataStorageService {

    constructor(private http: Http,
        private recipeService: RecipeService,
        private authentication: AuthenticationService,
        private shoppingListService: ShoppingListService) { }

    /* firebase link + tábla neve + .json (firebase specifik cucc)
    plusz fontos, hogy kell a return statement is, nem elég csak meghívni a methodot */
    saveRecipes() {
        const token = this.authentication.getToken();
        const id = firebase.auth().currentUser.uid;
        return this.http.put('https://shopping-app-55933.firebaseio.com/' + id + '/recipes.json?auth=' + token,
         this.recipeService.getRecipes());
    }

    /* a response objectet egy JSON. a json() methoddal recipe[]-kell alakítani elöször */
    fetchRecipes() {
        const token = this.authentication.getToken();
        const id = firebase.auth().currentUser.uid;
        console.log(id);
        this.http.get('https://shopping-app-55933.firebaseio.com/' + id + '/recipes.json?auth=' + token)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json();
                if (recipes !== null){
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = []
                        }
                    }
                }
                return recipes;
            })
            .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
            );
    }

    saveShoppingListToServer() {
        const token = this.authentication.getToken();
        const id = firebase.auth().currentUser.uid;
        return this.http.put(
            'https://shopping-app-55933.firebaseio.com/' + id + '/ingredients.json?auth=' + token,
             this.shoppingListService.getIngredients()
            );
    }

    fetchShoppingListFromServer() {
        const token = this.authentication.getToken();
        const id = firebase.auth().currentUser.uid;
        this.http.get('https://shopping-app-55933.firebaseio.com/' + id + '/ingredients.json?auth=' + token)
            .map(
                (response: Response) => {
                    const ingredients: Ingredient[] = response.json();
                    if (ingredients !== null){
                        for (let i of ingredients){
                            if (!i['amount']) {
                                i['amount'] = 0;
                                console.log('Amount is missing ==> This should never run.')
                            }
                        }
                    }
                    return ingredients;
                }
            )
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.shoppingListService.setIngredients(ingredients);
                }
            );
    }

}
