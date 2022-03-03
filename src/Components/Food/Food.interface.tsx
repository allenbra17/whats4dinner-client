export interface CreateFood {
    id: number;
    recipeName: string;
    mainIngredient: string;
    recipeURL: string;
    imgURL: string;
    userId: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface IFoodResponse {
    message: string;
    createFood: CreateFood;
}
