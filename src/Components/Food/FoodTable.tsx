import * as React from "react";
import FetchFood from "./FetchFood";
import { IFetchResponse } from "./Fetch.interface";
import FoodSaveModal from "./FoodSaveModal";
import { Button, Col, Card, Row } from "react-bootstrap";

interface FoodTableProps {
  sessionToken: string;
}
export interface FoodTableState {
  foodData: IFetchResponse[];
  category: string;
  currentSelectedFood: CurrentSelectedFood;
  isModalOpen: boolean;
}

export interface CurrentSelectedFood {
  recipeName: string;
  recipeURL: string;
  imgURL: string;
  category: string;
}

class FoodTable extends React.Component<FoodTableProps, FoodTableState> {
  baseURL = "https://www.themealdb.com/api/json/v1/1/";
  mealURL = `https://www.themealdb.com/meal/`;
  constructor(props: FoodTableProps) {
    super(props);
    this.state = {
      foodData: [],
      category: "",
      currentSelectedFood: {} as CurrentSelectedFood,
      isModalOpen: false,
    };
  }
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  handleFetch = async (category: string) => {
    const foodRecipe = `${this.baseURL}filter.php?c=${category}`;
    const response = await fetch(foodRecipe);
    const json = await response.json();
    this.setState({ foodData: json.meals });
    this.setState({ category: category})
  };
  myFood = () => {
    return this.state.foodData.map((food, index) => {
      let recipeName: string = food.strMeal;
      let image = food.strMealThumb;
      let recipeURL = `${this.mealURL}${food.idMeal}`;
      return (
        <Row>
          {Array.from({ length: 1 }).map((_, idx) => (
            <Col>
              <Card>
                <a href={recipeURL}>
                  <Card.Img
                    variant="top"
                    src={image}
                    alt={recipeName}
                    height="100px"
                    width="100px"
                  />
                </a>
                <Card.Body>
                  <Card.Title>{recipeName}</Card.Title>
                  <Card.Text>-------Recipe---------</Card.Text>
                  <FoodSaveModal
                    isModalOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                    currentSelectedFood={this.state.currentSelectedFood}
                    sessionToken={this.props.sessionToken}
                  />
                  <Button
                    onClick={() => {
                      this.setState({ isModalOpen: true });
                      this.setState({
                        currentSelectedFood: {
                          recipeName: recipeName,
                          recipeURL: recipeURL,
                          category: this.state.category,
                          imgURL: image,
                        },
                      });
                    }}
                  >
                    Modal
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      );
    });
  };
  render() {
    return (
      <div>
        {this.state.foodData.length > 0 ? this.myFood() : null}
        <FetchFood handleFetch={this.handleFetch} />
      </div>
    );
  }
}

export default FoodTable;
