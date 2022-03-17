import * as React from "react";
import APIURL from '../../helpers/environment';
import EditDrinksModal from "../AllRecipes/EditDrinksModal";
import EditFoodModal from "../AllRecipes/EditFoodModal";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";

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
  currentEditingFood: CurrentEditingFood;
}

export interface CurrentEditingDrink {
  cocktailName: string;
  mainIngredient: string;
  cocktailURL: string;
  imgURL: string;
  rating: string;
  id: string;
}

export interface CurrentEditingFood {
  recipeName: string;
  category: string;
  recipeURL: string;
  imgURL: string;
  rating: string;
  id: string;
}

class GetAllRecipes extends React.Component<
  GetAllRecipesProps,
  GetAllRecipesState
> {
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
      currentEditingFood: {} as CurrentEditingFood,
    };
  }
  toggleDrinkModal = () => {
    this.setState({ isDrinkModalOpen: !this.state.isDrinkModalOpen });
  };
  fetchAllDrinks = () => {
    fetch(`${APIURL}/admin/drinks`, {
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
        <Col xs="12" md="6" lg="4" className="pb-2">
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

  fetchAllFood = () => {
    fetch(`${APIURL}/admin/food/`, {
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
  displayAllFood = () => {
    return this.state.allFoodArray.map((food, index) => {
      return (
        <Col xs="12" md="6" lg="4" className="pb-2">
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
    this.fetchAllFood();
    this.fetchAllDrinks();
  }
  render() {
    return (
      <div>
        <h3 className="title">All Favorite Recipes</h3>
        <Container className="displayCards">
          <Row>
            {this.state.allFoodArray.length > 0 ? this.displayAllFood() : null}
          </Row>
          <Row>
            {this.state.allDrinksArray.length > 0
              ? this.displayAllDrinks()
              : null}
          </Row>
        </Container>
        {this.state.isDrinkModalOpen ? (
          <EditDrinksModal
            isDrinkModalOpen={this.state.isDrinkModalOpen}
            toggleDrinkModal={this.toggleDrinkModal}
            currentEditingDrink={this.state.currentEditingDrink}
            sessionToken={this.props.sessionToken}
            myDrinksArray={this.state.allDrinksArray}
          />
        ) : null}
        {this.state.isFoodModalOpen ? (
          <EditFoodModal
            isFoodModalOpen={this.state.isFoodModalOpen}
            toggleFoodModal={this.toggleFoodModal}
            currentEditingFood={this.state.currentEditingFood}
            sessionToken={this.props.sessionToken}
            myFoodArray={this.state.allFoodArray}
          />
        ) : null}
      </div>
    );
  }
}

export default GetAllRecipes;
