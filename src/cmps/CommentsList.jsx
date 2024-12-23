import React from 'react'
import Rating from '@mui/material/Rating'

export function CommentsList({comments, loggedInUser, onRemoveComment}) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet on this toy.</p>
  }

  return (
    <div className="toy-comments-container">
      <h3>Comments:</h3>
      <ul>
        {comments.map((msg) => (
          <li key={msg.id}>
            <pre className="toy-comments-txt">{msg.txt}</pre>
            <Rating name="read-only" value={msg.rating} readOnly precision={0.5} className="toy-comments-rating" />
            {(loggedInUser?.isAdmin || loggedInUser?._id === msg.by._id) && (
              <button className="toy-comments-btn btn" onClick={() => onRemoveComment(msg.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
