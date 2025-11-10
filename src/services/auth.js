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
