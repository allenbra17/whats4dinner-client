export interface CreateFood {
    recipeName: string;
    category: string;
    recipeURL: string;
    imgURL: string;
}

export interface IFoodResponse {
    message: string;
    createFood: CreateFood;
}
