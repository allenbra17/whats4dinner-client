export interface MyDrinks {
    cocktailName: string;
    mainIngredient: string;
    cocktailURL: string;
    imgURL: string;
    rating: string;
    userId: string;
}

export interface IDrinkResponse {
    message: string;
    createDrinks: MyDrinks;
}
