import * as React from 'react';
import FoodTable from './FoodTable';

interface FoodIndexProps {
    sessionToken: string;
}
 
class FoodIndex extends React.Component<FoodIndexProps> {
    render() { 
        return ( 
            <section>
            <div>
              <div>
                <div>
                  <FoodTable sessionToken={this.props.sessionToken} />
                </div>
              </div>
            </div>
          </section>
        );
      }
    }
export default FoodIndex;