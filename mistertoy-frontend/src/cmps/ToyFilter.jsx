import {useRef} from 'react'

// Formik
import {Formik, Form, Field} from 'formik'
import {TextField, Button, MenuItem, Select, Chip, InputLabel, FormControl, OutlinedInput} from '@mui/material'
import * as Yup from 'yup'

// UI
import {useTheme} from '@mui/material/styles'

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

const validationSchema = Yup.object().shape({
  txt: Yup.string().max(50, 'Too Long!'),
  maxPrice: Yup.number().min(0, 'Cannot be negative').nullable(),
  labels: Yup.array().of(Yup.string()),
})

function getStyles(label, selectedLabels, theme) {
  return {
    fontWeight: selectedLabels.includes(label) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  }
}

export function ToyFilter({filterBy, onSetFilter}) {
  const initialValues = {
    txt: filterBy.txt || '',
    maxPrice: filterBy.maxPrice || 0,
    sortBy: filterBy.sortBy || '',
    labels: filterBy.labels || [],
    inStock: filterBy.inStock || '',
  }

  const toyLabels = toyService.getToyLabels()
  const theme = useTheme()
  const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter, 300))

  function handleSubmit(values) {
    onSetFilterDebounced.current(values)
  }

  return (
    <section className="toy-filter full main-layout container">
      <h2>Filter Our Toys</h2>
      <Formik 
      initialValues={initialValues}
       validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({values, errors, touched, setFieldValue}) => (
          <Form>
            <div className="name-container ">
              <Field
                as={TextField}
                name="txt"
                label="Name"
                placeholder="By name"
                fullWidth
                variant="outlined"
                error={touched.txt && !!errors.txt}
                helperText={touched.txt && errors.txt}
              />
            </div>

            <div className="maxPrice-container padding-s">
              <Field
                as={TextField}
                name="maxPrice"
                type="number"
                label="Max Price"
                placeholder="By max price"
                fullWidth
                variant="outlined"
                error={touched.maxPrice && !!errors.maxPrice}
                helperText={touched.maxPrice && errors.maxPrice}
              />
            </div>

            <div className="stock-container padding-s">
              <FormControl fullWidth>
                <InputLabel id="in-stock-label">Stock Status</InputLabel>
                <Select
                  labelId="in-stock-label"
                  id="inStock"
                  value={values.inStock || ''}
                  onChange={(event) => setFieldValue('inStock', event.target.value)}
                  label="Stock Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="true">In Stock</MenuItem>
                  <MenuItem value="false">Not in Stock</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="sort-container padding-s">
              <FormControl fullWidth>
                <InputLabel id="sort-by-label">Sort By</InputLabel>
                <Select
                  labelId="sort-by-label"
                  id="sort-by"
                  value={values.sortBy?.type || ''}
                  onChange={(event) => setFieldValue('sortBy.type', event.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                  <MenuItem value="createdAt">Creation Date</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="filter-checkbox container">
              <FormControl fullWidth>
                <InputLabel id="sort-descending-label">Sort Descending</InputLabel>
                <Field
                  type="checkbox"
                  id="sortDescending"
                  name="sortBy.desc"
                  checked={values.sortBy?.desc || false}
                  onChange={() => setFieldValue('sortBy.desc', !values.sortBy?.desc)}
                />
              </FormControl>
            </div>

            <div className="labels-container ">
              <FormControl sx={{m: 1, width: 250}}>
                <InputLabel id="toy-labels-select-label">Labels</InputLabel>
                <Select
                  multiple
                  labelId="toy-labels-select-label"
                  id="toy-labels-select"
                  value={values.labels}
                  onChange={(event) => setFieldValue('labels', event.target.value)}
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
                    <MenuItem key={label} value={label} style={getStyles(label, values.labels, theme)}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <Button type="submit" variant="contained" color="primary">
                Apply Filters
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}
