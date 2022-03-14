import * as React from "react";
import stove from "../../Assets/stove.png";
import { Button, Col, Card, Row } from "react-bootstrap";
import EditDrinksModal from "./EditDrinksModal";
import EditFoodModal from "./EditFoodModal"

interface RecipeIndexProps {
  sessionToken: string;
}

interface RecipeIndexState {
  isDrinkModalOpen: boolean;
  isFoodModalOpen: boolean;
  myFoodArray: {
    recipeName: string;
    category: string;
    recipeURL: string;
    imgURL: string;
    rating: string;
    id: string;
  }[];
  myDrinksArray: {
    cocktailName: string;
    mainIngredient: string;
    cocktailURL: string;
    imgURL: string;
    rating: string;
    id: string;
  }[];
  drinkModal: boolean;
  foodModal: boolean;
  editRating: string;
  currentEditingDrink: CurrentEditingDrink;
  currentEditingFood:   CurrentEditingFood
}

export interface CurrentEditingDrink {
  cocktailName: string;
  mainIngredient: string;
  cocktailURL: string;
  imgURL: string;
  rating: string;
  id: string
}

export interface CurrentEditingFood {
    recipeName: string;
    category: string;
    recipeURL: string;
    imgURL: string;
    rating: string;
    id: string
}

class RecipeIndex extends React.Component<RecipeIndexProps, RecipeIndexState> {
  constructor(props: RecipeIndexProps) {
    super(props);
    this.state = {
      isDrinkModalOpen: false,
      isFoodModalOpen: false,
      myFoodArray: [
        {
          recipeName: "",
          category: "",
          recipeURL: "",
          imgURL: "",
          rating: "",
          id: "",
        },
      ],
      myDrinksArray: [
        {
          cocktailName: "",
          mainIngredient: "",
          cocktailURL: "",
          imgURL: "",
          rating: "",
          id: "",
        },
      ],
      editRating: "",
      drinkModal: false,
      foodModal: false,
      currentEditingDrink: {} as CurrentEditingDrink,
      currentEditingFood: {} as CurrentEditingFood
    };
  }
  toggleDrinkModal = () => {
    this.setState({ isDrinkModalOpen: !this.state.isDrinkModalOpen });
  };
  fetchMyDrinks = () => {
    fetch("http://localhost:4000/drinks/mine", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((myDrinksData) => {
        this.setState({ myDrinksArray: myDrinksData });
      });
  };
  displayMyDrinks = () => {
    return this.state.myDrinksArray.map((drinks, index) => {
      return (
        <Col>
          <Card>
            <a href={drinks.cocktailURL}>
              <Card.Img
                variant="top"
                src={drinks.imgURL}
                alt={drinks.cocktailName}
                height="100px"
                width="100px"
              />
            </a>
            <Card.Body>
              <Card.Title>{drinks.cocktailName}</Card.Title>
              <Card.Text>-------Recipe---------</Card.Text>
              <Button onClick={() => this.setState({ isDrinkModalOpen: true, currentEditingDrink: drinks })}>
                Click to Expand
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };
  toggleFoodModal = () => {
    this.setState({ isFoodModalOpen: !this.state.isFoodModalOpen });
  };

  fetchMyFood = () => {
    fetch("http://localhost:4000/food/mine", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((myFoodData) => {
        this.setState({ myFoodArray: myFoodData });
      });
  };
  displayMyFood = () => {
    return this.state.myFoodArray.map((food, index) => {return (
        <Col>
          <Card>
            <a href={food.recipeURL}>
              <Card.Img
                variant="top"
                src={food.imgURL}
                alt={food.recipeName}
                height="100px"
                width="100px"
              />
            </a>
            <Card.Body>
              <Card.Title>{food.recipeName}</Card.Title>
              <Card.Text>-------Recipe---------</Card.Text>
              <Button onClick={() => this.setState({ isFoodModalOpen: true, currentEditingFood: food })}>
                Click to Expand
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };
  render() {
    return (
      <div>
        <h1 className="title">Whats4Dinner</h1>
        <img src={stove} alt="" />
        <h1 className="title">RecipeIndex</h1>
        <h3>My Favorite Recipes</h3>
        <h3>My Favorite Drinks</h3>
        <button onClick={this.fetchMyDrinks}>getDrinks</button>
        <button onClick={this.fetchMyFood}>getFood</button>
        <Col>
          {this.state.myFoodArray.length > 1 ? this.displayMyFood() : null}
        </Col>
        <Col>
          {this.state.myDrinksArray.length > 1 ? this.displayMyDrinks() : null}
        </Col>
        {this.state.isDrinkModalOpen ? <EditDrinksModal
                isDrinkModalOpen={this.state.isDrinkModalOpen}
                toggleDrinkModal={this.toggleDrinkModal}
                currentEditingDrink={this.state.currentEditingDrink}
                sessionToken={this.props.sessionToken}
                myDrinksArray={this.state.myDrinksArray}
              />: null}
        {this.state.isFoodModalOpen ? <EditFoodModal
                isFoodModalOpen={this.state.isFoodModalOpen}
                toggleFoodModal={this.toggleFoodModal}
                currentEditingFood={this.state.currentEditingFood}
                sessionToken={this.props.sessionToken}
                myFoodArray={this.state.myFoodArray}
              />: null}
      </div>
    );
  }
}

export default RecipeIndex;
