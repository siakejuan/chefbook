import { Ingredient } from 'src/app/shared/ingredient.model';
// import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

// import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    // recipeSelected = new EventEmitter<Recipe>();
    // recipeSelected = new Subject<Recipe>();

    recipesUpdated = new EventEmitter<Recipe[]>();

    private recipes: Recipe[];
    // private recipes: Recipe[] = [
    //     new Recipe('Burger',
    //         'Description of burger',
    //         'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
    //         [
    //             new Ingredient('Bun', 1),
    //             new Ingredient('Meat', 1)
    //         ]),
    //     new Recipe('Fried Noodle',
    //         'Delicious fried noodle',
    //         'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
    //         [
    //             new Ingredient('Noodle', 1),
    //             new Ingredient('Carrot', 500)
    //         ])
    // ];

    constructor(
        // private shoppingListService: ShoppingListService,
        private store: Store<fromApp.AppState>
    ) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.shoppingListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    }

    getRecipe(id: number) {
        return this.recipes.slice()[id];
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        console.log(this.recipes.length);
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteIngredient(index: number, recipeId: number) {

        console.log(this.recipes[recipeId].ingredients[1]);
        this.recipes[recipeId].ingredients.splice(index, 1);

        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
}