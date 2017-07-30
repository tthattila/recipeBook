
import { Injectable } from "@angular/core";
import { Recipe } from "app/recipes/recipe.model";
import { Ingredient } from "app/shared/ingredient";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe('Gulyas',
            'Finom Gulyas',
            'http://www.seriouseats.com/recipes/assets_c/2016/05/20160605-frijoles-charros-5-thumb-1500xauto-432297.jpg',
            [new Ingredient('hus', 2), new Ingredient('krumpli', 10)]
        ),
        new Recipe('Spagetti',
            'Finom Spagetti',
            'http://m.blog.hu/st/streetkitchen/image/img_9618.jpg',
            [new Ingredient('teszta', 2), new Ingredient('szósz', 10)]
        )
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(id:number){
        return this.recipes[id];
    }

}
