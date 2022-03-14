import * as React from "react";
import { Button, Col, Card, Row, Container } from "react-bootstrap";
import EditDrinksModal from "../AllRecipes/EditDrinksModal";
import EditFoodModal from "../AllRecipes/EditFoodModal"

interface GetAllRecipesProps {
  sessionToken: string;
}

interface GetAllRecipesState {
  isDrinkModalOpen: boolean;
  isFoodModalOpen: boolean;
  allFoodArray: {
    recipeName: string;
    category: string;
    recipeURL: string;
    imgURL: string;
    rating: string;
    id: string;
  }[];
  allDrinksArray: {
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

class GetAllRecipes extends React.Component<GetAllRecipesProps, GetAllRecipesState> {
  constructor(props: GetAllRecipesProps) {
    super(props);
    this.state = {
      isDrinkModalOpen: false,
      isFoodModalOpen: false,
      allFoodArray: [
        {
          recipeName: "",
          category: "",
          recipeURL: "",
          imgURL: "",
          rating: "",
          id: "",
        },
      ],
      allDrinksArray: [
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
  fetchAllDrinks = () => {
    fetch("http://localhost:4000/admin/drinks", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((allDrinksData) => {
        this.setState({ allDrinksArray: allDrinksData });
      });
  };
  displayAllDrinks = () => {
    return this.state.allDrinksArray.map((drinks, index) => {
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

  fetchAllFood = () => {
    fetch("http://localhost:4000/admin/food/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((allFoodData) => {
        this.setState({ allFoodArray: allFoodData });
      });
  };
  displayMyFood = () => {
    return this.state.allFoodArray.map((food, index) => {return (
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
        <h1 className="title">Favorite Recipes</h1>
        <button onClick={(e) =>{
          this.fetchAllFood()
            this.fetchAllDrinks()}}>Get All Recipes</button>
        <Container>
        <Col>
          {this.state.allFoodArray.length > 1 ? this.displayMyFood() : null}
        </Col>
        </Container>
        <Container>
        <Col>
          {this.state.allDrinksArray.length > 1 ? this.displayAllDrinks() : null}
        </Col>
        </Container>
        {this.state.isDrinkModalOpen ? <EditDrinksModal
                isDrinkModalOpen={this.state.isDrinkModalOpen}
                toggleDrinkModal={this.toggleDrinkModal}
                currentEditingDrink={this.state.currentEditingDrink}
                sessionToken={this.props.sessionToken}
                myDrinksArray={this.state.allDrinksArray}
              />: null}
        {this.state.isFoodModalOpen ? <EditFoodModal
                isFoodModalOpen={this.state.isFoodModalOpen}
                toggleFoodModal={this.toggleFoodModal}
                currentEditingFood={this.state.currentEditingFood}
                sessionToken={this.props.sessionToken}
                myFoodArray={this.state.allFoodArray}
              />: null}
      </div>
    );
  }
}

export default GetAllRecipes;
