import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <p><span className={toy.inStock? "instock" : "not-instock"}>{toy.inStock ? 'In stock' : 'Not in stock'} </span></p>
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}