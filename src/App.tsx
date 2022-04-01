import React, { useState, useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Components/Auth/Auth";
import DrinkIndex from "./Components/Drinks/DrinkIndex";
import FoodIndex from "./Components/Food/FoodIndex";
import RecipeIndex from "./Components/AllRecipes/RecipeIndex";
import GetAllRecipes from "./Components/Admin/GetAllRecipes";
import GetAllUsers from "./Components/Admin/GetAllUsers";
import Sitebar from "./Components/Navbar/Navbar";

const App = () => {
  const [sessionToken, setSessionToken] = useState<any>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSplash, setIsSplash] = useState(true);
  const logout = () => {
    localStorage.clear();
    setSessionToken("");
    setIsAdmin(false);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      setIsAdmin(localStorage.getItem("role") === "admin" ? true : false);
    }
  }, []);

  const updateLocalStorage = (newToken: string, adminStatus: string) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    localStorage.setItem("role", adminStatus);
    setIsAdmin(adminStatus === "admin" ? true : false);
  };

  const adminPages = () => {
    return (
      <React.Fragment>
        <Sitebar
          sessionToken={sessionToken}
          logout={logout}
          isAdmin={isAdmin}
        />
        <br />
        <br />
        <br />
        <Routes>
          <Route
            path="/*"
            element={
              isSplash ? <RecipeIndex sessionToken={sessionToken} /> : null
            }
          />
          <Route
            path="/fetchFood"
            element={<FoodIndex sessionToken={sessionToken} />}
          />
          <Route
            path="/fetchDrinks"
            element={<DrinkIndex sessionToken={sessionToken} />}
          />
          <Route
            path="/getMyRecipes"
            element={<RecipeIndex sessionToken={sessionToken} />}
          />
          <Route
            path="/getAllRecipes"
            element={<GetAllRecipes sessionToken={sessionToken} />}
          />
          <Route
            path="/getAllUsers"
            element={<GetAllUsers sessionToken={sessionToken} />}
          />
        </Routes>
      </React.Fragment>
    );
  };
  const protectedPages = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <div>
        <Sitebar
          sessionToken={sessionToken}
          logout={logout}
          isAdmin={isAdmin}
        />
        <br />
        <br />
        <br />
        <Routes>
          <Route
            path="/*"
            element={
              isSplash ? <RecipeIndex sessionToken={sessionToken} /> : null
            }
          />
          <Route
            path="/fetchFood"
            element={<FoodIndex sessionToken={sessionToken} />}
          />
          <Route
            path="/fetchDrinks"
            element={<DrinkIndex sessionToken={sessionToken} />}
          />
          <Route
            path="/getMyRecipes"
            element={<RecipeIndex sessionToken={sessionToken} />}
          />
        </Routes>
      </div>
    ) : (
      <Auth updateLocalStorage={updateLocalStorage} />
    );
  };
  return isAdmin ? (
    <div className="App">{adminPages()}</div>
  ) : (
    <div className="App">{protectedPages()}</div>
  );
};

export default App;
