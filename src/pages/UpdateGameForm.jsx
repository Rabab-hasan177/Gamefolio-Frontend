import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Client from "../services/api"

const UpdateGameForm = ({ user }) => {
  let navigate = useNavigate()
  let { gameId } = useParams()

  const initialState = {
    name: "",
    description: "",
  }

  const [formValue, setFormValue] = useState(initialState)
  const [imageFile, setImageFile] = useState(null)

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!user) {
      alert("Please sign in to update the game")
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", formValue.name)
      formData.append("description", formValue.description)
      formData.append("owner", user.id)
      if (imageFile) {
        formData.append("image", imageFile)
      }

      const response = await Client.put(`/Game/${gameId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setFormValue(initialState)
      setImageFile(null)
      navigate(`/Game/${response.data._id}`)
    } catch (error) {
      console.error("Error updating game:", error)
      alert("Failed to update game. Please try again.")
    }
  }

  return (
    <div className="gameFormContainer">
      <h2>Update Game</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formValue.name}
          onChange={handleChange}
          placeholder="Update game name"
          required
        />

        <label htmlFor="image">Upload New Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formValue.description}
          onChange={handleChange}
          placeholder="Update game description..."
          required
        />

        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default UpdateGameForm
