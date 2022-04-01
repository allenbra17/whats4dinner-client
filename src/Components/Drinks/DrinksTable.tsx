import * as React from "react";
import FetchDrinks from "./FetchDrinks";
import { IFetchResponse } from "./Fetch.interface";
import DrinkSaveModal from "./DrinkSaveModal";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Container,
} from "reactstrap";
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
        <Col xs="6" md="3" lg="2" className="pb-2">
          <Card className="cards">
            <CardBody>
            <a href={drinkURL}>
              <CardImg top src={image} alt={cocktailName} />
            </a>
              <CardTitle>{cocktailName}</CardTitle>
              <button
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
                View Recipe
              </button>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };
  render() {
    return (
      <div>
        <DrinkSaveModal
          isModalOpen={this.state.isModalOpen}
          toggleModal={this.toggleModal}
          currentSelectedDrink={this.state.currentSelectedDrink}
          sessionToken={this.props.sessionToken}
        />
        <Container>
          <Row>{this.state.drinksData.length > 0 ? this.myDrinks() : null}</Row>
        </Container>{this.state.drinksData.length == 0 ? <FetchDrinks handleFetch={this.handleFetch} /> : null}
      </div>
    );
  }
}

export default DrinksTable;
