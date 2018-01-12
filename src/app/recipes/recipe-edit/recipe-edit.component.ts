import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'app/recipes/recipe.service';
import { Recipe } from 'app/recipes/recipe.model';
import { Ingredient } from 'app/shared/ingredient';
import { DataStorageService } from 'app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private storeService: DataStorageService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
      );
  }

  initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients.length > 0) {
        for (let ingredient of recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.min(0.1),
              Validators.max(100)
            ])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgPath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    });
  }

  onAddNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.min(0.1),
          Validators.max(100)
        ])
      }))
  }

  onSubmit() {
    /* const updatedRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );  Since the recipeForm.value objectje ugyanazokat a fieldeket tartalmazza,
    mint a Recipe object ezért nem kell kiszedni belőle, csak simán át is lehet adni magát a formot*/
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value, this.id);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.storeService.saveRecipes().subscribe(response => console.log(response));
    this.recipeForm.reset();
  }

  onDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

}
