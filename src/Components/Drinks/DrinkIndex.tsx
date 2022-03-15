import * as React from "react";
import DrinksTable from "./DrinksTable";

interface DrinkIndexProps {
  sessionToken: string;
}


class DrinkIndex extends React.Component<DrinkIndexProps> {
  render() {
    return (
      <section>
        <div>
          <div>
            <div>
              <DrinksTable sessionToken={this.props.sessionToken} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default DrinkIndex;
