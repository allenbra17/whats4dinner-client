import * as React from 'react';
import  FetchDrinks from "./FetchDrinks";
import { IFetchResponse } from "./Fetch.interface";
// import './App.css';

interface DrinksTableProps {

}
interface DrinksTableState {
    drinksData: IFetchResponse[];
}
 
class DrinksTable extends React.Component<DrinksTableProps, DrinksTableState> {
    baseURL = "https://www.thecocktaildb.com/api/json/v1/1/";
    cocktailURL = `https://www.thecocktaildb.com/drink/`
    constructor(props: DrinksTableProps) {
        super(props);
        this.state = { drinksData: []};
    }

    
    handleFetch = async (ingredient:string) => {
        const drinkRecipe= `${this.baseURL}filter.php?i=${ingredient}`
        const response = await fetch(drinkRecipe)
        const json = await response.json();
        this.setState({ drinksData: json.drinks });
        console.log (json.drinks)
        }
    myDrinks = () => {
        return this.state.drinksData.map((drinks, index) => {
          let cocktailName: string = drinks.strDrink;
          let image = drinks.strDrinkThumb
          let drinkURL = `${this.cocktailURL}${drinks.idDrink}`
        return (<div>
            <span className="cards">
            <h4>{cocktailName}</h4>
            <a href={drinkURL}><img src={image} alt={cocktailName} height='100px' width='100px'/></a>
            </span>
            </div>
            )
        })}
    render() { 
        
        return ( 
            <div>
                {this.state.drinksData.length > 0 ? this.myDrinks() : null}
                <FetchDrinks handleFetch={this.handleFetch}/>
                </div>
         );
    }
}
 
export default DrinksTable;
