import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import GiphyState from "./context/giphy/giphyState";

function App() {
  return (
    <GiphyState className="App">
      <Header/>
    </GiphyState>
  );
}

export default App;
