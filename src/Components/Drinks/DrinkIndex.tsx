import * as React from "react";
import DrinksTable from "./DrinksTable";

interface DrinkIndexProps {
  sessionToken: string;
}


class DrinkIndex extends React.Component<DrinkIndexProps> {
  render() {
    return (
      <section className="p-5">
        <div className="container">
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
