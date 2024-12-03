import {useEffect, useRef, useState} from 'react'
import {utilService} from '../services/util.service.js'
import {toyService} from '../services/toy.service.local.js'

export function ToyFilter({filterBy, onSetFilter}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
  const toyLabels = toyService.getToyLabels()

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({target}) {
    let {value, name: field, type, checked} = target
    if (type === 'checkbox') value = checked
    if (type === 'select-multiple') {
      value = Array.from(target.selectedOptions, (option) => option.value) || []
    }

    value = type === 'number' ? +value || '' : value
    setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
  }

  return (
    <section className="toy-filter full main-layout container">
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
        <div className="sort-container container">
          <label htmlFor="sortBy">Sort By: </label>
          <select value={filterBy.sortBy || ''} onChange={handleChange} id="sortBy" name="sortBy">
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Creation Date</option>
          </select>
          <select name="inStock" value={filterBy.inStock || ''} onChange={handleChange}>
            <option value="">All</option>
            <option value="true">In Stock</option>
            <option value="false">Not in stock</option>
          </select>
          <label htmlFor="sortDescending">Sort Descending:</label>
          <input
            type="checkbox"
            id="sortDescending"
            name="sortBy.desc"
            checked={filterByToEdit.sortBy.desc}
            onChange={handleChange}
          />
        </div>
        <div className="labels-container container">
          <select multiple name="labels" value={filterBy.labels || []} onChange={handleChange}>
            <option value="">Labels</option>
            {toyLabels.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </section>
  )
}
