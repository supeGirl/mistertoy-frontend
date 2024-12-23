import {userService} from '../services/user.service.js'
import {ToyPreview} from './ToyPreview.jsx'

export function ToyList({toys, onRemoveToy, onEditToy, addToCart}) {
  const loggedInUser = userService.getLoggedinUser()
  return (
    <ul className="toy-list container">
      {toys.map((toy) => (
        <li className="toy-preview" key={toy._id}>
          <ToyPreview toy={toy} />

          <div>
            {loggedInUser?.isAdmin && (
              <>
                <button onClick={() => onRemoveToy(toy._id)}>x</button>
                <button onClick={() => onEditToy(toy)}>Edit</button>
              </>
            )}
          </div>

          <button className="buy" onClick={() => addToCart(toy)}>
            Add to Cart
          </button>
        </li>
      ))}
    </ul>
  )
}
