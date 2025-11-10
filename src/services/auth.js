import Client from "./api"

export const RegisterUser = async (data) => {
  try {
    localStorage.setItem("imageUpload", "true")
    const res = await Client.post("/auth/register", data)
    localStorage.removeItem("imageUpload")
    return res.data
  } catch (error) {
    throw error
  }
}

export const SignInUser = async (data) => {
  try {
    const res = await Client.post("/auth/login", data)
    // Set the current signed in users token to localStorage
    localStorage.setItem("token", res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get("/auth/session")
    // Checks if there is a token and if it is valid
    return res.data
  } catch (error) {
    throw error
  }
}
