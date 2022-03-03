import * as React from 'react';
import stove from "../../Assets/stove.png"


interface RecipeIndexProps {
    
}
 
interface RecipeIndexState {
    
}
 
class RecipeIndex extends React.Component<RecipeIndexProps, RecipeIndexState> {
    // state = { :  }
    render() { 
        return ( <div>
            <img src={stove} alt="" />
            <h1 className="title">Whats4Dinner</h1>
            <h1 className="title">RecipeIndex</h1>
            {/* <button onClick={logout}>Logout</button> */}
            </div>
         );
    }
}
 
export default RecipeIndex;