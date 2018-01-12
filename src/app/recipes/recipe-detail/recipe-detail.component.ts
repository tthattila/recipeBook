import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'app/recipes/recipe.model';
import { RecipeService } from 'app/recipes/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/authentication.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id: number;
  recipeDetail: Recipe;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authentication: AuthenticationService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeDetail = this.recipeService.getRecipe(this.id);
      }
      );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
  }

  onEdit() {
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.activatedRoute })
  }

  onDelete() {
    if (this.authentication.isAuthenticated()) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

}
