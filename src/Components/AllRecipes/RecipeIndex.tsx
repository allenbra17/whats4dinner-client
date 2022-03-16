import * as React from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";
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
        <Col xs="12" md="8" lg="4" className="pb-2">
          <Card className="cards">
            <CardBody>
              <a href={drinks.cocktailURL}>
                <CardImg
                  variant="top"
                  src={drinks.imgURL}
                  alt={drinks.cocktailName}
                />
              </a>
              <CardTitle>{drinks.cocktailName}</CardTitle>
              <button
                onClick={() =>
                  this.setState({
                    isDrinkModalOpen: true,
                    currentEditingDrink: drinks,
                  })
                }
              >
                Click to Expand
              </button>
            </CardBody>
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
      <Col xs="12" md="8" lg="4"  className="pb-2">
      <Card className="cards">
        <CardBody>
          <a href={food.recipeURL}>
            <CardImg
              variant="top"
              src={food.imgURL}
              alt={food.recipeName}
            />
          </a>
          <CardTitle>{food.recipeName}</CardTitle>
          <button
            onClick={() =>
              this.setState({
                isFoodModalOpen: true,
                currentEditingFood: food,
              })
            }
          >
            Click to Expand
          </button>
        </CardBody>
      </Card>
    </Col>
  );
    });
  };
  componentDidMount() {
    this.fetchMyDrinks()
    this.fetchMyFood()
  }
  render() {
    return (
      <div>
        <Container className="displayCards">
          <Row className="food">
        <h3 className="title">My Favorite Recipes</h3>
            {this.state.myFoodArray.length > 0 ? this.displayMyFood() : null}
            </Row>
          <Row className="drinks">
        <h3>My Favorite Drinks</h3>
            {this.state.myDrinksArray.length > 0
              ? this.displayMyDrinks()
              : null}
          </Row>
        </Container>
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
