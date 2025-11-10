import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Client from "../services/api"

const GameDetails = () => {
  const { id } = useParams()
  const [games, setGames] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const getGames = async () => {
      try {
        const res = await Client.get(`/Game/${id}`)
        setGames(res.data)
        console.log(res.data)
      } catch (error) {
        console.error("Error fetching game details:", error)
      }
    }
    getGames()
  }, [id])

  const handleDelete = async () => {
    try {
      await Client.delete(`/Game/${id}`)
      navigate("/home")
    } catch (error) {
      console.error("Error deleting game:", error)
    }
  }


  if (!games) return <p>Loading game details...</p>

  return (
    <div className="game-details">
      <h2>{games.name}</h2>
      <p>
        <strong>Name:</strong> {games.name}
      </p>
      <p>
        <strong>Description:</strong> {games.description}
      </p>

      {/* i need to use the map because i want to preview the images from an array (using a forEach will return undefined) using map will create new array with each image and then preview it one by one. */}

      <Link to={"/"}> Back </Link>

      <button onClick={handleDelete} className="deleteGame">
        Delete
      </button>

    </div>
  )
}

export default GameDetails
