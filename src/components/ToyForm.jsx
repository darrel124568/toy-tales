import React, {useState, useEffect} from "react";

function ToyForm({toys, settoys}) {
  const [formData, setformData] = useState(
    {
      name: '',
      image: '',
      likes: 0
    }
  )
  function handlechange(e) {
    setformData({...formData, [e.target.name]: e.target.value})
  }
  function handlesubmit(e) {
    e.preventDefault()
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({...formData})
    })
    .then(response => response.json())
    .then(data => {
      settoys([...toys, data])
      setformData({
      name: '',
      image: '',
      likes: 0
    })
    })
  }
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={(e)=> handlesubmit(e)}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={(e)=> handlechange(e)}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={(e)=> handlechange(e)}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
