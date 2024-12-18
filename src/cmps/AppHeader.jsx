import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import React from 'react'
import {useTranslation} from 'react-i18next'

import {TOGGLE_CART_IS_SHOWN} from '../store/reducers/toy.reducer.js'
import {logout} from '../store/actions/user.actions.js'

import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service.js'

import {UserMsg} from './UserMsg.jsx'
import {LoginSignup} from './LoginSignup.jsx'

export function AppHeader() {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const {i18n} = useTranslation()

  function switchLanguage(lang) {
    i18n.changeLanguage(lang) // Switch language dynamically
  }

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg('logout successfully')
    } catch {
      showErrorMsg('Oops try again')
    }
    // logout()
    //   .then(() => {
    //     showSuccessMsg('logout successfully')
    //   })
    //   .catch((err) => {
    //     showErrorMsg('OOPs try again')
    //   })
  }

  function onToggleCart(ev) {
    ev.preventDefault()
    dispatch({type: TOGGLE_CART_IS_SHOWN})
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>Shop With Joy</h1>
        <nav className="app-nav">
          <NavLink to="/">{i18n.t('home')}</NavLink>
          <NavLink to="/about">{i18n.t('about')}</NavLink>
          <NavLink to="/toy">{i18n.t('toys')}</NavLink>
          <NavLink to="/dashboard">{i18n.t('dashboard')}</NavLink>
          <a onClick={onToggleCart} href="#">
            {i18n.t('cart')} 🛒
          </a>
        </nav>
        {/* <div className="language-container">
          <button onClick={() => switchLanguage('en')}>English</button>
          <button onClick={() => switchLanguage('he')}>עברית</button>
        </div> */}
      </section>
      <section>
        {user ? (
          <>
            <span>
              {i18n.t('hello')} {user.fullname} <span>${user.score.toLocaleString()}</span>
            </span>
            <button onClick={onLogout}>{i18n.t('logout')}</button>
          </>
        ) : (
          <nav>
            <NavLink to="/login">{i18n.t('login', 'Login')}</NavLink>
          </nav>
        )}
      </section>

      <UserMsg />
    </header>
  )
}
