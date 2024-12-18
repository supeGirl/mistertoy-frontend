import {GoogleMap} from '../cmps/GoogleMap.jsx'

export function AboutUs() {
  return (
    <section>
      <h2>About Us</h2>
      <p>
        Welcome to our toy store, where we bring joy and fun to children of all ages! Our store offers a wide range of
        high-quality toys that foster creativity, learning, and entertainment. Whether you're looking for educational
        toys, action figures, or something unique, we have something for everyone.
      </p>
      <p>
        With several branches across Israel, we aim to provide the best shopping experience both in-store and online.
        Visit us to explore our collection and make your kids' dreams come true!
      </p>
      <h3 className="stores-location">Our Locations</h3>
      <section className="google-map container ">

      <GoogleMap />
      </section>
    </section>
  )
}
