import {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Await, useNavigate} from 'react-router'
import {toyService} from '../services/toy.service.js'
import {Loader} from '../cmps/Loader.jsx'
import {userService} from '../services/user.service.js'
import {CommentForm} from '../cmps/CommentForm.jsx'

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
      // const nextToyId = await toyService.getNextToyId(toyId)
      // console.log('Next toy ID:', nextToyId)
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

  function renderComments() {
    if (toy?.msgs && toy.msgs.length > 0) {
      console.log(toy.msgs)
      return (
        <div className="comments-container">
          <h3>Comments:</h3>
          <ul>
            {toy.msgs.map((msg) => (
              <li key={msg.id}>
                <p>{msg.txt}</p>
                {(loggedInUser?.isAdmin || loggedInUser?._id === msg.by._id) && (
                  <button onClick={() => handleRemoveComment(msg.id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )
    } else {
      return <p>No comments yet on this toy.</p>
    }
  }

  async function handleComment(comment) {
    await toyService.addToyMsg(toy._id, comment.txt)
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
      <Link to={`/toy`}>Back</Link>
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
      <h5>Price: ${toy.price}</h5>
      <button onClick={() => setIsAddingComment(!isAddingComment)}>{isAddingComment ? 'Cancel' : 'Add Comment'}</button>
      {isAddingComment && <CommentForm onSubmit={handleComment} />}
      {renderComments()}
    </section>
  )
}
