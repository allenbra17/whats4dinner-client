export interface MyFood {
    recipeName: string;
    category: string;
    recipeURL: string;
    imgURL: string;
    rating: string;
    userId: string;
}

export interface IFoodResponse {
    message: string;
    createFood: MyFood;
}
