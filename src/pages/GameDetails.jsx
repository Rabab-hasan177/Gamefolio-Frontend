import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Client from "../services/api"
import CommentForm from "./CommentForm"
const GameDetails = () => {
  const { id } = useParams()
  const [games, setGames] = useState(null)
  const [user, setUser] = useState(null)
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
      <img src={`http://localhost:3000/${games.image}`} />

      <Link to={"/"}> Back </Link>
      <Link to={`/Game/${id}/edit`} className="editGame">
  Edit
</Link>

      <button onClick={handleDelete} className="deleteGame">
        Delete
      </button>
      <CommentForm gameId={id} user={user} />
    </div>
  )
}

export default GameDetails
