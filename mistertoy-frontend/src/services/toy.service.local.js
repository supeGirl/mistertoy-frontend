import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.local.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
            {
                return regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice

            }
            )
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
        labels: '',
        inStock:true,
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}
function getRandomToy() {
return _createToy()
}

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = []
    for(var i = 0; i < 12; i++){
        const toy = _createToy()
        toy._id = utilService.makeId()
        toy.createAt = Date.now()
        toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}


function _createToy(){
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    const toy = getEmptyToy()
    toy.name = utilService.makeLorem(2) // Generate a random name
    toy.price = utilService.getRandomIntInclusive(10, 200) // Random price between 10 and 200
    toy.labels = utilService.getRandomSubarray(labels, utilService.getRandomIntInclusive(1, 3)) // Random 1-3 labels
    toy.inStock = Math.random() > 0.5 // Random stock status
    return toy
}