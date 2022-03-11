export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface ICatResponse {
    categories: Category[];
}