import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import GilphyState from "./context/giphy/gilphyState";

function App() {
  return (
    <GilphyState className="App">
      <Header/>
    </GilphyState>
  );
}

export default App;
