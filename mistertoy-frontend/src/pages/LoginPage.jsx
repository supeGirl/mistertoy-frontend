import {LoginSignup} from '../cmps/LoginSignup.jsx'

export function LoginPage() {
  return (
    <section className="login-page-container">
      <h1>Welcome to the App</h1>
      <p>Please login or sign up to continue</p>
      <LoginSignup />
    </section>
  )
}
