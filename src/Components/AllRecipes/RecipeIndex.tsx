import * as React from 'react';
import stove from "../../Assets/stove.png"


interface RecipeIndexProps {
    
}
 
interface RecipeIndexState {
    cocktailName: string,
    mainIngredient: string,
    cocktailURL: string,
    imgURL: string,
    userId: number
}
 
class RecipeIndex extends React.Component<RecipeIndexProps, RecipeIndexState> {
    constructor(props: RecipeIndexProps) {
        super(props);
    this.state = {cocktailName: "",
        mainIngredient: "",
        cocktailURL: "",
        imgURL: "",
        userId: 0
    }};
    
    render() { 
        return ( <div>
            <img src={stove} alt="" />
            <h1 className="title">Whats4Dinner</h1>
            <h1 className="title">RecipeIndex</h1>
            {/* <button onClick={logout}>Logout</button> */}
            </div>
         );
    }
}
 
export default RecipeIndex;