import * as React from 'react';
import DrinksTable from './DrinksTable';
// import './App.css';






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
                <DrinksTable/>
            </div>
         );
    }
}
 
export default DrinkIndex;