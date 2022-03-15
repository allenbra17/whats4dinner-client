import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import stove from "../../Assets/stove.png";

interface AuthProps {
  updateLocalStorage: (newToken: string, adminStatus: string) => void;
}

interface AuthState {
  isNewUser: boolean;
}

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = { isNewUser: true };
  }
  handleToggle = () => {
    this.setState({ isNewUser: !this.state.isNewUser });
  };
  render() {
    return (
      <div className="auth">
        <img src={stove} alt="stove" />
        <div>
          <h2 className="spltitle">Welcome to...</h2>
          <h3 className="spltitle">WHATS4DINNER</h3>
          <h3 className="spltitle">
            Where all of your dinner dreams come true!
          </h3>
          {this.state.isNewUser ? (
            <>
              <Signup updateLocalStorage={this.props.updateLocalStorage} />
              <button onClick={this.handleToggle}>
                Already Signed Up? Login!
              </button>
            </>
          ) : (
            <>
              <Login updateLocalStorage={this.props.updateLocalStorage} />
              <button onClick={this.handleToggle}>
                Not Signed Up? Sign up Now!
              </button>
            </>
          )}
        </div>
        <img src={stove} alt="stove" />
      </div>
    );
  }
}

export default Auth;
