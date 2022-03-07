import * as React from "react";
import { IFetchResponse } from "./Fetch.interface";
import { Drink } from "./Ingred.Interface";
// import './App.css';

interface FetchDrinksProps {
    handleFetch: (ingredient: string) => void
}

interface FetchDrinksState {
  ingredData: Drink[];
  drinkData: IFetchResponse[];
}

class FetchDrinks extends React.Component<FetchDrinksProps, FetchDrinksState> {
  baseURL = "https://www.thecocktaildb.com/api/json/v1/1/";
  cocktailURL = `https://www.thecocktaildb.com/drink/`;
  ingredientList = `${this.baseURL}list.php?i=list`;
  categoryList = `${this.baseURL}list.php?c=list`;

  // byLetter = `${this.baseURL}search.php?f=${this.letter}`
  constructor(props: FetchDrinksProps) {
    super(props);
    this.state = { ingredData: [], drinkData: [] };
  }

  handleIngredFetch = async () => {
    // const response = await fetch(this.drinkRecipe)
    const response = await fetch(this.ingredientList);
    const json = await response.json();
    this.setState({ ingredData: json.drinks });
    console.log(this.state.ingredData);
  };




  myIngred = () => {
    return this.state.ingredData.map((drinks, index) => {


      return (

        
        <div>
            <span className="cards">
            <img src={`http://www.thecocktaildb.com/images/ingredients/${drinks.strIngredient1}-Small.png`}/>
            <br/>
            <button onClick={() => this.props.handleFetch(drinks.strIngredient1)}>
            {drinks.strIngredient1}
            </button>
            </span>

        </div>
    
      );
      
    });
    
  };
  

  render() {
    return (
      <div>
        {this.state.ingredData.length > 0 ? this.myIngred() : null}
        <br />
        <button onClick={this.handleIngredFetch}>Search by Ingredient</button>
      </div>
    );
  }
}

export default FetchDrinks;
