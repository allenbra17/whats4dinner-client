import * as React from 'react';
import DrinksTable from './DrinksTable';
// import './App.css';
import "bootstrap/dist/css/bootstrap.css";






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
            <section className="p-5">
            <div className="container">
              <h1 className="text-center pb-3">Search Results</h1>
              <DrinksTable/>
              </div>
          </section>
            
         );
    }
}
 
export default DrinkIndex;