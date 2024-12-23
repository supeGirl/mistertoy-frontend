import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {toyService} from '../services/toy.service.js'
import {Loader} from '../cmps/Loader.jsx'
import {userService} from '../services/user.service.js'
import {CommentForm} from '../cmps/CommentForm.jsx'
import {CommentsList} from '../cmps/CommentsList.jsx'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const {toyId} = useParams()

  const [isAddingComment, setIsAddingComment] = useState(false)

  let navigate = useNavigate()
  const loggedInUser = userService.getLoggedinUser()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  async function loadToy() {
    try {
      const toyData = await toyService.getById(toyId)
      setToy(toyData)
    } catch (err) {
      console.log('Had issues in toy details', err)
      navigate('/toy')
    }
  }

  function formatLabels() {
    const {labels} = toy
    if (!labels || labels.length === 0) return ''
    if (labels.length === 1) return labels
    return labels.join(', ')
  }

  async function handleComment(comment) {
    const {txt, rating} = comment
    await toyService.addToyMsg(toy._id, txt, +rating)
    loadToy()
    setIsAddingComment(false)
  }

  async function handleRemoveComment(msgId) {
    await toyService.removeToyMsg(toy._id, msgId)
    loadToy()
  }

  if (!toy) return <Loader />
  return (
    <section className="toy-details">
      <Link to={`/toy`} className="back-link">
        Back
      </Link>
      &nbsp;
      {loggedInUser?.isAdmin && <Link to={`/toy/edit/${toy._id}`}>Edit</Link>}
      <h1>Toy name : {toy.name}</h1>
      <h2>Toy labels: {formatLabels()}</h2>
      <h4>About Toy</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum
        rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis
        repellat, enim quibusdam!
      </p>
      <h5>
        Price: ${toy.price}{' '}
      </h5>
        <span className={toy.inStock ? 'instock' : 'not-instock'}>{toy.inStock ? 'In stock' : 'Not in stock'} </span>
      {loggedInUser ? (
        <button className="toy-add-comments-btn btn" onClick={() => setIsAddingComment(!isAddingComment)}>
          {isAddingComment ? 'Cancel' : 'Add Comment'}
        </button>
      ) : (
        <p>
          Only signed-in users can add comments.{' '}
          <Link to="/login" className="comment-login-link">
            login or signup
          </Link>{' '}
          to join the discussion!
        </p>
      )}
      {isAddingComment && <CommentForm onSubmit={handleComment} />}
      {/* {renderComments()} */}
      <CommentsList comments={toy?.msgs} loggedInUser={loggedInUser} onRemoveComment={handleRemoveComment} />
    </section>
  )
}
