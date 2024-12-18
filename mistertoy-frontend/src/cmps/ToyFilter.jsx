import {useEffect, useRef, useState} from 'react'

// Formik
import {Formik, Form, Field} from 'formik'
import {TextField, MenuItem, Select, InputLabel, FormControl} from '@mui/material'

import {LabelsList} from '../cmps/LabelsList.jsx'

// service & util functions
import {utilService} from '../services/util.service.js'

function CustomInput(props) {
  const {id, ...rest} = props
  return <TextField {...rest} id={id} variant="standard" />
}

export function ToyFilter({filterBy, onSetFilter, labels}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
  const defaultValues = {
    txt: '',
    maxPrice: 0,
    inStock: false,
    sortBy: '',
  }

  useEffect(() => {
    console.log('Sending filterByToEdit:', filterByToEdit) // Check filter state
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])


  function handleChange({target}) {
    let {value, name: field, type} = target
    
    if (field === 'inStock') {
      if (value === 'yes') value = true
      else if (value === 'no') value = false
      else value = '' 
    }

    value = type === 'number' ? +value : value

    setFilterByToEdit((prevFilter) => ({...prevFilter, [field]: value}))
  }

  return (
    <section className="toy-filter full main-layout container">
      <h2>Filter Our Toys</h2>
      <Formik initialValues={defaultValues} onSubmit={(values) => {}}>
        {() => (
          <Form>
            <div className="name-container ">
              <Field
                as={CustomInput}
                id="name-input"
                name="txt"
                label="Name"
                placeholder="By name"
                fullWidth
                value={filterByToEdit.txt}
                onChange={handleChange}
              />
            </div>

            <div className="maxPrice-container padding-s">
              <Field
                as={CustomInput}
                id="max-price-input"
                name="maxPrice"
                type="number"
                label="Max Price"
                placeholder="By max price"
                fullWidth
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
              />
            </div>

            <div className="stock-container padding-s">
              <FormControl fullWidth>
                <InputLabel id="in-stock-label">Stock Status</InputLabel>
                <Select
                  labelId="in-stock-label"
                  id="inStock"
                  value={filterByToEdit.inStock? 'yes' : 'no' || ''}
                  name="inStock"
                  onChange={handleChange}
                  label="Stock Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="yes">In Stock</MenuItem>
                  <MenuItem value="no">Not in Stock</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="sort-container padding-s">
              <FormControl fullWidth>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sortBy"
                  name="sortBy"
                  value={filterByToEdit.sortBy || ''}
                  onChange={handleChange}
                  label="Sort By"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                  <MenuItem value="createdAt">Creation Date</MenuItem>
                </Select>
              </FormControl>
            </div>
            <LabelsList labels={labels} onChange={handleChange} />
          </Form>
        )}
      </Formik>
    </section>
  )
}
