import {Link} from 'react-router-dom'

export function ToyPreview({toy}) {
  return (
    <article>
      <h4>{toy.name}</h4>
      <p className=' toy-preview toy-price'>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      <p>
      </p>
      <Link to={`/toy/${toy._id}`}>Details</Link>
      <hr />
      <span className={toy.inStock ? 'instock' : 'not-instock'}>{toy.inStock ? 'In stock' : 'Not in stock'} </span>
    </article>
  )
}
