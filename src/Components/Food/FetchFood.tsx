import * as React from "react";
import { IFetchResponse } from "./Fetch.interface";
import { Category } from "./Ingred.Interface";
import { Row, Col, Card, CardImg, CardBody, Container } from "reactstrap";

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
        <Col xs="12" md="6" lg="2">
          <Card className="cards">
            <CardBody>
              <CardImg
                src={food.strCategoryThumb}
                alt={food.strCategory}
                top
                height="10%"
                width="10%"/>
              <button onClick={() => this.props.handleFetch(food.strCategory)}>
                {food.strCategory}
              </button>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };
  componentDidMount() {
    this.handleIngredFetch();
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

export default FetchFood;
