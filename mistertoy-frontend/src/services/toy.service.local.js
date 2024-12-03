import {storageService} from './async-storage.service.js'
import {utilService} from './util.service.js'
import {userService} from './user.service.local.js'

const STORAGE_KEY = 'toyDB'
const PAGE_SIZE = 5
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

_createToys()

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getRandomToy,
  getToyLabels,
}

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((filteredToys) => {
    // console.log('filterBy', filterBy)

    // Default filter values
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity

    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      filteredToys = filteredToys.filter((toy) => regExp.test(toy.name))
    }
    if (filterBy.inStock) {
      filteredToys = filteredToys.filter((toy) => toy.inStock === JSON.parse(filterBy.inStock))
    }
    if (filterBy.labels && filterBy.labels.length) {
      filteredToys = filteredToys.filter((toy) => filterBy.labels.some((label) => toy.labels.includes(label)))
    }

    const {sortBy} = filterBy
    if (sortBy.type) {
      filteredToys.sort((t1, t2) => {
        const sortDirection = sortBy.desc ? -1 : 1
        if (sortBy.type === 'name') {
          return t1.name.localeCompare(t2.name) * sortDirection
        } else if (sortBy.type === 'price' || sortBy.type === 'createdAt') {
          return (t1[sortBy.type] - t2[sortBy.type]) * sortDirection
        }
      })
    }
    const {pageIdx} = filterBy
    if (pageIdx !== undefined) {
      let startIdx = +pageIdx * PAGE_SIZE
      filteredToys = filteredToys.slice(startIdx, startIdx + PAGE_SIZE)
    }

    return filteredToys
  })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    // when switching to backend - remove the next line
    toy.owner = userService.getLoggedinUser()
    return storageService.post(STORAGE_KEY, toy)
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: utilService.getRandomSubarray(labels, utilService.getRandomIntInclusive(1, 3)),
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    inStock: null,
    labels: [],
    pageIdx: 0,
    sortBy: {
      type: '',
      desc: 1,
    },
  }
}

function getRandomToy() {
  return _createToy()
}

function getToyLabels() {
  return [...labels]
}

function _createToys() {
  var toys = utilService.loadFromStorage(STORAGE_KEY)
  if (toys && toys.length > 0) return

  toys = []
  for (var i = 0; i < 12; i++) {
    const toy = _createToy()
    toy._id = utilService.makeId()
    toy.createAt = Date.now()
    toys.push(toy)
  }
  utilService.saveToStorage(STORAGE_KEY, toys)
}

function _createToy() {
  const labels = getToyLabels()

  const toy = getEmptyToy()
  toy.name = utilService.makeToyName(2) // Generate a random name
  toy.price = utilService.getRandomIntInclusive(10, 200) // Random price between 10 and 200
  toy.labels = utilService.getRandomSubarray(labels, utilService.getRandomIntInclusive(1, 3)) // Random 1-3 labels
  toy.inStock = Math.random() > 0.5 // Random stock status
  return toy
}
