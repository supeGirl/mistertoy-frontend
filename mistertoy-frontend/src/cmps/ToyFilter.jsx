import {useEffect, useRef, useState} from 'react'
import {utilService} from '../services/util.service.js'

export function ToyFilter({filterBy, onSetFilter}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({target}) {
    let {value, name: field, type} = target
    if (type === 'number') value = +value;

    setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
  }


  return (
    <section className="toy-filter full main-layout">
    <h2>Toys Filter</h2>
    <form>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="txt"
        placeholder="By name"
        value={filterByToEdit.txt}
        onChange={handleChange}
      />

      <label htmlFor="maxPrice">Max price:</label>
      <input
        type="number"
        id="maxPrice"
        name="maxPrice"
        placeholder="By max price"
        value={filterByToEdit.maxPrice || ''}
        onChange={handleChange}
      />
      <label htmlFor="sortBy">Sort By: </label>
      <select value={filterBy.sortBy || ''} onChange={handleChange} id="sortBy" name="sortBy">
        <option value="">None</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="createdAt">Creation Date</option>
      </select>
    
    </form>
  </section>
  )
}
