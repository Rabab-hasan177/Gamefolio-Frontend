import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { CheckSession } from "./services/Auth"

import Register from "./pages/Register"
import SignIn from "./pages/Signin"
import Nav from "./components/Nav"
import Welcome from "./pages/Welcome"
import GameList from "./pages/GameList"
import GameDetails from "./pages/GameDetails"
import GameForm from "./pages/GameForm"
import CommentForm from "./pages/CommentForm"
import "./App.css"

const App = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const checkToken = async () => {
      //If a token exists, sends token to localStorage to persist logged in user
      const userData = await CheckSession()
      setUser(userData)
    }
    const token = localStorage.getItem("token")
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }
  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />
      <Routes>
        <Route path = "/" element={<Welcome />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/gameList" element={<GameList/>}/>
        <Route path="/Game/:id" element={<GameDetails/>}/>
        <Route path="/gameForm" element={<GameForm user={user}/>}/>
        <Route path="/commentForm" element={<CommentForm user={user}/>}/>

      </Routes>
    </>
  )
}

export default App
