import {Link, useNavigate, useParams} from 'react-router-dom'
import {showErrorMsg, showSuccessMsg} from '../services/event-bus.service.js'
import {saveToy} from '../store/actions/toy.actions.js'
import {useEffect, useState} from 'react'
import {toyService} from '../services/toy.service.js'

export function ToyEdit() {
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy(''))
  const {toyId} = useParams()

  useEffect(() => {
    if (toyId) loadToy()
  }, [])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToyToEdit(toy)
    } catch (err) {
      console.log('Had issues in toy edit', err)
      navigate('/toy')
    }

  }

  function handleChange({target}) {
    let {value, type, name: field} = target
    value = type === 'number' ? +value : value
    setToyToEdit((prevToy) => ({...prevToy, [field]: value}))
  }

 async function onSaveToy(ev) {
    ev.preventDefault()
    if (!toyToEdit.price) toyToEdit.price = 1000
    try {
    await  saveToy(toyToEdit)
      showSuccessMsg('Toy Saved!')
      navigate('/toy')
    } catch (err) {
      console.log('Had issues in toy details', err)
      showErrorMsg('Had issues in toy details')
    }

  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name..."
          value={toyToEdit.name}
          onChange={handleChange}
        />
        <label htmlFor="price">Price : </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter price"
          value={toyToEdit.price}
          onChange={handleChange}
        />

        <div>
          <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
          <Link to="/toy">Cancel</Link>
        </div>
      </form>
    </section>
  )
}
