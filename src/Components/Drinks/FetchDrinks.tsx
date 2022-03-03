import * as React from 'react'
import { IFetchResponse } from './Fetch.interface'





interface FetchDrinksProps {
    
}
 
interface FetchDrinksState {
    drinkData: IFetchResponse[]

    
}
 
class FetchDrinks extends React.Component<FetchDrinksProps, FetchDrinksState> {
drinkID = 11007
baseURL = "https://www.thecocktaildb.com/api/json/v1/1/"
cocktailURL = `https://www.thecocktaildb.com/drink/${this.drinkID}`
ingredientList = `${this.baseURL}list.php?i=list`
categoryList =`${this.baseURL}list.php?c=list`
drinkRecipe = `${this.baseURL}lookup.php?i=list`
    constructor(props: FetchDrinksProps) {
        super(props)
        this.state = { drinkData: [] }
    }
    handleFetch = async () => {
        const response = await fetch(this.drinkRecipe)
        const json = await response.json()
        this.setState({drinkData: json.drinks})
        console.log(this.state.drinkData)
    }
    
    render() {
        const myDrinks = () =>{
            return this.state.drinkData.map(drinks =>{
                return  <img src={drinks.strDrinkThumb} height="200px" width="200px"/>
                })
        }

        console.log(this.cocktailURL)
console.log(this.ingredientList)
console.log(this.categoryList)
        return ( 
            <div>
                {this.state.drinkData.length>0 ? myDrinks():null}
                <br/>
                <button onClick={this.handleFetch}>Gif Me</button>
            
                
            </div>
         )
    }
}
 
export default FetchDrinks