import React from "react";
import Login from "./Login";
import Signup from "./Signup"

interface AuthProps {
  updateLocalStorage: (newToken: string) => void
}
 
// interface AuthState {
  
// }
 
class Auth extends React.Component<AuthProps /*AuthState*/> {
  // state = { :  }
  render() { 
    return ( 
      <div>
      <h2 className="spltitle">Welcome to...</h2>
      <h1 className="spltitle">WHATS 4 DINNER</h1>
      <h3 className="spltitle">Where all of your dinner dreams come true!</h3>
      
      <Signup  updateLocalStorage={this.props.updateLocalStorage} />
      <Login updateLocalStorage={this.props.updateLocalStorage} />

    </div>

     );
  }
}
 
export default Auth;







