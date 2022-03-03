import * as React from 'react';
import FetchDrinks from './FetchDrinks';
let drinkID = 11007
let baseURL = "https://www.thecocktaildb.com/api/json/v1/1/"
let drinkURL = `https://www.thecocktaildb.com/drink/${drinkID}`
let ingredientList = `${baseURL}list.php?i=list`
let categoryList =`${baseURL}list.php?c=list`
let drinkRecipe = new URL(baseURL + 'lookup.php?i=' + drinkID)

console.log(drinkURL);
console.log(ingredientList);
console.log(categoryList);



interface DrinkIndexProps {
    
}
 
interface DrinkIndexState {
    cocktailName: string,
    mainIngredient: string,
    cocktailURL: string,
    imgURL: string
}
 
class DrinkIndex extends React.Component<DrinkIndexProps, DrinkIndexState> {
    constructor(props: DrinkIndexProps) {
        super(props);
        this.state = {cocktailName: "",
            mainIngredient: "",
            cocktailURL: "",
            imgURL: ""};
    }
    render() { 
        return ( 
            <div>
                <FetchDrinks />
            </div>
         );
    }
}
 
export default DrinkIndex;