import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import GiphyState from "./context/giphy/giphyState";
import Body from "./components/Body/Body";

function App() {
  return (
    <GiphyState className="App ">
      <Header/>
      <Body/>

    </GiphyState>
  );
}

export default App;
