import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Index from './news/index';
import { Provider } from "react-redux";
import { store } from './store';
import ClipIndex from "./clip";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( 
   <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/clip" element={<ClipIndex />} />
      <Route path="/*" element={<Index />} />   
    </Routes>
  </BrowserRouter>
  </Provider>

);
