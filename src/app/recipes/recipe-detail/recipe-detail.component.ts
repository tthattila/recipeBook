import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from "app/recipes/recipe.model";
import { RecipeService } from "app/recipes/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  id:number;
  recipeDetail: Recipe;

  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params
    .subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.recipeDetail = this.recipeService.getRecipe(this.id); 
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients);
  }

  onClick(){
    this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.activatedRoute})
  }

}
