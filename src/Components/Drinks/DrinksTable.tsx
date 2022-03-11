import * as React from "react";
import FetchDrinks from "./FetchDrinks";
import { IFetchResponse } from "./Fetch.interface";
import DrinkSaveModal from "./DrinkSaveModal";
import { Button, Col, Card, Row } from "react-bootstrap";

interface DrinksTableProps {
  sessionToken: string;
}
export interface DrinksTableState {
  drinksData: IFetchResponse[];
  mainIngredient: string;
  currentSelectedDrink: CurrentSelectedDrink;
  isModalOpen: boolean;
}

export interface CurrentSelectedDrink {
  cocktailName: string;
  cocktailURL: string;
  imgURL: string;
  mainIngredient: string;
}

class DrinksTable extends React.Component<DrinksTableProps, DrinksTableState> {
  baseURL = "https://www.thecocktaildb.com/api/json/v1/1/";
  cocktailURL = `https://www.thecocktaildb.com/drink/`;
  constructor(props: DrinksTableProps) {
    super(props);
    this.state = {
      drinksData: [],
      mainIngredient: "",
      currentSelectedDrink: {} as CurrentSelectedDrink,
      isModalOpen: false,
    };
  }
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  handleFetch = async (ingredient: string) => {
    const drinkRecipe = `${this.baseURL}filter.php?i=${ingredient}`;
    const response = await fetch(drinkRecipe);
    const json = await response.json();
    this.setState({ drinksData: json.drinks });
    this.setState({ mainIngredient: ingredient });
  };
  myDrinks = () => {
    return this.state.drinksData.map((drinks, index) => {
      let cocktailName: string = drinks.strDrink;
      let image = drinks.strDrinkThumb;
      let drinkURL = `${this.cocktailURL}${drinks.idDrink}`;
      return (
        <Row xs={1} md={2} lg={2} className="g-4">
          {Array.from({ length: 1 }).map((_, idx) => (
            <Col>
              <Card>
                <a href={drinkURL}>
                  <Card.Img
                    variant="top"
                    src={image}
                    alt={cocktailName}
                    height="100px"
                    width="100px"
                  />
                </a>
                <Card.Body>
                  <Card.Title>{cocktailName}</Card.Title>
                  <Card.Text>-------Recipe---------</Card.Text>
                  <DrinkSaveModal
                    isModalOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                    currentSelectedDrink={this.state.currentSelectedDrink}
                    sessionToken={this.props.sessionToken}
                  />
                  <Button
                    onClick={() => {
                      this.setState({ isModalOpen: true });
                      this.setState({
                        currentSelectedDrink: {
                          cocktailName: cocktailName,
                          cocktailURL: drinkURL,
                          mainIngredient: this.state.mainIngredient,
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
        {this.state.drinksData.length > 0 ? this.myDrinks() : null}
        <FetchDrinks handleFetch={this.handleFetch} />
      </div>
    );
  }
}

export default DrinksTable;
