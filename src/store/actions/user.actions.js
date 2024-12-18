import {userService} from '../../services/user.service.js'
import {CLEAR_CART} from '../reducers/toy.reducer.js'
import {SET_USER, SET_USER_SCORE} from '../reducers/user.reducer.js'
import {store} from '../store.js'

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    // console.log('user login:', user)
    store.dispatch({type: SET_USER, user})
  } catch (err) {
    console.error('user actions -> Cannot login', err)
    throw err
  }
  // return userService.login(credentials)
  //     .then((user) => {
  //         console.log('user login:', user)
  //         store.dispatch({ type: SET_USER, user })
  //     })
  //     .catch((err) => {
  //         console.log('user actions -> Cannot login', err)
  //         throw err
  //     })
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({type: SET_USER, user})
  } catch (err) {
    console.error('user actions -> Cannot signup', err)
    throw err
  }
  //   return userService
  //     .signup(credentials)
  //     .then((user) => {
  //       store.dispatch({type: SET_USER, user})
  //     })
  //     .catch((err) => {
  //       console.log('user actions -> Cannot signup', err)
  //       throw err
  //     })
}

export async function logout(credentials) {
  try {
    await userService.logout(credentials)
    store.dispatch({type: SET_USER, user: null})
  } catch (err) {
    console.error('user actions -> Cannot logout', err)
    throw err
  }
  //   return userService
  //     .logout(credentials)
  //     .then(() => {
  //       store.dispatch({type: SET_USER, user: null})
  //     })
  //     .catch((err) => {
  //       console.log('user actions -> Cannot logout', err)
  //     })
}

export async function checkout(diff) {
  try {
    const newScore = await userService.changeScore(-diff)
    store.dispatch({type: CLEAR_CART})
    store.dispatch({type: SET_USER_SCORE, score: newScore})
  } catch (err) {
    console.error('user actions -> Cannot checkout', err)
    throw err
  }
  //   return userService
  //     .updateScore(-diff)
  //     .then((newScore) => {
  //       store.dispatch({type: CLEAR_CART})
  //       store.dispatch({type: SET_USER_SCORE, score: newScore})
  //     })
  //     .catch((err) => {
  //       console.log('user actions -> Cannot checkout', err)
  //       throw err
  //     })
}
