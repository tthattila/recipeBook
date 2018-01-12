
import { Injectable } from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';
import { Ingredient } from 'app/shared/ingredient';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Pencakes',
            'In a large bowl, sift together the flour, baking powder, salt and sugar. ' +
            'Make a well in the center and pour in the milk, egg and melted butter; mix until smooth.' +
            'Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle,' +
            'using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.',
            'http://images.media-allrecipes.com/userphotos/720x405/3821005.jpg',
            [new Ingredient('flour (cups)', 0.5), new Ingredient('baking powder (teaspoon)', 1.5),
            new Ingredient('milk (cups)', 0.25), new Ingredient('salt (teaspoon)', 1),
            new Ingredient('egg', 1), new Ingredient('white sugar (teaspoon)', 1),
            new Ingredient('butter (teaspoon)', 3)]
        ),
        new Recipe('Steak',
            'Sprinkle salt and pepper evenly over steaks. Heat a large cast-iron skillet over high heat.' +
            'Add oil to pan; swirl to coat. Add steaks to pan; cook 3 minutes on each side or until browned.' +
            'Reduce heat to medium-low; add butter, thyme, and garlic to pan. Carefully grasp pan handle using' +
            'an oven mitt or folded dish towel. Tilt pan toward you so butter pools; cook 1 1/2 minutes,' +
            'basting steaks with butter constantly. Remove steaks from pan; cover loosely with foil. Let stand 10 minutes.' +
            'Reserve butter mixture.',
            'https://www.ndtv.com/cooks/images/chicken.steak_620.jpg',
            [new Ingredient('strip steak', 2), new Ingredient('olive oil (tablespoon)', 1),
            new Ingredient('thyme spring', 2), new Ingredient('salt (teaspoon)', 1),
            new Ingredient('garlic clove', 1), new Ingredient('black pepper (teaspoon)', 1),
            new Ingredient('butter (tablespoon)', 2)]
        )
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        if (this.recipes !== null) {
            return this.recipes.slice();
        }
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        if (recipes === null) {
            this.recipes = [];
        }
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(updatedRecipe: Recipe, index: number) {
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
