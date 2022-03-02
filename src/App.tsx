import React, {  useState, useEffect } from "react";
import './App.css';
import stove from "./Assets/stove.png"
import Auth from './Components/Auth';
// import "bootstrap/dist/css/bootstrap.css";


const App = () => {
  const [sessionToken, setSessionToken] = useState<String|null>("");
  const logout = () => {
    localStorage.clear();
    setSessionToken("");
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateLocalStorage = (newToken: any) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    };
    console.log(sessionToken)

  const protectedPages = () => {
    // const propertys = (
      // <RecipeIndex token={this.setState({sessionToken: ""})} clickLogout={this.logout} />
      // );
    return sessionToken === localStorage.getItem("token") ? (
      <div>
        <img src={stove} alt="" />
        <h1 className="title">Whats4Dinner</h1>
        <button onClick={logout}>Logout</button>
      </div>
    ) : (
      <Auth updateLocalStorage={updateLocalStorage} />
    );
  };
  return <div className="App">{protectedPages()}</div>;
};

export default App;

