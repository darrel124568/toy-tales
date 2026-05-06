import React from "react";

function ToyCard({toy, onDelete, onLike}) {
  function handleDelete(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then(data => onDelete(id))
  }

  function handleLike(id) {
    const newLikes = toy.likes + 1
    fetch(`http://localhost:3001/toys/${id}`, {
      method: 'PATCH',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({likes: newLikes})
    })
    .then(r => r.json())
    .then(data => onLike(data))
  }
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={()=> handleLike(toy.id)}>Like {"<3"}</button>
      <button className="del-btn" onClick={()=> handleDelete(toy.id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
