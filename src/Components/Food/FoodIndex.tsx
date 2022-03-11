import * as React from 'react';
import FoodTable from './FoodTable';

interface FoodIndexProps {
    sessionToken: string;
}
 
class FoodIndex extends React.Component<FoodIndexProps> {
    render() { 
        return ( 
            <section className="p-5">
            <div className="container">
              <div className="row pb-5">
                <div className="col-lg-2 col-md-1">
                  <FoodTable sessionToken={this.props.sessionToken} />
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
export default FoodIndex;