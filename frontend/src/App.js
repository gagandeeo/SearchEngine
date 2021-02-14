import React from "react";
import "./App.css";
import Header from "./components/Header";
import PostRouter from "./navigation/PostRouter";
function App() {
  return (
    <div className="app">
      <Header />
      <div className="view">
        <PostRouter />
      </div>
    </div>
  );
}

export default App;
