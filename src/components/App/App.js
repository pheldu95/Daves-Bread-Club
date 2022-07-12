import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Nav from '../Nav/Nav';

//all components to route to
import LandingPage from '../LandingPage/LandingPage';
import Order from '../Order/Order';

class App extends Component {
  // componentDidMount() {
   
  // }

  render() {
    return (
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/order"
            element={<Order />}
          />

          {/* If none of the other routes matched, we will show a 404. */}
          <Route render={() => <h1>404</h1>} />
        </Routes>
      </BrowserRouter>
      
    );
  }
}

export default (App);