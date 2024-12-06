import {showSuccessMsg, showErrorMsg} from '../services/event-bus.service.js'

import {ADD_TOY_TO_CART} from '../store/reducers/toy.reducer.js'
import {loadToys, removeToyOptimistic, saveToy, setFilterBy} from '../store/actions/toy.actions.js'

import {ToyFilter} from '../cmps/ToyFilter.jsx'
import {ToyList} from '../cmps/ToyList.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {toyService} from '../services/toy.service.js'
import {Loader} from '../cmps/Loader.jsx'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys().catch((err) => {
      showErrorMsg('Cannot load toys!')
    })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function setPageIdx(pageIdx) {
    setFilterBy({ pageIdx })
  }

  function onRemoveToy(toyId) {
    removeToyOptimistic(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch((err) => {
        showErrorMsg('Cannot remove toy')
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getRandomToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot add toy')
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?')
    const toyToSave = {...toy, price}

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg('Cannot update toy')
      })
  }

  function addToCart(toy) {
    console.log(`Adding ${toy.vendor} to Cart`)
    dispatch({type: ADD_TOY_TO_CART, toy})
    showSuccessMsg('Added to Cart')
  }

  return (
    <div>
      <main>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <Link to="/toy/edit"><span className="add-btn">Add Toy</span></Link>
        {!isLoading ? (
          <ToyList toys={toys} onRemoveToy={onRemoveToy} onEditToy={onEditToy} addToCart={addToCart} />
        ) : (
          <Loader />
        )}
        <hr />
        <PaginationButtons pageIdx={filterBy.pageIdx} setPageIdx={setPageIdx} toysLength={toys.length} />
      </main>
    </div>
  )
}
