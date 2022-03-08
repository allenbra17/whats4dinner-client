export interface CreateDrinks {
    cocktailName: string;
    mainIngredient: string;
    cocktailURL: string;
    imgURL: string;
}

export interface IDrinkResponse {
    message: string;
    createDrinks: CreateDrinks;
}
