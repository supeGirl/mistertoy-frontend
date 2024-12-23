import {toyService, labels} from '../../services/toy.service.js'
import {showSuccessMsg} from '../../services/event-bus.service.js'
import {
  ADD_TOY,
  TOY_UNDO,
  REMOVE_TOY,
  SET_TOYS,
  SET_FILTER_BY,
  SET_IS_LOADING,
  UPDATE_TOY,
  SET_LABELS,
  ADD_MSG_TO_TOY,
  REMOVE_MSG_FROM_TOY,
} from '../reducers/toy.reducer.js'
import {store} from '../store.js'

export async function loadToys() {
  const filterBy = store.getState().toyModule.filterBy
  store.dispatch({type: SET_IS_LOADING, isLoading: true})

  try {
    const toys = await toyService.query(filterBy)
    store.dispatch({type: SET_TOYS, toys})
  } catch (err) {
    console.error('toy action -> Cannot load toys', err)
    throw err
  } finally {
    store.dispatch({type: SET_IS_LOADING, isLoading: false})
  }

}

export async function removeToy(toyId) {
  try {
    await toyService.remove(toyId)
    store.dispatch({type: REMOVE_TOY, toyId})
  } catch (err) {
    console.log('toy action -> Cannot remove toy')
    throw err
  }

}

export async function removeToyOptimistic(toyId) {
  store.dispatch({type: REMOVE_TOY, toyId})

  try {
    await toyService.remove(toyId)
    showSuccessMsg('Removed Toy!')
  } catch (err) {
    store.dispatch({type: TOY_UNDO})
    console.log('toy action -> Cannot remove toy')
    throw err
  }

}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  
  try {
    const savedToy = await toyService.save(toy)
    console.log('savedToy', savedToy)
    
    store.dispatch({type, toy: savedToy})
    return savedToy
  } catch (err) {
    console.log('toy action -> Cannot save toy')
    throw err
  }

}

export function setFilterBy(filterBy = toyService.getDefaultFilter()) {
  store.dispatch({type: SET_FILTER_BY, filterBy})
}

export function loadLabels() {
  store.dispatch({type: SET_LABELS, labels})
}

export async function addToyMsg(toyId, txt) {
  try {
    const msg = await toyService.addToyMsg(toyId, txt)
    store.dispatch({
      type: ADD_MSG_TO_TOY,
      toyId,
      msg,
    })
    return msg
  } catch (err) {
    console.error('Failed to add message', err)
    throw err
  }
}

export async function removeToyMsg(toyId, msgId) {
  try {
    await toyService.removeToyMsg(toyId, msgId)
    store.dispatch({
      type: REMOVE_MSG_FROM_TOY,
      toyId,
      msgId,
    })
  } catch (err) {
    console.error('Failed to remove message', err)
    throw err
  }
}
