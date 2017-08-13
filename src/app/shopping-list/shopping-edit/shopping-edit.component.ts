import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'app/shared/ingredient';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {


  /*   @ViewChild('nameInput') nameInput: ElementRef;
    @ViewChild('amountInput') amountInput: ElementRef; */

  editMode = false;
  selectedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('form') form: NgForm;
  shoppingListHasSize = false;

  subscription: Subscription;
  subscritption2: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscritption2 = this.shoppingListService.shoppingListChanged
      .subscribe(
      (ingredients: Ingredient[]) => {
        if (ingredients.length > 0) {
          this.shoppingListHasSize = true;
        }
      }
      );

    this.subscription = this.shoppingListService.selectedIngredient
      .subscribe(
      (index: number) => {
        this.editMode = true;
        this.selectedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          nameInput: this.editedItem.name,
          amountInput: this.editedItem.amount
        });
      }
      );
  }

  onSubmit(form: NgForm) {
    const ingName = form.controls.nameInput.value;
    const ingAmount = form.controls.amountInput.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.changeIngredient(this.selectedItemIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.shoppingListService.clearShoppingList();
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedItemIndex);
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscritption2.unsubscribe();
  }

  // #nameInput + @ViewChild('nameinput') ==> local variable driven input
  /* onAddInput() {
     const ingName = this.nameInput.nativeElement.value;
     const ingAmount = this.amountInput.nativeElement.value;
     const newIngredient = new Ingredient(ingName, ingAmount);
     this.shoppingListService.addIngredient(newIngredient);
   } */

}
