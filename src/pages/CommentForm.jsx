import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Client from "../services/api"
const CommentForm = ({ user }) => {
  let navigate = useNavigate()
  const initialState ={
    description : ""
  }
  // initial state is empty
  const [formValue, setFormValue] = useState(initialState)
  const[game, setGame] = useState(null)

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
  }
  const handleSubmit =async (e) => {
    e.preventDefault()
    const formData = { ...formValue, owner: user.id }
    const response = await Client.post("/Game", formData)
    setGame(response.data)
    setFormValue(initialState)
    navigate(`/Game/${response.data._id}`)
  }
  return user ? (
    <div>
    <form onSubmit={handleSubmit}>

    <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formValue.description}
          onChange={handleChange}
          placeholder="Detailed job description..."
          required
        />

        <button type="submit">Post</button>
        </form>
        </div>
  ):null
}
export default CommentForm
