import * as React from 'react';
import  FetchFood from "./FetchFood";
import { IFetchResponse } from "./Fetch.interface";
// import './App.css';

interface FoodTableProps {

}
interface FoodTableState {
    FoodData: IFetchResponse[];
}
 
class FoodTable extends React.Component<FoodTableProps, FoodTableState> {
    baseURL = "https://www.themealdb.com/api/json/v1/1/";
    mealURL = `https://www.themealdb.com/meal/`
    constructor(props: FoodTableProps) {
        super(props);
        this.state = { FoodData: []};
    }

    
    handleFetch = async (category:string) => {
        const foodRecipe= `${this.baseURL}filter.php?c=${category}`
        const response = await fetch(foodRecipe)
        const json = await response.json();
        this.setState({ FoodData: json.meals });
        }
    myFood = () => {
        return this.state.FoodData.map((food, index) => {
          let recipeName: string = food.strMeal;
          let image = food.strMealThumb
          let foodURL = `${this.mealURL}${food.idMeal}`
        return (<div>
            <span className="cards">
            <h4>{recipeName}</h4>
            <a href={foodURL}><img src={image} alt={recipeName} height='100px' width='100px'/></a>
            </span>
            </div>
            )
        })}
    render() { 
        
        return ( 
            <div>
                { this.myFood()}
                <FetchFood handleFetch={this.handleFetch}/>
                </div>
         );
    }
}
 
export default FoodTable;
