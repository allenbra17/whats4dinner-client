import * as React from "react";
import DrinksTable from "./DrinksTable";

interface DrinkIndexProps {
  sessionToken: string;
}

interface DrinkIndexState {
  cocktailName: string;
  mainIngredient: string;
  cocktailURL: string;
  imgURL: string;
}

class DrinkIndex extends React.Component<DrinkIndexProps, DrinkIndexState> {
  constructor(props: DrinkIndexProps) {
    super(props);
    this.state = {
      cocktailName: "",
      mainIngredient: "",
      cocktailURL: "",
      imgURL: "",
    };
  }
  render() {
    return (
      <section className="p-5">
        <div className="container">
          <h1 className="text-center pb-3">Search Results</h1>
          <div className="row pb-5">
            <div className="col-lg-2 col-md-1">
              <DrinksTable sessionToken={this.props.sessionToken} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DrinkIndex;
