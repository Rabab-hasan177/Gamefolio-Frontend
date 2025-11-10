import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link } from "react-router-dom"

const GameList = () => {
  const [games, setGames] = useState([])

  useEffect(() => {
    const getGames = async () => {
      try {
        const res = await Client.get("/Game")
        setGames(res.data)
        // console.log(res.data)
      } catch (error) {
        console.error("Error fetching games:", error)
      }
    }

    getGames()
  }, [])

  return (
    <div className="game-list">
      <h2>Available Games</h2>
      <div className="game-grid">
        {games.length ? (
          games.map((game) => (
            <Link to={`/Game/${game._id}`} key={game._id} className="game-card">
              <h3>{game.name}</h3>
              {/* <p>{game.description}</p> */}
            </Link>
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </div>
  )
}

export default GameList
