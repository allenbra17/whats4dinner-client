import React, {  useState, useEffect } from "react";
import './App.css';
import stove from "./Assets/stove.png"
import Auth from './Components/Auth/Auth';
import DrinkIndex from "./Components/Drinks/DrinkIndex";
import FoodIndex from "./Components/Food/FoodIndex";
import "bootstrap/dist/css/bootstrap.css";
import RecipeIndex from "./Components/AllRecipes/RecipeIndex";
import GetAllRecipes from "./Components/Admin/GetAllRecipes";
import GetAllUsers from "./Components/Admin/GetAllUsers";

const App = () => {
  const [sessionToken, setSessionToken] = useState<any>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const logout = () => {
    localStorage.clear();
    setSessionToken("");
    setIsAdmin(false)
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      setIsAdmin((localStorage.getItem("role")=== "admin" ? true: false))
    }
  }, []);

  const updateLocalStorage = (newToken: string, adminStatus: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    localStorage.setItem("role", adminStatus)
    setIsAdmin(adminStatus === "admin" ? true : false)
    };

  const adminPages = () => {
      return (
      <div>
        <h1>AdminPages</h1>
        <button onClick={logout}>Logout</button>
        <span>
        <DrinkIndex sessionToken={sessionToken}/><FoodIndex  sessionToken={sessionToken}/>
        </span>
        <GetAllRecipes sessionToken={sessionToken}/>
        <GetAllUsers sessionToken={sessionToken}/>
        </div>
      )
      }
  const protectedPages = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <div>
        <h1 className="title">Whats4Dinner</h1>
        <img src={stove} alt="" />
        <br/>
        <button onClick={logout}>Logout</button>
        <DrinkIndex sessionToken={sessionToken}/>
        <FoodIndex  sessionToken={sessionToken}/>
        <RecipeIndex sessionToken={sessionToken}/>
      </div>
    ) : (
      <Auth updateLocalStorage={updateLocalStorage} />
    );
  };
  return (
  (isAdmin ? (
  <div className="App">{adminPages()}</div>):
  (<div className="App">{protectedPages()}</div>)
  ))};

export default App;

