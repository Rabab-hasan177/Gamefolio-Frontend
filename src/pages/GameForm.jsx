import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"

const GameForm = ({user}) => {
  let navigate = useNavigate()

  const initialState = {
    name: "",
    description: "",
  }

  const [formValue, setFormValue] = useState(initialState)
  const [game, setGame] = useState(null)

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  console.log(formValue)

  const handleSubmit = async (event) => {
  event.preventDefault()

  if (!user) {
    alert("Please sign in to post a game")
    return
  }

  try {
    const formData = {...formValue, owner: user.id}

    const response = await Client.post("/Game/createGame", formData)
    setGame(response.data)
    setFormValue(initialState)
    navigate(`/Game/${response.data._id}`)
  } catch (error) {
    console.error("Error posting game:", error)
    alert("Failed to post game. Please try again.")
  }
}

  return (
    <div className="gameFormContainer">
      <h2>Post game</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formValue.name}
          onChange={handleChange}
          placeholder="game name"
          required
        />


        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formValue.description}
          onChange={handleChange}
          placeholder="Detailed game description..."
          required
        />

        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default GameForm
