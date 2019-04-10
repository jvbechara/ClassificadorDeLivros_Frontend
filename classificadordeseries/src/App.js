import React, { Component } from 'react';
import Routes from './routes/routes';
import { BrowserRouter } from "react-router-dom";
import Menu from './components/navbar';
import "./styles.css";

const App = () => (
  <BrowserRouter>
    <div className="bglivro">
      <Menu />
      <Routes />
    </div>
  </BrowserRouter>
);

export default App;
