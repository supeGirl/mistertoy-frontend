import {showSuccessMsg, showErrorMsg} from '../services/event-bus.service.js'

import {ADD_TOY_TO_CART} from '../store/reducers/toy.reducer.js'
import {loadToys, removeToyOptimistic, saveToy, setFilterBy, loadLabels} from '../store/actions/toy.actions.js'

import {ToyFilter} from '../cmps/ToyFilter.jsx'
import {ToyList} from '../cmps/ToyList.jsx'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {toyService} from '../services/toy.service.js'
import {Loader} from '../cmps/Loader.jsx'
import {PaginationButtons} from '../cmps/PaginationButtons.jsx'

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const labels = useSelector((storeState) => storeState.toyModule.labels)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    try {
      loadToys()
    } catch {
      showErrorMsg('Cannot load toys!')
    }
  }, [filterBy])

  useEffect(() => {
    loadLabels()
  }, [])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function setPageIdx(pageIdx) {
    setFilterBy({pageIdx})
  }

  async function onRemoveToy(toyId) {
    try {
      await removeToyOptimistic(toyId)
      showSuccessMsg('Toy removed')
    } catch {
      showErrorMsg('Cannot remove toy')
    }
    // removeToyOptimistic(toyId)
    //   .then(() => {
    //     showSuccessMsg('Toy removed')
    //   })
    //   .catch((err) => {
    //     showErrorMsg('Cannot remove toy')
    //   })
  }

  async function onEditToy() {
    const price = +prompt('New price?')
    try {
      const toyToSave = {...toy, price}
      const savedToy = await saveToy(toyToSave) // Await should be here
      showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
    } catch {
      showErrorMsg('Cannot update toy')
    }

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg('Cannot update toy')
      })
    // <Link to="/toy/edit">
    //   <span className="add-btn">Add Toy</span>
    // </Link>
  }

  function addToCart(toy) {
    console.log(`Adding ${toy.vendor} to Cart`)
    dispatch({type: ADD_TOY_TO_CART, toy})
    showSuccessMsg('Added to Cart')
  }


  const loggedInUser = userService.getLoggedinUser()

  return (
    <div>
      <main>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} labels={labels} />
        {loggedInUser?.isAdmin && (
          <Link to="/toy/edit">
            <span className="add-btn">Add Toy</span>
          </Link>
        )}
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
