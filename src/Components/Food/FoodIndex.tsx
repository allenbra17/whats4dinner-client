import * as React from 'react';
import FoodTable from './FoodTable';






interface FoodIndexProps {
    
}
 
interface FoodIndexState {
    recipeName: string,
    mainIngredient: string,
    recipeURL: string,
    imgURL: string
}
 
class FoodIndex extends React.Component<FoodIndexProps, FoodIndexState> {
    constructor(props: FoodIndexProps) {
        super(props);
        this.state = {recipeName: "",
            mainIngredient: "",
            recipeURL: "",
            imgURL: ""};
    }
    render() { 
        return ( 
            <div>
                <FoodTable/>
            </div>
         );
    }
}
 
export default FoodIndex;