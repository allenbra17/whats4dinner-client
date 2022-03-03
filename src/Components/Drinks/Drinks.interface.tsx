export interface CreateDrinks {
    id: number;
    cocktailName: string;
    mainIngredient: string;
    cocktailURL: string;
    imgURL: string;
    userId: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface IRecipeResponse {
    message: string;
    createDrinks: CreateDrinks;
}
