import React, {  useState, useEffect } from "react";
import './App.css';
import stove from "./Assets/stove.png"
import Auth from './Components/Auth/Auth';
import DrinkIndex from "./Components/Drinks/DrinkIndex";
import FoodIndex from "./Components/Food/FoodIndex";

import "bootstrap/dist/css/bootstrap.css";


const App = () => {
  const [sessionToken, setSessionToken] = useState<String|null>("");
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
        <img src={stove} alt="" />
        <br/>
        <button onClick={logout}>Logout</button>
        <DrinkIndex/>
        <FoodIndex/>
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
        <DrinkIndex/>
        <FoodIndex/>
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

