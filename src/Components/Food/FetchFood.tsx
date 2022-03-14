import * as React from "react";
import { IFetchResponse } from "./Fetch.interface";
import { Category } from "./Ingred.Interface";

interface FetchFoodProps {
  handleFetch: (ingredient: string) => void;
}

interface FetchFoodState {
  ingredData: Category[];
  foodData: IFetchResponse[];
}

class FetchFood extends React.Component<FetchFoodProps, FetchFoodState> {
  baseURL = "https://www.themealdb.com/api/json/v1/1/";
  categoryList = `${this.baseURL}categories.php`;

  constructor(props: FetchFoodProps) {
    super(props);
    this.state = { ingredData: [], foodData: [] };
  }

  handleIngredFetch = async () => {
    const response = await fetch(this.categoryList);
    const json = await response.json();
    this.setState({ ingredData: json.categories });
  };

  myIngred = () => {
    return this.state.ingredData.map((food, index) => {
      return (
        <div>
          <span>
            <img src={food.strCategoryThumb} alt={food.strCategory}/>
            <br />
            <button onClick={() => this.props.handleFetch(food.strCategory)}>
              {food.strCategory}
            </button>
          </span>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        {this.myIngred()}
        <br />
        <button onClick={this.handleIngredFetch}>
          Search by Food Category
        </button>
      </div>
    );
  }
}

export default FetchFood;
