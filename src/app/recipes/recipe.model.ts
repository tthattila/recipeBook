import { Ingredient } from "app/shared/ingredient";

export class Recipe {
    public name: string;
    public description:string;
    public imagePath: string;
    public ingredients:Ingredient[];

    constructor(name:string, desc:string, imgP:string, ingredients:Ingredient[]){
        this.name = name;
        this.description = desc;
        this.imagePath = imgP;
        this.ingredients = ingredients;
    }
}