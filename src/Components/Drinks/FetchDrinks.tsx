import * as React from "react";
import { IFetchResponse } from "./Fetch.interface";
import { Drink } from "./Ingred.Interface";
import { Row, Col, Card, CardImg, CardBody, Container } from "reactstrap";

interface FetchDrinksProps {
  handleFetch: (ingredient: string) => void;
}

interface FetchDrinksState {
  ingredData: Drink[];
  drinkData: IFetchResponse[];
}

class FetchDrinks extends React.Component<FetchDrinksProps, FetchDrinksState> {
  baseURL = "https://www.thecocktaildb.com/api/json/v1/1/";
  ingredientList = `${this.baseURL}list.php?i=list`;

  constructor(props: FetchDrinksProps) {
    super(props);
    this.state = { ingredData: [], drinkData: [] };
  }

  handleIngredFetch = async () => {
    const response = await fetch(this.ingredientList);
    const json = await response.json();
    this.setState({ ingredData: json.drinks });
  };

  myIngred = () => {
    return this.state.ingredData.map((drinks, index) => {
      return (
        <Col xs="12" md="6" lg="2">
          <Card className="cards">
            <CardBody>
              <CardImg 
              src={`http://www.thecocktaildb.com/images/ingredients/${drinks.strIngredient1}.png`}
              alt={drinks.strIngredient1}
              top
              height="10%"
              width="10%"/>
              <button onClick={() => this.props.handleFetch(drinks.strIngredient1)}>
                {drinks.strIngredient1}
              </button>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };
  componentDidMount() {
    this.handleIngredFetch()
  }
  
  render() {
    return (
      <div>
        <Container>
          <Row>{this.myIngred()}</Row>
          </Container>
      </div>
    );
  }
}

export default FetchDrinks;
