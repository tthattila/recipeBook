import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from 'app/recipes/recipe.service';
import { Recipe } from 'app/recipes/recipe.model';
import 'rxjs/Rx';
import { AuthenticationService } from "app/auth/authentication.service";

/* a http methodok observable-ekkel térnek vissza => getnél pl így lehet a visszatérési értéket kinyerni, vagy
csak simán logolni a művelet eredményét */

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
        private recipeService: RecipeService,
        private authentication: AuthenticationService) { }
    /* firebase link + tábla neve + .json (firebase specifik cucc)
    plusz fontos, hogy kell a return statement is, nem elég csak meghívni a methodot */
    saveRecipes() {
        const token = this.authentication.getToken();
        return this.http.put('https://shopping-app-55933.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }
    /* a response objectet egy JSON. a json() methoddal recipe[]-kell alakítani elöször */
    fetchRecipes() {
        const token = this.authentication.getToken();
        this.http.get('https://shopping-app-55933.firebaseio.com/recipes.json?auth=' + token)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = []
                    }
                }
                return recipes;
            })
            .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.getRecipesFromServer(recipes);
            }
            );
    }
}
