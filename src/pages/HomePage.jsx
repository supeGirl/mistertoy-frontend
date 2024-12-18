import {useSelector} from 'react-redux'

import logo from '../assets/img/logo.png'

export function HomePage() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  const welcomingName = user ? user.fullname : 'Guest'

  return (
    <section>
      <h1>Welcome {welcomingName}</h1>
      <img src={logo} />
    </section>
  )
}
