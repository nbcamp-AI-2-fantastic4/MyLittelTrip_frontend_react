import React, { useEffect, useState, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trip from "./pages/Trip";
import TripDetail from "./pages/TripDetail";
import TripEdit from "./pages/TripEdit";
import TripNew from "./pages/TripNew";

import Header from "./components/Header";
import "./App.css";

export const TripStateContext = React.createContext();
export const TripDispatchContext = React.createContext();

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("trip", JSON.stringify(newState));
  return newState;
};

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {}, []);

  return (
    <TripStateContext.Provider value={{ data, isLogin }}>
      <TripDispatchContext.Provider value={{ setIsLogin }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/register" element={<Register></Register>}></Route>
              <Route path="/trip" element={<Trip></Trip>}></Route>
              <Route
                path="/trip/detail/:id"
                element={<TripDetail></TripDetail>}
              ></Route>
              <Route
                path="/trip/edit/:id"
                element={<TripEdit></TripEdit>}
              ></Route>
              <Route path="/trip/new" element={<TripNew></TripNew>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </TripDispatchContext.Provider>
    </TripStateContext.Provider>
  );
}

export default App;
