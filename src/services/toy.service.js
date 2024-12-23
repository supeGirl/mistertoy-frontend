import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import { faker } from '@faker-js/faker'
const BASE_URL = 'toy/'

export const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getToyLabels,
  getPricePerLabelData,
  getInventoryByLabelData,
  generateFakerData,
  addToyMsg,
  removeToyMsg,
  getEmptyMsg,
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL + toy._id, toy)
  } else {
    toy.owner = userService.getLoggedinUser()
    return httpService.post(BASE_URL, toy)
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    maxPrice: '',
    labels: [],
    inStock: '',
    pageIdx: 0,
    sortBy: {
      type: '',
      desc: 1,
    },
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels(),
    inStock: true,
    msgs: [],
  }
}

function getToyLabels() {
  return [...labels]
}

// ~~~~~~~~~~~~~~~~Data for charts~~~~~~~~~~~~~~~~~~~

function getPricePerLabelData(toys) {
  const labelMap = {}
  toys.forEach((toy) => {
    toy.labels.forEach((label) => {
      if (!labelMap[label]) labelMap[label] = 0
      labelMap[label] += toy.price
    })
  })
  return _getPricePerLabelMap(labelMap)
}

function getInventoryByLabelData(toys) {
  const labelMap = {}

  toys.forEach((toy) => {
    toy.labels.forEach((label) => {
      if (!labelMap[label]) labelMap[label] = {inStock: 0, total: 0}
      labelMap[label].total++
      if (toy.inStock) labelMap[label].inStock++
    })
  })

  return _getInventoryByLabelMap(labelMap)
}

function generateFakerData() {
  const labels = Array.from({length: 7}, () => faker.date.month())

  const datasets = [
    {
      label: faker.commerce.productName(),
      data: Array.from({length: labels.length}, () => faker.number.int({min: -1000, max: 2000})),
      borderColor: faker.color.rgb(),
      backgroundColor: faker.color.rgb({alpha: 0.5}),
    },
    {
      label: faker.commerce.productName(),
      data: Array.from({length: labels.length}, () => faker.number.int({min: -1000, max: 2000})),
      borderColor: faker.color.rgb(),
      backgroundColor: faker.color.rgb({alpha: 0.5}),
    },
  ]

  return {labels, datasets}
}

// ~~~~~~~~~~~~~~~~Msgs~~~~~~~~~~~~~~~~~~~

async function addToyMsg(toyId, txt, rating) {
 const  msgToSave = {
    txt,
    rating
  }
  try {
    return await httpService.post(`toy/${toyId}/msg`, _createMsg(msgToSave))
  } catch (err) {
    console.error('Failed to save message', err)
    throw err
  }
}

async function removeToyMsg(toyId, msgId) {
  try {
    return await httpService.delete(`toy/${toyId}/msg/${msgId}`)
  } catch (err) {
    console.error('Failed to remove toy message', err)
    throw err
  }
}

function getEmptyMsg() {
  return {
    txt: '',
    rating: 1,
    by: null,
  }
}

// Private functions

function _getRandomLabels() {
  const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
  const shuffled = labels.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 3)
}

function _createMsg(msgToSave) {
  return {
    txt: msgToSave.txt,
    rating: msgToSave.rating,
    by: msgToSave.by,
  }
}

function _getPricePerLabelMap(labelMap) {
  return Object.entries(labelMap).map(([label, total]) => ({label, total}))
}

function _getInventoryByLabelMap(labelMap) {
  return Object.entries(labelMap).map(([label, {inStock, total}]) => ({
    label,
    inStockPercentage: ((inStock / total) * 100).toFixed(2),
  }))
}
