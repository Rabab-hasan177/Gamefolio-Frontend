import { useEffect, useState } from "react"
import Client from "../services/api"

const CommentForm = ({ gameId, user }) => {
  const [comments, setComments] = useState([])
  const [description, setDescription] = useState("")

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await Client.get(`/Game/${gameId}`)
        setComments(response.data.comments || [])
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }
    getComments()
  }, [gameId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await Client.post(`/comment/${gameId}`, {
        description,
        owner: user?.id,
      })

      setComments([response.data, ...comments])
      setDescription("")
    } catch (error) {
      console.error("Error submitting comment:", error)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await Client.delete(`/comment/${commentId}`)
      setComments(comments.filter((comment) => comment._id !== commentId))
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  return (
    <div className="comment-section">
      <div className="commentList">
        <h4>Comments:</h4>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>{comment.description}</p>
              {user && user.id === comment.owner && (
                <button onClick={() => handleDelete(comment._id)}>
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Add a Comment:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <button type="submit">Post Comment</button>
      </form>
    </div>
  )
}

export default CommentForm
