import { Link, useNavigate } from "react-router-dom";

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </>
    )
  }

  const publicOptions = (
    <>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </>
  )

  return (
    <header>
      {user ? <h3>Welcome, {user.name}!</h3> : null}
      <nav>{user ? userOptions : publicOptions}</nav>
    </header>
  )
}

export default Nav
