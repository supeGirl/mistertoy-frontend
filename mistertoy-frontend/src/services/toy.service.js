import {httpService} from './http.service.js'

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
  getNextToyId,
  addToyMsg,
  removeToyMsg
}

async function query(filterBy = {}) {
  try {
    const toys = await httpService.get(BASE_URL, filterBy)
    return toys
  } catch  {
    throw new Error('Failed to fetch toys. Please try again.')
  }
}

async function getById(toyId) {
  
  try {
    const toy = await httpService.get(BASE_URL + toyId)
    console.log('toy after try fatching from http',toy);
    
    
    if (!toy) throw new Error(`Toy with ID ${toyId} not found`)
    return toy
  } catch {
    throw new Error(`Toy with ID ${toyId} not found`)
  }
}

async function getNextToyId(currentToyId) {
  try {
    const toys = await query()
    const currentIndex = toys.findIndex((toy) => toy._id === currentToyId)
    const nextToy = toys[(currentIndex + 1) % toys.length]
    return nextToy._id
  } catch  {
    throw new Error('Error fetching next toy ID')
  }
}

async function remove(toyId) {
  try {
    await httpService.delete(BASE_URL + toyId)
  } catch {
    throw new Error('Failed to delete toy. Please try again.')
  }
}

async function save(toy) {
try{
  const mathod = toy._id? 'put' : 'post'
  const savedToy = await httpService[mathod](BASE_URL,toy)
  return savedToy
}catch{
  throw new Error('Failed to save toy. Please try again.');

}
}

function getDefaultFilter() {
  return {
    txt: '',
    maxPrice: '',
    labels: [],
    inStock: '',
    pageIdx: 0,
    sortBy: '',
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: '',
    inStock: true,
  }
}

function getToyLabels() {
  return [...labels]
}

async function addToyMsg(toyId, txt) {
  
  const savedMsg = await httpService.post(`toy/${toyId}/msg`, {txt})
  return savedMsg
}
async function removeToyMsg(toyId, txt) {
  
  const savedMsg = await httpService.delete(`toy/${toyId}/msg/${txt}`)
  return savedMsg
}
