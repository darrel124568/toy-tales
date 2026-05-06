import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, settoys] = useState([])

  useState(()=> {
    fetch('http://localhost:3001/toys')
    .then(response => response.json())
    .then(data => {
      settoys(data)
    console.log(data)})

  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function onDelete(id) {
    settoys(prev => prev.filter(toy => { return toy.id !== id}))
  }

  function onLike(data) {
    settoys(prev => prev.map(toy => {return toy.id !== data.id? toy: data}))
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm toys = {toys} settoys = {settoys} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys = {toys} onDelete={onDelete} onLike = {onLike}/>
    </>
  );
}

export default App;
