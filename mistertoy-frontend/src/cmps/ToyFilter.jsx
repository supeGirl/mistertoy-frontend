import {useEffect, useRef, useState} from 'react'



// UI
import {useTheme} from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

// service & util functions
import {utilService} from '../services/util.service.js'
import {toyService} from '../services/toy.service.js'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(label, selectedLabels, theme) {
  return {
    fontWeight: selectedLabels.includes(label) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  }
}

export function ToyFilter({filterBy, onSetFilter}) {
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))
  const toyLabels = toyService.getToyLabels()
  const theme = useTheme()

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

  function handleLabelChange(event) {
    const {
      target: {value},
    } = event
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      labels: typeof value === 'string' ? value.split(',') : value,
    }))
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
          <select value={filterByToEdit.sortBy || ''} onChange={handleChange} id="sortBy" name="sortBy">
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="createdAt">Creation Date</option>
          </select>

          <select name="inStock" value={filterByToEdit.inStock || ''} onChange={handleChange}>
            <option value="">All</option>
            <option value="true">In Stock</option>
            <option value="false">Not in stock</option>
          </select>

          <label htmlFor="sortDescending">Sort Descending:</label>
          <input
            type="checkbox"
            id="sortDescending"
            name="sortBy.desc"
            checked={filterByToEdit.sortBy?.desc || false}
            onChange={handleChange}
          />
        </div>

        <div className="labels-container container">
          <FormControl sx={{m: 1, width: 250}}>
            <InputLabel id="toy-labels-select-label">Labels</InputLabel>

            <Select
              multiple
              labelId="toy-labels-select-label"
              id="toy-labels-select"
              value={filterByToEdit.labels || []}
              onChange={handleLabelChange}
              input={<OutlinedInput id="select-multiple-chip" label="Labels" />}
              renderValue={(selected) => (
                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {toyLabels.map((label) => (
                <MenuItem key={label} value={label} style={getStyles(label, filterByToEdit.labels || [], theme)}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </form>
    </section>
  )
}
